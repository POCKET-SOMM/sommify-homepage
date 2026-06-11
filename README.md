# sommify — marketing homepage

The production build of the sommify marketing homepage, recreated from the design
handoff as a single **responsive** page (the prototype shipped desktop + mobile as
two separate files; here they're folded into one with a `768px` breakpoint).

Stack: **Vite + React 18**, plain JS, inline-style components (ported faithfully
from the design prototype). Country flags via **react-circle-flags**.

## Run

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
public/
  assets/            hero/product imagery, Beau illustration (placeholders)
  bottles/           self-hosted wine-bottle images (placeholders, see below)
  partners/          real customer logos
  press/             real press logos
  logo.svg           sommify wordmark (favicon)
src/
  main.jsx           createRoot → <App/>
  App.jsx            composes the sections in order, wraps them in <ModalProvider>
  index.css          design tokens (:root vars), global resets, keyframes
  config.js          real endpoints/links (contact API, booking URL, socials, nav sections)
  hooks/
    useMediaQuery.js desktop ⇄ mobile switch (useIsMobile)
    useScrollSpy.js  nav active-section highlight + smooth scrollToSection()
  components/
    Modal.jsx, ModalProvider.jsx, ContactModal.jsx, BookingModal.jsx
    CTAGroup, Wordmark, RotatingWord, Flag, SocialIcon, icons
  sections/
    Nav, Hero, CustomerLogos, Features, HowItWorks, Pricing, Engage, News, Footer
    logos.js                  real partner + press logo data
    features/                 feature data + desktop/mobile visuals
```

## What's wired up

- **Nav** — `Platform` / `Pricing` / `News` smooth-scroll to their sections and the
  active section is highlighted (scrollspy). The wordmark scrolls back to top.
- **CTAs** — there is no "Book a demo". Instead:
  - **Contact us** → opens a contact modal (subject / contact / message) that POSTs
    to `https://api.sommify.ai/user/contact` (the real production endpoint).
  - **Talk to a founder** → opens a modal embedding the real Google Calendar
    booking page.
  - Both modals are built from scratch to match the site's aesthetic.
- **Customer logos & press** — real logos and article links carried over from the
  production site (`src/sections/logos.js`).
- **Social** — only LinkedIn is a real account, so that's the only social link
  rendered (footer + Engage). Add more in `config.js` (`SOCIAL_LINKS`) if/when they
  exist.

Endpoints and links live in `src/config.js`.

## Design decisions vs. the prototype

- The prototype's **Tweaks panel** and **iOS device frame** were prototype-only
  scaffolding and are dropped. The chosen tweak variants are baked in: white
  surface, zinc dark sections, serif (Newsreader/Cormorant) headings, no card
  texture, no brand accent, centered features intro, the **tabbed** features layout
  on desktop, and the Engage section without the Beau illustration.
- Mobile uses the bespoke compact feature visuals (purpose-built for the narrow
  column) rather than scaling the desktop mocks down.

## Remaining content TODOs

These are **placeholders** and should be swapped for final brand content:

- `public/bottles/*.jpg` — bottle images were downloaded from the prototype's
  sources and self-hosted (nothing is hotlinked), but they are **not licensed brand
  assets**. Replace the files (keep the names) with your own catalogue imagery.
- `public/assets/product-screen.png`, `platform-loop.gif`, `vineyard.jpg`,
  `beau.png`, `beau-sommelier.png` — placeholder product/marketing imagery.
- Wine names, prices, restaurant names in the feature mocks are illustrative.
- The "Trusted by distributors across 16 markets" eyebrow copy is from the design.
