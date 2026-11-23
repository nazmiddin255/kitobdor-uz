# Kitobdor.uz

![AI yordamida yaratilgan](https://img.shields.io/badge/AI_yordamida-yaratilgan-blue)

## English

"Kitobdor.uz" is a small showcase website for a Telegram channel that recommends rare and useful books. It has short descriptions of the books, a UZ/EN language switch and a light/dark theme. It is not a shop: no sales or delivery. Live site: https://nazmiddin255.github.io/kitobdor-uz/

**Add a new book:** put the cover image into `rasmlar/` (e.g. `11.jpg`) and add one block to `kitoblar.json` (title, author, image, description in `uz` and `en`). No code changes are needed; the site renders the cards from `kitoblar.json`.

**Run locally:** `python3 -m http.server 8000`, then open `http://localhost:8000`. Opening `index.html` directly will not load `kitoblar.json`.

Built with plain HTML, CSS and JavaScript (no framework, no server). Created with AI assistance (Claude Code); the author reads and tests the code.

*(O'zbekcha matn quyida / Uzbek text below)*

---

"Kitobdor.uz" Telegram kanali uçun kitoblar vitrinasi. Kanalda taniştirilgan kitoblar, qisqa tavsiflar, UZ/EN tili va tungi/kunduzgi rejim bor. Sotuv va yetkazib berish yöq.

Sayt: https://nazmiddin255.github.io/kitobdor-uz/

## AI yordamida yaratilgan

Bu loyiha AI (Claude Code) yordamida yaratilgan. AI'dan vaqtni tejaş uçun foydalandim, lekin talablarni, tuzilmani va qarorlarni özim belgilayman. Dasturlaş asoslarini bilaman: AI yozgan har bir kodni özim öqib çiqaman va brauzerda sinab köraman.

## Yangi kitob qöşiş

1. Kitob rasmini `rasmlar/` papkasiga qöying (masalan, `11.jpg`).
2. `kitoblar.json` ga bitta yangi blok qöşing: nom, muallif, rasm va tavsif (uz va en).

Kodga tegiş şart emas, sayt kartalarni `kitoblar.json` dan özi çizadi.

## Texnologiyalar

HTML, CSS va JavaScript. Framework va server yöq.

## Mahalliy ishga tuşiriş

```
python3 -m http.server 8000
```

Keyin brauzerda `http://localhost:8000` ni oçing. `index.html` ni töğridan-töğri oçsangiz, `kitoblar.json` yuklanmaydi.

Muallif: Nazmiddin ([@nazmiddin255](https://github.com/nazmiddin255))
