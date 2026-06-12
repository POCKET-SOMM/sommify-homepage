// Placeholder bottle imagery, self-hosted under public/bottles/ (downloaded from
// the prototype's sources so nothing is hotlinked). Swap these for your own
// licensed catalogue imagery before launch — just replace the files.
export const BOTTLE = {
  georg: "/bottles/georg.jpg",
  nehrer: "/bottles/nehrer.jpg",
  penfolds: "/bottles/penfolds.jpg",
  theophile: "/bottles/theophile.jpg",
  chateau: "/bottles/chateau.jpg",
  moric: "/bottles/moric.jpg",
  leyda: "/bottles/leyda.jpg",
  kasnyik: "/bottles/kasnyik.jpg",
};

// Curated-offer examples cycled by the feature-01 menu picker.
export const PAIRING_EXAMPLES = [
  {
    venue: "Osteria Vino",
    sub: "Italian · paired to 24 dishes",
    wines: [
      ["Franciacorta Brut", "Lombardy", "€48", "Vitello tonnato", "IT"],
      ["Vermentino di Gallura", "Sardinia", "€39", "Branzino al sale", "IT"],
      ["Barolo, G. Conterno", "Piedmont", "€145", "Tagliatelle al ragù", "IT"],
      ["Chianti Classico", "Tuscany", "€52", "Bistecca", "IT"],
      ["Vin Santo del Chianti", "Tuscany", "€40", "Cantucci", "IT"],
    ],
  },
  {
    venue: "Brasserie Lumière",
    sub: "French bistro · paired to 18 dishes",
    wines: [
      ["Champagne Brut, Lallier", "Champagne", "€72", "Huîtres", "FR"],
      ["Sancerre", "Loire", "€44", "Chèvre chaud", "FR"],
      ["Chablis 1er Cru", "Burgundy", "€58", "Sole meunière", "FR"],
      ["Côte-Rôtie, Guigal", "Rhône", "€95", "Magret de canard", "FR"],
      ["Sauternes", "Bordeaux", "€60", "Crème brûlée", "FR"],
    ],
  },
  {
    venue: "Tapas 32",
    sub: "Spanish · paired to 21 dishes",
    wines: [
      ["Cava Brut Nature", "Penedès", "€34", "Pan con tomate", "ES"],
      ["Albariño", "Rías Baixas", "€38", "Gambas al ajillo", "ES"],
      ["Ribera del Duero", "Castilla", "€120", "Cordero asado", "ES"],
      ["Rioja Gran Reserva", "Rioja", "€55", "Jamón ibérico", "ES"],
      ["Tawny Port 20 Años", "Douro", "€46", "Tarta de Santiago", "PT"],
    ],
  },
  {
    venue: "Sakura",
    sub: "Japanese · paired to 16 dishes",
    wines: [
      ["Champagne Blanc de Blancs", "Champagne", "€78", "Otoro nigiri", "FR"],
      ["Riesling Kabinett", "Mosel", "€36", "Unagi", "DE"],
      ["Grüner Veltliner", "Wachau", "€42", "Tempura", "AT"],
      ["Chablis, Raveneau", "Burgundy", "€88", "Sashimi", "FR"],
      ["Coteaux du Layon", "Loire", "€40", "Yuzu tart", "FR"],
    ],
  },
];

// Feature copy (titles/bodies/meta). Visuals are attached in Features.jsx.
export const FEATURES = [
  {
    key: "menu",
    kicker: "01 · Menu offers",
    title: "Build offers around your customer's menu.",
    body: "Drop in a restaurant's food menu and sommify builds a curated wine offer for it — matched dish by dish, ready to price and send. The feature a sommelier understands in one glance.",
    meta: ["Menu-aware", "Dish-by-dish", "Seconds"],
  },
  {
    key: "match",
    kicker: "02 · Wine-list offers",
    flip: true,
    title: "Build offers around your customer's wine list.",
    body: "Hand sommify a customer's wine list and it matches every line to the closest wine in your portfolio — applying your margins and replacement rules. Their list, rebuilt entirely from the wines you actually carry.",
    meta: ["Closest match", "Per varietal", "Your portfolio"],
  },
  {
    key: "beau",
    kicker: "03 · Beau chat",
    title: "Talk through your portfolio with Beau.",
    body: "Beau is your AI sommelier — ask anything, in plain language. General wine knowledge, what's in stock, what pairs with a dish, what to pitch under a budget. He reads intent, not keywords, and he knows your whole range.",
    meta: ["AI sommelier", "Portfolio-aware", "Ask anything"],
  },
  {
    key: "pricing",
    kicker: "04 · Pricing help",
    flip: true,
    title: "Get pricing help for you and your customers.",
    body: "Set bottle and by-the-glass prices, see live margins, and layer volume discounts per customer. Pricing strategies that protect the deal instead of guessing at it — for your team and for the buyer across the table.",
    meta: ["Pour pricing", "Live margins", "Volume tiers"],
  },
  {
    key: "materials",
    kicker: "05 · Sales materials",
    title: "Create sales materials for your wines.",
    body: "One selection, every deliverable: a sales-presentation deck with a slide per bottle, a dish-by-dish pairing guide, and a clean wine list — all white-labelled to each company's brand and exported as PPTX, PDF or XLSX in sixteen languages.",
    meta: ["Sales decks", "Pairing guides", "PPTX · PDF · XLSX"],
  },
];
