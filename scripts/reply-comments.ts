/**
 * Comment automation (official Instagram API with Instagram Login):
 *
 * "TRAPS" (or "PDF") comments (any Reel, when FREE_PDF_URL is set): the commenter gets the free guide link as a private DM
 * (Instagram "private reply", one per comment, within 7 days), then a short public "check your DMs" reply.
 *
 * Quiz answers under our "Brilliant or blunder?" Reels:
 *
 *  - Quiz Reels are found by their "♟ <title> | <band> Elo" caption line; the answer comes from the lesson.
 *  - A comment that says "brilliant" or "blunder" (typos, !!/?? and "not a …" included) gets a
 *    "correct" or "not quite" reply, picked from a pool so the replies don't all look the same.
 *  - Comments we already answered (one of the replies is ours), our own comments and comments with no
 *    clear answer are skipped. No state is stored anywhere.
 *
 * Env:
 *   IG_ACCESS_TOKEN   long-lived Instagram User token with instagram_business_manage_comments
 *                     (+ instagram_business_manage_messages for the PDF DMs)
 *   FREE_PDF_URL      link sent in the DM; the PDF feature is off while it is empty
 *   DRY_RUN=1         print what would be replied, post nothing
 *   MAX_REPLIES       per run, default 40
 *   MAX_AGE_DAYS      only quizzes posted in the last N days, default 14
 *
 *   npx tsx scripts/reply-comments.ts
 */
import path from "node:path";
import { LESSONS } from "../src/lessons/index.ts";
import type { Lesson } from "../src/types.ts";
import { marker } from "./marker.ts";

const IG_API = `https://graph.instagram.com/${process.env.IG_API_VERSION ?? "v23.0"}`;
const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
const MAX_REPLIES = Number(process.env.MAX_REPLIES ?? 40);
const MAX_AGE_DAYS = Number(process.env.MAX_AGE_DAYS ?? 14);
const PDF_URL = process.env.FREE_PDF_URL?.trim() || "";
/** Instagram only allows a private reply within 7 days of the comment. */
const DM_WINDOW_MS = 7 * 86_400_000 - 3_600_000;

type Answer = "brilliant" | "blunder";

const CORRECT = [
  "✅ Correct! You've got a great eye 👀",
  "✅ Spot on! That's exactly right 🔥",
  "✅ Yes! You saw it. New puzzle tomorrow ♟",
  "✅ Correct! Most people miss this one 😎",
  "✅ Nailed it! 💪 Can you get the next one too?",
  "✅ Right answer! Grandmaster vision 🧠",
  "✅ Exactly! Send it to a friend and see if they get it 📩",
  "✅ Correct! 🎯 You're on fire",
];

const WRONG = [
  "❌ Not quite! Look again at what happens next 👀",
  "❌ Nope! This one fools a lot of players 😅",
  "❌ Not this time! Try the next puzzle 💪",
  "❌ Good try, but no! Think about the best reply 🤔",
  "❌ Not quite! It's trickier than it looks 😏",
  "❌ Close, but no! Play it out a few moves ♟",
  "❌ Sorry, not correct! New puzzle tomorrow 🙌",
  "❌ Nope! Check every capture and check 👀",
];

const PDF_PUBLIC = [
  "📩 Sent! Check your DMs",
  "📩 Done! The free guide is in your DMs",
  "📩 Check your inbox! (Look in message requests too)",
  "📩 Sent it! Enjoy the traps ♟",
  "📩 On its way! Check your DMs 🎁",
];

const pdfMessage = () =>
  [
    "Here's your free guide 🎁",
    "♟ 30 Chess Traps for 400–1000 Elo (and how to stop each one)",
    PDF_URL,
    "",
    "A new trap every day on @checksmatedaily. Good luck in your games!",
  ].join("\n");

/** The CTA keyword "TRAPS" ("traps!", "Traps please" …); "PDF" also works. Singular "trap" doesn't, so normal
 * comments like "this trap is crazy" don't get an unasked-for DM. */
export const wantsGuide = (text: string) => /(^|[^a-z])(traps|pdf)([^a-z]|$)/i.test(text);

/** What a comment answers, or null when it says neither (or both). */
export const readAnswer = (text: string): Answer | null => {
  const t = ` ${text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")} `;
  const brilliant = /\bbril/;
  const blunder = /\bbl[aeuo]nd/;
  // "not a blunder" / "isn't brilliant" answer the other way.
  const negated = (word: RegExp) => new RegExp(`\\b(not|isn'?t|no)\\s+(an?\\s+|really\\s+)?${word.source.slice(2)}`).test(t);
  if (negated(blunder) && !negated(brilliant)) return "brilliant";
  if (negated(brilliant) && !negated(blunder)) return "blunder";
  const saysBrilliant = brilliant.test(t) || /\s!!\s/.test(t);
  const saysBlunder = blunder.test(t) || /\s\?\?\s/.test(t);
  if (saysBrilliant === saysBlunder) return null;
  return saysBrilliant ? "brilliant" : "blunder";
};

/** Same comment → same reply; different comments get different ones. */
const pick = (pool: string[], seed: string) => pool[[...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % pool.length];

const token = () => {
  const t = process.env.IG_ACCESS_TOKEN;
  if (!t) throw new Error("IG_ACCESS_TOKEN is not set");
  return t;
};

const ig = async (method: "GET" | "POST", pathname: string, params: Record<string, string> = {}) => {
  const url = new URL(`${IG_API}/${pathname}`);
  const body = new URLSearchParams({ ...params, access_token: token() });
  const res =
    method === "GET"
      ? await fetch(`${url}?${body}`)
      : await fetch(url, { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok || json.error) {
    const e = json.error ?? json;
    const hint = /permission|scope|OAuth/i.test(JSON.stringify(e))
      ? " (the token probably lacks instagram_business_manage_comments: regenerate it with comment permissions)"
      : "";
    throw new Error(`Instagram ${method} ${pathname} failed: ${JSON.stringify(e)}${hint}`);
  }
  return json;
};

type IgComment = { id: string; text?: string; username?: string; timestamp: string; replies?: { data: { username?: string }[] } };

const commentsOf = async (mediaId: string) => {
  const out: IgComment[] = [];
  let page = await ig("GET", `${mediaId}/comments`, { fields: "id,text,username,timestamp,replies{username}", limit: "50" });
  for (let i = 0; i < 10; i++) {
    out.push(...(page.data ?? []));
    const next = page.paging?.next as string | undefined;
    if (!next) break;
    const res = await fetch(next);
    page = await res.json();
    if (page.error) throw new Error(`Instagram comments paging failed: ${JSON.stringify(page.error)}`);
  }
  return out;
};

const main = async () => {
  const me = await ig("GET", "me", { fields: "user_id,username" });
  const myName = String(me.username);
  const quizzes = LESSONS.filter((l): l is Lesson & { answer: Answer } => l.kind === "quiz" && !!l.answer);
  const media = (await ig("GET", `${me.user_id}/media`, { fields: "id,caption,timestamp,comments_count,permalink", limit: "40" }))
    .data as { id: string; caption?: string; timestamp: string; comments_count?: number; permalink: string }[];

  if (DRY_RUN && media[0]) {
    // Permission check even before the first quiz is out: read the comments of the newest post.
    const c = await commentsOf(media[0].id);
    console.log(`✓ Comment access OK as @${myName}: newest post has ${c.length} readable comments`);
  }

  const cutoff = Date.now() - MAX_AGE_DAYS * 86_400_000;
  const time = (iso: string) => new Date(iso.replace(/\+0000$/, "Z")).getTime();
  if (!PDF_URL) console.log("FREE_PDF_URL is not set: PDF DMs are off.");
  let replied = 0;
  for (const m of media) {
    const quiz = quizzes.find((q) => m.caption?.includes(marker(q)));
    if ((!quiz && !PDF_URL) || time(m.timestamp) < cutoff || !m.comments_count) continue;
    const comments = await commentsOf(m.id);
    console.log(`${quiz ? `${quiz.title} (${quiz.answer})` : "Reel"}: ${comments.length} comments  ${m.permalink}`);
    for (const c of comments) {
      if (replied >= MAX_REPLIES) break;
      if (!c.text || c.username === myName) continue;
      if (c.replies?.data.some((r) => r.username === myName)) continue;
      // Free PDF: private DM first; the public reply also marks the comment as handled.
      if (PDF_URL && wantsGuide(c.text) && Date.now() - time(c.timestamp) < DM_WINDOW_MS) {
        const reply = pick(PDF_PUBLIC, c.id);
        console.log(`  @${c.username}: "${c.text.slice(0, 60)}" → PDF DM + "${reply}"`);
        if (!DRY_RUN) {
          await ig("POST", `${me.user_id}/messages`, {
            recipient: JSON.stringify({ comment_id: c.id }),
            message: JSON.stringify({ text: pdfMessage() }),
          });
          await ig("POST", `${c.id}/replies`, { message: reply });
        }
        replied++;
        continue;
      }
      if (!quiz) continue;
      const answer = readAnswer(c.text);
      if (!answer) continue;
      const message = pick(answer === quiz.answer ? CORRECT : WRONG, c.id);
      console.log(`  @${c.username}: "${c.text.slice(0, 60)}" → ${answer} → ${message}`);
      if (!DRY_RUN) await ig("POST", `${c.id}/replies`, { message });
      replied++;
    }
  }
  console.log(`${DRY_RUN ? "Would reply" : "Replied"} to ${replied} comment(s).`);
};

if (process.argv[1] && path.resolve(process.argv[1]).endsWith(path.join("scripts", "reply-comments.ts"))) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
