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
import { BANDS, LESSONS } from "../src/lessons/index.ts";
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
    "Follow for a new chess trap every day!",
    "",
    [...HASHTAGS, tag].join(" "),
  ].join("\n");
};

/** Posting order: rotate through the Elo bands (0-300, 300-600, 600-900, 900-1500, 0-300, …). */
export const postingOrder = (): Lesson[] => {
  const perBand = BANDS.map((b) => LESSONS.filter((l) => l.band === b));
  const out: Lesson[] = [];
  for (let i = 0; i < Math.max(...perBand.map((l) => l.length)); i++) for (const list of perBand) if (list[i]) out.push(list[i]);
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

const igUserId = async () => process.env.IG_USER_ID || (await ig("GET", "me", { fields: "user_id,username" })).user_id;

/** Captions of the account's recent posts (enough to cover every lesson we have). */
const recentCaptions = async (userId: string) => {
  const captions: string[] = [];
  let after: string | undefined;
  for (let page = 0; page < 10; page++) {
    const res = await ig("GET", `${userId}/media`, { fields: "caption", limit: "100", ...(after ? { after } : {}) });
    for (const m of res.data ?? []) if (m.caption) captions.push(m.caption);
    after = res.paging?.cursors?.after;
    if (!res.paging?.next) break;
  }
  return captions;
};

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
    const captions = await recentCaptions(userId);
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
    console.log(`\n--- DRY RUN: not uploading or posting ---\n${caption}\n`);
    return;
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Public bucket so Instagram can download the files; created on first use.
  const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (bucketError && !/already exists/i.test(bucketError.message)) throw bucketError;

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
