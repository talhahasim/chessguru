# @checksmatedaily — Instagram Reel stats (analysis dataset)

Snapshot: **2026-11-16 15:37 UTC** (Instagram Graph API via `stats.yml` / `scripts/stats.ts`). Account: **36 followers**, 56 posts at snapshot time. One row per Reel, oldest first. The 3 earliest posts (before 19 Oct) and the newest post (#31, 16 Nov 15:38, no data yet) are not included.

Content: English beginner chess Reels (1080x1920, 2D chess board video with Kokoro TTS voiceover; two 3D experiments). Formats: **trap** (a trap plays out), **defense** (how to stop the trap, posted right after it), **quiz** = "Brilliant or Blunder?" (the last move is the question, answer never shown; viewers answer in comments).

## Columns

| column | meaning |
| --- | --- |
| posted_utc | post time (UTC). Turkey = UTC+3 |
| kind / format | trap, defense, quiz / 2D or 3D |
| quiz_no, lesson_id, answer, opening | quiz number in the title, internal lesson id, correct answer (Stockfish-checked), opening / trap name |
| views, reach | plays, unique accounts reached (lifetime at snapshot) |
| likes, comments, shares, saves | lifetime totals |
| avg_watch_s | average watch time per play (seconds) |
| length_s | video length **with the current code** — older trap/defense videos were longer when posted (first trap ~48 s, later ~22–41 s) |
| watch_pct | avg_watch_s / length_s as reported by the stats tool (**unreliable for old trap/defense rows** because of length_s) |
| *_per_1k_reach, engagement_pct | derived: per 1000 reached accounts; (likes+comments+shares+saves)/reach |
| elo_on_screen | an Elo band pill ("0–300 ELO") and player ratings were on screen until quiz #9; removed from #10 on |
| hashtags | caption hashtag count: 12 identical tags until #21, 4 tags from #22 (reach-collapse fix) |
| posted_by | routine = scheduled review session dispatch (~15:40 / ~22:40 UTC); fallback-cron = GitHub schedule backup |
| suppressed | reach < 500 (Instagram barely distributed the post) |

## Timeline of changes (for before/after analysis)

- 19–31 Oct: trap + defense pairs (2 posts/day). Retention fixes along the way (no title card, faster setup moves, key moment by ~12 s).
- 24 Oct: first quiz (#1); from 26 Oct quizzes interleave; from 1 Nov almost only quizzes.
- 2 Nov 22:43: Elo band + player ratings removed from the screen (first: quiz #10).
- 2 Nov 07:43: quiz #8 posted at an off-slot time by a late fallback cron (morning post).
- 3 Nov 15:40: first 3D video (Légal's Mate 3D, own narration).
- 8–9 Nov: reach collapse (#19 4 reach, #20 328, #21 125) with the same 12-hashtag caption block on every post.
- 9 Nov 22:40: captions cut to 4 hashtags (#22 onward) → reach back to ~1000–1250.
- 10 Nov 22:38: 3D quiz #1 = re-run of the already-posted Caro-Kann quiz with identical voice → 119 reach (likely duplicate-content suppression).
- 11–13 Nov: review session offline, several slots missed; 13 Nov: 4 fallback crons added.
- 12 Nov 22:39: #25 suppressed again (115 reach) despite 4 hashtags — cause unknown (intermittent).
- From 14 Nov: new quizzes chosen from simpler / well-known opening positions.

## Aggregates (computed from the rows below)

| group | n | median reach | mean reach | mean watch % | mean avg watch s | likes /1k reach | comments /1k reach | saves /1k reach | engagement % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| All posts | 52 | 1111.0 | 1004.8 | 58.0 | 10.5 | 10.2 | 3.2 | 2.7 | 1.7 |
| All non-suppressed | 45 | 1117.0 | 1131.7 | 60.6 | 11.0 | 11.1 | 3.2 | 3.1 | 1.8 |
| Trap videos | 10 | 1148.0 | 1193.7 | 44.1 | 11.8 | 14.1 | 0.2 | 8.0 | 2.4 |
| Defense videos | 10 | 1091.5 | 910.1 | 44.6 | 11.2 | 10.7 | 0.4 | 3.1 | 1.5 |
| Quiz 2D (non-suppressed) | 26 | 1114.5 | 1134.9 | 72.1 | 10.4 | 8.8 | 5.4 | 0.3 | 1.5 |
| Quiz answer = brilliant (non-supp.) | 10 | 1136.0 | 1160.4 | 75.6 | 10.8 | 9.9 | 4.9 | 0.5 | 1.6 |
| Quiz answer = blunder (non-supp.) | 16 | 1111.0 | 1119.0 | 70.1 | 10.2 | 8.1 | 5.7 | 0.2 | 1.4 |
| 3D videos | 2 | 564.5 | 564.5 | 46.0 | 8.8 | 25.0 | 8.4 | 11.4 | 4.7 |
| Quiz, Elo on screen (≤ #9) | 9 | 1117.0 | 1162.3 | 73.8 | 10.6 | 9.8 | 6.9 | 0.5 | 1.8 |
| Quiz, no Elo (≥ #10, non-supp.) | 17 | 1110.0 | 1120.4 | 71.3 | 10.4 | 8.3 | 4.6 | 0.3 | 1.3 |
| 12 hashtags era (≤ 9 Nov 15:39) | 42 | 1114.5 | 1026.5 | 56.4 | 10.8 | 11.1 | 2.8 | 3.3 | 1.8 |
| 4 hashtags era (≥ 9 Nov 22:40) | 10 | 1093.5 | 913.5 | 64.4 | 9.2 | 6.5 | 5.0 | 0.3 | 1.2 |
| Posted ~15–17 UTC | 19 | 1110.0 | 1135.1 | 57.8 | 10.7 | 12.1 | 2.6 | 4.1 | 2.0 |
| Posted ~22–01 UTC | 25 | 1131.0 | 1129.7 | 62.3 | 11.2 | 10.4 | 3.7 | 2.4 | 1.7 |

Notes: watch % for trap/defense groups is understated (lengths were longer at post time). Brilliant-answer group includes the dropped Opera quiz #2 (answer marked brilliant*, not truly brilliant per Stockfish).

## Observations so far (from the growth log)

- Quizzes (13–16 s) get the best watch % (65–86 %) and more comments than traps; traps get more saves/shares.
- Simple, well-known opening positions watch better (Vienna 80 %, French 77 %) than crowded middlegame positions (Tarrasch 59 %) or less-known openings (Owen 62 %).
- Brilliant-answer quizzes tend to get more likes (Réti 21, Traxler 18, Lasker 16).
- Well-known named traps get more comments (Elephant 15, Lasker 11, Fool's 11).
- 3D Légal's Mate: slow start but best engagement ever (likes 4.2 %, saves 2.3 % of reach, 5.6 % total).
- Reach is capped around 1000–1350 per Reel; followers grow slowly (30 → 36 in ~2 weeks).

## Data (markdown table)

| posted_utc | title | kind | format | answer | opening | views | reach | likes | comments | shares | saves | avg_watch_s | length_s | watch_pct | engagement_pct | elo_on_screen | hashtags | posted_by | suppressed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-19 22:23 | Englund Gambit Trap | trap | 2D |  | Englund Gambit Trap | 1526 | 1264 | 32 | 0 | 3 | 23 | 14.4 | 41 | 35 | 4.59 | yes | 12 | routine | no |
| 2026-10-20 15:44 | Beat the Englund Gambit | defense | 2D |  | Englund Gambit | 1383 | 1085 | 11 | 0 | 0 | 12 | 12.3 | 26 | 47 | 2.12 | yes | 12 | routine | no |
| 2026-10-20 22:38 | Lasker Trap | trap | 2D |  | Lasker Trap | 1452 | 1119 | 15 | 0 | 0 | 8 | 13.8 | 30 | 47 | 2.06 | yes | 12 | routine | no |
| 2026-10-21 15:38 | Dodge the Lasker Trap | defense | 2D |  | Lasker Trap | 352 | 285 | 4 | 0 | 0 | 0 | 9.3 | 24 | 39 | 1.4 | yes | 12 | routine | yes |
| 2026-10-21 22:38 | Fool's Mate | trap | 2D |  | Fool's Mate | 1563 | 1269 | 10 | 2 | 1 | 3 | 10.4 | 21 | 51 | 1.26 | yes | 12 | routine | no |
| 2026-10-22 15:39 | Avoid Fool's Mate | defense | 2D |  | Fool's Mate | 404 | 346 | 2 | 0 | 1 | 1 | 7.8 | 24 | 32 | 1.16 | yes | 12 | routine | yes |
| 2026-10-22 22:38 | Blackburne Shilling Trap | trap | 2D |  | Blackburne Shilling Trap | 1621 | 1324 | 20 | 0 | 8 | 15 | 11.8 | 27 | 43 | 3.25 | yes | 12 | routine | no |
| 2026-10-23 15:39 | Beat the Blackburne Trap | defense | 2D |  | Blackburne Trap | 1357 | 1098 | 12 | 0 | 1 | 4 | 8.5 | 22 | 38 | 1.55 | yes | 12 | routine | no |
| 2026-10-23 22:38 | Elephant Trap | trap | 2D |  | Elephant Trap | 1397 | 1163 | 18 | 0 | 0 | 4 | 10.8 | 27 | 40 | 1.89 | yes | 12 | routine | no |
| 2026-10-24 15:39 | Dodge the Elephant Trap | defense | 2D |  | Elephant Trap | 1495 | 1141 | 14 | 2 | 1 | 3 | 10.9 | 25 | 44 | 1.75 | yes | 12 | routine | no |
| 2026-10-24 22:38 | Brilliant or Blunder #1 | quiz | 2D | blunder | Scholar's Mate | 1702 | 1159 | 17 | 10 | 0 | 0 | 10.5 | 15 | 68 | 2.33 | yes | 12 | routine | no |
| 2026-10-25 15:40 | Fishing Pole Trap | trap | 2D |  | Fishing Pole Trap | 1654 | 1326 | 19 | 1 | 4 | 16 | 12.8 | 27 | 48 | 3.02 | yes | 12 | routine | no |
| 2026-10-25 22:39 | Dodge the Fishing Pole | defense | 2D |  | Fishing Pole | 1379 | 1115 | 10 | 1 | 0 | 1 | 10.1 | 23 | 44 | 1.08 | yes | 12 | routine | no |
| 2026-10-26 15:40 | Brilliant or Blunder #2 | quiz | 2D | brilliant* | Opera Game | 1527 | 1096 | 3 | 4 | 0 | 0 | 8.2 |  |  | 0.64 | yes | 12 | routine | no |
| 2026-10-26 22:40 | Back Rank Mate | trap | 2D |  | Back Rank Mate | 1335 | 1101 | 7 | 0 | 3 | 0 | 12.5 | 22 | 57 | 0.91 | yes | 12 | routine | no |
| 2026-10-27 15:47 | Stop Back Rank Mate | defense | 2D |  | Back Rank Mate | 1549 | 1145 | 17 | 1 | 0 | 2 | 13.3 | 24 | 55 | 1.75 | yes | 12 | routine | no |
| 2026-10-27 22:39 | Brilliant or Blunder #3 | quiz | 2D | blunder | Noah's Ark (Ruy Lopez) | 1632 | 1112 | 6 | 6 | 0 | 1 | 9.8 | 14 | 70 | 1.17 | yes | 12 | routine | no |
| 2026-10-28 15:41 | Stafford Gambit Trap | trap | 2D |  | Stafford Gambit Trap | 1361 | 1124 | 20 | 0 | 0 | 12 | 8.9 | 25 | 35 | 2.85 | yes | 12 | routine | no |
| 2026-10-28 22:39 | Beat the Stafford Gambit | defense | 2D |  | Stafford Gambit | 1455 | 1100 | 10 | 0 | 0 | 2 | 14.5 | 26 | 55 | 1.09 | yes | 12 | routine | no |
| 2026-10-29 15:45 | Brilliant or Blunder #4 | quiz | 2D | brilliant | Réti vs Tartakower (Caro-Kann) | 2008 | 1351 | 21 | 8 | 0 | 0 | 10.9 | 14 | 77 | 2.15 | yes | 12 | routine | no |
| 2026-10-29 22:39 | Kieninger Trap | trap | 2D |  | Kieninger Trap | 1329 | 1133 | 15 | 0 | 4 | 9 | 11.7 | 29 | 40 | 2.47 | yes | 12 | routine | no |
| 2026-10-30 16:25 | Dodge the Kieninger Trap | defense | 2D |  | Kieninger Trap | 1318 | 1073 | 13 | 0 | 2 | 2 | 12.2 | 27 | 46 | 1.58 | yes | 12 | routine | no |
| 2026-10-30 22:39 | Brilliant or Blunder #5 | quiz | 2D | blunder | Englund Gambit | 1875 | 1202 | 11 | 9 | 0 | 0 | 11.8 | 15 | 78 | 1.66 | yes | 12 | routine | no |
| 2026-10-31 15:39 | Siberian Trap | trap | 2D |  | Siberian Trap | 1338 | 1114 | 13 | 0 | 3 | 8 | 11.3 | 25 | 45 | 2.15 | yes | 12 | routine | no |
| 2026-10-31 22:38 | Dodge the Siberian Trap | defense | 2D |  | Siberian Trap | 935 | 713 | 6 | 0 | 0 | 3 | 12.6 | 28 | 46 | 1.26 | yes | 12 | routine | no |
| 2026-11-01 15:39 | Brilliant or Blunder #6 | quiz | 2D | brilliant | Légal's Mate | 1696 | 1110 | 7 | 5 | 5 | 3 | 10.3 | 15 | 70 | 1.8 | yes | 12 | routine | no |
| 2026-11-01 22:39 | Brilliant or Blunder #7 | quiz | 2D | blunder | Elephant Trap (QGD) | 1695 | 1085 | 15 | 15 | 0 | 0 | 10.7 | 13 | 80 | 2.76 | yes | 12 | routine | no |
| 2026-11-02 07:43 | Brilliant or Blunder #8 | quiz | 2D | brilliant | Fried Liver | 1635 | 1117 | 9 | 5 | 0 | 1 | 10.8 | 16 | 67 | 1.34 | yes | 12 | fallback-cron | no |
| 2026-11-02 16:43 | Brilliant or Blunder #9 | quiz | 2D | blunder | Blackburne Shilling | 1956 | 1229 | 15 | 10 | 0 | 0 | 12.1 | 15 | 80 | 2.03 | yes | 12 | routine | no |
| 2026-11-02 22:43 | Brilliant or Blunder #10 | quiz | 2D | brilliant | Lasker Trap (Albin) | 1900 | 1196 | 16 | 11 | 0 | 0 | 13.5 | 16 | 86 | 2.26 | no | 12 | routine | no |
| 2026-11-03 15:40 | Légal's Mate 3D | trap | 3D |  | Légal's Mate | 1291 | 1010 | 42 | 0 | 5 | 23 | 11.3 | 24 | 47 | 6.93 | no | 12 | routine | no |
| 2026-11-03 22:40 | Brilliant or Blunder #11 | quiz | 2D | blunder | Fool's Mate | 1519 | 1031 | 7 | 11 | 1 | 0 | 9.0 | 14 | 65 | 1.84 | no | 12 | routine | no |
| 2026-11-04 15:39 | Brilliant or Blunder #12 | quiz | 2D | brilliant | Siberian Trap | 1601 | 1067 | 12 | 4 | 0 | 1 | 10.7 | 14 | 74 | 1.59 | no | 12 | routine | no |
| 2026-11-04 22:40 | Brilliant or Blunder #13 | quiz | 2D | blunder | Petrov | 1522 | 1051 | 3 | 3 | 0 | 0 | 10.9 | 15 | 72 | 0.57 | no | 12 | routine | no |
| 2026-11-05 22:40 | Brilliant or Blunder #14 | quiz | 2D | brilliant | Magnus trick (Accel. Dragon) | 1690 | 1155 | 11 | 2 | 2 | 0 | 10.5 | 15 | 72 | 1.3 | no | 12 | routine | no |
| 2026-11-06 15:38 | Brilliant or Blunder #15 | quiz | 2D | blunder | Fishing Pole | 1607 | 1110 | 10 | 6 | 0 | 0 | 10.3 | 15 | 67 | 1.44 | no | 12 | routine | no |
| 2026-11-06 22:38 | Brilliant or Blunder #16 | quiz | 2D | brilliant | Traxler | 1777 | 1157 | 18 | 4 | 0 | 0 | 10.9 | 14 | 78 | 1.9 | no | 12 | routine | no |
| 2026-11-07 15:37 | Brilliant or Blunder #17 | quiz | 2D | blunder | Stafford Gambit | 1584 | 1126 | 12 | 3 | 0 | 0 | 9.5 | 16 | 60 | 1.33 | no | 12 | routine | no |
| 2026-11-07 22:39 | Brilliant or Blunder #18 | quiz | 2D | brilliant | Halosar Trap (BDG) | 1976 | 1253 | 7 | 6 | 0 | 1 | 11.8 | 15 | 81 | 1.12 | no | 12 | routine | no |
| 2026-11-08 15:38 | Brilliant or Blunder #19 | quiz | 2D | blunder | Lasker Trap (Albin) | 8 | 4 | 0 | 0 | 0 | 0 | 3.2 | 15 | 21 | 0.0 | no | 12 | routine | yes |
| 2026-11-08 22:39 | Brilliant or Blunder #20 | quiz | 2D | blunder | Kieninger (Budapest) | 442 | 328 | 2 | 1 | 0 | 0 | 8.8 | 15 | 59 | 0.91 | no | 12 | routine | yes |
| 2026-11-09 15:39 | Brilliant or Blunder #21 | quiz | 2D | blunder | Caro-Kann smothered mate | 173 | 125 | 0 | 0 | 0 | 0 | 7.6 | 14 | 53 | 0.0 | no | 12 | routine | yes |
| 2026-11-09 22:40 | Brilliant or Blunder #22 | quiz | 2D | blunder | Queen's Gambit Accepted | 1445 | 1004 | 5 | 2 | 0 | 1 | 9.4 | 14 | 68 | 0.8 | no | 4 | routine | no |
| 2026-11-10 15:39 | Brilliant or Blunder #23 | quiz | 2D | blunder | From's Gambit | 1504 | 1039 | 6 | 5 | 0 | 0 | 10.3 | 15 | 69 | 1.06 | no | 4 | routine | no |
| 2026-11-10 22:38 | Brilliant or Blunder 3D #1 | quiz | 3D | blunder | Caro-Kann smothered mate (re-run of #21) | 150 | 119 | 1 | 2 | 0 | 0 | 6.2 | 13.7 | 45 | 2.52 | no | 4 | routine | yes |
| 2026-11-12 00:44 | Brilliant or Blunder #24 | quiz | 2D | brilliant | Damiano Defence | 1671 | 1102 | 12 | 8 | 0 | 0 | 10.9 | 15 | 75 | 1.81 | no | 4 | fallback-cron | no |
| 2026-11-12 22:39 | Brilliant or Blunder #25 | quiz | 2D | blunder | Staunton Gambit (Dutch) | 135 | 115 | 0 | 0 | 0 | 0 | 6.3 | 15 | 42 | 0.0 | no | 4 | routine | yes |
| 2026-11-13 22:39 | Brilliant or Blunder #26 | quiz | 2D | blunder | French Advance | 1801 | 1202 | 12 | 2 | 0 | 1 | 11.2 | 15 | 77 | 1.25 | no | 4 | routine | no |
| 2026-11-14 15:38 | Brilliant or Blunder #27 | quiz | 2D | blunder | Tarrasch Trap (Ruy Lopez) | 1468 | 1086 | 6 | 4 | 0 | 0 | 8.6 | 15 | 59 | 0.92 | no | 4 | routine | no |
| 2026-11-14 22:24 | Brilliant or Blunder #28 | quiz | 2D | blunder | Philidor | 1571 | 1101 | 9 | 5 | 0 | 0 | 8.9 | 13 | 67 | 1.27 | no | 4 | fallback-cron | no |
| 2026-11-15 15:37 | Brilliant or Blunder #29 | quiz | 2D | blunder | Vienna (Qh5) | 1910 | 1236 | 7 | 5 | 0 | 1 | 11.5 | 14 | 80 | 1.05 | no | 4 | routine | no |
| 2026-11-15 22:37 | Brilliant or Blunder #30 | quiz | 2D | blunder | Owen's Defence | 1550 | 1131 | 6 | 6 | 0 | 0 | 8.7 | 14 | 62 | 1.06 | no | 4 | routine | no |

## Data (CSV, all columns — copy into pandas / a spreadsheet)

```csv
posted_utc,date,hour_utc,title,kind,format,quiz_no,lesson_id,answer,opening,views,reach,likes,comments,shares,saves,avg_watch_s,length_s,watch_pct,likes_per_1k_reach,comments_per_1k_reach,saves_per_1k_reach,engagement_pct,elo_on_screen,hashtags,posted_by,suppressed
2026-10-19 22:23,2026-10-19,22,Englund Gambit Trap,trap,2D,,,,Englund Gambit Trap,1526,1264,32,0,3,23,14.4,41,35,25.3,0.0,18.2,4.59,yes,12,routine,no
2026-10-20 15:44,2026-10-20,15,Beat the Englund Gambit,defense,2D,,,,Englund Gambit,1383,1085,11,0,0,12,12.3,26,47,10.1,0.0,11.1,2.12,yes,12,routine,no
2026-10-20 22:38,2026-10-20,22,Lasker Trap,trap,2D,,,,Lasker Trap,1452,1119,15,0,0,8,13.8,30,47,13.4,0.0,7.1,2.06,yes,12,routine,no
2026-10-21 15:38,2026-10-21,15,Dodge the Lasker Trap,defense,2D,,,,Lasker Trap,352,285,4,0,0,0,9.3,24,39,14.0,0.0,0.0,1.4,yes,12,routine,yes
2026-10-21 22:38,2026-10-21,22,Fool's Mate,trap,2D,,,,Fool's Mate,1563,1269,10,2,1,3,10.4,21,51,7.9,1.6,2.4,1.26,yes,12,routine,no
2026-10-22 15:39,2026-10-22,15,Avoid Fool's Mate,defense,2D,,,,Fool's Mate,404,346,2,0,1,1,7.8,24,32,5.8,0.0,2.9,1.16,yes,12,routine,yes
2026-10-22 22:38,2026-10-22,22,Blackburne Shilling Trap,trap,2D,,,,Blackburne Shilling Trap,1621,1324,20,0,8,15,11.8,27,43,15.1,0.0,11.3,3.25,yes,12,routine,no
2026-10-23 15:39,2026-10-23,15,Beat the Blackburne Trap,defense,2D,,,,Blackburne Trap,1357,1098,12,0,1,4,8.5,22,38,10.9,0.0,3.6,1.55,yes,12,routine,no
2026-10-23 22:38,2026-10-23,22,Elephant Trap,trap,2D,,,,Elephant Trap,1397,1163,18,0,0,4,10.8,27,40,15.5,0.0,3.4,1.89,yes,12,routine,no
2026-10-24 15:39,2026-10-24,15,Dodge the Elephant Trap,defense,2D,,,,Elephant Trap,1495,1141,14,2,1,3,10.9,25,44,12.3,1.8,2.6,1.75,yes,12,routine,no
2026-10-24 22:38,2026-10-24,22,Brilliant or Blunder #1,quiz,2D,1,quiz-scholars-nf6,blunder,Scholar's Mate,1702,1159,17,10,0,0,10.5,15,68,14.7,8.6,0.0,2.33,yes,12,routine,no
2026-10-25 15:40,2026-10-25,15,Fishing Pole Trap,trap,2D,,,,Fishing Pole Trap,1654,1326,19,1,4,16,12.8,27,48,14.3,0.8,12.1,3.02,yes,12,routine,no
2026-10-25 22:39,2026-10-25,22,Dodge the Fishing Pole,defense,2D,,,,Fishing Pole,1379,1115,10,1,0,1,10.1,23,44,9.0,0.9,0.9,1.08,yes,12,routine,no
2026-10-26 15:40,2026-10-26,15,Brilliant or Blunder #2,quiz,2D,2,quiz-opera (dropped),brilliant*,Opera Game,1527,1096,3,4,0,0,8.2,,,2.7,3.6,0.0,0.64,yes,12,routine,no
2026-10-26 22:40,2026-10-26,22,Back Rank Mate,trap,2D,,,,Back Rank Mate,1335,1101,7,0,3,0,12.5,22,57,6.4,0.0,0.0,0.91,yes,12,routine,no
2026-10-27 15:47,2026-10-27,15,Stop Back Rank Mate,defense,2D,,,,Back Rank Mate,1549,1145,17,1,0,2,13.3,24,55,14.8,0.9,1.7,1.75,yes,12,routine,no
2026-10-27 22:39,2026-10-27,22,Brilliant or Blunder #3,quiz,2D,3,quiz-noahs-ark-qxd4,blunder,Noah's Ark (Ruy Lopez),1632,1112,6,6,0,1,9.8,14,70,5.4,5.4,0.9,1.17,yes,12,routine,no
2026-10-28 15:41,2026-10-28,15,Stafford Gambit Trap,trap,2D,,,,Stafford Gambit Trap,1361,1124,20,0,0,12,8.9,25,35,17.8,0.0,10.7,2.85,yes,12,routine,no
2026-10-28 22:39,2026-10-28,22,Beat the Stafford Gambit,defense,2D,,,,Stafford Gambit,1455,1100,10,0,0,2,14.5,26,55,9.1,0.0,1.8,1.09,yes,12,routine,no
2026-10-29 15:45,2026-10-29,15,Brilliant or Blunder #4,quiz,2D,4,quiz-reti-qd8,brilliant,Réti vs Tartakower (Caro-Kann),2008,1351,21,8,0,0,10.9,14,77,15.5,5.9,0.0,2.15,yes,12,routine,no
2026-10-29 22:39,2026-10-29,22,Kieninger Trap,trap,2D,,,,Kieninger Trap,1329,1133,15,0,4,9,11.7,29,40,13.2,0.0,7.9,2.47,yes,12,routine,no
2026-10-30 16:25,2026-10-30,16,Dodge the Kieninger Trap,defense,2D,,,,Kieninger Trap,1318,1073,13,0,2,2,12.2,27,46,12.1,0.0,1.9,1.58,yes,12,routine,no
2026-10-30 22:39,2026-10-30,22,Brilliant or Blunder #5,quiz,2D,5,quiz-englund-bc3,blunder,Englund Gambit,1875,1202,11,9,0,0,11.8,15,78,9.2,7.5,0.0,1.66,yes,12,routine,no
2026-10-31 15:39,2026-10-31,15,Siberian Trap,trap,2D,,,,Siberian Trap,1338,1114,13,0,3,8,11.3,25,45,11.7,0.0,7.2,2.15,yes,12,routine,no
2026-10-31 22:38,2026-10-31,22,Dodge the Siberian Trap,defense,2D,,,,Siberian Trap,935,713,6,0,0,3,12.6,28,46,8.4,0.0,4.2,1.26,yes,12,routine,no
2026-11-01 15:39,2026-11-01,15,Brilliant or Blunder #6,quiz,2D,6,quiz-legal-nxe5,brilliant,Légal's Mate,1696,1110,7,5,5,3,10.3,15,70,6.3,4.5,2.7,1.8,yes,12,routine,no
2026-11-01 22:39,2026-11-01,22,Brilliant or Blunder #7,quiz,2D,7,quiz-elephant-nxd5,blunder,Elephant Trap (QGD),1695,1085,15,15,0,0,10.7,13,80,13.8,13.8,0.0,2.76,yes,12,routine,no
2026-11-02 07:43,2026-11-02,7,Brilliant or Blunder #8,quiz,2D,8,quiz-fried-liver-nxf7,brilliant,Fried Liver,1635,1117,9,5,0,1,10.8,16,67,8.1,4.5,0.9,1.34,yes,12,fallback-cron,no
2026-11-02 16:43,2026-11-02,16,Brilliant or Blunder #9,quiz,2D,9,quiz-blackburne-nxf7,blunder,Blackburne Shilling,1956,1229,15,10,0,0,12.1,15,80,12.2,8.1,0.0,2.03,yes,12,routine,no
2026-11-02 22:43,2026-11-02,22,Brilliant or Blunder #10,quiz,2D,10,quiz-lasker-fxg1n,brilliant,Lasker Trap (Albin),1900,1196,16,11,0,0,13.5,16,86,13.4,9.2,0.0,2.26,no,12,routine,no
2026-11-03 15:40,2026-11-03,15,Légal's Mate 3D,trap,3D,,,,Légal's Mate,1291,1010,42,0,5,23,11.3,24,47,41.6,0.0,22.8,6.93,no,12,routine,no
2026-11-03 22:40,2026-11-03,22,Brilliant or Blunder #11,quiz,2D,11,quiz-fools-g4,blunder,Fool's Mate,1519,1031,7,11,1,0,9.0,14,65,6.8,10.7,0.0,1.84,no,12,routine,no
2026-11-04 15:39,2026-11-04,15,Brilliant or Blunder #12,quiz,2D,12,quiz-siberian-nd4,brilliant,Siberian Trap,1601,1067,12,4,0,1,10.7,14,74,11.2,3.7,0.9,1.59,no,12,routine,no
2026-11-04 22:40,2026-11-04,22,Brilliant or Blunder #13,quiz,2D,13,quiz-petrov-nf6,blunder,Petrov,1522,1051,3,3,0,0,10.9,15,72,2.9,2.9,0.0,0.57,no,12,routine,no
2026-11-05 22:40,2026-11-05,22,Brilliant or Blunder #14,quiz,2D,14,quiz-magnus-bxf7,brilliant,Magnus trick (Accel. Dragon),1690,1155,11,2,2,0,10.5,15,72,9.5,1.7,0.0,1.3,no,12,routine,no
2026-11-06 15:38,2026-11-06,15,Brilliant or Blunder #15,quiz,2D,15,quiz-fishing-hxg4,blunder,Fishing Pole,1607,1110,10,6,0,0,10.3,15,67,9.0,5.4,0.0,1.44,no,12,routine,no
2026-11-06 22:38,2026-11-06,22,Brilliant or Blunder #16,quiz,2D,16,quiz-traxler-bxf2,brilliant,Traxler,1777,1157,18,4,0,0,10.9,14,78,15.6,3.5,0.0,1.9,no,12,routine,no
2026-11-07 15:37,2026-11-07,15,Brilliant or Blunder #17,quiz,2D,17,quiz-stafford-bg5,blunder,Stafford Gambit,1584,1126,12,3,0,0,9.5,16,60,10.7,2.7,0.0,1.33,no,12,routine,no
2026-11-07 22:39,2026-11-07,22,Brilliant or Blunder #18,quiz,2D,18,quiz-halosar-nb5,brilliant,Halosar Trap (BDG),1976,1253,7,6,0,1,11.8,15,81,5.6,4.8,0.8,1.12,no,12,routine,no
2026-11-08 15:38,2026-11-08,15,Brilliant or Blunder #19,quiz,2D,19,quiz-lasker-bxb4,blunder,Lasker Trap (Albin),8,4,0,0,0,0,3.2,15,21,0.0,0.0,0.0,0.0,no,12,routine,yes
2026-11-08 22:39,2026-11-08,22,Brilliant or Blunder #20,quiz,2D,20,quiz-kieninger-axb4,blunder,Kieninger (Budapest),442,328,2,1,0,0,8.8,15,59,6.1,3.0,0.0,0.91,no,12,routine,yes
2026-11-09 15:39,2026-11-09,15,Brilliant or Blunder #21,quiz,2D,21,quiz-caro-smothered-ngf6,blunder,Caro-Kann smothered mate,173,125,0,0,0,0,7.6,14,53,0.0,0.0,0.0,0.0,no,12,routine,yes
2026-11-09 22:40,2026-11-09,22,Brilliant or Blunder #22,quiz,2D,22,quiz-qga-cxb5,blunder,Queen's Gambit Accepted,1445,1004,5,2,0,1,9.4,14,68,5.0,2.0,1.0,0.8,no,4,routine,no
2026-11-10 15:39,2026-11-10,15,Brilliant or Blunder #23,quiz,2D,23,quiz-from-nc3,blunder,From's Gambit,1504,1039,6,5,0,0,10.3,15,69,5.8,4.8,0.0,1.06,no,4,routine,no
2026-11-10 22:38,2026-11-10,22,Brilliant or Blunder 3D #1,quiz,3D,,quiz-caro-smothered-ngf6-3d,blunder,Caro-Kann smothered mate (re-run of #21),150,119,1,2,0,0,6.2,13.7,45,8.4,16.8,0.0,2.52,no,4,routine,yes
2026-11-12 00:44,2026-11-12,0,Brilliant or Blunder #24,quiz,2D,24,quiz-damiano-nxe5,brilliant,Damiano Defence,1671,1102,12,8,0,0,10.9,15,75,10.9,7.3,0.0,1.81,no,4,fallback-cron,no
2026-11-12 22:39,2026-11-12,22,Brilliant or Blunder #25,quiz,2D,25,quiz-staunton-rh6,blunder,Staunton Gambit (Dutch),135,115,0,0,0,0,6.3,15,42,0.0,0.0,0.0,0.0,no,4,routine,yes
2026-11-13 22:39,2026-11-13,22,Brilliant or Blunder #26,quiz,2D,26,quiz-french-nxd4,blunder,French Advance,1801,1202,12,2,0,1,11.2,15,77,10.0,1.7,0.8,1.25,no,4,routine,no
2026-11-14 15:38,2026-11-14,15,Brilliant or Blunder #27,quiz,2D,27,quiz-tarrasch-qd7,blunder,Tarrasch Trap (Ruy Lopez),1468,1086,6,4,0,0,8.6,15,59,5.5,3.7,0.0,0.92,no,4,routine,no
2026-11-14 22:24,2026-11-14,22,Brilliant or Blunder #28,quiz,2D,28,quiz-philidor-dxe5,blunder,Philidor,1571,1101,9,5,0,0,8.9,13,67,8.2,4.5,0.0,1.27,no,4,fallback-cron,no
2026-11-15 15:37,2026-11-15,15,Brilliant or Blunder #29,quiz,2D,29,quiz-vienna-nf6,blunder,Vienna (Qh5),1910,1236,7,5,0,1,11.5,14,80,5.7,4.0,0.8,1.05,no,4,routine,no
2026-11-15 22:37,2026-11-15,22,Brilliant or Blunder #30,quiz,2D,30,quiz-owen-f5,blunder,Owen's Defence,1550,1131,6,6,0,0,8.7,14,62,5.3,5.3,0.0,1.06,no,4,routine,no
```
