# Growth log – @checksmatedaily

Her istatistik kontrolünde (her paylaşımdan ~1 saat önce otomatik çalışan inceleme) yeni bir kayıt eklenir:
istatistikler, teşhis, yapılan değişiklik ve test edilen hipotez. En yeni kayıt en üstte.

Kurallar (inceleme oturumu için):
- Bir seferde **tek bir değişken** değiştir ki etkisi ölçülebilsin; en az 2 paylaşım sonuç görmeden aynı şeyi tekrar değiştirme.
- Yeterli veri yoksa (paylaşımdan < 6 saat geçtiyse veya < 150 izlenme) sadece kaydet, değiştirme.
- Hedef metrikler: izlenme oranı (Watch %), erişim başına paylaşım/kaydetme/beğeni, takipçi artışı.

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
