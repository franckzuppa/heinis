/* =====================================================================
   HEINI'S – INHALTE ZUM PFLEGEN
   Hier änderst du Speisekarte, Events, Urlaub und Kontaktdaten.
   Jeder Text gibt es in drei Sprachen: de / it / en.
   Datumsformat immer: "JJJJ-MM-TT" (z. B. "2026-12-31").
   Nach dem Speichern einfach die Datei neu hochladen – fertig.
   ===================================================================== */

const SITE = {

  /* ---------- Kontakt ---------- */
  kontakt: {
    telefon: "+39 349 505 9138",        // Anzeige
    telefonLink: "+393495059138",        // ohne Leerzeichen, für Anruf-/WhatsApp-Link
    email: "barsalurn@yahoo.it",
    adresse: "Josef-Noldin-Straße 2, 39040 Salurn (BZ)",
    adresseIt: "Via Josef Noldin 2, 39040 Salorno (BZ)",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Josef-Noldin-Stra%C3%9Fe+2+39040+Salurn",
    facebook: "https://www.facebook.com/people/Heinis-Bar/100057390860673/"
  },

  /* ---------- Reservierungsformular ----------
     Das Formular schickt Anfragen per E-Mail über den kostenlosen Dienst
     FormSubmit (formsubmit.co). Beim allerersten Absenden kommt eine
     Bestätigungs-Mail an die Adresse unten – einmal bestätigen, danach
     laufen alle Anfragen direkt ins Postfach. Details: README.md */
  formular: {
    empfaenger: "barsalurn@yahoo.it",
    whatsapp: true               // zusätzlicher Button "per WhatsApp senden"
  },

  /* ---------- Zeiten ----------
     Wochentage: 0 = Sonntag, 1 = Montag … 4 = Donnerstag … 6 = Samstag */
  ruhetage: [4],
  kueche: { von: "18:00", bis: "20:30" },
  /* Öffnungszeiten der Bar – bitte ergänzen (leer lassen = wird nicht angezeigt) */
  bar: { de: "", it: "", en: "" },

  /* ---------- Urlaub / Betriebsferien ----------
     Einträge werden automatisch als Hinweis oben angezeigt (ab 30 Tage
     vorher) und Tage im Formular gesperrt. Vergangene Einträge verschwinden. */
  urlaub: [
    // { von: "2027-01-07", bis: "2027-01-28" },
  ],

  /* ---------- Speisekarte ----------
     BEISPIELKARTE – bitte durch die echte Karte ersetzen.
     allergene: Nummern laut Allergenliste (siehe ALLERGENE unten).
     veg: true = vegetarisch */
  karteStand: { de: "Herbst 2026", it: "Autunno 2026", en: "Autumn 2026" },
  karte: [
    {
      kategorie: { de: "Vorspeisen", it: "Antipasti", en: "Starters" },
      gerichte: [
        { name: { de: "Südtiroler Brettljause", it: "Tagliere altoatesino", en: "South Tyrolean platter" },
          text: { de: "Speck, Kaminwurzen, Bergkäse, Schüttelbrot", it: "Speck, Kaminwurz, formaggio di malga, Schüttelbrot", en: "Speck, smoked sausage, mountain cheese, crispbread" },
          preis: 14.50, allergene: [1, 7] },
        { name: { de: "Rindscarpaccio", it: "Carpaccio di manzo", en: "Beef carpaccio" },
          text: { de: "mit Rucola und Parmesan", it: "con rucola e grana", en: "with rocket and parmesan" },
          preis: 13.00, allergene: [7] }
      ]
    },
    {
      kategorie: { de: "Hauptgerichte", it: "Piatti principali", en: "Main courses" },
      gerichte: [
        { name: { de: "Schlutzkrapfen", it: "Mezzelune ripiene", en: "Schlutzkrapfen" },
          text: { de: "hausgemacht, mit Spinat-Topfen-Füllung, braune Butter, Parmesan", it: "fatte in casa, ripiene di spinaci e ricotta, burro fuso, grana", en: "homemade, spinach and curd filling, brown butter, parmesan" },
          preis: 13.50, allergene: [1, 3, 7], veg: true },
        { name: { de: "Speckknödel", it: "Canederli allo speck", en: "Bacon dumplings" },
          text: { de: "in der Rindsuppe oder mit Krautsalat", it: "in brodo o con insalata di cavolo", en: "in beef broth or with coleslaw" },
          preis: 12.00, allergene: [1, 3, 7, 9] },
        { name: { de: "Rindsgulasch", it: "Gulasch di manzo", en: "Beef goulash" },
          text: { de: "mit Polenta", it: "con polenta", en: "with polenta" },
          preis: 16.50, allergene: [9] }
      ]
    },
    {
      kategorie: { de: "Nachspeisen", it: "Dolci", en: "Desserts" },
      gerichte: [
        { name: { de: "Apfelstrudel", it: "Strudel di mele", en: "Apple strudel" },
          text: { de: "hausgemacht, mit Vanillesauce", it: "fatto in casa, con salsa alla vaniglia", en: "homemade, with vanilla sauce" },
          preis: 6.50, allergene: [1, 3, 7, 8], veg: true },
        { name: { de: "Hausgemachtes Eis", it: "Gelato artigianale", en: "Homemade ice cream" },
          text: { de: "drei Kugeln nach Wahl", it: "tre palline a scelta", en: "three scoops of your choice" },
          preis: 5.50, allergene: [3, 7], veg: true }
      ]
    }
  ],

  /* ---------- Events ----------
     Events werden automatisch nach dem Datum "bis" ausgeblendet.
     bild: Pfad zu einem Foto in img/ (optional) */
  events: [
    { von: "2026-10-01", bis: "2026-11-30",
      titel: { de: "Törggelen", it: "Törggelen", en: "Törggelen" },
      text: { de: "Schlachtplatte, Kastanien und neuer Wein – die Südtiroler Herbsttradition bei uns im Gasthaus.",
              it: "Piatto del contadino, castagne e vino nuovo: la tradizione autunnale altoatesina da noi.",
              en: "Farmer's platter, roast chestnuts and new wine – South Tyrol's autumn tradition at our inn." },
      vormerkung: true },
    { von: "2026-12-31", bis: "2026-12-31",
      titel: { de: "Silvesteressen", it: "Cenone di San Silvestro", en: "New Year's Eve dinner" },
      text: { de: "Festliches Menü zum Jahresausklang. Menü und Preis folgen.",
              it: "Menù festivo per salutare l'anno. Menù e prezzo in arrivo.",
              en: "A festive menu to see out the year. Menu and price to follow." },
      vormerkung: true },
    { von: "2027-04-01", bis: "2027-04-30",
      titel: { de: "Spargelzeit", it: "Settimane dell'asparago", en: "Asparagus season" },
      text: { de: "Spargel aus der Region, klassisch mit Bozner Sauce und in neuen Variationen.",
              it: "Asparagi della zona, classici con salsa bolzanina e in nuove varianti.",
              en: "Local asparagus, classic with Bolzano sauce and in new variations." },
      vormerkung: true }
  ],

  /* ---------- Fotos ----------
     Dateien in den Ordner img/ legen und hier eintragen.
     Solange "datei" leer ist, wird ein Platzhalter angezeigt. */
  galerie: [
    { datei: "", text: { de: "Hausgemachte Schlutzkrapfen", it: "Mezzelune fatte in casa", en: "Homemade Schlutzkrapfen" } },
    { datei: "", text: { de: "Törggele-Teller", it: "Piatto del Törggelen", en: "Törggelen platter" } },
    { datei: "", text: { de: "Unsere Terrasse", it: "La nostra terrazza", en: "Our terrace" } },
    { datei: "", text: { de: "Apfelstrudel", it: "Strudel di mele", en: "Apple strudel" } },
    { datei: "", text: { de: "Gaststube", it: "La sala", en: "Dining room" } },
    { datei: "", text: { de: "Hausgemachtes Eis", it: "Gelato artigianale", en: "Homemade ice cream" } }
  ]
};

/* EU-Allergene (Verordnung 1169/2011) */
const ALLERGENE = {
  1:  { de: "Glutenhaltiges Getreide", it: "Cereali contenenti glutine", en: "Cereals containing gluten" },
  2:  { de: "Krebstiere", it: "Crostacei", en: "Crustaceans" },
  3:  { de: "Eier", it: "Uova", en: "Eggs" },
  4:  { de: "Fisch", it: "Pesce", en: "Fish" },
  5:  { de: "Erdnüsse", it: "Arachidi", en: "Peanuts" },
  6:  { de: "Soja", it: "Soia", en: "Soy" },
  7:  { de: "Milch / Laktose", it: "Latte / lattosio", en: "Milk / lactose" },
  8:  { de: "Schalenfrüchte (Nüsse)", it: "Frutta a guscio", en: "Tree nuts" },
  9:  { de: "Sellerie", it: "Sedano", en: "Celery" },
  10: { de: "Senf", it: "Senape", en: "Mustard" },
  11: { de: "Sesam", it: "Sesamo", en: "Sesame" },
  12: { de: "Schwefeldioxid / Sulfite", it: "Anidride solforosa / solfiti", en: "Sulphites" },
  13: { de: "Lupinen", it: "Lupini", en: "Lupin" },
  14: { de: "Weichtiere", it: "Molluschi", en: "Molluscs" }
};
