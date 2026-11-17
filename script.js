// ===== Sayt matnlari (UZ — yangi alifboda, EN — inglizcha) =====
const MATN = {
  uz: {
    menyu_bosh: "Bosh sahifa",
    menyu_kitoblar: "Kitoblar",
    menyu_aloqa: "Aloqa",
    iqtibos: "Kitob öqigan odam — ming hayotni yaşagan odam. Jorj R. R. Martin",
    tema_tungi: "Tungi rejim",
    tema_kunduzgi: "Kunduzgi rejim",
    kanal_haqida: "Özim tomonimdan öqilgan kitoblar, şuningdek, kitoblardan olingan iqtiboslar haqida atrofliça mulohaza yuritiladi.",
    tg_kanal: "Telegram kanal",
    tg_egasi: "Kanal egasiga yozish",
    muallif: "Muallif"
  },
  en: {
    menyu_bosh: "Home",
    menyu_kitoblar: "Books",
    menyu_aloqa: "Contact",
    iqtibos: "A person who reads books has lived a thousand lives. George R. R. Martin",
    tema_tungi: "Dark mode",
    tema_kunduzgi: "Light mode",
    kanal_haqida: "Thoughts on books I have read, as well as quotes taken from them.",
    tg_kanal: "Telegram channel",
    tg_egasi: "Message the channel owner",
    muallif: "Author"
  }
};

let til = "uz";      // hozirgi til
let kitoblar = [];   // kitoblar.json dan keladi

// Oxirgi tanlangan tilni eslab qolish (bo'lmasa, uz)
try {
  const saqlangan = localStorage.getItem("til");
  if (saqlangan === "uz" || saqlangan === "en") til = saqlangan;
} catch (e) {}

// ===== Tema (tungi / kunduzgi) =====
// Boshlang'ich temani index.html ichidagi kichik skript qo'ygan
function temaTugmasi() {
  const tungi = document.documentElement.dataset.tema === "dark";
  const t = document.getElementById("tema");
  t.textContent = tungi ? "☀" : "☾";  // tungida quyosh, kunduzida oy ko'rinadi
  const yozuv = tungi ? MATN[til].tema_kunduzgi : MATN[til].tema_tungi;
  t.title = yozuv;
  t.setAttribute("aria-label", yozuv);
}

document.getElementById("tema").addEventListener("click", () => {
  const yangi = document.documentElement.dataset.tema === "dark" ? "light" : "dark";
  document.documentElement.dataset.tema = yangi;
  try { localStorage.setItem("tema", yangi); } catch (e) {}
  temaTugmasi();
});

// ===== Kartalarni chizish =====
function kartalarniChiz() {
  const quti = document.getElementById("kartalar");
  quti.innerHTML = "";
  kitoblar.forEach((k, i) => {
    const karta = document.createElement("button");
    karta.type = "button";
    karta.className = "karta";

    const rasm = document.createElement("img");
    rasm.src = k.rasm;
    rasm.alt = k.nom[til];
    rasm.loading = "lazy";

    const nom = document.createElement("div");
    nom.className = "nom";
    nom.textContent = k.nom[til];

    karta.append(rasm, nom);

    // Muallif bo'sh bo'lsa, ko'rsatmaymiz
    if (k.muallif[til]) {
      const m = document.createElement("div");
      m.className = "muallif";
      m.textContent = k.muallif[til];
      karta.append(m);
    }

    karta.addEventListener("click", () => oynaOch(i));
    quti.append(karta);
  });
}

// ===== Batafsil oynani ochish =====
function oynaOch(i) {
  const k = kitoblar[i];
  document.getElementById("oyna-rasm").src = k.rasm;
  document.getElementById("oyna-rasm").alt = k.nom[til];
  document.getElementById("oyna-nom").textContent = k.nom[til];
  const m = document.getElementById("oyna-muallif");
  m.textContent = k.muallif[til] ? MATN[til].muallif + ": " + k.muallif[til] : "";
  document.getElementById("oyna-tavsif").textContent = k.tavsif[til];
  document.getElementById("oyna").showModal();
}

// ===== Tilni qo'llash =====
function tilniQollash() {
  document.documentElement.lang = til;
  // data-t belgili hamma elementlar matnini almashtiramiz
  document.querySelectorAll("[data-t]").forEach(el => {
    el.textContent = MATN[til][el.dataset.t];
  });
  // faol til tugmasini bo'yaymiz
  document.querySelectorAll(".til button").forEach(b => {
    b.classList.toggle("faol", b.dataset.til === til);
  });
  temaTugmasi();
  kartalarniChiz();
  document.getElementById("oyna").close(); // ochiq oyna bo'lsa, yopamiz
}

// ===== Tugmalar =====
document.querySelectorAll(".til button").forEach(b => {
  b.addEventListener("click", () => {
    til = b.dataset.til;
    try { localStorage.setItem("til", til); } catch (e) {}
    tilniQollash();
  });
});

document.getElementById("yopish").addEventListener("click", () => {
  document.getElementById("oyna").close();
});

// Oyna tashqarisi bosilsa ham yopiladi
document.getElementById("oyna").addEventListener("click", e => {
  if (e.target.id === "oyna") e.target.close();
});

// ===== Boshlash: kitoblar.json ni yuklaymiz =====
tilniQollash(); // kitoblar kelguncha matnlar chiqib turadi
fetch("kitoblar.json")
  .then(r => r.json())
  .then(data => { kitoblar = data; kartalarniChiz(); })
  .catch(() => {
    document.getElementById("kartalar").textContent = "kitoblar.json yuklanmadi";
  });
