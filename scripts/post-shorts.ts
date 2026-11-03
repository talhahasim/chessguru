/**
 * Re-posts the Reels to YouTube Shorts (official YouTube Data API v3, OAuth refresh token), oldest first.
 *
 * - Which videos: the lessons already posted on Instagram, in the order they went out there.
 * - "Already uploaded" = the `♟ <title> | <band> Elo` marker in the description of a video on the channel
 *   (same idea as the Instagram side, no database).
 * - Videos are rendered like for Instagram (or taken from prerendered/); vertical and < 60 s, so YouTube
 *   files them as Shorts. #Shorts is in the title and description too.
 *
 * Env:
 *   YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN   OAuth client + refresh token (scopes youtube.upload, youtube.readonly)
 *   IG_ACCESS_TOKEN                                    to read which Reels were posted, and in which order
 *   MAX_UPLOADS=1                                      per run (an upload costs ~1600 of the 10 000 daily quota units)
 *   DRY_RUN=1                                          check the keys, print the next video, upload nothing
 *
 *   npx tsx scripts/post-shorts.ts
 */
import fs from "node:fs";
import path from "node:path";
import { LESSONS } from "../src/lessons/index.ts";
import type { Lesson } from "../src/types.ts";
import { marker } from "./marker.ts";
import { HASHTAGS, PRERENDERED, igUserId, recentPosts } from "./post-reel.ts";
import { renderLesson } from "./render-lib.ts";

const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
const MAX_UPLOADS = Number(process.env.MAX_UPLOADS ?? 1);
const YT = "https://www.googleapis.com/youtube/v3";

const accessToken = async () => {
  const missing = ["YT_CLIENT_ID", "YT_CLIENT_SECRET", "YT_REFRESH_TOKEN"].filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Missing secret(s): ${missing.join(", ")} (Settings → Secrets and variables → Actions)`);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.YT_CLIENT_ID!,
      client_secret: process.env.YT_CLIENT_SECRET!,
      refresh_token: process.env.YT_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok) throw new Error(`Google OAuth refused the refresh token: ${JSON.stringify(json)}`);
  return json.access_token as string;
};

const yt = async (token: string, pathname: string, params: Record<string, string>) => {
  const res = await fetch(`${YT}/${pathname}?${new URLSearchParams(params)}`, { headers: { Authorization: `Bearer ${token}` } });
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok) throw new Error(`YouTube ${pathname} failed: ${JSON.stringify(json.error ?? json)}`);
  return json;
};

/** Descriptions of every video already on the channel (uploads playlist). */
const channelVideos = async (token: string) => {
  const ch = await yt(token, "channels", { part: "snippet,contentDetails", mine: "true" });
  const channel = ch.items?.[0];
  if (!channel) throw new Error("This Google account has no YouTube channel (create one, then get a new refresh token).");
  const uploads = channel.contentDetails.relatedPlaylists.uploads as string;
  const descriptions: string[] = [];
  let pageToken: string | undefined;
  for (let i = 0; i < 20; i++) {
    const page = await yt(token, "playlistItems", { part: "snippet", playlistId: uploads, maxResults: "50", ...(pageToken ? { pageToken } : {}) });
    for (const it of page.items ?? []) descriptions.push(it.snippet?.description ?? "");
    pageToken = page.nextPageToken;
    if (!pageToken) break;
  }
  return { title: channel.snippet.title as string, descriptions };
};

const plain = (s: string) => s.replace(/\*/g, "");

const shortTitle = (lesson: Lesson) => {
  const hook = `${plain(lesson.hook[0])} ${plain(lesson.hook[1])}`.replace(/\.\.\.\s*\.\.\./g, "...").replace(/\s+/g, " ");
  const base = lesson.kind === "quiz" ? `${hook} ♟` : `${lesson.title}: ${hook}`;
  const suffix = " #Shorts";
  return (base.length + suffix.length > 100 ? base.slice(0, 100 - suffix.length - 1) + "…" : base) + suffix;
};

const shortDescription = (lesson: Lesson) => {
  const pre = PRERENDERED.find((p) => p.lesson.id === lesson.id);
  const lines =
    lesson.kind === "quiz"
      ? ["🤔 Brilliant (!!) or blunder (??)? Write your answer in the comments 👇", "📩 Send it to a friend and test them"]
      : [
          ...lesson.takeaways.map((t) => `✅ ${plain(t)}`),
          "",
          lesson.kind === "defense" ? "Did you know this defense? YES or NO 👇" : "Have you ever fallen for this? YES or NO 👇",
        ];
  return [
    `${plain(lesson.hook[0])} ${plain(lesson.hook[1])}`,
    "",
    ...lines,
    "",
    "Subscribe for a new chess trap or puzzle every day!",
    "",
    marker(lesson),
    "",
    ["#Shorts", ...HASHTAGS.filter((h) => h !== "#chessreels")].join(" "),
    ...(pre ? ["", pre.credit] : []),
  ].join("\n");
};

/** Resumable upload: metadata first, then the bytes. Returns the video id. */
const upload = async (token: string, file: string, lesson: Lesson) => {
  const meta = {
    snippet: { title: shortTitle(lesson), description: shortDescription(lesson), tags: ["chess", "chess traps", "chess puzzle", "shorts"], categoryId: "27" },
    status: { privacyStatus: "public", selfDeclaredMadeForKids: false },
  };
  const size = fs.statSync(file).size;
  const init = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Type": "video/mp4",
      "X-Upload-Content-Length": String(size),
    },
    body: JSON.stringify(meta),
  });
  const location = init.headers.get("location");
  if (!init.ok || !location) throw new Error(`YouTube upload init failed: ${init.status} ${await init.text()}`);
  const put = await fetch(location, { method: "PUT", headers: { "Content-Type": "video/mp4", "Content-Length": String(size) }, body: fs.readFileSync(file) });
  const json = (await put.json()) as Record<string, any>;
  if (!put.ok) throw new Error(`YouTube upload failed: ${JSON.stringify(json.error ?? json)}`);
  return json as { id: string; status?: { privacyStatus?: string; uploadStatus?: string } };
};

const main = async () => {
  const token = await accessToken();
  const channel = await channelVideos(token);
  console.log(`✓ YouTube OK: channel "${channel.title}", ${channel.descriptions.length} videos already on it`);

  // Lessons in the order they were posted on Instagram (oldest first).
  const posts = (await recentPosts(await igUserId())).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  const known = [...PRERENDERED.map((p) => p.lesson), ...LESSONS];
  const queue = posts
    .map((p) => known.find((l) => p.caption.includes(marker(l))))
    .filter((l): l is Lesson => !!l)
    .filter((l, i, all) => all.indexOf(l) === i)
    .filter((l) => !channel.descriptions.some((d) => d.includes(marker(l))));
  console.log(`${queue.length} Instagram Reels are not on YouTube yet.`);

  for (const lesson of queue.slice(0, MAX_UPLOADS)) {
    console.log(`\nNext: ${lesson.id}\nTitle: ${shortTitle(lesson)}\n--- description ---\n${shortDescription(lesson)}\n---`);
    if (DRY_RUN) continue;
    const pre = PRERENDERED.find((p) => p.lesson.id === lesson.id);
    const video = pre ? path.resolve(pre.video) : (await renderLesson(lesson)).video;
    const res = await upload(token, video, lesson);
    console.log(`✓ Uploaded ${lesson.id}: https://youtube.com/shorts/${res.id} (${res.status?.privacyStatus ?? "?"})`);
  }
};

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
