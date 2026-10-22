/* Logik der Webseite. Inhalte stehen in data.js, Texte in i18n.js. */
(function () {
  "use strict";

  const LOCALES = { de: "de-DE", it: "it-IT", en: "en-GB" };
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  let lang = "de";

  /* ---------- Hilfen ---------- */
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); }
    catch (e) { return null; }
  }
  function t(key) { return (TEXT[lang] && TEXT[lang][key]) ?? TEXT.de[key] ?? key; }
  function tr(obj) { return obj ? (obj[lang] || obj.de || "") : ""; }
  function parseDate(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
  function today() { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function fmtDate(d, opts) { return new Intl.DateTimeFormat(LOCALES[lang], opts || { day: "numeric", month: "long", year: "numeric" }).format(d); }
  function fmtRange(a, b) {
    if (iso(a) === iso(b)) return fmtDate(a, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return fmtDate(a, { day: "numeric", month: "long" }) + " – " + fmtDate(b);
  }
  function price(n) { return new Intl.NumberFormat(LOCALES[lang], { style: "currency", currency: "EUR" }).format(n); }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function timeText(s) { return t("uhr") ? s + " " + t("uhr") : s; }

  /* ---------- Sprache ---------- */
  function detectLang() {
    const saved = store("heinis-lang");
    if (saved && TEXT[saved]) return saved;
    const nav = (navigator.language || "de").slice(0, 2);
    return TEXT[nav] ? nav : "de";
  }
  function setLang(l) {
    lang = TEXT[l] ? l : "de";
    document.documentElement.lang = lang;
    store("heinis-lang", lang);
    $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $$("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    $$("[data-lang-block]").forEach((n) => { n.hidden = n.dataset.langBlock !== lang; });
    render();
  }

  /* ---------- Inhalte rendern ---------- */
  function render() {
    const K = SITE.kontakt;
    const tage = t("tage");
    const ruhe = SITE.ruhetage.map((d) => tage[d]).join(", ");

    $$(".js-tel").forEach((a) => (a.href = "tel:" + K.telefonLink));
    $$(".js-tel-text").forEach((s) => (s.textContent = K.telefon));
    const adr = lang === "it" ? K.adresseIt : K.adresse;

    if ($("#fact-kueche")) {
      $("#fact-kueche").textContent = timeText(SITE.kueche.von + "–" + SITE.kueche.bis);
      $("#fact-ruhetag").textContent = ruhe;
      const bar = tr(SITE.bar);
      $("#fact-bar-wrap").hidden = !bar;
      $("#fact-bar").textContent = bar;
      $("#fact-adresse").textContent = adr;
      $("#fact-adresse").href = K.mapsLink;
      $("#res-times").textContent = t("info.kueche") + ": " + t("info.taeglichAusser") + " " + ruhe + ", " + timeText(SITE.kueche.von + "–" + SITE.kueche.bis);
      $("#c-adresse").textContent = adr;
      $("#c-email").textContent = K.email; $("#c-email").href = "mailto:" + K.email;
      $("#c-maps").href = K.mapsLink; $("#c-fb").href = K.facebook;
      renderUrlaub(); renderKarte(); renderEvents(); renderGalerie(); renderFormOptions();
    }
    const j = $("#jahr"); if (j) j.textContent = new Date().getFullYear();
  }

  function aktuelleUrlaube() { const h = today(); return (SITE.urlaub || []).filter((u) => parseDate(u.bis) >= h); }

  function renderUrlaub() {
    const h = today();
    const u = aktuelleUrlaube().find((u) => (parseDate(u.von) - h) / 864e5 <= 30);
    $("#urlaub").hidden = !u;
    if (u) $("#urlaub-text").textContent = t("urlaub.text").replace("{von}", fmtDate(parseDate(u.von))).replace("{bis}", fmtDate(parseDate(u.bis)));
  }

  function renderKarte() {
    $("#karte-stand").textContent = tr(SITE.karteStand);
    const list = $("#karte-list"); list.replaceChildren();
    SITE.karte.forEach((cat) => {
      const box = el("div", "menu-cat");
      box.append(el("h3", null, tr(cat.kategorie)));
      cat.gerichte.forEach((g) => {
        const d = el("div", "dish");
        d.append(el("span", "dish-name", tr(g.name)), el("span", "dish-price", price(g.preis)));
        if (tr(g.text)) d.append(el("span", "dish-text", tr(g.text)));
        const meta = el("div", "dish-meta");
        if (g.veg) meta.append(el("span", "tag tag-veg", t("karte.veg")));
        if (g.allergene && g.allergene.length) {
          const a = el("span", "tag", t("karte.allergeneTitle") + ": " + g.allergene.join(", "));
          a.title = g.allergene.map((n) => tr(ALLERGENE[n])).join(", ");
          meta.append(a);
        }
        if (meta.childElementCount) d.append(meta);
        box.append(d);
      });
      list.append(box);
    });
    const ol = $("#allergene-list"); ol.replaceChildren();
    Object.keys(ALLERGENE).forEach((n) => ol.append(el("li", null, tr(ALLERGENE[n]))));
  }

  function kommendeEvents() {
    const h = today();
    return SITE.events.filter((e) => parseDate(e.bis) >= h).sort((a, b) => parseDate(a.von) - parseDate(b.von));
  }

  function renderEvents() {
    const list = $("#events-list"); list.replaceChildren();
    const h = today();
    const evs = kommendeEvents();
    if (!evs.length) { list.append(el("p", "sub", t("events.leer"))); return; }
    evs.forEach((e) => {
      const von = parseDate(e.von), bis = parseDate(e.bis);
      const card = el("article", "event" + (von <= h ? " event-now" : ""));
      if (e.bild) { const img = el("img"); img.src = e.bild; img.alt = tr(e.titel); img.loading = "lazy"; card.append(img); }
      card.append(el("p", "event-date", fmtRange(von, bis)), el("h3", null, tr(e.titel)), el("p", null, tr(e.text)));
      if (e.vormerkung) card.append(el("span", "tag", t("events.vormerkung")));
      const a = el("a", null, t("events.reservieren") + " →"); a.href = "#reservieren";
      a.addEventListener("click", () => { const s = $("#f-anlass"); if (s) s.value = tr(e.titel); });
      card.append(a);
      list.append(card);
    });
  }

  function renderGalerie() {
    const g = $("#galerie"); g.replaceChildren();
    SITE.galerie.forEach((f) => {
      const fig = el("figure");
      if (f.datei) { const img = el("img"); img.src = f.datei; img.alt = tr(f.text); img.loading = "lazy"; fig.append(img); }
      else fig.append(el("div", "ph", t("fotos.platzhalter")));
      fig.append(el("figcaption", null, tr(f.text)));
      g.append(fig);
    });
  }

  function renderFormOptions() {
    const z = $("#f-zeit"), prevZ = z.value;
    z.replaceChildren();
    const [vh, vm] = SITE.kueche.von.split(":").map(Number), [bh, bm] = SITE.kueche.bis.split(":").map(Number);
    for (let m = vh * 60 + vm; m <= bh * 60 + bm; m += 30) {
      const s = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
      const o = el("option", null, timeText(s)); o.value = s; z.append(o);
    }
    z.value = prevZ || "19:00";
    const a = $("#f-anlass"), prevA = a.value;
    a.replaceChildren(el("option", null, t("f.anlassKeins")));
    a.firstChild.value = "";
    kommendeEvents().forEach((e) => { const o = el("option", null, tr(e.titel)); o.value = tr(e.titel); a.append(o); });
    a.value = prevA;
    $("#f-datum").min = iso(today());
  }

  /* ---------- Reservierung ---------- */
  function showMsg(text, ok) {
    const m = $("#f-msg"); m.textContent = text; m.className = "msg " + (ok ? "ok" : "err"); m.hidden = false;
  }

  function validate() {
    const need = ["#f-name", "#f-tel", "#f-datum", "#f-zeit", "#f-personen"];
    if (need.some((s) => !$(s).value.trim()) || !$("#f-consent").checked) return t("f.errPflicht");
    const d = parseDate($("#f-datum").value);
    if (d < today()) return t("f.errVergangen");
    if (SITE.ruhetage.includes(d.getDay())) return t("f.errRuhetag");
    if ((SITE.urlaub || []).some((u) => d >= parseDate(u.von) && d <= parseDate(u.bis))) return t("f.errUrlaub");
    return null;
  }

  function collect() {
    const d = parseDate($("#f-datum").value);
    return {
      Name: $("#f-name").value.trim(),
      Telefon: $("#f-tel").value.trim(),
      "E-Mail": $("#f-email").value.trim(),
      Datum: new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }).format(d),
      Uhrzeit: $("#f-zeit").value,
      Personen: $("#f-personen").value,
      Event: $("#f-anlass").value || "–",
      Anmerkungen: $("#f-notiz").value.trim() || "–",
      Sprache: lang.toUpperCase()
    };
  }

  async function submit(ev) {
    ev.preventDefault();
    const err = validate(); if (err) { showMsg(err, false); return; }
    if ($(".hp").value) return; // Spam-Falle
    const data = collect();
    const btn = $("#f-submit"); btn.disabled = true; btn.textContent = t("f.sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + SITE.formular.empfaenger, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({
          _subject: "Reservierung: " + data.Datum + ", " + data.Uhrzeit + ", " + data.Personen + " Pers. – " + data.Name,
          _template: "table",
          _replyto: data["E-Mail"] || undefined
        }, data))
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || String(j.success) === "false") throw new Error(j.message || res.status);
      showMsg(t("f.ok"), true);
      $("#res-form").reset(); renderFormOptions();
    } catch (e) {
      showMsg(t("f.err"), false);
    } finally {
      btn.disabled = false; btn.textContent = t("f.senden");
    }
  }

  function whatsapp() {
    const err = validate(); if (err) { showMsg(err, false); return; }
    const d = collect();
    const text = "Reservierungsanfrage Heini's\n" + Object.entries(d).filter(([k, v]) => v && v !== "–").map(([k, v]) => k + ": " + v).join("\n");
    const a = document.createElement("a");
    a.href = "https://wa.me/" + SITE.kontakt.telefonLink.replace("+", "") + "?text=" + encodeURIComponent(text);
    a.target = "_blank"; a.rel = "noopener";
    document.body.append(a); a.click(); a.remove();
  }

  /* ---------- Start ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    $$("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    const f = $("#res-form");
    if (f) {
      f.addEventListener("submit", submit);
      if (SITE.formular.whatsapp) $("#f-wa").addEventListener("click", whatsapp); else $("#f-wa").hidden = true;
    }
    setLang(detectLang());
  });
})();
