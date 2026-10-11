# ChessGuru — Satranç tuzakları video üreticisi

Yeni başlayanlar için İngilizce, **hook ile başlayan**, "beş yaşındaki bir çocuğa anlatır gibi" basit,
animasyonlu satranç tuzağı/taktik videoları. Görünüm chess.com'un yeşil-beyaz tahtası ve koyu arayüzüne
göre yapıldı; videolar [Remotion](https://www.remotion.dev) ile üretiliyor, her hamle **Stockfish 19** ile analiz ediliyor
(ücretsiz, `stockfish` npm paketi).

Çıktı: 1080×1920 dikey video (Shorts / Reels / TikTok), 30 fps, H.264 + ses, **İngilizce seslendirme**
([Kokoro TTS](https://github.com/thewh1teagle/kokoro-onnx), ücretsiz, bilgisayarında çalışır).

## Videolar

| Elo | Tuzak | Taraf |
| --- | --- | --- |
| 0–300 | Scholar's Mate, Fool's Mate, Back Rank Mate | Beyaz / Siyah / Beyaz |
| 300–600 | Légal's Mate, Blackburne Shilling Trap, Stafford Gambit Trap | Beyaz / Siyah / Siyah |
| 600–900 | Englund Gambit Trap, Elephant Trap, Kieninger Trap | Siyah |
| 900–1500 | Lasker Trap, Fishing Pole Trap, Siberian Trap | Siyah |

Her videonun akışı:

1. **Hook (≈3 sn)** – Final pozisyon (mat) + büyük iki satır yazı ("Checkmate in *4 moves*.").
   **İlk kare (frame 0) hazır kapak/thumbnail'dir**: tüm yazılar Instagram profil ızgarasının gösterdiği
   ortadaki 3:4 alanın (y 240–1680) içinde. `npm run render` ayrıca `out/<elo>/<tuzak>-cover.jpg` üretir.
2. **Başlık kartı** – Tuzağın adı, tahta başlangıç pozisyonuna döner.
3. **Adım adım hamleler** – Taşlar kayarak oynar, chess.com tarzı oklar / kırmızı kareler / yanıp sönen halkalar,
   Stockfish değerlendirme çubuğu, hamle rozetleri (Book, Best, Brilliant !!, Blunder ?? …) ve
   koç balonunda kelime kelime beliren basit İngilizce açıklama.
4. **Final** – "CHECKMATE!" (veya "QUEEN WON!") bannerı + konfeti.
5. **REMEMBER** – 2–3 maddelik özet + FOLLOW çağrısı.

## Kurulum

```bash
npm install
```

Node 20+ gerekir. Remotion ilk renderda Chrome Headless Shell indirir; indiremiyorsa mevcut bir Chromium'u gösterin:

```bash
export REMOTION_BROWSER_EXECUTABLE=/path/to/chromium
```

## Komutlar

```bash
npm run studio                 # Remotion Studio: videoları tarayıcıda canlı izle / düzenle
npm run validate               # tüm hamleler legal mi, analiz güncel mi, rozetler mantıklı mı
npm run analyze                # Stockfish 19 ile tüm pozisyonları analiz et (src/data/analysis.json)
npm run analyze -- --depth 24  # daha derin analiz
npm run render                 # hepsini out/<elo>/<tuzak>.mp4 olarak üret
npm run render -- 0-300        # sadece bir Elo grubu
npm run render -- lasker-trap  # sadece bir video
npx remotion still elo-0-300-scholars-mate shot.png --frame=45   # tek kare (thumbnail için)
```

`analyze` sadece hamleleri değişen dersleri yeniden analiz eder (`--force` ile hepsi).
Native Stockfish ikilisi kullanmak isterseniz (daha hızlı): `STOCKFISH_PATH=/usr/bin/stockfish npm run analyze`.

## Seslendirme (Kokoro TTS)

Seslendirme dosyaları (`public/voice/`) repoda olduğu için render için kurulum gerekmez. Metinleri değiştirince
veya ses değiştirmek istersen bir kerelik kurulum:

```bash
python3 -m venv .venv && .venv/bin/pip install kokoro-onnx soundfile
mkdir -p models && cd models
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
cd ..
```

```bash
npm run voice                          # sadece metni değişen klipleri üretir
npm run voice -- --voice am_michael    # sesi değiştir (hepsini yeniden üretir)
npm run voice -- --speed 1.1           # daha hızlı konuşma
```

Sesler: `af_heart` (varsayılan, kadın, ABD), `am_michael` / `am_puck` / `am_fenrir` (erkek, ABD),
`bf_emma` / `bm_george` (İngiliz) ve diğerleri. Zaman çizelgesi ses sürelerine göre otomatik ayarlanır,
altyazı kelimeleri konuşmayla eşzamanlı belirir. Zor isimlerin okunuşu `src/lib/narration.ts` → `PRONUNCIATION`.

## Yeni tuzak eklemek

`src/lessons/band-*.ts` dosyalarından birine yeni bir `Lesson` ekleyin ve `src/lessons/index.ts` içindeki listeye koyun:

```ts
export const myTrap: Lesson = {
  id: "my-trap",
  band: "300-600",
  title: "My Trap",
  hero: "w",                 // tahta bu taraftan gösterilir ("You")
  bookPlies: 4,              // ilk 4 yarım hamleye "book" rozeti
  hook: ["Win in *5 moves*.", "They *never* see it coming."],
  steps: [
    { moves: ["e4", "e5"], say: "Normal start." },
    { moves: ["Bc4"], say: "Bishop aims at *f7*.", arrows: ["c4f7"], pulse: ["f7"] },
    { say: "Only the *king* protects f7!", squares: ["r:f7"] },     // hamlesiz "konuşma" adımı
    { moves: ["Nxe5"], say: "Take it!", badge: "brilliant" },      // rozeti elle ezmek
  ],
  takeaways: ["Attack *f7*.", "Check every *check*."],
  // mat ile bitmiyorsa: finale: { banner: "PIECE WON!", sub: "Black is a piece up" },
};
```

- `*kelime*` → vurgulu (yeşil / sarı) kelime.
- Ok ve kare renkleri: önek yok = turuncu, `g:` yeşil, `r:` kırmızı, `b:` mavi, `y:` sarı (örn. `"r:g4d1"`).
- Hook satırları en fazla 44 karakter olmalı (kapak kuralı, bkz. `CLAUDE.md`); `validate` bunu kontrol eder.
- Ardından `npm run analyze && npm run voice && npm run validate`.
- Seslendirme metni altyazıdan farklı olsun istersen adıma `voice: "..."` ekle.

Rozetler Stockfish'ten otomatik hesaplanır (chess.com eşikleri: kazanma yüzdesi kaybı <2 excellent, <5 good,
<10 inaccuracy, <20 mistake, üstü blunder; motorun en iyi hamlesi = best). `badge` ile sadece "brilliant/great"
gibi insan yorumları eklenir; `validate`, motorun kötü dediği bir hamleye brilliant verilirse uyarır.

## Proje yapısı

```
src/
  lessons/        tuzak içerikleri (Elo grubuna göre)
  data/           Stockfish analizi (analysis.json, otomatik üretilir)
  components/     Board, EvalBar, PlayerBar, Caption (koç balonu), MoveBadge, Scenes (hook/final/outro)
  lib/            hamle oynatma, zaman çizelgesi, değerlendirme/sınıflandırma
  TrapVideo.tsx   ana kompozisyon
scripts/          analyze, validate, render, gen-sfx, engine (UCI sarmalayıcı)
public/           taş SVG'leri, font, ses efektleri
```

## Lisans notları

- **Taşlar:** "cburnett" seti (Colin M.L. Burnett, CC BY-SA 3.0 / GPL) – lichess chessground paketinden.
  chess.com'un kendi taş/tahta görselleri telifli olduğu için kopyalanmadı; renkler ve yerleşim chess.com "Green" temasına göre ayarlandı.
  Kendi lisanslı taş setiniz varsa `public/pieces/wK.svg … bP.svg` dosyalarını değiştirmeniz yeterli.
- **Font:** Montserrat (SIL Open Font License, `public/fonts/OFL.txt`).
- **Ses efektleri:** `scripts/gen-sfx.ts` ile prosedürel üretildi (telif yok).
- **Seslendirme:** Kokoro-82M (Apache 2.0), ticari kullanım serbest.
- **Motor:** Stockfish 19 (GPLv3), sadece analiz için ayrı süreç olarak çalışır.
- **Remotion:** bireyler ve ≤3 çalışanlı şirketler için ücretsiz; daha büyük şirketler şirket lisansı almalı (remotion.pro).
- "chess.com" adı / logosu videolarda kullanılmıyor.
