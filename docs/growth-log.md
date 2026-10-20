# Growth log – @checksmatedaily

Her istatistik kontrolünde (her paylaşımdan ~1 saat önce otomatik çalışan inceleme) yeni bir kayıt eklenir:
istatistikler, teşhis, yapılan değişiklik ve test edilen hipotez. En yeni kayıt en üstte.

Kurallar (inceleme oturumu için):
- Bir seferde **tek bir değişken** değiştir ki etkisi ölçülebilsin; en az 2 paylaşım sonuç görmeden aynı şeyi tekrar değiştirme.
- Yeterli veri yoksa (paylaşımdan < 6 saat geçtiyse veya < 150 izlenme) sadece kaydet, değiştirme.
- Hedef metrikler: izlenme oranı (Watch %), erişim başına paylaşım/kaydetme/beğeni, takipçi artışı.

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
