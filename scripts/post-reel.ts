/**
 * Posts the next chess trap as an Instagram Reel (official Instagram API with Instagram Login).
 *
 *  1. Asks Instagram which lessons are already posted (by the "♟ <title>" line in recent captions),
 *     so no state is stored anywhere.
 *  2. Renders the next lesson (video + frame-0 cover).
 *  3. Uploads both to a public Supabase Storage bucket (Instagram needs a public URL).
 *  4. Creates the Reel container, waits until Instagram has fetched the video, publishes it.
 *  5. Deletes the files from Supabase Storage again.
 *
 * Env:
 *   IG_ACCESS_TOKEN            long-lived Instagram User access token (instagram_business_content_publish)
 *   IG_USER_ID                 optional, looked up from the token if missing
 *   SUPABASE_URL               https://<ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  service_role / secret key (server side only!)
 *   SUPABASE_BUCKET            optional, default "chessguru-reels"
 *   DRY_RUN=1                  render + print the caption, don't upload or post
 *   LESSON=<id>                force a specific lesson
 *
 *   npx tsx scripts/post-reel.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { BANDS, LESSONS, defenseOf } from "../src/lessons/index.ts";
import { HANDLE } from "../src/brand.ts";
import { BAND_LABEL } from "../src/theme.ts";
import type { Lesson } from "../src/types.ts";
import { renderLesson } from "./render-lib.ts";

const IG_API = `https://graph.instagram.com/${process.env.IG_API_VERSION ?? "v23.0"}`;
const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";
const BUCKET = process.env.SUPABASE_BUCKET || "chessguru-reels";

const HASHTAGS = [
  "#chess",
  "#chesstips",
  "#chesstraps",
  "#chesstactics",
  "#chessopenings",
  "#learnchess",
  "#chessforbeginners",
  "#chessreels",
  "#chesstok",
  "#chessgame",
];

/** Line that identifies a lesson in a caption; also used to detect what is already posted. */
const marker = (lesson: Lesson) => `♟ ${lesson.title} | ${BAND_LABEL[lesson.band]} Elo`;

export const buildCaption = (lesson: Lesson) => {
  const plain = (s: string) => s.replace(/\*/g, "");
  const tag = `#${lesson.title.normalize("NFD").replace(/[^A-Za-z0-9]/g, "")}`;
  return [
    `${plain(lesson.hook[0])} ${plain(lesson.hook[1])}`,
    "",
    marker(lesson),
    "",
    ...lesson.takeaways.map((t) => `✅ ${plain(t)}`),
    "",
    lesson.kind === "defense" ? "Did you know this defense? YES or NO 👇" : "Have you ever fallen for this? YES or NO 👇",
    lesson.kind === "defense"
      ? "📩 Send this to a friend before they fall for it"
      : "📩 Send this to a friend who always falls for it",
    "",
    lesson.kind === "defense"
      ? `Follow @${HANDLE} for a new chess trap (and how to stop it) every day!`
      : defenseOf(lesson)
        ? `🛡 How to stop this trap: next reel. Follow @${HANDLE} so you don't miss it!`
        : `Follow @${HANDLE} for a new chess trap every day!`,
    "",
    [...HASHTAGS, tag].join(" "),
  ].join("\n");
};

/**
 * Posting order: traps rotate through the Elo bands (0-300, 300-600, 600-900, 900-1500, 0-300, …)
 * and each trap is followed by its defense video, so one day = a trap + how to stop it.
 */
export const postingOrder = (): Lesson[] => {
  const traps = BANDS.map((b) => LESSONS.filter((l) => l.band === b && l.kind !== "defense"));
  const out: Lesson[] = [];
  for (let i = 0; i < Math.max(...traps.map((l) => l.length)); i++)
    for (const list of traps) {
      const trap = list[i];
      if (!trap) continue;
      out.push(trap);
      const defense = defenseOf(trap);
      if (defense) out.push(defense);
    }
  // Defense videos without a matching trap still get posted, at the end.
  for (const l of LESSONS) if (!out.includes(l)) out.push(l);
  return out;
};

// ---------------------------------------------------------------------------
// Instagram API

const token = () => {
  const t = process.env.IG_ACCESS_TOKEN;
  if (!t) throw new Error("IG_ACCESS_TOKEN is not set");
  return t;
};

const ig = async (method: "GET" | "POST", pathname: string, params: Record<string, string> = {}) => {
  const url = new URL(`${IG_API}/${pathname}`);
  const body = new URLSearchParams({ ...params, access_token: token() });
  let res: Response;
  try {
    res =
      method === "GET"
        ? await fetch(`${url}?${body}`)
        : await fetch(url, { method: "POST", body, headers: { "Content-Type": "application/x-www-form-urlencoded" } });
  } catch (e) {
    throw new Error(`Could not reach the Instagram API at ${url.host}: ${(e as Error).cause ?? e}`);
  }
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok || json.error) throw new Error(`Instagram ${method} ${pathname} failed: ${JSON.stringify(json.error ?? json)}`);
  return json;
};

const igAccount = async () => {
  const me = await ig("GET", "me", { fields: "user_id,username" });
  return { id: String(me.user_id), username: String(me.username) };
};
const igUserId = async () => process.env.IG_USER_ID || (await igAccount()).id;

/** Supabase client with the public bucket created on first use. */
const storage = async () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  // Public bucket so Instagram can download the files.
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error && !/already exists/i.test(error.message)) throw new Error(`Supabase Storage: ${error.message}`);
  return supabase;
};

/** Dry-run check of the credentials: who the token belongs to, and that upload → public URL → delete works. */
const checkSetup = async (cover: string) => {
  if (process.env.IG_ACCESS_TOKEN) {
    const me = await igAccount();
    console.log(`✓ Instagram token OK: @${me.username} (user id ${me.id})`);
    if (process.env.IG_USER_ID && process.env.IG_USER_ID !== me.id)
      console.warn(`! IG_USER_ID (${process.env.IG_USER_ID}) differs from the token's account (${me.id})`);
  } else console.log("- IG_ACCESS_TOKEN not set, skipped Instagram check");

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = await storage();
    const name = `setup-check-${Date.now()}.jpg`;
    const { error } = await supabase.storage.from(BUCKET).upload(name, fs.readFileSync(cover), { contentType: "image/jpeg" });
    if (error) throw new Error(`Supabase upload failed: ${error.message}`);
    const url = supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
    const res = await fetch(url);
    await supabase.storage.from(BUCKET).remove([name]);
    if (!res.ok) throw new Error(`Uploaded file is not publicly reachable (${res.status}): ${url}`);
    console.log(`✓ Supabase Storage OK: upload, public URL and delete work (bucket "${BUCKET}")`);
  } else console.log("- Supabase secrets not set, skipped storage check");
};

/** Captions of the account's recent posts (enough to cover every lesson we have). */
/** Captions and timestamps of the account's recent posts (newest first). */
const recentPosts = async (userId: string) => {
  const posts: { caption: string; timestamp: string }[] = [];
  let after: string | undefined;
  for (let page = 0; page < 10; page++) {
    const res = await ig("GET", `${userId}/media`, { fields: "caption,timestamp", limit: "100", ...(after ? { after } : {}) });
    for (const m of res.data ?? []) posts.push({ caption: m.caption ?? "", timestamp: m.timestamp });
    after = res.paging?.cursors?.after;
    if (!res.paging?.next) break;
  }
  return posts;
};

/**
 * Minimum hours between two posts. The routine triggers posts on time; the GitHub schedule is only a
 * late fallback, and this guard stops it from posting a second time in the same slot.
 */
const MIN_GAP_HOURS = Number(process.env.MIN_GAP_HOURS ?? 5);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const publishReel = async (userId: string, videoUrl: string, coverUrl: string, caption: string) => {
  const container = await ig("POST", `${userId}/media`, {
    media_type: "REELS",
    video_url: videoUrl,
    cover_url: coverUrl,
    caption,
    share_to_feed: "true",
  });
  console.log(`Container ${container.id} created, waiting for Instagram to process the video…`);
  for (let i = 0; i < 60; i++) {
    await sleep(10_000);
    const s = await ig("GET", container.id, { fields: "status_code,status" });
    if (s.status_code === "FINISHED") break;
    if (s.status_code === "ERROR" || s.status_code === "EXPIRED") throw new Error(`Instagram could not process the video: ${s.status}`);
    if (i === 59) throw new Error("Timed out waiting for Instagram to process the video");
  }
  const published = await ig("POST", `${userId}/media_publish`, { creation_id: container.id });
  const info = await ig("GET", published.id, { fields: "permalink" });
  return info.permalink as string;
};

// ---------------------------------------------------------------------------

const main = async () => {
  const forced = process.env.LESSON;
  let userId = "";
  let lesson: Lesson | undefined;

  if (forced) {
    lesson = LESSONS.find((l) => l.id === forced);
    if (!lesson) throw new Error(`Unknown lesson ${forced}`);
  } else if (DRY_RUN && !process.env.IG_ACCESS_TOKEN) {
    lesson = postingOrder()[0];
  } else {
    userId = await igUserId();
    const posts = await recentPosts(userId);
    const newest = posts[0] ? new Date(posts[0].timestamp.replace(/\+0000$/, "Z")) : null;
    const hoursAgo = newest ? (Date.now() - newest.getTime()) / 3_600_000 : Infinity;
    if (!DRY_RUN && hoursAgo < MIN_GAP_HOURS) {
      console.log(`Last post was ${hoursAgo.toFixed(1)} h ago (< ${MIN_GAP_HOURS} h): this slot is already done, skipping.`);
      return;
    }
    const captions = posts.map((p) => p.caption);
    lesson = postingOrder().find((l) => !captions.some((c) => c.includes(marker(l))));
    if (!lesson) {
      // Fail loudly so GitHub emails the owner: time to add new lessons.
      throw new Error(`All ${LESSONS.length} lessons are already posted. Add new lessons in src/lessons/.`);
    }
  }

  console.log(`Next lesson: ${lesson.id} (${lesson.band})`);
  const caption = buildCaption(lesson);
  const { video, cover } = await renderLesson(lesson);

  if (DRY_RUN) {
    console.log(`\n--- DRY RUN: not posting ---\n${caption}\n`);
    await checkSetup(cover);
    return;
  }

  const supabase = await storage();

  const stamp = Date.now();
  const files = [
    { local: video, remote: `${lesson.id}-${stamp}.mp4`, type: "video/mp4" },
    { local: cover, remote: `${lesson.id}-${stamp}-cover.jpg`, type: "image/jpeg" },
  ];
  try {
    for (const f of files) {
      const { error } = await supabase.storage.from(BUCKET).upload(f.remote, fs.readFileSync(f.local), { contentType: f.type, upsert: true });
      if (error) throw error;
    }
    const publicUrl = (name: string) => supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
    const permalink = await publishReel(userId || (await igUserId()), publicUrl(files[0].remote), publicUrl(files[1].remote), caption);
    console.log(`✓ Posted ${lesson.id}: ${permalink}`);
  } finally {
    // Instagram keeps its own copy once the container is processed; nothing stays in storage.
    const { error } = await supabase.storage.from(BUCKET).remove(files.map((f) => f.remote));
    if (error) console.warn(`Could not delete files from storage: ${error.message}`);
    else console.log(`Removed ${files.length} files from storage bucket "${BUCKET}"`);
  }
};

if (process.argv[1] && path.resolve(process.argv[1]).endsWith(path.join("scripts", "post-reel.ts"))) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
