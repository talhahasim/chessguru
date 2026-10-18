/**
 * Instagram performance report for the account (official Instagram API with Instagram Login).
 * Prints a table of recent posts and, on GitHub Actions, writes it to the job summary.
 *
 * Needs IG_ACCESS_TOKEN. Per-post insights (views, reach, shares, saves, watch time) need the
 * `instagram_business_manage_insights` permission on the token; without it only likes/comments are shown.
 *
 *   npx tsx scripts/stats.ts            # last 30 posts
 *   LIMIT=60 npx tsx scripts/stats.ts
 */
import fs from "node:fs";
import { LESSONS } from "../src/lessons/index.ts";
import { buildTimeline, FPS } from "../src/lib/timeline.ts";
import { BAND_LABEL } from "../src/theme.ts";

/** Video length (s) of a post, from the lesson in its caption, as the CURRENT code renders it. */
const lengthOf = (caption = "") => {
  const lesson = LESSONS.find((l) => caption.includes(`♟ ${l.title} | ${BAND_LABEL[l.band]} Elo`));
  return lesson ? buildTimeline(lesson).duration / FPS : undefined;
};

const API = `https://graph.instagram.com/${process.env.IG_API_VERSION ?? "v23.0"}`;
const token = process.env.IG_ACCESS_TOKEN;
if (!token) {
  console.error("IG_ACCESS_TOKEN is not set");
  process.exit(1);
}

const get = async (path: string, params: Record<string, string> = {}) => {
  const res = await fetch(`${API}/${path}?${new URLSearchParams({ ...params, access_token: token })}`);
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok || json.error) throw new Error(json.error?.message ?? `HTTP ${res.status}`);
  return json;
};

const REEL_METRICS = ["views", "reach", "likes", "comments", "shares", "saved", "total_interactions", "ig_reels_avg_watch_time"];

const insightsFor = async (id: string): Promise<Record<string, number> | string> => {
  try {
    const res = await get(`${id}/insights`, { metric: REEL_METRICS.join(",") });
    const out: Record<string, number> = {};
    for (const m of res.data ?? []) out[m.name] = m.values?.[0]?.value ?? m.total_value?.value ?? 0;
    return out;
  } catch (e) {
    return (e as Error).message;
  }
};

const title = (caption = "") => /♟ (.+?) \|/.exec(caption)?.[1] ?? caption.split("\n")[0].slice(0, 40);

const main = async () => {
  const me = await get("me", { fields: "username,followers_count,follows_count,media_count" });
  const media = await get("me/media", {
    fields: "id,caption,timestamp,permalink,media_type,media_product_type,like_count,comments_count",
    limit: process.env.LIMIT ?? "30",
  });

  const rows: string[][] = [];
  let insightsError: string | null = null;
  for (const m of media.data ?? []) {
    const ins = await insightsFor(m.id);
    if (typeof ins === "string") insightsError ??= ins;
    const i = typeof ins === "string" ? {} : ins;
    const n = (v: number | undefined) => (v === undefined ? "–" : String(v));
    const views = i.views;
    const engagement = views ? `${(((i.total_interactions ?? 0) / views) * 100).toFixed(1)}%` : "–";
    const len = lengthOf(m.caption);
    const watchPct =
      len && i.ig_reels_avg_watch_time !== undefined ? `${Math.round((i.ig_reels_avg_watch_time / 1000 / len) * 100)}%` : "–";
    rows.push([
      m.timestamp.slice(0, 16).replace("T", " "),
      title(m.caption),
      n(views),
      n(i.reach),
      n(i.likes ?? m.like_count),
      n(i.comments ?? m.comments_count),
      n(i.shares),
      n(i.saved),
      i.ig_reels_avg_watch_time !== undefined ? `${(i.ig_reels_avg_watch_time / 1000).toFixed(1)}s` : "–",
      len ? `${len.toFixed(0)}s` : "–",
      watchPct,
      engagement,
    ]);
  }

  const header = ["Posted (UTC)", "Video", "Views", "Reach", "Likes", "Comments", "Shares", "Saves", "Avg watch", "Length*", "Watch %", "Engagement"];
  const md = [
    `### @${me.username}: ${me.followers_count} followers · ${me.follows_count} following · ${me.media_count} posts`,
    "",
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
    "",
    "*Length = how long the video is with the current code; older posts may have been longer (see docs/growth-log.md).",
    insightsError
      ? `> Per-post insights unavailable: ${insightsError}. Add the \`instagram_business_manage_insights\` permission to the token.`
      : "",
  ].join("\n");

  console.log(md);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
};

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
