# Growth log – @checksmatedaily

Her istatistik kontrolünde (her paylaşımdan ~1 saat önce otomatik çalışan inceleme) yeni bir kayıt eklenir:
istatistikler, teşhis, yapılan değişiklik ve test edilen hipotez. En yeni kayıt en üstte.

Kurallar (inceleme oturumu için):
- Bir seferde **tek bir değişken** değiştir ki etkisi ölçülebilsin; en az 2 paylaşım sonuç görmeden aynı şeyi tekrar değiştirme.
- Yeterli veri yoksa (paylaşımdan < 6 saat geçtiyse veya < 150 izlenme) sadece kaydet, değiştirme.
- Hedef metrikler: izlenme oranı (Watch %), erişim başına paylaşım/kaydetme/beğeni, takipçi artışı.

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
