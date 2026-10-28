# ChessGuru – project rules

Remotion project that renders beginner chess trap videos (English, 1080x1920, chess.com-style green/white board,
Stockfish analysis). See README.md for commands.

## Communication

- Talk to the user in **Turkish**. All video content (hooks, captions, takeaways, banners) stays in **English**.

## Rule: frame 0 is the thumbnail (applies to EVERY video)

The first frame of every video must be a finished cover that can be used as the Instagram / TikTok / Shorts thumbnail.

- Frame 0 shows the complete hook: Elo pill + hook line 1 + the final (winning) position + hook line 2.
- Nothing may be invisible, half-faded or mid-animation on frame 0: no flash, no fade-in, no word-by-word pop-in,
  no spring starting from 0. Animations on the hook start from the finished state (e.g. a "punch" scale 1.12 → 1).
  Board markup in the hook (arrow, move badge, `#`/crown badges) uses `appearAt` < 0 so it is fully drawn.
- All hook text and the Elo pill stay inside the centre 3:4 area Instagram shows in the profile grid:
  **y 240–1680** on the 1080x1920 canvas. Layout constants live in `HOOK_LAYOUT` (`src/components/Scenes.tsx`).
- `npm run render` must keep writing `out/<band>/<lesson>-cover.jpg` (frame 0) next to each MP4.
- When adding or changing a lesson / layout, check the cover:
  `npx remotion still <composition-id> cover.png --frame=0` and look at it before rendering.

## Rule: every video has an English voiceover

- Narration = hook, every step's `say` (or `voice`), CTA (takeaways are shown on screen only, to keep the outro short)
  (`src/lib/narration.ts`). Audio is Kokoro TTS (free, local) via `npm run voice` → `public/voice/` + `src/data/voice.json`.
- Voice: **`af_heart`** at speed **1.1** (chosen by the user). Don't switch voices unless asked.
- The timeline stretches to the real clip lengths and caption words appear in sync with the speech.
- After changing ANY lesson text run `npm run voice`; `npm run validate` errors on missing/stale clips.
- Chess notation in text is spoken naturally by `spokenize` ("...Qe7" → "queen e7"); add respellings for hard
  names to `PRONUNCIATION`, or give a step a separate `voice` text.

## Branding

- Instagram account: **@checksmatedaily** (`src/brand.ts`). Every video shows a subtle watermark (small, ~40% opacity,
  under the caption area, inside the 3:4 grid crop) — keep it unobtrusive; captions say "Follow @checksmatedaily".

## Instagram automation

- `.github/workflows/post-reel.yml` posts 2 Reels/day via the official Instagram API (`scripts/post-reel.ts`).
- No database/tables: "already posted" is derived from the `♟ <title> | <band> Elo` line in recent IG captions
  (`marker()` — don't change its format or old posts get reposted). Supabase is used only as temporary public
  storage; files are deleted right after posting.
- Scheduled posting is ON; set the repo variable `POSTING_PAUSED=true` to pause it.
- Videos are encoded as yuv420p / BT.709 (`pixelFormat`, `colorSpace`); the yuvj420p default doesn't show on iPhones.
- Never use unofficial Instagram libraries / password login.

## Trap + defense pairs

- Every trap (`src/lessons/band-*.ts`) has a separate "how to stop it" video (`src/lessons/defenses.ts`,
  `kind: "defense"`, `defends: <trap id>`), shown from the side the trap is aimed at. Never put both in one video.
- Defense videos use the blue shield Elo pill and "THE DEFENSE" intro; their hero moves must be Stockfish best/excellent.
- Trap videos end with the CTA "How to defend it? Next video!" (+ voice "...Follow so you don't miss it!").
- Posting order = trap, then its defense (`postingOrder()` in `scripts/post-reel.ts`).
- No end banner ("CHECKMATE! / White wins"): after the last step the video goes straight to REMEMBER.

## "Brilliant or blunder?" quizzes

- `src/lessons/quizzes.ts`, `kind: "quiz"`: the last move is the question; `answer` must match Stockfish
  (`npm run validate`): a blunder must be classed blunder AND leave the mover ≤ 25% win chance; a brilliant must be
  the engine's best move, a real sacrifice (material can be won by a capture) AND the only way to win: the best
  other move (`quizAlt` in `analysis.json`, from `npm run analyze`) must be below +2 and not a mate. Never post a
  quiz whose move is merely "best" or "mistake" (the Opera Qb8+ quiz was dropped for this). The video NEVER reveals the answer: no eval bar, no move badges/chips, neutral yellow cover arrow,
  quiz outro ("WHAT DO YOU THINK? !! Brilliant / ?? Blunder – Comment your answer!"), no answer in the caption.
- `scripts/reply-comments.ts` (`reply-comments.yml`, hourly) replies under quiz Reels: correct answers get a ✅ reply,
  wrong ones a ❌ "not quite" reply (varied pools, never giving the answer away); comments with no clear answer
  are ignored. "Already replied" = one of the comment's replies is ours (no state stored).
- Posting order: from the 8th trap+defense pair on, one quiz follows each pair (`QUIZ_AFTER_PAIRS`).

## Free PDF via DM

- A comment containing "TRAPS" (the CTA keyword; "PDF" works too, singular "trap" doesn't) on any Reel gets the
  free guide link as an Instagram private reply (DM, one per comment, ≤ 7 days old), then a public "📩 Sent! Check your DMs" reply (`scripts/reply-comments.ts`). Off until the repo
  variable `FREE_PDF_URL` is set. The "Comment TRAPS → free PDF" CTA in trap/defense videos (outro line + voice) and
  captions is behind `GUIDE_CTA` (`src/brand.ts`, quizzes never get it): flip it to true only once the DM is tested,
  then `npm run voice` + validate.
- The free PDF is `guide/30-chess-traps.pdf` ("30 Chess Traps for 400–1000 Elo"): one page per trap with THE TRAP
  and THE DEFENSE (wrong move red, fix green). Data = the video lessons (`VIDEO_TRAPS`) + guide-only traps
  (`src/guide/traps.ts`). `npx tsx scripts/check-guide.ts` must pass (Stockfish), then `npm run guide`
  (diagrams = the `diagram` composition). Rebuild after changing any of those lessons.

## Retention & engagement (from the first stats: 13 s average watch on a 48 s video)

- No title card after the hook; opening moves play fast (`T.move`, `T.quickGap`); target length 20–30 s.
- The key moment (brilliant move / the mistake / mate) must land by **~12 s**: viewers leave at ~15 s on average.
  Group setup moves into one step with one short line instead of narrating every move.
- Trap videos also pop a yellow "Send this to a friend who falls for it" sticker (screen only) right after the key
  moment (`SendNudge`); it briefly takes the watermark's place.
- Every video ends with a "Send this to a friend…" ask (screen + voice) before FOLLOW; captions ask a
  YES/NO question and for a DM share. Instagram reportedly weighs watch time, likes/reach and sends/reach most.

## Pre-post review loop (also triggers the post)

- A Routine runs at **15:35 and 22:35 UTC**: fetch stats via `stats.yml`, diagnose, apply AT MOST ONE small improvement
  to upcoming lessons (only with meaningful data; one variable at a time), validate, push, prepend a Turkish entry to
  `docs/growth-log.md`, then **dispatch `post-reel.yml` with `dry_run=false`** so the Reel goes out right after the
  review (~16:00 / ~23:00 UTC = 19:00 / 02:00 Turkey). Read the growth log before changing anything.
- The GitHub cron in `post-reel.yml` (18:17 / 01:17 UTC) is only a fallback; `post-reel.ts` skips when the last post is
  < `MIN_GAP_HOURS` old (9 h for these cron runs, 5 h for dispatches), so a late cron never adds a third daily post.

## Other conventions

- Lessons live in `src/lessons/band-*.ts`; keep captions short, very simple English, `*stars*` for emphasis.
- After changing moves run `npm run analyze` then `npm run validate` (must report 0 errors).
- Move badges come from Stockfish; only add `badge` overrides for human judgement (brilliant/great) and keep them honest.
- Square colours: a1 is dark, h1 is light ("light on the right"), a8 light: `isLight` in `Board.tsx`.
- Board coordinates always sit on White's side (letters next to the 1st rank, numbers next to the a-file), also
  when Black is at the bottom (then letters run along the top edge, numbers down the right edge). `Board.tsx`.
- Don't use chess.com logos, names or their proprietary piece/board art in the videos.
- Piece sounds (move, capture, check, castle, mate) are only the real wooden recordings in `public/sfx` (see
  `SOURCES.md`), never synthesized: the owner finds generated piece sounds artificial. The generated UI sounds
  (whoosh, pop, impact from `scripts/gen-sfx.ts`) stay. Never copy chess.com's sound files.
