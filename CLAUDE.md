# ChessGuru – project rules

Remotion project that renders beginner chess trap videos (English, 1080x1920, chess.com-style green/white board,
Stockfish analysis). See README.md for commands.

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

## Other conventions

- Lessons live in `src/lessons/band-*.ts`; keep captions short, very simple English, `*stars*` for emphasis.
- After changing moves run `npm run analyze` then `npm run validate` (must report 0 errors).
- Move badges come from Stockfish; only add `badge` overrides for human judgement (brilliant/great) and keep them honest.
- Don't use chess.com logos, names or their proprietary piece/board art in the videos.
