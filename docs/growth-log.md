# Growth log – @checksmatedaily

Her istatistik kontrolünde (her paylaşımdan ~1 saat önce otomatik çalışan inceleme) yeni bir kayıt eklenir:
istatistikler, teşhis, yapılan değişiklik ve test edilen hipotez. En yeni kayıt en üstte.

Kurallar (inceleme oturumu için):
- Bir seferde **tek bir değişken** değiştir ki etkisi ölçülebilsin; en az 2 paylaşım sonuç görmeden aynı şeyi tekrar değiştirme.
- Yeterli veri yoksa (paylaşımdan < 6 saat geçtiyse veya < 150 izlenme) sadece kaydet, değiştirme.
- Hedef metrikler: izlenme oranı (Watch %), erişim başına paylaşım/kaydetme/beğeni, takipçi artışı.

---

## 2026-11-12 22:37 UTC — planlı inceleme + paylaşım (3 inceleme kaçtı; 3D quiz bastırıldı)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #24 (12.11 00:44, Damiano Nxe5, yedek cron, ~22 saat) | 15 sn | 1667 | **1100** | 12 | 8 | 0 | 0 | 10,9 sn | %75 |
| **Brilliant or Blunder 3D #1** (10.11 22:38, Caro-Kann 3D, ~48 saat) | 14 sn | **146** | **116** | 1 | 2 | 0 | 0 | 6,4 sn | ~%46 |
| Brilliant or Blunder #23 (10.11 15:39, From Nc3) | 15 sn | 1504 | 1039 | 6 | 5 | 0 | 0 | 10,3 sn | %69 |

Takipçi: **34** (+1).

**Süreç sorunu:** 11 Kasım 15:35 / 22:35 ve 12 Kasım 15:35 incelemeleri bu oturuma ancak 12 Kasım 22:36'da ulaştı
(oturum kapalıydı). Arada yalnızca yedek cron 1 Reel paylaştı (12.11 00:44, Damiano); 18:17 yedek cron'larını GitHub
hiç çalıştırmadı. ~48 saatte 4 yerine 1 paylaşım.

**Teşhis:**
- 2D quiz'ler normal: #24 1100 erişim, %75 izlenme, 8 yorum (4 hashtag düzeni çalışıyor).
- **3D quiz #1 bastırıldı** (48 saatte 116 erişim), oysa ertesi günkü 2D quiz 1100 aldı. En olası neden: aynı
  pozisyon + **birebir aynı seslendirme** 1,5 gün önce #21 olarak paylaşılmıştı → Instagram tekrarlanan/özgün olmayan
  içerik (aynı ses parmak izi) olarak gördü. Légal 3D ise kendi ayrı seslendirmesiyle %5,6 etkileşim almıştı.
- Ders: 3D quiz'ler **daha önce paylaşılmamış** bir quiz'den ve **yeni ses kayıtlarıyla** yapılmalı (aynı içerik
  2D+3D olarak iki kez paylaşılmamalı).

**Değişiklik (içerik):** Yok.

**Paylaşım:** Brilliant or Blunder #25 (quiz-staunton-rh6, blunder) 22:39 UTC → https://www.instagram.com/reel/DfqJcfEMOrj/

**Kalan içerik:** 3 quiz (#26 Fransız, #27 Tarrasch, #28 Philidor) → 14 Kasım öğlene kadar.

**Sonraki hipotez:** Paylaşılmamış bir quiz'in 3D hali (ör. #26 Fransız, 2D yerine 3D) 2D ile en az aynı erişimi alır.

---

## 2026-11-10 22:37 UTC — planlı inceleme + paylaşım (dağıtım normale döndü; ilk 3D quiz)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #23** (10.11 15:39, From Nc3, 4 hashtag, ~7 saat) | 15 sn | 1486 | **951** | 6 | 5 | 0 | 0 | 10,3 sn | %69 |
| **Brilliant or Blunder #22** (09.11 22:40, QGA cxb5, 4 hashtag, ~24 saat) | 14 sn | 1438 | **1000** | 5 | 2 | 0 | 1 | 9,4 sn | %68 |
| Brilliant or Blunder #21 (09.11 15:39, Caro-Kann, 12 hashtag) | 14 sn | 172 | 124 | 0 | 0 | 0 | 0 | 7,6 sn | %54 |

Takipçi: **33**.

**Teşhis:** 4 hashtag'li iki gönderi de normal dağıtıma döndü (#22: 1000, #23 7 saatte 951 erişim) — 12'li hashtag
bloğu dönemindeki 3–327 erişime karşı. Hipotez 2 paylaşımda doğrulandı: her gönderide birebir aynı uzun hashtag
bloğu dağıtımı baskılıyordu. **4 hashtag kalıcı.** Erişim henüz eski ~1150 seviyesine tam dönmedi; izlenme %68–69.

**Değişiklik (içerik):** Yok (bu turda yeni değişken yok; 3D quiz ayrı bir format testi, sahibinin onayıyla).

**Paylaşım:** **Brilliant or Blunder 3D #1** (Caro-Kann boğmaca matı, prerendered 3D quiz, 13,7 sn) 22:38 UTC →
https://www.instagram.com/reel/Dfk_wrpvlfN/

**Sonraki hipotez:** 3D quiz, 2D quiz'lere göre daha fazla beğeni/kaydetme ve erişim getirir mi? (Légal 3D: %5,6
etkileşim.) Ölçüt: 24 saatte erişim ≥ 1000 ve etkileşim ≥ %2.

---

## 2026-11-10 15:37 UTC — planlı inceleme + paylaşım (4 hashtag sonrası toparlanma)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #22** (09.11 22:40, QGA cxb5, **4 hashtag**, ~17 saat) | 14 sn | **1276** | **884** | 4 | 2 | 0 | 1 | 9,1 sn | %66 |
| Brilliant or Blunder #21 (09.11 15:39, Caro-Kann Ngf6, 12 hashtag) | 14 sn | 172 | 124 | 0 | 0 | 0 | 0 | 7,6 sn | %54 |
| Brilliant or Blunder #20 (08.11 22:39, Kieninger, 12 hashtag) | 15 sn | 441 | 327 | 2 | 1 | 0 | 0 | 8,9 sn | %59 |

Takipçi: **33**.

**Teşhis:** 4 hashtag'li ilk gönderi (#22) erişimi 124–327'den **884'e** çıkardı (normalin ~%75'i). Tek veri noktası
ama güçlü bir sinyal: tekrarlanan 12'li hashtag bloğu dağıtımı baskılıyor olabilir. Bir paylaşım daha gerekli.

**Değişiklik (içerik):** Yok (hashtag değişikliği henüz 1 paylaşımda test edildi).

**Paylaşım:** Brilliant or Blunder #23 (quiz-from-nc3, blunder) 15:39 UTC → https://www.instagram.com/reel/DfkPzlEzXFB/

**İçerik:** 3 yeni quiz eklendi ve doğrulandı (#26 Fransız Nxd4??, #27 Tarrasch Qd7??, #28 Philidor dxe5??; Mortimer Nxe5 %33 ile kurala takıldı, çıkarıldı). Sırada 5 quiz → 12 Kasım akşamına kadar.

---

## 2026-11-09 22:37 UTC — planlı inceleme + paylaşım (dağıtım hâlâ düşük → hashtag testi)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #21 (09.11 15:39, Caro-Kann Ngf6, ~7 saat) | 14 sn | **167** | **120** | 0 | 0 | 0 | 0 | 7,8 sn | %54 |
| Brilliant or Blunder #20 (08.11 22:39, Kieninger axb4, ~24 saat) | 15 sn | 437 | 323 | 2 | 1 | 0 | 0 | 8,9 sn | %59 |
| Brilliant or Blunder #19 (08.11 15:38, Lasker Bxb4) | 15 sn | 7 | 3 | 0 | 0 | 0 | 0 | 3,8 sn | – |

Takipçi: **33**.

**Teşhis:** 3. Reel üst üste bastırılmış (#21: 7 saatte 120 erişim; normal 1000+). İzlenme oranı da düştü (%54–59):
Instagram videoyu yabancı kitle yerine az sayıda kişiye gösteriyor. Sahibinden hesap durumu bilgisi henüz yok.

**Değişiklik (tek değişken):** Quiz açıklamalarında her gönderide aynı olan 12'li hashtag bloğu → 4 hashtag
(`#chess #chesspuzzle #brilliantorblunder #learnchess`, `QUIZ_HASHTAGS` in `scripts/post-reel.ts`). Hipotez:
birebir tekrarlanan uzun hashtag bloğu spam/otomasyon sinyali. `marker()` satırı değişmedi.

**Paylaşım:** Brilliant or Blunder #22 (quiz-qga-cxb5) — yeni açıklamayla ilk gönderi, 22:40 UTC → https://www.instagram.com/reel/DfibQ5ShUSo/

**Sonraki hipotez:** #22 ve #23 erişimi > 500'e dönerse hashtag bloğu sorundu; dönmezse hesap düzeyinde kısıtlama /
tekrarlı şablon → format değişikliği (3D, farklı kapak) gerekli.

---

## 2026-11-09 15:37 UTC — planlı inceleme + paylaşım (UYARI: dağıtım çöktü)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #20 (08.11 22:39, Kieninger axb4, ~17 saat) | 15 sn | **353** | **253** | 1 | 1 | 0 | 0 | 8,6 sn | %57 |
| Brilliant or Blunder #19 (08.11 15:38, Lasker Bxb4, ~24 saat) | 15 sn | **7** | **3** | 0 | 0 | 0 | 0 | 4,4 sn | – |
| Brilliant or Blunder #18 (07.11 22:39, Halosar Nb5) | 15 sn | 1967 | 1247 | 7 | 6 | 0 | 1 | 11,8 sn | %81 |

Takipçi: **33**.

**Sorun:** 8 Kasım'dan beri Instagram dağıtımı çöktü: #19 24 saatte 3 erişim, #20 17 saatte 253 erişim (normal: ilk
saatlerde 1000+). İçerik/format #18 ile aynı, paylaşım logları normal → sorun hesap/içerik düzeyinde bir Instagram
kısıtlaması gibi görünüyor. Olası nedenler: (1) art arda ~15 neredeyse aynı şablonda "Brilliant or Blunder" Reel'i
(tekrarlı/özgün olmayan içerik sinyali), (2) her gönderide aynı açıklama kalıbı + hashtag bloğu, (3) otomatik
paylaşım. API'den hesap durumu görülemiyor.

**Değişiklik (içerik):** Yok (önce sahibinin "Hesap Durumu"nu kontrol etmesi gerekiyor; kör bir değişiklik teşhisi bozar).

**Paylaşım:** Brilliant or Blunder #21 (quiz-caro-smothered-ngf6, blunder) 15:39 UTC → https://www.instagram.com/reel/Dfhq9zeOv7W/

**Sonraki hipotez:** #21 de < 500 erişimde kalırsa format çeşitlendirilmeli (ör. 3D video / farklı açıklama şablonu)
ve sahibinin hesap durumunu kontrol etmesi şart.

---

## 2026-11-08 22:37 UTC — planlı inceleme + paylaşım (UYARI: Quiz #19 dağıtılmadı)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #19** (08.11 15:38, Lasker Bxb4, ~7 saat) | 15 sn | **3** | **0** | 0 | 0 | 0 | 0 | 2,8 sn | – |
| Brilliant or Blunder #18 (07.11 22:39, Halosar Nb5) | 15 sn | 1956 | 1240 | 7 | 5 | 0 | 1 | 11,8 sn | %81 |
| Brilliant or Blunder #17 (07.11 15:37, Stafford Bg5) | 16 sn | 1578 | 1122 | 12 | 3 | 0 | 0 | 9,5 sn | %60 |

Takipçi: **33**.

**Sorun:** Quiz #19 7 saatte yalnızca 3 izlenme / 0 erişim aldı (diğer tüm Reel'ler ilk 7 saatte 1000+). Paylaşım
logu normal ("✓ Posted"). Olası nedenler: Instagram tarafında işlenme/dağıtım takıldı ya da Reel "öneriye uygun
değil" işaretlendi. API'den görülemiyor → sahibinin uygulamada Reel'e ve "Hesap Durumu"na bakması gerekiyor.

**İçerik:** 5 yeni quiz eklendi ve Stockfish ile doğrulandı (#21 Caro-Kann boğmaca mat Ngf6??, #22 QGA cxb5??,
#23 From Gambiti Nc3??, #24 Damiano Nxe5!!, #25 Staunton Rh6??); kurulum 1–2 hamle, sesler üretildi, validate 0 hata.
Sıra 9 Kasım'dan itibaren bunlarla devam ediyor (~2,5 gün).

**Paylaşım:** Brilliant or Blunder #20 (quiz-kieninger-axb4, blunder) 22:39 UTC → https://www.instagram.com/reel/Dff2TUnig6O/

**Sonraki hipotez:** #20 normal dağıtılırsa #19 tek seferlik bir Instagram aksaklığıdır; #20 de ~0 erişim alırsa
hesap düzeyinde bir kısıtlama olabilir.

---

## 2026-11-08 15:37 UTC — planlı inceleme + paylaşım

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #18** (07.11 22:39, Halosar Nb5, brilliant, ~17 saat) | 15 sn | **1949** | **1234** | 7 | 5 | 0 | 1 | 11,8 sn | **%81** |
| Brilliant or Blunder #17 (07.11 15:37, Stafford Bg5) | 16 sn | 1577 | 1122 | 12 | 3 | 0 | 0 | 9,5 sn | %61 |
| Brilliant or Blunder #16 (06.11 22:38, Traxler Bxf2) | 14 sn | 1774 | 1155 | 18 | 4 | 0 | 0 | 11,0 sn | %78 |

Takipçi: **33** (6 gündür aynı).

**Teşhis:** Halosar quiz'i son 10 günün en yüksek erişimini (1234) ve %81 izlenme oranını aldı: 5 hamlelik kısa kurulum,
tek net soru. Stafford'un (7 hamle, %61) tam tersi. Kısa kurulum = yüksek izlenme hipotezi güçlendi.

**Değişiklik (içerik):** Yok.

**Paylaşım:** Brilliant or Blunder #19 (quiz-lasker-bxb4, blunder) 15:38 UTC → https://www.instagram.com/reel/DffGICBhswC/

**Uyarı:** Son quiz (kieninger-axb4) bu akşam 23:00'te. 9 Kasım 16:00'dan itibaren paylaşacak içerik YOK.

---

## 2026-11-07 22:37 UTC — planlı inceleme + paylaşım

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #17 (07.11 15:37, Stafford Bg5, blunder, ~7 saat) | 16 sn | 1564 | 1117 | 12 | 3 | 0 | 0 | 9,5 sn | %60 |
| Brilliant or Blunder #16 (06.11 22:38, Traxler Bxf2) | 14 sn | 1770 | 1155 | 18 | 4 | 0 | 0 | 11,0 sn | %78 |
| Brilliant or Blunder #15 (06.11 15:38, Fishing Pole hxg4) | 15 sn | 1603 | 1106 | 10 | 6 | 0 | 0 | 10,3 sn | %67 |

Takipçi: **33** (5 gündür aynı).

**Teşhis:** Stafford quiz'i 16 sn ile en uzun quiz'lerden; izlenme oranı %60 (son 10 quiz'in en düşüğü). Uzun kurulum
(7 hamle) ve 16 sn süre izlenmeyi düşürüyor; 13–14 sn'lik quiz'ler %75–80 alıyor. Yeni quiz'lerde süre ≤ 14 sn
ve kurulum ≤ 5 hamle hedeflenmeli.

**Değişiklik (içerik):** Yok (kalan 2 quiz zaten hazır/paylaşım sırasında).

**Paylaşım:** Brilliant or Blunder #18 (quiz-halosar-nb5, brilliant) 22:39 UTC → https://www.instagram.com/reel/DfdReiBhZ4C/

**Uyarı:** Sırada 2 quiz kaldı (lasker-bxb4, kieninger-axb4) → yarın 16:00 ve 23:00. 9 Kasım'dan itibaren içerik YOK.

---

## 2026-11-07 15:36 UTC — planlı inceleme + paylaşım

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #16 (06.11 22:38, Traxler Bxf2, brilliant, ~17 saat) | 14 sn | 1767 | 1154 | **18** | 4 | 0 | 0 | 10,9 sn | %78 |
| Brilliant or Blunder #15 (06.11 15:38, Fishing Pole hxg4) | 15 sn | 1600 | 1104 | 10 | 6 | 0 | 0 | 10,3 sn | %67 |
| Brilliant or Blunder #14 (05.11 22:40, Magnus Bxf7) | 15 sn | 1686 | 1154 | 11 | 2 | 2 | 0 | 10,5 sn | %72 |

Takipçi: **33** (5 gündür aynı).

**Teşhis:** Traxler (brilliant, gösterişli Bxf2+ fedası) son quiz'lerin en çok beğenisini aldı (18) ve %78 izlenme.
"Brilliant quiz'ler daha çok beğeni alır" gözlemi devam ediyor (#4 Réti 21, #10 Lasker 16, #16 Traxler 18).
Erişim bandı (1000–1200) ve takipçi değişmiyor: quiz formatı tavanda.

**Değişiklik (içerik):** Yok.

**Paylaşım:** Brilliant or Blunder #17 (quiz-stafford-bg5, blunder) 15:37 UTC → https://www.instagram.com/reel/DfchOessvts/

**Uyarı:** Sırada 3 quiz kaldı (halosar-nb5, lasker-bxb4, kieninger-axb4) → 8 Kasım 22:40 son paylaşım; 9 Kasım
16:00'da post-reel "All lessons are already posted" ile duracak. Sahibinin yeni içerik onayı gerekiyor.

---

## 2026-11-06 22:36 UTC — planlı inceleme + paylaşım

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #15 (06.11 15:38, Fishing Pole hxg4, blunder, ~7 saat) | 15 sn | 1531 | 1062 | 10 | 6 | 0 | 0 | 10,2 sn | %67 |
| Brilliant or Blunder #14 (05.11 22:40, Magnus Bxf7) | 15 sn | 1685 | 1154 | 11 | 2 | 2 | 0 | 10,5 sn | %72 |
| Brilliant or Blunder #13 (04.11 22:40, Petrov Nf6) | 15 sn | 1515 | 1047 | 3 | 3 | 0 | 0 | 10,9 sn | %72 |

Takipçi: **33** (4 gündür aynı).

**Teşhis:** Fishing Pole (isimli, daha önce tuzak videosu olarak da paylaşılmış) 7 saatte 6 yorum aldı; Petrov'un 3
ve Magnus'un 2 yorumuna göre daha iyi → "tanıdık tuzak = daha çok yorum" hipotezi tutuyor. Erişim/izlenme bandı değişmedi.

**Değişiklik (içerik):** Yok.

**Paylaşım:** Brilliant or Blunder #16 (quiz-traxler-bxf2, brilliant) 22:38 UTC → https://www.instagram.com/reel/DfaskVFB1_H/

**Uyarı:** Sırada 4 quiz kaldı (stafford-bg5, halosar-nb5, lasker-bxb4, kieninger-axb4) → 8 Kasım akşamı biter.

---

## 2026-11-06 15:37 UTC — planlı inceleme + paylaşım (önce paylaşım, sonra inceleme)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #14 (05.11 22:40, Magnus Bxf7, brilliant, ~17 saat) | 15 sn | 1683 | 1150 | 11 | 2 | 2 | 0 | 10,5 sn | %72 |
| Brilliant or Blunder #13 (04.11 22:40, Petrov Nf6) | 15 sn | 1515 | 1047 | 3 | 3 | 0 | 0 | 10,9 sn | %72 |
| Légal's Mate 3D (03.11 15:40) | 24 sn | 1287 | 1008 | 42 | 0 | 5 | 23 | 11,4 sn | %48 |

Takipçi: **33** (3 gündür aynı).

**Süreç:** Dünkü kaçan paylaşımdan sonra bu inceleme paylaşımı EN BAŞTA tetikledi (bekleyen içerik değişikliği
yoktu); istatistik/kayıt sonra yapıldı. İçerik değişikliği gerektiğinde sıra yine "değiştir → doğrula → paylaş" olmalı.

**Teşhis:** Quiz'ler sabit bant (1000–1150 erişim, %72). Magnus quiz'i 2 paylaşım aldı ama yorum az (2). Yorumlar
tanıdık/isimli tuzaklarda yüksek kalıyor (#7 Elephant 15, #10/#11 11). Takipçi 33'te durdu.

**Değişiklik (içerik):** Yok.

**Paylaşım:** Brilliant or Blunder #15 (quiz-fishing-hxg4, blunder) 15:38 UTC → https://www.instagram.com/reel/DfZ8kgqBVhO/

**Uyarı:** Sırada 5 quiz kaldı (~2,5 gün; 8 Kasım akşamı biter). Sahibinden yeni içerik onayı gerekiyor.

---

## 2026-11-05 22:36 UTC — planlı inceleme + paylaşım (16:00 paylaşımı KAÇTI)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #13 (04.11 22:40, Petrov Nf6, blunder, ~24 saat) | 15 sn | 1515 | 1047 | 3 | 3 | 0 | 0 | 10,9 sn | %72 |
| Brilliant or Blunder #12 (04.11 15:39, Siberian Nd4) | 14 sn | 1597 | 1065 | 12 | 4 | 0 | 1 | 10,7 sn | %75 |
| Légal's Mate 3D (03.11 15:40) | 24 sn | 1287 | 1008 | 42 | 0 | 5 | 23 | 11,4 sn | %48 |

Takipçi: **33** (değişmedi).

**Sorun (operasyonel):** 15:35 incelemesi istatistik aşamasında yarıda kaldı ve 16:00 paylaşımı yapılmadı; 18:17
yedek cron'unu da GitHub hiç çalıştırmadı. Bugün yalnızca 1 Reel çıkıyor (son paylaşımdan ~24 saat sonra).
Yedek cron'a güvenilemiyor (GitHub zamanlamaları sık sık atlıyor/geciktiriyor).

**Teşhis:** Petrov quiz'i izlenme oranında normal (%72) ama etkileşim çok düşük (3 beğeni, 3 yorum, %0,4): tanıdık
olmayan pozisyon (Petrov) yorum getirmiyor; Elephant/Blackburne/Légal gibi bilinen tuzaklar 10–15 yorum alıyor.
Kalan içerik: 7 quiz (~3,5 gün). Sonra paylaşım sırası biter.

**Değişiklik (içerik):** Yok (tek değişken kuralı; 3D önerisi sahibinin onayında).

**Paylaşım:** Brilliant or Blunder #14 (quiz-magnus-bxf7, brilliant) 22:40 UTC → https://www.instagram.com/reel/DfYICL4tfJK/

**Sonraki hipotez:** Tanıdık tuzak pozisyonları (isimli tuzaklar) quiz'lerde daha çok yorum getirir. Yeni içerik
gerektiğinde ünlü tuzaklardan quiz/3D seçilmeli. Sahibine: içerik ~9 Kasım'da biter.

---

## 2026-11-04 22:37 UTC — planlı inceleme + paylaşım

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #12 (04.11 15:39, Siberian Nd4, brilliant, ~7 saat) | 14 sn | 1587 | 1057 | 12 | 4 | 0 | 1 | 10,7 sn | %75 |
| Brilliant or Blunder #11 (03.11 22:40, Fool's g4) | 14 sn | 1515 | 1029 | 7 | 11 | 1 | 0 | 9,0 sn | %65 |
| Légal's Mate 3D (03.11 15:40, ~31 saat) | 24 sn | 1284 | 1006 | 42 | 0 | 5 | 23 | 11,4 sn | %48 |

Takipçi: **33** (+1; 3D'den bu yana +3). Paylaşım, Shorts (8. çalışma) ve yanıt botu sorunsuz.

**Teşhis:** Quiz'ler yine 1000–1200 erişim / %65–86 izlenme bandında; #12 normal (%75). 3D'nin erişimi 1006'da
durdu (24 saatten sonra büyümüyor) ama beğeni/kaydetme oranı tüm hesabın 2 katı. Takipçi artışı 3D'den sonra
başladı (30 → 33 iki günde) — zayıf ama ilk olumlu sinyal. Darboğaz hâlâ erişim (~1000–1350 tavan).

**Değişiklik (içerik):** Yok. Önerilen tek anlamlı adım (2. 3D video / 3D quiz) büyük iş; sahibinin onayı bekleniyor.

**Paylaşım:** Brilliant or Blunder #13 (quiz-petrov-nf6, blunder) 22:40 UTC → https://www.instagram.com/reel/DfVjN7AoG9k/

**Sonraki hipotez:** Aynı (2. 3D videoyla erişim ≥ 1000 ve etkileşim ≥ %3 tekrar edilebilir mi?).

---

## 2026-11-04 15:37 UTC — planlı inceleme + paylaşım (3D 24 saatte rekor etkileşim)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #11 (03.11 22:40, Fool's g4, Elo'suz, ~17 saat) | 14 sn | 1513 | 1028 | 7 | 11 | 1 | 0 | 9,0 sn | %65 |
| **Légal's Mate 3D** (03.11 15:40, ~24 saat) | 24 sn | 1283 | 1006 | **42** | 0 | **5** | **23** | 11,4 sn | %48 |
| Brilliant or Blunder #10 (02.11 22:43, Elo'suz) | 16 sn | 1894 | 1194 | 16 | 11 | 0 | 0 | 13,5 sn | %86 |

Takipçi: **32** (+2 son 24 saatte; 3D'den sonra 5 günlük durgunluk bitti). Paylaşım/Shorts hatası yok (6 Short yüklendi).

**Teşhis:**
- **3D yavaş başladı ama 24 saatte toparlandı:** erişim 424 → 1006 (2D ile aynı bant), ve hesabın **açık ara en iyi
  etkileşimi**: beğeni/erişim %4,2 (2D en iyi ~%2,5), kaydetme/erişim %2,3, 5 paylaşım; toplam %5,6 (önceki rekor %3,8).
  Ort. izlenme 11,4 sn (24 sn'lik videoda %48), 2D tuzak videolarının üstünde. Instagram'ın ağırlık verdiği
  beğeni/erişim ve paylaşım/erişim sinyallerinde 3D net kazanıyor.
- **Elo'suz quiz 2. ölçüm:** #11 %65 (#10 %86). Fool's g4 çok basit/kısa (14 sn, 9 sn ort.); fark Elo'dan çok
  pozisyondan geliyor gibi. Erişim değişmedi (1028–1194). Sonuç: Elo kaldırma zarar vermedi, kalıcı.

**Değişiklik (içerik):** Yok. 3D'yi artırmak tek satırlık küçük bir değişiklik değil (her video ~1 saat render, yeni
3D sahnesi gerekiyor) → sahibine öneri olarak iletildi: haftada 2–3 3D video (önce 3D quiz formatı).

**Paylaşım:** Brilliant or Blunder #12 (quiz-siberian-nd4, brilliant) 15:39 UTC → https://www.instagram.com/reel/DfUzGimhMf1/

**Sonraki hipotez:** 3D formatı (özellikle beğeni/kaydetme) tekrarlanabilir mi? 2. bir 3D video (tercihen quiz) ile
test et; ölçüt: 24 saatte erişim ≥ 1000 ve etkileşim ≥ %3.

---

## 2026-11-03 22:37 UTC — planlı inceleme + paylaşım (3D'nin ilk sonucu)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Légal's Mate 3D** (03.11 15:40, ~7 saat) | 24 sn | **549** | **424** | 10 | 0 | 0 | **8** | 9,6 sn | %40 |
| Brilliant or Blunder #10 (02.11 22:43, Elo'suz) | 16 sn | 1892 | 1194 | 16 | 11 | 0 | 0 | 13,5 sn | %86 |
| Brilliant or Blunder #9 (02.11 16:43) | 15 sn | 1939 | 1221 | 15 | 10 | 0 | 0 | 12,0 sn | %79 |

Takipçi: **31** (+1, 5 gün sonra ilk artış). YouTube Shorts: 2. Short 19:48'de yüklendi (cron ~1 saat geç).

**Teşhis:** 3D video ilk 7 saatte 2D'nin yarısından az erişim aldı (424 vs. quiz'ler 6 saatte ~1100–1200), izlenme
oranı %40 (24 sn; 2D tuzak videolarıyla aynı seviye, quiz'lerin çok altında). Buna karşılık erişim başına etkileşim
hesabın en yükseği: beğeni %2,4, **kaydetme %1,9** (2D'de en iyi ~%1,4), toplam %3,3. Yorum 0 (soru yok, quiz değil).
Yorum: 3D'yi izleyenler beğeniyor/kaydediyor ama Instagram onu daha az kişiye gösteriyor; ilk 9,6 sn'de çıkış yüksek.
Tek veri noktası; 3D videonun render maliyeti (~1 saat) şu an karşılığını vermiyor.

**Değişiklik (içerik):** Yok (Elo deneyi 1 paylaşımda, 3D 1 paylaşımda test edildi; yeterli veri yok).

**Paylaşım:** Brilliant or Blunder #11 (quiz-fools-g4, blunder) — Elo'suz quiz'in 2. ölçümü, 22:40 UTC → https://www.instagram.com/reel/DfS-aJJRQ1A/

**Sonraki hipotez:** Quiz #11 de ≥ %80 izlenme oranı alırsa Elo'suz düzen kalıcı kabul edilir. 3D için yarın erişim
tekrar ölçülür; 24 saatte < 1000 erişimde kalırsa 3D'yi yalnızca quiz formatında (kısa, soru soran) denemeyi öner.

---

## 2026-11-03 15:37 UTC — planlı inceleme + paylaşım (ilk 3D video)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #10** (02.11 22:43, Lasker fxg1=N, **Elo'suz**, ~17 saat) | 16 sn | 1889 | 1193 | 16 | 11 | 0 | 0 | 13,6 sn | **%86** |
| Brilliant or Blunder #9 (02.11 16:43, Blackburne) | 15 sn | 1931 | 1214 | 15 | 10 | 0 | 0 | 12,1 sn | %80 |
| Brilliant or Blunder #8 (02.11 07:43, Fried Liver) | 16 sn | 1629 | 1112 | 9 | 5 | 0 | 1 | 10,8 sn | %67 |

Takipçi: **30** (5 gündür değişmedi). Paylaşım hataları yok (07:55'teki yedek cron sessiz saatte doğru şekilde atladı).

**Teşhis:** Elo'suz ilk video (Quiz #10) hesabın **en yüksek izlenme oranını** aldı (%86, ort. 13,6 sn) ve erişimi
Elo'lu quiz'lerle aynı bantta (1189–1214). Tek veri noktası: olumlu ama henüz kesin değil (≥ 2 paylaşım gerekli).
Erişim hâlâ ~1100–1350 tavanında, takipçi artmıyor: asıl darboğaz keşfet/erişim.

**Değişiklik (içerik):** Yok (Elo kaldırma deneyi yalnızca 1 paylaşımda test edildi). Bugün ayrıca YouTube Shorts
otomasyonu başladı (eski Reel'ler günde 4, 6 saat arayla; ilk Short: https://youtube.com/shorts/TzPIwCgwlj4).

**Paylaşım:** Légal's Mate **3D** (prerendered, sesli, 24 sn) — ilk 3D deney, 15:40 UTC → https://www.instagram.com/reel/DfSOW2mqipm/

**Sonraki hipotez:** 3D görünüm erişimi (keşfet) ve izlenme oranını 2D quiz'lerin üstüne çıkarır mı? Ölçüt: 3D videonun
erişimi > 1350 ve izlenme oranı ≥ %60 (24 sn'lik video için). Bir sonraki Elo'suz quiz (#11 Fool's g4) Elo deneyinin 2. ölçümü.

---

## 2026-11-02 22:41 UTC — planlı inceleme + paylaşım (son içerik; Elo'suz ilk video)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #9** (02.11 16:43, Blackburne, ~6 saat) | 15 sn | **1900** | 1202 | 15 | 10 | 0 | 0 | 12,0 sn | **%79** |
| Brilliant or Blunder #8 (02.11 07:43, Fried Liver) | 16 sn | 1621 | 1110 | 9 | 5 | 0 | 1 | 10,8 sn | %67 |
| Brilliant or Blunder #7 (01.11 22:39, Elephant) | 13 sn | 1678 | 1076 | 15 | 13 | 0 | 0 | 10,7 sn | %80 |

Takipçi: **30** (4 gündür değişmedi). 18:17 yedek cron'u bu sefer hiç çalışmadı (GitHub); rutin 6 dk geç.

**Teşhis:** Quiz #9 ilk 6 saatte 1900 izlenme (#4'ten sonra en hızlı), %79. Tanıdık açılış quiz'leri sabit
%70–80 izlenme oranı ve 5–13 yorum veriyor. Sabah 07:43'te çıkan #8 en düşük oranı aldı (%67): saat etkisi olabilir.

**Değişiklik (sahibinin isteği, deney):** Videolardan Elo bandı ve oyuncu puanları kaldırıldı ("0–300 ELO" etiketi →
DAILY TRAP / THE DEFENSE / QUIZ; "You (250)" → "You"). İlk test: bu akşamki Quiz #10. Ölçüt: erişim ve izlenme
oranı, Elo'lu quiz'lerle (#5–#9: 1600–1900 izlenme, %67–80) karşılaştır.

**Paylaşım:** Brilliant or Blunder #10 (quiz-lasker-fxg1n, Elo'suz) 22:43 UTC → https://www.instagram.com/reel/DfQaAimvsH1/

**Uyarı:** Paylaşım sırası BİTTİ. Yarın 16:00'da yeni ders yoksa post-reel "All lessons are already posted" hatası
verecek. Sahibinden yeni içerik onayı bekleniyor (ayrıca 3D önizleme deneniyor).

---

## 2026-11-02 16:40 UTC — planlı inceleme + paylaşım (DÜZELTME: yedek cron sabah paylaşmasın)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #8 (02.11 **07:43**, Fried Liver, yedek cron) | 16 sn | 1615 | 1108 | 9 | 5 | 0 | 1 | 10,8 sn | %67 |
| **Brilliant or Blunder #7** (01.11 22:39, Elephant, blunder) | 13 sn | 1674 | 1072 | 15 | **13** | 0 | 0 | 10,7 sn | **%80** |
| Brilliant or Blunder #6 (01.11 15:39, Légal) | 15 sn | 1688 | 1105 | 7 | 5 | 5 | 3 | 10,3 sn | %71 |

Takipçi: **30** (4 gündür değişmedi). Rutin 65 dk geç tetiklendi (16:40).

**Sorun:** 01:17'lik yedek cron GitHub tarafından 07:41'de başlatıldı; son paylaşımdan (22:39) tam 9 saat geçtiği
için 9 saat korumasını geçti ve Quiz #8'i sabah 07:43 UTC'de paylaştı (plan dışı, günde 3 paylaşım).
**Düzeltme (operasyonel, deney değil):** yedek (schedule) çalıştırmalar artık 04:00–14:59 UTC arasında hiç paylaşmıyor
(`QUIET_HOURS_UTC=4-14`, `post-reel.yml` + `post-reel.ts`); rutin dispatch'leri etkilenmiyor.

**Teşhis:** Quiz #7 hesabın en yüksek izlenme oranı (%80) ve en çok yorumu (13): kısa (13 sn), herkesin bildiği
Elephant Trap pozisyonu. Quiz'ler 1600–2000 izlenme bandında sabit; takipçi 4 gündür 30'da → erişim tavanı.

**Değişiklik (içerik):** Yok.

**Paylaşım:** Brilliant or Blunder #9 (quiz-blackburne-nxf7) 16:43 UTC → https://www.instagram.com/reel/DfPw1fKhuuG/

**Sonraki hipotez:** Son quiz #10 (Lasker) yarın paylaşılınca içerik biter; sahibinin yeni içerik onayı gerekiyor.

---

## 2026-11-01 22:36 UTC — planlı inceleme + paylaşım (değişiklik yok, Quiz #7)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #6 (01.11 15:39, Légal, ~7 saat) | 15 sn | 1671 | 1091 | 7 | 4 | **5** | 3 | 10,3 sn | %71 |
| Dodge the Siberian Trap (31.10 22:38) | 28 sn | 924 | 693 | 6 | 0 | 0 | 3 | 12,5 sn | %45 |
| Brilliant or Blunder #5 (30.10 22:39) | 15 sn | 1873 | 1198 | 11 | 9 | 0 | 0 | 11,8 sn | %78 |

Takipçi: **30** (3 gündür değişmedi). 22:01'deki yedek cron doğru şekilde atladı.

**Teşhis:** Quiz #6 hipotezi tutmadı (1671 izlenme, 7 beğeni; hedef ≥ 1800 / ≥ 15) ama ilk kez bir quiz paylaşıldı
(5 paylaşım) ve kaydedildi (3): Légal'in vezir fedası "arkadaşına göster" tipi bir pozisyon. Dodge the Siberian geç
toparladı (558 → 924, %45). Takipçi artışı 3 gündür sıfır: erişim ~1100–1300'de takılı, yeni kitleye ulaşamıyoruz.

**Değişiklik:** Yok. Sırada sadece 3 quiz kalıyor; takipçi kaldıracı için asıl adım "Comment TRAPS → PDF" (sahibinin
PDF linki + Meta Live mod) ve yeni içerik (sahibinin onayı bekleniyor).

**Paylaşım:** Brilliant or Blunder #7 (quiz-elephant-nxd5) 22:39 UTC → https://www.instagram.com/reel/DfN0w6hvmx2/

**Sonraki hipotez:** Quiz #7 (Elephant, blunder) ~1700 izlenme, %70+ izlenme oranı alır (quiz tabanı).

---

## 2026-11-01 15:36 UTC — planlı inceleme + paylaşım (değişiklik yok, Quiz #6)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dodge the Siberian Trap (31.10 22:38, savunma, ~17 saat) | 28 sn | **558** | **415** | 3 | 0 | 0 | 3 | 11,4 sn | %41 |
| Siberian Trap (31.10 15:39) | 25 sn | 1327 | 1114 | 13 | 0 | 3 | 8 | 11,3 sn | %45 |
| Brilliant or Blunder #5 (30.10 22:39, quiz) | 15 sn | 1871 | 1196 | 11 | 9 | 0 | 0 | 11,8 sn | %78 |

Takipçi: **30** (2 gündür değişmedi). 07:33'teki yedek cron doğru şekilde atladı.

**Teşhis:** Dodge the Siberian 17 saatte sadece 558 izlenme / 415 erişim: hesabın son 2 haftadaki en düşük savunma
erişimi (normal ~1100). İzlenme oranı %41 (hipotez ≥ %50 tutmadı). Muhtemel sebep: aynı konunun art arda ikinci
videosu + 900–1500 Elo + uzun (28 sn); Instagram ilk test kitlesinde düşük tutunca dağıtımı kesmiş görünüyor.
Hızlı kurulum: 2 testte %45 ve %41 → eski uzun kurulumlulardan (%35–40) biraz iyi, net bir kazanç değil.
Savunma videoları belirgin şekilde zayıflıyor; quiz'ler istikrarlı en iyi format.

**Değişiklik:** Yok. Sırada sadece quiz'ler var (5 adet), kurulum hızı onları etkilemiyor.

**Paylaşım:** Brilliant or Blunder #6 (quiz-legal-nxe5) 15:39 UTC → https://www.instagram.com/reel/DfNEwLahYfV/

**Sonraki hipotez:** Brilliant quiz #6 (Légal) ≥ 1800 izlenme ve ≥ 15 beğeni alır. İçerik ~2,5 gün içinde bitiyor.

---

## 2026-10-31 22:36 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Siberian Trap (31.10 15:39, hızlı kurulum, ~7 saat) | 25 sn | 1316 | 1108 | 13 | 0 | 3 | 8 | 11,3 sn | **%45** |
| Brilliant or Blunder #5 (30.10 22:39, quiz) | 15 sn | 1862 | 1194 | 11 | 8 | 0 | 0 | 11,7 sn | %78 |
| Dodge the Kieninger Trap (30.10 16:25) | 27 sn | 1317 | 1072 | 13 | 0 | 2 | 2 | 12,2 sn | %46 |

Takipçi: **30** (değişmedi). 21:32'deki yedek cron doğru şekilde atladı.

**Teşhis:** Hızlı kurulumun ilk testi: Siberian %45 (16 hamlelik kurulum, kilit an 11 sn) — eski uzun kurulumlu
tuzaklar %35–40 idi. Hipotez (≥ %45) sınırda tuttu; ikinci test Dodge the Siberian (o da hızlı kurulumlu).
Takipçi 30'da duraksadı.

**Değişiklik:** Yok (hız değişikliği 1 paylaşımda test edildi).

**Paylaşım:** Dodge the Siberian Trap 22:39 UTC → https://www.instagram.com/reel/DfLP5NrBEJb/

**Sonraki hipotez:** Dodge the Siberian %50+ izlenme oranı alır. Sırada 5 video kaldı (~2,5 gün): savunma + 4 quiz.

---

## 2026-10-31 15:36 UTC — planlı inceleme + paylaşım (değişiklik yok, Siberian = hız testi)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #5** (30.10 22:39, blunder quiz, ~17 saat) | 15 sn | **1836** | 1180 | 11 | 8 | 0 | 0 | 11,7 sn | **%78** |
| Dodge the Kieninger Trap (30.10 16:25) | 27 sn | 1317 | 1071 | 13 | 0 | 2 | 2 | 12,2 sn | %46 |
| Brilliant or Blunder #4 (29.10 15:45, brilliant quiz) | 14 sn | 2001 | 1345 | 21 | 8 | 0 | 0 | 10,9 sn | %77 |

Takipçi: **30 (+1)**. 06:59'daki yedek cron doğru şekilde atladı.

**Teşhis:** Quiz'ler artık her seferinde 1600–2000 izlenme ve %70–78 izlenme oranı veriyor (tuzaklar 1300–1650,
%35–57). Hipotez kısmen tuttu: blunder quiz'i #5 brilliant #4'e göre yarı beğeni aldı (11 vs 21), ama izlenme/yorum
benzer (1836/8 vs 2001/8). Dodge the Kieninger geç yükseldi (6 saatte 716 → 1317), %46.

**Değişiklik:** Yok. Bugün Siberian Trap çıkıyor: hızlı kurulum değişikliğinin ilk testi (kilit an 11 sn).

**Paylaşım:** Siberian Trap 15:39 UTC → https://www.instagram.com/reel/DfKf5gtyC_8/

**Sonraki hipotez:** Siberian Trap %45+ izlenme oranı alır (eski uzun kurulumlu tuzaklar %35–40).
**Uyarı:** sırada 6 video kaldı (~3 gün).

---

## 2026-10-30 22:36 UTC — planlı inceleme + paylaşım (değişiklik yok, Quiz #5)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dodge the Kieninger Trap (30.10 16:25, savunma, ~6 saat) | 27 sn | **716** | 592 | 4 | 0 | 0 | 1 | 10,2 sn | %39 |
| Kieninger Trap (29.10 22:39) | 29 sn | 1319 | 1126 | 15 | 0 | 4 | 9 | 11,7 sn | %40 |
| Brilliant or Blunder #4 (29.10 15:45, quiz) | 14 sn | 1999 | 1345 | 21 | 8 | 0 | 0 | 10,9 sn | %77 |

Takipçi: **29 (+1)**. 22:18'deki yedek cron doğru şekilde atladı.

**Teşhis:** Dodge the Kieninger ilk 6 saatte 716 izlenmede (diğer savunmalar bu sürede ~1200+): uzun kurulumlu,
%39 izlenme oranı ve 45 dk geç paylaşım. Kieninger konusu genel olarak zayıf (tuzak da 1319). Kurulum hızı
değişikliği henüz hiçbir paylaşımda test edilmedi (ilk: Siberian).

**Değişiklik:** Yok (son değişiklik 0 paylaşımda test edildi).

**Paylaşım:** Brilliant or Blunder #5 (quiz-englund-bc3) 22:39 UTC → https://www.instagram.com/reel/DfIrMpFpIME/

**Sonraki hipotez:** Blunder quiz'i #5 (Englund) brilliant quiz'i #4'ten (1999) daha az beğeni/erişim alır.

---

## 2026-10-30 16:20 UTC — planlı inceleme + paylaşım (DEĞİŞİKLİK: uzun kurulum adımları hızlı)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Kieninger Trap (29.10 22:39, ~17 saat) | 29 sn | 1319 | 1124 | 15 | 0 | 4 | 9 | 11,7 sn | **%40** |
| Brilliant or Blunder #4 (29.10 15:45, quiz) | 14 sn | **1993** | 1339 | 21 | 8 | 0 | 0 | 10,9 sn | %77 |
| Beat the Stafford Gambit (28.10 22:39) | 26 sn | 1454 | 1100 | 10 | 0 | 0 | 2 | 14,5 sn | %55 |

Takipçi: **28 (+2)**. Rutin 45 dk geç tetiklendi (16:20); yedek cron'lar (22:44, 07:07) doğru şekilde atladı.
İlk paylaşım denemesi Instagram'ın boş yanıtıyla düştü ("Unexpected end of JSON input", render'dan önce, hiçbir şey
paylaşılmadı); tek yeniden deneme başarılı.

**Teşhis:** Uzun kurulumlu iki tuzak (Stafford %35, Kieninger %40) kısa kurulumlulardan (Back Rank %57, Fishing Pole
%48) belirgin şekilde az izlendi: Kieninger'de kilit an 12,3 sn, Stafford'da 11,8 sn, ama ortalama izleyici 9–12 sn'de
çıkıyor. 2 gözlem → hipotez yeterince desteklendi.

**Değişiklik (tek değişken: kurulum hızı):** 8'den fazla hamleli kurulum adımları artık hızlı oynanıyor (hamle başı
0,33 sn yerine 0,5 sn; `T.fastAfter/fastMove/fastGap`, `src/lib/timeline.ts`). Sıradaki son tuzak Siberian'ın iki
kurulum adımı tek adımda birleştirildi ("Smith-Morra Gambit. Queen and knight hit h2."), "h3" satırı kısaltıldı →
kilit hamle Nd4 15,5 sn'den **11,0 sn**'ye, video 29,5 → 25,0 sn. Seslendirme yenilendi, validate 0 hata, kapak
kontrol edildi, PDF rehberi yeniden üretildi.

**Paylaşım:** Dodge the Kieninger Trap 16:25 UTC → https://www.instagram.com/reel/DfIAU7DztTT/

**Sonraki hipotez:** Siberian Trap (kilit an 11 sn) %45+ izlenme oranı alır. **Uyarı:** sırada 8 video kaldı
(Englund quiz, Siberian çifti, 5 quiz) → ~4 gün; yeni içerik gerekiyor.

---

## 2026-10-29 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #4** (29.10 15:45, quiz, ~7 saat) | 14 sn | **1980** | **1333** | **21** | **8** | 0 | 0 | 10,9 sn | **%77** |
| Beat the Stafford Gambit (28.10 22:39) | 26 sn | 1454 | 1100 | 10 | 0 | 0 | 2 | 14,5 sn | %55 |
| Stafford Gambit Trap (28.10 15:41) | 25 sn | 1351 | 1122 | 20 | 0 | 0 | 13 | 9,0 sn | %35 |

Takipçi: **26** (değişmedi).

**Teşhis:** Quiz #4 (Réti, gerçek brilliant) hesabın rekoru: ilk 7 saatte 1980 izlenme (önceki en iyi 1697),
erişim 1333, %77 izlenme oranı, 21 beğeni, 8 yorum. Hipotez tuttu (≥ 5 yorum, ≥ %60). Quiz formatı 4 testin 3'ünde
hedefi aştı; en zayıf olan (#2) zaten doğrulamadan geçemeyen hatalı quiz'di. Brilliant (fedalı) quiz'ler beğeniyi de
taşıyor (21 vs blunder quiz'lerde 6–17).

**Değişiklik:** Yok. Sıradaki Kieninger tuzağı, Stafford'daki "uzun kurulum" teşhisini test edecek; aynı anda sırayı
değiştirmiyorum. **Uyarı:** sırada sadece 10 video kaldı (2 tuzak/savunma çifti + 6 quiz) → ~5 gün sonra içerik
biter; en iyi performans quiz'lerde olduğu için yeni doğrulanmış quiz'ler eklenmeli.

**Paylaşım:** Kieninger Trap 22:39 UTC → https://www.instagram.com/reel/DfGGXcYPNbi/

**Sonraki hipotez:** Brilliant (fedalı) quiz'ler blunder quiz'lerinden daha çok beğeni/erişim alır (#5 Englund
blunder vs #6 Légal brilliant ile karşılaştır).

---

## 2026-10-29 15:42 UTC — planlı inceleme + paylaşım (değişiklik yok, Quiz #4)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Beat the Stafford Gambit (28.10 22:39, savunma, ~17 saat) | 26 sn | 1450 | 1095 | 10 | 0 | 0 | 2 | 14,5 sn | **%55** |
| Stafford Gambit Trap (28.10 15:41) | 25 sn | 1347 | 1121 | 20 | 0 | 0 | 13 | 9,0 sn | %36 |
| Brilliant or Blunder #3 (27.10 22:39, quiz) | 14 sn | 1632 | 1110 | 6 | 6 | 0 | 1 | 9,8 sn | %70 |

Takipçi: **26** (değişmedi). 07:06'daki yedek cron doğru şekilde atladı. Rutin 7 dk geç tetiklendi.

**Teşhis:** Savunma videosu (Beat the Stafford) tuzaktan daha uzun izlendi (14,5 sn / %55 vs 9,0 sn / %36): aynı
konu, savunmada kurulum kısa ve kilit an erken. Bu, "Stafford tuzak videosunda kurulum uzun" teşhisini destekliyor.
Takipçi artışı 2 gündür durgun (25–26).

**Değişiklik:** Yok. Kurulum kısaltma hipotezi için Kieninger tuzak verisini bekliyorum (bir sonraki tuzak).

**Paylaşım:** Brilliant or Blunder #4 (quiz-reti-qd8) 15:45 UTC → https://www.instagram.com/reel/DfFW_wohauq/

**Sonraki hipotez:** Quiz #4 (Réti, gerçek brilliant) ≥ 5 yorum ve ≥ %60 izlenme oranı alır.

---

## 2026-10-28 22:36 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Stafford Gambit Trap (28.10 15:41, ~7 saat) | 25 sn | 1322 | 1110 | 20 | 0 | 0 | **13** | 8,9 sn | **%35** |
| Brilliant or Blunder #3 (27.10 22:39, quiz) | 14 sn | 1624 | 1108 | 6 | 5 | 0 | 0 | 9,7 sn | %70 |
| Stop Back Rank Mate (27.10 15:47) | 24 sn | 1545 | 1138 | 17 | 1 | 0 | 2 | 13,4 sn | %55 |

Takipçi: **26 (+1)**. 22:34'teki yedek cron doğru şekilde atladı.

**Teşhis:** Stafford kaydetme/beğeni açısından güçlü (13 kaydetme, 20 beğeni = son tuzakların en iyisi) ama izlenme
oranı düşük (%35, ort. 8,9 sn): izleyici kilit andan önce çıkıyor olabilir (Stafford'da kurulum hamleleri uzun).
Tek video; kısaltma kararı için bir sonraki uzun kurulumlu tuzakta (Kieninger) da bakılmalı.

**Değişiklik:** Yok (tek gözlem).

**Paylaşım:** Beat the Stafford Gambit 22:39 UTC → https://www.instagram.com/reel/DfDhmhHpZoB/

**Sonraki hipotez:** Ort. izlenme kilit an zamanının altında kalan tuzaklarda (Stafford gibi) kurulum adımını
kısaltmak izlenme oranını %45+ seviyesine çıkarır; Kieninger verisiyle karşılaştır.

---

## 2026-10-28 15:37 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #3** (27.10 22:39, quiz, ~17 saat) | 14 sn | **1621** | 1105 | 6 | **5** | 0 | 0 | 9,7 sn | **%70** |
| Stop Back Rank Mate (27.10 15:47) | 24 sn | 1539 | 1134 | 17 | 1 | 0 | 2 | 13,4 sn | %55 |
| Back Rank Mate (26.10 22:40) | 22 sn | 1333 | 1099 | 7 | 0 | 3 | 0 | 12,5 sn | %57 |

Takipçi: **25** (değişmedi). 06:52'deki yedek cron doğru şekilde atladı.

Ara not (27–28.10): Sahibinin tespitiyle Quiz #2 (Opera Qb8+) brilliant değildi (Qc3 de +4.9 ile kazanıyor) →
quiz doğrulaması sıkılaştırıldı (brilliant = en iyi + gerçek feda + tek kazanç yolu; blunder = ≤ %25), Opera
listeden çıkarıldı, 6 yeni doğrulanmış quiz (#5–#10) eklendi.

**Teşhis:** Hipotez tuttu: tanıdık açılış pozisyonlu Quiz #3 → 5 yorum, %70 izlenme oranı (rekor); ortaoyun Quiz #2 → 3
yorum, %59. Quiz formatı 3 testte de en yüksek izlenme oranlarını veriyor (%68 / %59 / %70) ama beğeni ve kaydetme
düşük (cevap verilmediği için). Yeni quiz'lerin hepsi açılış pozisyonu, bu doğrultuda. Takipçi artışı hâlâ en zayıf.

**Değişiklik:** Yok. Quiz kararları zaten içerikte uygulandı (yeni quiz'ler açılış pozisyonu); başka bir değişkeni
aynı anda oynatmıyorum.

**Paylaşım:** Stafford Trap 15:41 UTC → https://www.instagram.com/reel/DfCxuYaBlno/

**Sonraki hipotez:** Takipçi artışı için en güçlü aday hâlâ "Comment TRAPS → ücretsiz PDF" (GUIDE_CTA), PDF linki ve
Meta uygulamasının Live moda alınmasını bekliyor.

---

## 2026-10-27 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok, Quiz #3)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Stop Back Rank Mate** (27.10 15:47, savunma, ~7 saat) | 24 sn | **1521** | 1117 | 17 | 1 | 0 | 2 | 13,4 sn | **%55** |
| Back Rank Mate (26.10 22:40) | 22 sn | 1333 | 1099 | 7 | 0 | 3 | 0 | 12,5 sn | %57 |
| Brilliant or Blunder #2 (26.10 15:40, quiz) | 14 sn | 1524 | 1095 | 3 | 3 | 0 | 0 | 8,2 sn | %59 |

Takipçi: **25 (+1)**. 22:13'teki yedek cron doğru şekilde atladı.

**Teşhis:** Stop Back Rank Mate şimdiye kadarki en iyi savunma videosu (ilk 7 saatte 1521 izlenme, %55 izlenme
oranı, 17 beğeni); savunma ile tuzak arasındaki fark artık tamamen kapandı. Back-rank çifti (tuzak + savunma) tüm
videolar arasında en yüksek izlenme oranlarına sahip (%55–57): kısa (22–24 sn) ve tek fikirli. Zayıf kaldıraç hâlâ
takipçi artışı ve kaydetme.

**Değişiklik:** Yok. Sahibi bir başka hesabın edit stilini incelememi istedi (video dosyası bekleniyor); stil
değişikliği o incelemeden sonra tek değişken olarak denenecek.

**Paylaşım:** Brilliant or Blunder #3 (quiz-noahs-ark-qxd4) 22:39 UTC → https://www.instagram.com/reel/DfA8x56N4W5/

**Sonraki hipotez:** Quiz #3 (Noah's Ark, tanıdık açılış pozisyonu) Quiz #2'den (ortaoyun) belirgin şekilde fazla
yorum alır (≥ 5).

---

## 2026-10-27 15:43 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Back Rank Mate (26.10 22:40, ~17 saat) | 22 sn | 1330 | 1097 | 7 | 0 | 3 | **0** | 12,4 sn | **%57** |
| Brilliant or Blunder #2 (26.10 15:40, quiz) | 14 sn | 1521 | 1091 | 3 | 3 | 0 | 0 | 8,1 sn | %59 |
| Dodge the Fishing Pole (25.10 22:39) | 23 sn | 1371 | 1112 | 10 | 1 | 0 | 1 | 10,1 sn | %43 |

Takipçi: **24** (2 gündür değişmedi). 06:17'deki yedek cron doğru şekilde atladı. Rutin 8 dk geç tetiklendi.

**Teşhis:** Back Rank Mate en yüksek tuzak izlenme oranlarından birini aldı (%57, 22 sn), ama kaydetme 0 ve beğeni 7:
izleniyor, fakat "saklanacak / takip edilecek" bir değer hissi bırakmıyor. Son 3 paylaşımda beğeni+kaydetme belirgin
düştü (Fishing Pole 35 → 11, 3, 7). En zayıf kaldıraç takipçi artışı: ~4400 erişimde 0 yeni takipçi.

**Değişiklik:** Yok. Rutin geç başladığı için paylaşımı geciktirecek bir değişiklik yapmadım; ayrıca tek gözlemle
(1 tuzak) bir değişkeni değiştirmek erken.

**Paylaşım:** Stop the Back-Rank Mate 15:47 UTC → https://www.instagram.com/reel/DfANmFAJKqK/

**Sonraki hipotez:** Takipçi artışı videonun sonunda değil, ortasında (kilit andan hemen sonra) gelen bir "Follow for a
new trap every day" çağrısıyla artar; bir sonraki incelemede, Stop the Back-Rank Mate verisiyle birlikte değerlendir.

---

## 2026-10-26 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brilliant or Blunder #2 (26.10 15:40, quiz, ~7 saat) | 14 sn | 1509 | 1086 | **3** | 3 | 0 | 0 | 8,1 sn | %59 |
| Dodge the Fishing Pole (25.10 22:39) | 23 sn | 1368 | 1109 | 10 | 1 | 0 | 1 | 10,1 sn | %43 |
| Fishing Pole Trap (25.10 15:40) | 27 sn | 1640 | 1322 | 19 | 1 | 4 | 16 | 12,9 sn | %48 |
| Brilliant or Blunder #1 (24.10 22:38, quiz) | 15 sn | 1696 | 1157 | 17 | 10 | 0 | 0 | 10,5 sn | %68 |

Takipçi: **24** (değişmedi).

**Teşhis:** Quiz hipotezi (≥ 5 yorum, ≥ %55 izlenme oranı) yarım tuttu: izlenme oranı %59 (iyi), ama yorum 3 ve beğeni
sadece 3 (Quiz #1'de 10 yorum / 17 beğeni). Fark büyük ihtimalle konudan: #1 herkesin tanıdığı Scholar's Mate
pozisyonu (cevap vermek kolay), #2 bir oyundan alınmış ortaoyun pozisyonu (Opera Game; düşük Elo izleyici için zor,
cevap veremeyince yorum da yapmıyor). Quiz cevaplarına botun hiç yanıt verememesi (Meta uygulaması hâlâ Development
modunda) yorum sohbetini de büyütmüyor.

**Değişiklik:** Yok. Quiz sıklığını artırma kararı ertelendi (2 testten 1'i net başarılı). Sıradaki quiz'ler (#3 Noah's
Ark, #4 Réti) zaten hazır; açılış tuzaklarından tanıdık pozisyon mu (#3) ortaoyun mu (#4) daha çok yorum alıyor, bakılacak.

**Paylaşım:** Back-Rank Mate 22:40 UTC → https://www.instagram.com/reel/De-YE7Wxipf/ (22:39 yedek cron aynı anda başladı, doğru şekilde atladı)

**Sonraki hipotez:** Tanıdık açılış pozisyonlu quiz'ler (#1, #3) ortaoyun quiz'lerinden (#2, #4) belirgin şekilde daha
çok yorum alır → yeni quiz'ler açılış tuzaklarından seçilmeli.

---

## 2026-10-26 15:35 UTC — planlı inceleme + paylaşım (değişiklik yok, Quiz #2)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dodge the Fishing Pole (25.10 22:39, savunma) | 23 sn | 1367 | 1108 | 10 | 1 | 0 | 1 | 10,1 sn | %43 |
| Fishing Pole Trap (25.10 15:40) | 27 sn | **1638** | 1320 | 19 | 1 | 4 | 16 | 13,0 sn | %48 |
| Brilliant or Blunder #1 (24.10 22:38, quiz) | 15 sn | 1696 | 1157 | 17 | 10 | 0 | 0 | 10,5 sn | %68 |

Takipçi: **24 (+1)**. 06:14'teki yedek cron doğru şekilde atladı.

**Teşhis:** Savunma videoları artık istikrarlı (~1350–1490). Tuzaklar ~1400–1640, quiz 1696. Zayıf kaldıraç hâlâ
takipçi artışı (~1 takipçi / 1000 erişim) ve savunmalarda kaydetme/paylaşım. Sahibinin tespitiyle tahta kare renkleri
düzeltildi (a1 artık koyu); bu bir hata düzeltmesi, deney değil.

**Değişiklik:** Yok. Bugün Quiz #2 (Opera) çıkıyor: quiz formatının 2. testi, sonucu beklenmeli.

**Paylaşım:** Brilliant or Blunder #2 (quiz-opera-qb8) 15:40 UTC → https://www.instagram.com/reel/De9oA6uAHkI/

**Sonraki hipotez:** Quiz #2 ≥ 5 yorum ve ≥ %55 izlenme oranı alırsa quiz sıklığı artırılır (ör. her çiftten sonra
yerine her tuzak ile savunma arasında).

---

## 2026-10-25 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Fishing Pole Trap** (25.10 15:40, ~7 saat) | 27 sn | **1620** | 1307 | 19 | 1 | 4 | **16** | 13,0 sn | %48 |
| Brilliant or Blunder #1 (24.10 22:38, quiz) | 15 sn | 1685 | 1154 | 17 | 10 | 0 | 0 | 10,4 sn | %68 |
| Dodge the Elephant Trap (24.10 15:39) | 25 sn | 1487 | 1136 | 14 | 2 | 1 | 3 | 10,9 sn | %44 |

Takipçi: **23** (değişmedi). 20:50'deki yedek cron doğru şekilde atladı.

**Teşhis:** Fishing Pole ilk 7 saatte 1620 izlenme: Blackburne'den (1615) beri en iyi tuzak; 16 kaydetme ve %48
izlenme oranıyla en güçlü tuzaklardan biri. Kısaltılmış format (kilit an ≤ 12 sn) tuzaklarda %44–51 bandında
tutarlı. Takipçi artışı hâlâ en zayıf kaldıraç (2 günde +2). Yorum botu hâlâ yorumları göremiyor (Meta uygulaması
Live moda alınmayı bekliyor, sahibine bildirildi).

**Değişiklik:** Yok. Son test edilen değişken (quiz formatı) yalnızca 1 paylaşımda; Quiz #2 bu çiftten sonra geliyor.

**Paylaşım:** Dodge the Fishing Pole Trap 22:40 UTC → https://www.instagram.com/reel/De7zPmLtPrx/

**Sonraki hipotez:** Quiz #2 (Opera) ≥ 5 yorum ve ≥ %55 izlenme oranı alırsa quiz sıklığını artır.

---

## 2026-10-25 15:35 UTC — planlı inceleme + paylaşım (değişiklik yok, quiz formatı tuttu)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Brilliant or Blunder #1** (24.10 22:38, quiz) | 15 sn | **1676** | 1145 | 17 | **10** | 0 | 0 | 10,4 sn | **%68** |
| Dodge the Elephant Trap (24.10 15:39, savunma) | 25 sn | 1484 | 1133 | 14 | 2 | 1 | 3 | 10,9 sn | %44 |
| Elephant Trap (23.10 22:38) | 27 sn | 1391 | 1158 | 18 | 0 | 0 | 4 | 10,8 sn | %40 |

Takipçi: **23 (+2)**. 06:08'deki yedek cron doğru şekilde atladı.

**Teşhis:** Quiz hipotezi doğrulandı: 10 yorum (önceki rekor 2), %68 izlenme oranı (rekor), ~1400 tavanının üstünde
1676 izlenme. Zayıf taraf: paylaşım/kaydetme 0 (cevap verilmediği için saklanacak bir şey yok, beklenen durum).
**Sorun:** reply-comments botu (11:43) quiz'de "0 comments" okudu, oysa istatistik 10 yorum diyor → Instagram API
yorumları uygulamaya döndürmüyor. En olası sebep: Meta uygulaması Development modunda / Standard Access'te; yorum
içeriği yalnızca uygulamada rolü olan hesaplar için dönüyor. Koddan düzeltilemez; uygulamanın Live moda alınması
(gerekirse instagram_business_manage_comments için App Review) gerekiyor. Sahibine bildirildi.

**Değişiklik:** Yok. Quiz formatı sadece 1 paylaşımda test edildi (kural: ≥ 2). Sahibinin isteğiyle tahta
koordinatları artık her zaman Beyaz tarafında (deney değil, düzeltme); bugünkü Fishing Pole Trap bunu ilk kullanan video.

**Paylaşım:** Fishing Pole Trap 15:40 UTC → https://www.instagram.com/reel/De7DOQ9hJpn/

**Sonraki hipotez:** Quiz #2 (Opera, 26.10 civarı) de ≥ 5 yorum ve ≥ %55 izlenme oranı alırsa quiz sıklığını artır
(ör. her çiftten sonra değil, her tuzak/savunma arasında bir quiz).

---

## 2026-10-24 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok, ilk quiz)

| Video | İzlenme | Beğeni | Yorum | Paylaşım | Kaydetme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- |
| Dodge the Elephant Trap (24.10 15:39, savunma, ~7 saat) | **1230** | 12 | 1 | 0 | 2 | ~%41 |
| Elephant Trap (23.10 22:38) | 1388 | 18 | 0 | 0 | 4 | ~%40 |
| Beat the Blackburne Trap (23.10 15:39, savunma) | 1330 | 12 | 0 | 1 | 5 | ~%38 |
| Blackburne Shilling (22.10 22:38) | 1610 | 20 | 0 | 8 | 15 | ~%43 |

Takipçi: **21** (değişmedi).

**Teşhis:** Tehdit tarzı savunma kancası üçüncü kez tuttu (Englund 1375, Blackburne 1330, Dodge Elephant 1230 ilk 7 saatte);
savunmalar artık tuzaklarla aynı bantta (~1200–1400). Erişim tavanı hâlâ ~1400: yeni bir kaldıraç gerekiyor.

**Değişiklik:** Yok. Test edilecek yeni değişken bu turda ilk "Brilliant or Blunder" quiz'inin kendisi (yeni format);
aynı anda başka bir şeyi değiştirmek etkisini ölçmeyi bozardı. "Comment TRAPS" çağrısı hâlâ PDF'in yüklenmesini bekliyor.

**Paylaşım:** Brilliant or Blunder #1 (quiz-scholars-nf6) 22:38 UTC → https://www.instagram.com/reel/De5OSP-JCI_/

**Sonraki hipotez:** Quiz formatı, cevap verilmediği için video başına 5+ yorum getirir (tuzak videolarında 0–1);
cevap botu ilk gerçek yorumlara yanıt yazdığında yazma izni de doğrulanmış olur.

---

## 2026-10-24 15:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Elephant Trap (23.10 22:38, "send" etiketi) | 26,8 sn | 1388 | 1157 | 18 | 0 | **0** | 4 | 10,8 sn | ~%40 |
| Beat the Blackburne Trap (23.10 15:39, savunma) | 22 sn | **1326** | 1083 | 12 | 0 | 1 | 5 | 8,5 sn | ~%38 |
| Blackburne Shilling (22.10 22:38, "send" etiketi) | 27,2 sn | 1603 | 1318 | 20 | 0 | 8 | 15 | 11,7 sn | ~%43 |

Takipçi: **21 (+2)**. Yedek cron'lar atladı. reply-comments saatlik cron'u GitHub'da ~5 saatte bir çalışıyor
(01:40, 07:23, 12:45): quiz cevapları ve PDF DM'leri birkaç saat gecikebilir.

**Teşhis ("send" etiketi, 2 test):** Blackburne 8 paylaşım, Elephant 0 → etiketin paylaşıma etkisi tutarlı değil;
Blackburne'deki paylaşımlar büyük ihtimalle konudan (popüler, "arkadaşıma göstereyim" tuzağı). Etiket zararsız
(izlenme oranı düşmedi), o yüzden kalıyor. Savunma videoları artık tutarlı: Beat the Blackburne 1326, Beat the Englund 1375.

**Değişiklik:** Yok. Paylaşım/erişim kaldıracında küçük bir değişkenin net etkisi yok; sıradaki büyük kaldıraç
"Comment TRAPS → ücretsiz PDF" çağrısı (yorum + DM). Kod hazır (`GUIDE_CTA`), PDF Payhip'e yüklenip DM test edilince açılacak.

**Paylaşım:** Dodge the Elephant Trap 15:39 UTC → https://www.instagram.com/reel/De4eP2jxco-/

**Sonraki hipotez:** GUIDE_CTA açıldığında yorum sayısı video başına 0–2'den 10+'ya çıkar; yorumlar erişimi büyütür.

---

## 2026-10-23 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Beat the Blackburne Trap (15:39, savunma) | 22 sn | **1209** | 995 | 10 | 0 | 0 | 4 | 8,2 sn | ~%37 |
| Blackburne Shilling (22.10 22:38, "send" etiketi) | 27,2 sn | 1595 | 1316 | 20 | 0 | 8 | 15 | 11,7 sn | ~%43 |
| Avoid Fool's Mate (22.10 15:39, savunma) | 24 sn | 397 | 341 | 2 | 0 | 1 | 1 | 7,8 sn | ~%32 |

Takipçi: **19 (+1)**. 18:17 yedek cron'u 21:23'te başladı ve atladı.

**Teşhis:** Beat the Blackburne 7 saatte 1209 izlenme, yeni hook'lu savunmalar arasında ikinci büyük başarı (Beat the
Englund 1375). Desen: savunma videosu, tuzağı çok izlenen ve iyi bilinen bir açılış olduğunda (Englund, Blackburne)
tutuyor; Lasker / Fool's Mate savunmaları zayıf. Blackburne tuzağı 1595 izlenme ve 8 paylaşımla en iyi video olmaya devam ediyor.

**Değişiklik:** Yok ("send" etiketi bu geceki Elephant Trap ile 2. testini alıyor). Ayrıca sahibin isteğiyle bugün
"Brilliant or Blunder" quiz formatı ve otomatik yorum cevaplama eklendi (18b4d3f); ilk quiz yarın 22:35'te.

**Paylaşım:** Elephant Trap 22:38 UTC → https://www.instagram.com/reel/De2pcVTziKF/

**Sonraki hipotez:** Elephant'ta paylaşım/erişim > %0,5 → etiket kalıcı. Quiz: yorum sayısı > 5 (şimdiye kadar tüm
videolarda toplam 3 yorum var).

---

## 2026-10-23 15:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Blackburne Shilling (22.10 22:38, "send" etiketi)** | 27,2 sn | **1564** | **1294** | 20 | 0 | **8** | 15 | 11,7 sn | ~%43 |
| Avoid Fool's Mate (22.10 15:39, savunma) | 24 sn | 397 | 338 | 2 | 0 | 1 | 1 | 7,9 sn | ~%32 |
| Fool's Mate (21.10 22:38) | 20,6 sn | 1549 | 1260 | 10 | 2 | 1 | 3 | 10,5 sn | ~%51 |
| Lasker Trap (20.10 22:38) | 29,6 sn | 1445 | 1110 | 15 | 0 | 0 | 8 | 13,8 sn | ~%47 |

Takipçi: **18 (+2)**. 01:17 yedek cron'u 06:02'de başladı ve atladı.

**Teşhis (etiketin ilk testi):** Blackburne şimdiye kadarki en iyi video: en yüksek izlenme (1564) ve erişim (1294),
**8 paylaşım** (erişim başına %0,62; önceki rekor 6, son iki kısa tuzakta 0–1), kaydetme %1,2, beğeni %1,5. Hedef
(paylaşım > %0,5) tutturuldu; tavan hafifçe aşıldı. Tek veri; Elephant Trap (bu gece) ikinci test.
Avoid Fool's Mate 24 saatte 397'ye çıktı ama savunmalar hâlâ tuzakların ~1/4'ü.

**Değişiklik:** Yok (etiket 1 paylaşımda test edildi). Savunma formatı (bulmaca açılışı) sahibin cevabını bekliyor.

**Paylaşım:** Beat the Blackburne Trap 15:39 UTC → https://www.instagram.com/reel/De15e7Li_vz/

**Sonraki hipotez:** Elephant Trap'te de paylaşım/erişim > %0,5 olursa etiket kalıcı; sonra etiketin savunmalara da
eklenmesi bir aday.

---

## 2026-10-22 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Avoid Fool's Mate (15:39, yeni hook) | 24 sn | 216 | 187 | 0 | 0 | 0 | 0 | 6,1 sn | ~%25 |
| Fool's Mate (21.10 22:38) | 20,6 sn | 1545 | 1253 | 10 | 2 | 1 | 3 | 10,5 sn | ~%51 |
| Dodge the Lasker Trap (21.10 15:38, yeni hook) | 23,9 sn | 342 | 281 | 4 | 0 | 0 | 0 | 9,1 sn | ~%38 |
| Beat the Englund Gambit (20.10 15:44, yeni hook) | 26,2 sn | 1374 | 1083 | 11 | 0 | 0 | 12 | 12,3 sn | ~%47 |

Takipçi: 16. 18:17 yedek cron'u 21:35'te başladı ve atladı.

**Teşhis:** Yeni hook'lu 3 savunma videosu: 1374 / 342 / 216 izlenme. Beat the Englund bir istisna gibi duruyor; diğer ikisi
eski hook'lu savunmalara (151 / 499) yakın. Avoid Fool's Mate 7 saatte 216 izlenme, %25, 0 beğeni. Savunma videolarının
asıl sorunu hook metni değil, format: Instagram onları ilk test kitlesinin (≈200–300 kişi) ötesine taşımıyor, çünkü
izleyici ilk 6–9 sn'de çıkıyor. Tuzak videoları her seferinde ~1100–1250 kişiye ulaşıyor.

**Değişiklik:** Yok. Tuzaklardaki "send" etiketi bu geceki Blackburne Shilling ile ilk testini alıyor.

**Paylaşım:** Blackburne Shilling Trap 22:38 UTC → https://www.instagram.com/reel/De0EpfnBUoG/

**Sonraki hipotez / aday (savunmalar için, sahibe sorulacak):** Savunmayı bir bulmaca gibi açmak ("White to move.
Only *one* move doesn't lose. Find it!") → izleyici cevabı görmek için kalır ve yorum yazar. Alternatif: savunma
videolarını günde 2 paylaşımın dışında tutup tuzak sıklığını artırmak (CLAUDE.md'deki tuzak+savunma kuralı değişir →
sahibin kararı).

---

## 2026-10-22 15:35 UTC — inceleme: tuzaklara videonun ortasında "send" etiketi

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Fool's Mate (21.10 22:38, sıkıştırılmış) | 20,6 sn | **1542** | 1253 | 10 | **2** | 1 | 3 | 10,5 sn | **~%51** |
| Dodge the Lasker Trap (21.10 15:38, yeni hook) | 23,9 sn | 341 | 280 | 4 | 0 | 0 | 0 | 9,0 sn | ~%38 |
| Lasker Trap (20.10 22:38, sıkıştırılmış) | 29,6 sn | 1442 | 1108 | 14 | 0 | 0 | 8 | 13,8 sn | ~%47 |
| Beat the Englund Gambit (20.10 15:44, yeni hook) | 26,2 sn | 1374 | 1083 | 11 | 0 | 0 | 12 | 12,3 sn | ~%47 |
| Englund Gambit Trap (19.10, eski uzun) | 41 sn | 1507 | 1253 | 31 | 0 | 3 | 23 | 14,4 sn | ~%35 |
| Légal's Mate (19.10, eski uzun) | 38,6 sn | 1426 | 1198 | 36 | 0 | 6 | 16 | 14,6 sn | ~%38 |

Takipçi: 16 (+1). 01:17 yedek cron'u 06:07'de başladı ve atladı.

**Sıkıştırmanın sonucu (2 test):** İzlenme oranı %35–38 → %47–51 ✓, Fool's Mate en çok izlenen video (1542) ve ilk 2 yorum.
Ama erişim ~1100–1250'de sabit (tavan kırılmadı) ve erişim başına beğeni %2,6–3,0 → %0,8–1,3, kaydetme %1,3–1,8 → %0,2–0,7
düştü. Kısalık kalıcı (izlenme oranı ve yorum için iyi); erişimi büyütecek kaldıraç izlenme oranı değil, etkileşim.

**Teşhis:** Ortalama izleme 10–14 sn, ama tek "send" çağrısı outro'da (son birkaç saniye) → izleyicilerin çoğu hiç görmüyor.
Instagram'ın en güçlü erişim sinyali DM paylaşımı ve şu ana kadar toplam sadece 12 paylaşım var.

**Değişiklik (tek değişken, sadece tuzaklar):** Can alıcı andan hemen sonra (brilliant/great adımı, yoksa mat adımı; mat son
adımsa bir önceki adım) ekranın altında sarı bir "➤ Send this to a friend who falls for it" etiketi ~3,5 sn çıkıyor
(`SendNudge`). Sadece ekranda, seslendirme yok → süre değişmedi. O sırada filigranın yerini alıyor. Kapak (kare 0)
etkilenmiyor. Savunma videolarına uygulanmadı (ayrı ölçüm).

**Paylaşım:** Avoid Fool's Mate (savunma, yeni hook) 15:39 UTC → https://www.instagram.com/reel/DezUuQsxC5d/

**Sonraki hipotez:** Blackburne Shilling (bu gece) ve Elephant Trap ile erişim başına paylaşım > %0,5 ve beğeni > %2;
tavanı (≈1500) aşan ilk video.

---

## 2026-10-21 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dodge the Lasker Trap (15:38, yeni hook) | 23,9 sn | 203 | 175 | 4 | 0 | 0 | 0 | 7,7 sn | ~%32 |
| Lasker Trap (20.10 22:38, sıkıştırılmış) | 29,6 sn | 1431 | 1102 | 14 | 0 | 0 | 7 | 13,8 sn | ~%47 |
| Beat the Englund Gambit (20.10 15:44, yeni hook) | 26,2 sn | 1371 | 1079 | 11 | 0 | 0 | 12 | 12,4 sn | ~%47 |
| Englund Gambit Trap (19.10 22:23) | 41 sn | 1503 | 1249 | 31 | 0 | 3 | 23 | 14,5 sn | ~%35 |

Takipçi: 15. Lasker'daki tek yorum 0'a düştü (silinmiş / spam olabilir). 18:17 yedek cron'u 21:42'de başladı ve atladı.

**Teşhis:** Savunma hook'unun ikinci testi zayıf: Dodge the Lasker Trap 7 saatte 203 izlenme (Beat the Englund aynı sürede
961), %32, ort. 7,7 sn. Yine de eski hook'lu savunmalardan (%19–20, ~0 beğeni) iyi: 4 beğeni / 175 erişim (%2,3).
Fark büyük ihtimalle konudan: Lasker/Albin 900–1500 bandında, tuzağı zaten Lasker Trap videosu gösterdi; Englund ise
daha bilinen bir açılış. Sonuç: tehdit formatı eski formattan iyi ama tek başına garanti değil → savunma hook'unu
koruyoruz, ek değişiklik yok.

**Değişiklik:** Yok. Tuzak sıkıştırması bu geceki Fool's Mate ile 2. testini alıyor.

**Paylaşım:** Fool's Mate 22:38 UTC → https://www.instagram.com/reel/Dexf5c9CXmr/

**Sonraki hipotez:** Fool's Mate (0–300, 20,6 sn) > 1500 izlenme ve beğeni/erişim > %2,5 olursa sıkıştırma kalıcı;
Lasker'daki düşük beğeni konudandı. Değilse tavan için sıradaki tek değişken: paylaşım çağrısını can alıcı anın hemen
arkasına almak.

---

## 2026-10-21 15:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Lasker Trap (20.10 22:38, sıkıştırılmış) | 29,6 sn | 1396 | 1078 | 14 | **1** | 0 | 6 | 13,8 sn | **~%46** |
| Beat the Englund Gambit (20.10 15:44, yeni hook) | 26,2 sn | 1370 | 1078 | 11 | 0 | 0 | 12 | 12,4 sn | **~%47** |
| Englund Gambit Trap (19.10 22:23) | 41 sn | 1502 | 1247 | 31 | 0 | 3 | 23 | 14,5 sn | ~%35 |
| Stop Légal's Mate (19.10 15:42, eski hook) | 31,9 sn | 498 | 446 | 1 | 0 | 0 | 0 | 6,2 sn | ~%20 |
| Légal's Mate (19.10 01:11) | 38,6 sn | 1422 | 1196 | 36 | 0 | 6 | 16 | 14,6 sn | ~%38 |

Takipçi: 15 (+2). 01:17 yedek cron'u 06:02'de başladı ve 9 saat kuralıyla atladı.

**Teşhis:**
- Savunma hook'u: Beat the Englund Gambit 1370 izlenmeye çıktı (eski hook'lu savunmanın ~3 katı) ve %47 ile
  tuzaklarla aynı seviyede. Savunma formatı artık zayıf halka değil.
- Tuzak sıkıştırması (Lasker): izlenme oranı %35–38 → %46 (hedef %45 ✓), ilk yorum geldi. Ama izlenme ~1400'de kaldı
  (tavan kırılmadı) ve erişim başına beğeni %2,6–2,9 → %1,3, paylaşım 0. Ortalama izlenme yine ~14 sn → insanlar ödülü
  görüyor ama videoyu bitirip paylaşmıyor. Lasker 900–1500 bandında ve diğerlerinden daha karmaşık (alt-terfi);
  konu etkisi de olabilir, tek veriyle karar yok.

**Değişiklik:** Yok. Savunma hook'u bugünkü Dodge the Lasker Trap ile 2. testini alıyor; tuzak sıkıştırması 1 paylaşımda.

**Paylaşım:** Dodge the Lasker Trap 15:38 UTC → https://www.instagram.com/reel/Dewv0cSC4gB/

**Sonraki hipotez:** Fool's Mate (bu gece, sıkıştırılmış, 0–300 bandı, 20,6 sn) ile sıkıştırmanın 2. testi: bandın
etkisini ayırmak için izlenme > 1500 ve beğeni/erişim > %2,5 bekleniyor. Tavan sürerse sıradaki tek değişken
erişimi artıracak bir şey olmalı (ör. paylaşım sorusu / "send to a friend" anının videonun ortasına alınması).

---

## 2026-10-20 22:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Beat the Englund Gambit (15:44, yeni hook) | 26 sn | 961 | 750 | 4 | 0 | 0 | 5 | 11,2 sn | **~%43** |
| Englund Gambit Trap (19.10 22:23) | 41 sn | 1492 | 1240 | 31 | 0 | 3 | 23 | 14,5 sn | ~%35 |
| Stop Légal's Mate (19.10 15:42, eski hook) | 31,9 sn | 494 | 444 | 0 | 0 | 0 | 0 | 6,1 sn | ~%19 |
| Légal's Mate (19.10 01:11) | 38,6 sn | 1416 | 1193 | 35 | 0 | 6 | 16 | 14,5 sn | ~%38 |

Takipçi: 13 (+1). 18:17 yedek cron'u 21:36'da başladı ve 9 saat kuralıyla atladı.

**Teşhis:** Tehdit formatındaki savunma hook'unun ilk sonucu çok güçlü: 7 saatte 961 izlenme (Stop Légal's Mate'in toplamının
~2 katı), ortalama izlenme 6,1 → 11,2 sn, izlenme oranı %19 → %43 (tuzak videolarından bile yüksek), ilk kaydetmeler (5)
ve beğeniler (4). Tek veri noktası ama fark büyük.

**Değişiklik:** Yok. Savunma hook'u 1 paylaşımda, tuzak sıkıştırması 0 paylaşımda test edildi (kural: ≥ 2).
Lasker Trap (sıkıştırılmış sürüm, 29,6 sn, can alıcı an 13,1 sn) 22:38 UTC'de paylaşıldı:
https://www.instagram.com/reel/Deu7IS1hkJ5/

**Sonraki hipotez:** Lasker Trap izlenme oranı > %45 ve 1500+ izlenme (tavanın kırılması). Dodge the Lasker Trap
(yarın 15:35) savunma hook'unun ikinci testi.

---

## 2026-10-20 ~16:00 UTC — ek deney (sahibin isteği): tuzak videolarında "can alıcı an" öne çekildi

Sahip, tuzak videolarının ~1400 izlenme tavanını kırmak için bir deney istedi. Savunma hook değişikliğinden ayrı bir video
türü olduğu için iki deney birbirine karışmaz (tuzak ↔ savunma ayrı ölçülüyor).

**Teşhis:** Tuzaklarda ortalama izlenme süresi uzunluktan bağımsız olarak ~15 sn'de sabit (48 sn → 15,3; 39 sn → 14,6;
41 sn → 14,5). Ama can alıcı an (brilliant hamle / hata / mat) 17–33. saniyede geliyordu (Englund 32,7 sn,
Légal 18,5 sn). İzleyicilerin çoğu ödülü hiç görmeden çıkıyor → tamamlanma, tekrar izleme ve paylaşım düşük kalıyor;
Instagram da videoyu ilk ~1200 kişilik test kitlesinin dışına taşımıyor.

**Değişiklik (tek değişken: ödüle kadar geçen süre):** Henüz paylaşılmamış 8 tuzakta açılış hamleleri tek adımda,
tek kısa cümleyle oynanıyor; gereksiz ara cümleler çıkarıldı. Hamleler birebir aynı (assert ile kontrol edildi),
analiz değişmedi, sesler yeniden üretildi, validate 0 hata.

| Tuzak | Can alıcı an (önce → sonra) | Süre (önce → sonra) |
| --- | --- | --- |
| Lasker Trap (bu gece) | 22,6 → 13,1 sn | 41,8 → 29,6 sn |
| Fool's Mate | 16,2 → 11,5 sn | 25,3 → 20,6 sn |
| Blackburne Shilling (mat) | 30,4 → 18,0 sn | 40,3 → 27,2 sn |
| Elephant Trap | 17,6 → 11,2 sn | 36,6 → 26,8 sn |
| Fishing Pole (mat) | 31,7 → 18,8 sn | 39,9 → 26,9 sn |
| Stafford Trap | 18,3 → 11,8 sn | 36,3 → 25,4 sn |
| Kieninger Trap | 18,9 → 12,3 sn | 35,8 → 29,0 sn |
| Siberian Trap | 23,8 → 15,5 sn | 38,0 → 29,5 sn |

**Hipotez:** Ortalama izlenme ~15 sn'de kalsa bile izlenme oranı %36 → %50+; ödülü görenler arttığı için
erişim başına paylaşım ve kaydetme yükselir ve izlenme 1400 tavanını aşar. Lasker Trap ve Fool's Mate ile ölçülecek;
iki tuzakta sonuç görmeden tuzaklarda başka değişiklik yok.

---

## 2026-10-20 15:35 UTC — planlı inceleme: savunma hook'ları tehdit formatına çevrildi

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Englund Gambit Trap (19.10 22:23) | 41 sn | 1481 | 1231 | 31 | 0 | 3 | 23 | 14,5 sn | ~%36 |
| Stop Légal's Mate (19.10 15:42) | 31,9 sn | 494 | 444 | 0 | 0 | 0 | 0 | 6,1 sn | ~%19 |
| Légal's Mate (19.10 01:11) | 38,6 sn | 1415 | 1192 | 35 | 0 | 6 | 16 | 14,6 sn | ~%38 |
| Stop the Scholar's Mate (18.10 18:36) | 38,5 sn | 146 | 126 | 1 | 0 | 0 | 0 | 9,2 sn | ~%24 |
| Scholar's Mate (18.10 16:06) | 48 sn | 1317 | 1085 | 20 | 0 | 2 | 15 | 15,4 sn | ~%32 |

Takipçi: **12 (+8)**. 01:17 yedek cron'u 06:01'de (5 saat geç) başladı ve yeni 9 saat kuralı sayesinde paylaşmadan
çıktı → düzeltme işe yarıyor.

**Teşhis:** Tuzak formatı tekrarlanabilir: üç tuzak videosu da ~1300–1500 izlenme, %32–38 izlenme oranı, erişim başına
%2,5+ beğeni ve kaydetme. Englund kaydetmede en iyisi (23). Savunma videoları ise iki sürümde de çöküyor
(%19–24, beğeni ~0, ortalama 6–9 sn). Fark açılışta: tuzak hook'u bir gösteri vaat ediyor, savunma hook'u ders veriyor.

**Değişiklik (tek değişken: savunma hook metni):** Henüz paylaşılmamış 10 savunma videosunun hook'u, izleyicinin
kendisini tehdit eden/kaybettiren formata çevrildi. Satır 1 = yanlış hamlenin bedeli, satır 2 = kısa çağrı. Örnekler:
- Beat the Englund Gambit: "The *obvious* move gets you *mated*." / "Play *this* instead."
- Dodge the Fishing Pole: "Take the free knight and *get mated*." / "Don't bite. Play *this*."
- Avoid Fool's Mate: "Wrong pawn move = *instant mate*." / "Find the *safe* move."

Hareketler, adımlar ve analiz değişmedi. Hook sesleri yeniden üretildi (af_heart 1.1). 10 kapağın hepsi kontrol edildi;
Englund, Kieninger ve Fool's Mate'te taşan satırlar kısaltıldı. Validate 0 hata.

**Sonraki hipotez:** Beat the Englund Gambit (bugün) ve sonraki savunma videolarında izlenme oranı > %30, ort. izlenme
> 10 sn ve ilk beğeniler. İki savunma videosunda sonuç görülmeden başka değişiklik yok. Tuzaklarda sonraki aday: yorum
için YES/NO yerine daha kışkırtıcı bir soru.

---

## 2026-10-19 22:35 UTC — planlı inceleme (içerik değişikliği yok, zamanlama düzeltmesi)

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Englund Gambit Trap (22:23) | 41 sn | 0 | 0 | 0 | 0 | 0 | 0 | – | – (13 dk) |
| Stop Légal's Mate (15:42) | 31,9 sn | 470 | 424 | 0 | 0 | 0 | 0 | 6,0 sn | ~%19 |
| Légal's Mate (dün 01:11) | 38,6 sn | 1408 | 1187 | 35 | 0 | 6 | 16 | 14,6 sn | ~%38 |
| Stop the Scholar's Mate (18.10 18:36) | 38,5 sn | 145 | 125 | 1 | 0 | 0 | 0 | 9,0 sn | ~%23 |
| Scholar's Mate (18.10 16:06) | 48 sn | 1310 | 1078 | 19 | 0 | 2 | 15 | 15,4 sn | ~%32 |

Takipçi: 4.

**Zamanlama sorunu:** 18:17 yedek cron'u GitHub'da 4 saat gecikip 22:21'de başladı; son paylaşımın üzerinden 5 saatten fazla
geçtiği için Englund Gambit Trap'i 22:23'te paylaştı (rutin ~22:40'ta paylaşacaktı, yani pratikte sadece ~15 dk erken).
Ama aynı gecikme 01:17 cron'unda olursa (03:23 sonrası) gecenin ortasında 3. bir video çıkardı.
**Düzeltme:** cron (schedule) çalışmalarında `MIN_GAP_HOURS` 9 saat; rutin/manuel tetiklemelerde 5 saat kaldı.
Slotlar (~15:45 / ~22:40) arası 7 ve 17 saat olduğundan yedek cron artık sadece rutin bir slotu kaçırırsa paylaşır.

**Teşhis:** Savunma videoları kesin olarak zayıf: Stop Légal's Mate yeni sürüme rağmen %19 izlenme oranı (ort. 6 sn),
424 erişimde 0 beğeni/kaydetme/paylaşım. Aynı çiftin tuzak videosu %38 ve 35 beğeni. Eski sürümdeki Stop the Scholar's Mate
de %23'tü → sorun sürüm değil, savunma formatının açılışı. Tuzak hook'ları bir gösteri vaat ediyor ("queen sacrifice →
checkmate"); savunma hook'ları ders veriyor ("Here's how to stop it") ve ilk 6 saniyede kaybediyor.

**Değişiklik (içerik):** Yok. En yeni paylaşım (Englund) 13 dakikalık; kural gereği bu incelemede içerik değişmiyor.
Bir sonraki savunma videosu (Beat the Englund Gambit) yarın 15:35 incelemesinden sonra çıkacağı için değişiklik orada
yapılabilir, ona da yetişir.

**Sonraki hipotez / plan (yarın 15:35):** Tek değişken: savunma hook'larını tehdit/meydan okuma formatına çevirmek
(ör. "You play this move... and *lose in 6 moves*." / "Can you spot the *trap*?"), kalan savunma videolarına uygulanır.
Hedef: savunma videolarında izlenme oranı > %30 ve ilk beğeniler. Englund Gambit Trap'in sonuçları da tuzak formatının
%38'i tekrarlayıp tekrarlamadığını gösterecek.

---

## 2026-10-19 15:35 UTC — planlı inceleme + paylaşım (değişiklik yok)

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Légal's Mate (01:11, c7a3eaa) | 38,6 sn | 1400 | 1176 | 34 | 0 | 6 | 16 | 14,6 sn | ~%38 |
| Stop the Scholar's Mate (dün 18:36) | 38,5 sn | 145 | 125 | 1 | 0 | 0 | 0 | 9,0 sn | ~%23 |
| Scholar's Mate (dün 16:06) | 48 sn | 1306 | 1074 | 19 | 0 | 2 | 15 | 15,3 sn | ~%32 |

Takipçi: 4. Son `post-reel` (01:09) başarılı. `refresh-ig-token` 13:11'de hata verdi: token geçerli (60 gün), ama
Instagram yeni token döndürdü ve `GH_PAT` secret'ı olmadığı için kaydedilemedi — paylaşımı engellemiyor, mevcut token
~60 gün daha çalışır.

**Teşhis:** c7a3eaa paketinin ilk testi (Légal's Mate) net iyileşme gösteriyor: erişim başına beğeni %1,8 → %2,9,
ilk gerçek paylaşımlar (6; erişim başına %0,5), izlenme oranı %32 → %38 (hedef %40'a yakın). Ortalama izlenme süresi
~15 sn'de sabit; yani kısalma oranı yükseltti ama izleyiciler hâlâ ~15. saniyede çıkıyor. Yorum hâlâ 0 —
YES/NO sorusu henüz yorum getirmedi.

**Değişiklik:** Yok. c7a3eaa paketi sadece 1 paylaşımda test edildi (kural: ≥ 2). Stop Légal's Mate (31,9 sn,
c7a3eaa sürümünün ilk savunma videosu) 15:42 UTC'de rutin tarafından zamanında paylaşıldı.

**Sonraki hipotez:** Stop Légal's Mate izlenme oranı > %35 olursa savunma formatı sorun değil (eski sürüm suçluydu);
< %25 kalırsa savunma hook'ları güçlendirilecek. Tuzaklarda ~15. saniyedeki düşüş sürerse bir sonraki tek değişken
olarak orta bölüme (ilk hamlelerden hemen sonra) bir "re-hook" eklenmesi denenecek.

---

## 2026-10-18 21:46 UTC — planlı inceleme (değişiklik yok)

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Stop the Scholar's Mate (18:36) | 38,5 sn | 137 | 121 | 1 | 0 | 0 | 0 | 8,5 sn | ~%22 |
| Scholar's Mate (16:06) | 48 sn | 1227 | 969 | 16 | 0 | 0 | 14 | 15,2 sn | ~%32 |

Takipçi: 4 (+1). Son `post-reel` çalışması başarılı; hata yok.

**Teşhis:** Savunma videosu 3 saatte durdu (134 → 137 izlenme), tuzak videosu büyümeye devam ediyor (1094 → 1227).
Savunma videosu hem eski sürüm hem de tuzaktan 2,5 saat sonra paylaşıldı; tek veriyle hook'un suçlu olduğu söylenemez.

**Değişiklik:** Yok. En yeni paylaşım < 6 saat ve < 150 izlenme; c7a3eaa paketi henüz hiçbir videoda test edilmedi.

**Sonraki hipotez:** Légal's Mate (bu gece, c7a3eaa sürümü) ile izlenme oranı > %40, ilk yorum/paylaşım.
Bir sonraki savunma videosu (Stop Légal's Mate) da < %25 kalırsa savunma hook'ları güçlendirilecek.

---

## 2026-10-18 21:10 UTC — ikinci ölçüm (değişiklik yok)

| Video | Paylaşım | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Scholar's Mate | elle, 16:06 | 48 sn | 1094 | 890 | 13 | 0 | 0 | 14 | 15,0 sn | ~%31 |
| Stop the Scholar's Mate | otomatik, 18:36 | 38,5 sn (eski sürüm) | 134 | 119 | 1 | 0 | 0 | 0 | 8,0 sn | ~%21 |

Takipçi: 3.

**Not:** `stats.ts`'teki "Length/Watch %" güncel kod uzunluğunu kullanıyor; bu iki video eski sürümle paylaşıldı, doğru oranlar yukarıda.
GitHub zamanlayıcısı 16:07 paylaşımını ~2,5 saat geciktirdi (18:34'te başladı), bu yüzden Stop the Scholar's Mate
c7a3eaa iyileştirmelerinden ÖNCEKİ kodla çıktı (başlık kartı, uzun outro, CTA/soru yok).

**Teşhis:** Tuzak videosu büyümeye devam ediyor (503 → 1094 izlenme), kaydetme/erişim %1,6 ile en güçlü sinyal.
Savunma videosu zayıf (%21 izlenme oranı) ama veri yetersiz (2,5 saat, 134 izlenme) ve eski sürüm.
Yorum ve paylaşım 0 — CTA'lar henüz hiçbir videoda yayında değil.

**Değişiklik:** Yok (c7a3eaa paketi henüz hiç test edilmedi; veri yetersiz).

**Sonraki hipotez:** Légal's Mate (c7a3eaa sürümü, 39 sn) ile izlenme oranı > %40 ve ilk yorum/paylaşımlar.
Savunma videoları tuzak videolarından belirgin şekilde düşük kalırsa savunma hook'ları güçlendirilecek.

---

## 2026-10-18 19:30 UTC — ilk ölçüm ve ilk iyileştirme paketi

| Video | Süre (paylaşılan) | İzlenme | Erişim | Beğeni | Yorum | Paylaşım | Kaydetme | Ort. izlenme | İzlenme oranı |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Scholar's Mate (elle, 2026-10-18 16:06) | 48 sn | 503 | 363 | 3 | 0 | 0 | 3 | 13,1 sn | ~%27 |

Takipçi: 2.

**Teşhis:** Hook işe yarıyor (0 takipçiyle 363 erişim), kaydetme iyi, ama izleyici ~13. saniyede kopuyor; yorum ve paylaşım yok.

**Değişiklikler (commit c7a3eaa, bu geceki Stop the Scholar's Mate'ten itibaren):**
- Hook sonrası başlık kartı kaldırıldı; açılış hamleleri ve geçişler hızlandı; seslendirme 1.1x.
- Outro'da maddeler sadece ekranda; sadece CTA seslendiriliyor. Videolar 22–42 sn (önce 31–69 sn).
- Sonda "Send this to a friend who falls for it" (ekran + ses); açıklamaya YES/NO sorusu ve DM paylaşım çağrısı.

**Hipotez:** İzlenme oranı %27 → %45+; paylaşım ve yorum > 0.
