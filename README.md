# Webseite Heini's – Anleitung

Reine statische Webseite (HTML, CSS, JavaScript). Kein CMS, keine Datenbank,
kein Build-Schritt. Läuft auf jedem Webhosting – einfach den ganzen Ordner hochladen.

## Ordner

```
index.html          Startseite (alle Abschnitte)
impressum.html      Impressum – Vorlage, [gelbe Stellen] ersetzen
datenschutz.html    Datenschutz – Vorlage, [gelbe Stellen] ersetzen
css/style.css       Aussehen
js/data.js          ← INHALTE: Karte, Events, Urlaub, Fotos, Kontakt
js/i18n.js          feste Texte in DE / IT / EN
js/main.js          Logik (Sprache, Rendering, Formular)
img/                Logo und Fotos
```

Für die normale Pflege brauchst du nur **`js/data.js`** und den Ordner **`img/`**.

## Häufige Aufgaben

**Speisekarte ändern** – in `data.js` den Block `karte` bearbeiten. Preise als
Zahl mit Punkt (`13.50`), Allergene als Nummern (`[1, 3, 7]`), `veg: true` für
vegetarisch. `karteStand` anpassen. Wenn die echte Karte drin ist, in
`i18n.js` den Text `karte.beispiel` auf `""` setzen oder in `index.html` die
Zeile `<p class="beispiel" …>` löschen.

**Event eintragen** – in `events` einen Eintrag kopieren, `von`/`bis`
(`"JJJJ-MM-TT"`) und Texte anpassen. Vergangene Events verschwinden
automatisch, laufende werden hervorgehoben und erscheinen im Formular als Auswahl.

**Urlaub eintragen** – in `urlaub` z. B. `{ von: "2027-01-07", bis: "2027-01-28" }`.
Ab 30 Tage vorher erscheint oben ein Hinweis, die Tage sind im Formular gesperrt.

**Fotos** – Bilder in `img/` legen (am besten auf ca. 1600 px Breite
verkleinern, JPG/WebP), dann in `galerie` bei `datei` den Pfad eintragen,
z. B. `"img/schlutzkrapfen.jpg"`. Für Events optional `bild: "img/…"`.

**Bar-Öffnungszeiten** – in `bar` eintragen, dann erscheinen sie in der Infozeile.

## Reservierungsformular

Das Formular schickt eine E-Mail über **FormSubmit** (kostenlos, ohne Anmeldung)
an `barsalurn@yahoo.it`:

1. Seite online stellen und **einmal** eine Test-Reservierung absenden.
2. FormSubmit schickt eine Bestätigungs-Mail an barsalurn@yahoo.it → Link klicken.
3. Ab dann kommt jede Anfrage als E-Mail (Tabelle mit allen Angaben).
4. Tipp: In der Bestätigungs-Mail bekommst du einen Alias-Code. Wenn du in
   `data.js` bei `empfaenger` diesen Code statt der E-Mail einträgst, ist deine
   Adresse nicht mehr im Quelltext sichtbar.

Für Push-Nachrichten aufs Handy: in der Yahoo-Mail-App Benachrichtigungen
aktivieren (oder einen Filter auf den Betreff „Reservierung:“ legen).
Zusätzlich gibt es den Button **„Per WhatsApp senden“** – der Gast schickt dir
die fertige Anfrage direkt per WhatsApp an +39 349 505 9138.

Formular-Regeln: Donnerstag (Ruhetag), Urlaubstage und vergangene Tage werden
abgelehnt; Uhrzeiten 18:00–20:30 im 30-Minuten-Takt (aus `kueche` berechnet).

## Datenschutz-Hinweise vor dem Livegang

- **Google Fonts lokal einbinden** (empfohlen, DSGVO): Schriften „Jost“ und
  „Source Sans 3“ z. B. über https://gwfh.mranftl.com herunterladen, in
  `fonts/` legen, die `@font-face`-Regeln an den Anfang von `style.css`
  kopieren und in allen drei HTML-Dateien die `<link … fonts.googleapis.com …>`
  Zeilen löschen. Danach Abschnitt 4 in `datenschutz.html` entfernen.
- Impressum: In Italien müssen u. a. **Partita IVA**, REA-Nr. und PEC auf der Seite stehen.
- Datenschutz-Vorlage kurz prüfen lassen (z. B. HGV / Steuerberater).

## Lokal ansehen

`index.html` im Browser öffnen genügt. Das Formular-Senden funktioniert erst
online (über http/https).
