# Anchorpoint AI — Marketing Site

A marketing site for the fictional company **Anchorpoint AI**, built strictly from the design
spec in [`DESIGN_SPEC.md`](./DESIGN_SPEC.md). The site has two routes: the single-page landing
page (`/`, spec §1–7) and a separate FAQ page (`/faq`, spec §8). No real backend: the "Book a
Call" form and the footer newsletter form are clearly-labeled demo forms with client-side
validation and a mock success state — no network requests are made.

## Tech stack

- **React 18 + Vite** — as required by the brief.
- **Tailwind CSS** (not plain CSS) — chosen because the design spec already hands over a
  fully-specified design-token system (exact hex colors, an 8px spacing scale, two exact
  breakpoints, a type scale) and even includes a ready-made `tailwind.config.js` reference in
  section 4. Encoding those tokens once in `tailwind.config.js` and then composing them as
  utility classes was faster and less error-prone here than hand-writing/maintaining a parallel
  CSS file with the same values, and it keeps every component's spacing/color/breakpoint usage
  visible right next to the markup it affects.
- **react-router-dom `^6.26.0`** (spec §8.1) — added to support the new `/faq` route. Pinned to
  the stable v6 line; the app does not use v7's data-router APIs, which aren't needed for two
  static routes. `BrowserRouter` opts in to the `v7_startTransition`/`v7_relativeSplatPath` future
  flags purely to silence v6's forward-compat console warnings (no behavior change) so the app
  keeps its zero-console-warnings bar.
- **lucide-react** for every icon named in the spec's icon map (the FAQ page adds one: `ChevronDown`,
  reused rotated for the accordion's expanded state — spec §8.9).
- Two hand-built inline SVGs per spec section 7: `<AnchorMark />` (the anchor glyph, reused in the
  nav logo, hero hub, and footer logo) and `<HeroIllustration />` (the hub-and-orbit graphic).
- **Vitest + React Testing Library + jest-axe** for automated tests, including an accessibility
  (axe-core) check.
- **Playwright** for real-browser E2E smoke tests (layout, focus order, keyboard interaction)
  that jsdom can't exercise.

No other runtime dependencies beyond `react-router-dom`. No photography, no AI-generated imagery,
no icon libraries beyond `lucide-react`.

## Getting started

Requires Node.js 18+ (developed/verified on Node v24) and npm.

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`). That's it — no environment
variables, no backend, no extra setup.

### Other scripts

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm test          # run the Vitest suite once (includes the jest-axe a11y check)
npm run test:watch
```

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` (`src/components/sections/LandingPage.jsx`) | The 7-section landing-page body (Hero → ProblemSection → Services → HowItWorks → Testimonials → Pricing → FinalCTA), extracted out of `App.jsx` per spec §8.1. |
| `/faq` | `FaqPage` (`src/components/sections/FaqPage.jsx`) | New FAQ page, spec §8: page header, 3 category blocks of accordion Q&A (14 questions total), closing CTA band. |

`Navbar` and `Footer` render once, outside `<Routes>`, as shared chrome across both routes.
Cross-page section links (e.g. the FAQ page's "Pricing" nav link, or its closing CTA button) use
`<Link to="/#id">`; `LandingPage` has an effect that watches `location.hash` and smooth-scrolls to
the matching section once mounted, since React Router v6 doesn't do this automatically.

## Project structure

```
index.html                  Vite entry HTML, Google Fonts <link> tags
tailwind.config.js           All design tokens (colors, spacing, breakpoints, fonts) from spec §2–4
postcss.config.js
vite.config.js               Also configures the Vitest test environment
playwright.config.js         Playwright E2E config (npm run test:e2e)
src/
  main.jsx                   React root
  App.jsx                    <BrowserRouter> + skip link + Navbar/<Routes>/Footer (spec §8.1)
  index.css                  Tailwind directives, global resets, box-sizing, focus fallback
  hooks/
    useSmoothScrollTo.js      Anchor-nav scrolling, respects prefers-reduced-motion
    useScrollSpy.js           IntersectionObserver-based active-nav-link tracking
  components/
    ui/                       Shared primitives: AnchorMark, Button, TextLink, Card,
                               SectionHeader, FormField (TextField/TextareaField),
                               PricingTile, HeroIllustration, AccordionItem (FAQ, spec §8.7)
    sections/                 Navbar, Hero, ProblemSection, Services, HowItWorks,
                               Testimonials, Pricing, FinalCTA, Footer, LandingPage, FaqPage,
                               faqData.js (the 14 Q&A entries + 3 category groupings, spec §8.5)
  test/
    setup.js                  jsdom polyfills (matchMedia, IntersectionObserver, scrollIntoView)
    App.test.jsx               Renders the app at "/"; asserts section copy present, zero console
                               errors/warnings, no serious/critical axe violations, mobile-menu
                               keyboard behavior, and the Final CTA form's validation/success flow
    FaqPage.test.jsx           FAQ route coverage: page content/heading outline, document title,
                               route-change H1 focus, accordion aria wiring + multi-open behavior,
                               Arrow/Home/End keyboard navigation across all 14 triggers, axe a11y
                               check, and route-aware Navbar/Footer link behavior (spec §8.2/§8.3)
e2e/
  smoke.spec.js               Playwright real-browser smoke tests, including a "FAQ page" describe
                               block: SPA-fallback direct navigation, heading outline, Navbar FAQ
                               link + focus management, accordion interaction, Home/End keyboard
                               nav, cross-page CTA scroll, Footer FAQ link, no-overflow at 3
                               breakpoints
public/
  favicon.svg                 Anchor glyph favicon
  _redirects                  Netlify-style SPA fallback ("/*  /index.html  200", spec §8.1) so a
                               direct load or hard refresh on /faq doesn't 404 on static hosting
DESIGN_SPEC.md                The design spec this app implements (source of truth)
IMPLEMENTATION_NOTES.md       Judgment calls made where the spec left something open
```

## Notable implementation details

- **Scroll-spy & smooth scroll**: `useScrollSpy` uses `IntersectionObserver` to track which
  section is most in view and drives the nav's active-link underline. `useSmoothScrollTo` scrolls
  anchor links smoothly, falling back to an instant jump under `prefers-reduced-motion: reduce`.
- **Mobile nav**: hamburger opens a full-screen overlay (`role="dialog"`, `aria-modal="true"`).
  Escape closes it and returns focus to the hamburger button; opening moves focus into the menu;
  background scroll is locked while open.
- **Book a Call form**: required Name, RFC-simple email format check, required message textarea.
  Invalid submit shows inline field errors (`role="alert"`, `aria-invalid`, `aria-describedby`).
  Valid submit shows a `loading` button state (spinner, "Sending…") for ~900ms, then swaps the
  form for a labeled success message — no network call is made anywhere.
- **Pricing reflow**: the "Growth" tier is visually reordered first via CSS `order` at `<1280px`
  (mobile/tablet) and reverts to natural Audit → Growth → Partner order at `≥1280px`, per spec 5.7.
- **Hero illustration**: implemented as one inline SVG with a `480×480` viewBox; the outer `<svg>`
  is sized responsively (`280px` / `360px` / `480px`), so every internal coordinate — rings, orbit
  nodes, hub, nested icons — scales together automatically instead of needing separate math per
  breakpoint.

## Testing & verification performed

- `npm install` — clean install (0 errors; `npm audit` flags dev-only `esbuild`/`vite`
  vulnerabilities, see `IMPLEMENTATION_NOTES.md` #12).
- `npm run dev` — boots without errors; confirmed both `/` and `/faq` return `200` and render.
- `npm run build` — succeeds with zero errors (`vite build`, `dist/` output).
- `npm test` — **16 Vitest/RTL tests pass across 2 files**:
  - `src/test/App.test.jsx` (4 tests): all landing-page sections render with real spec copy with
    zero `console.error`/`console.warn` calls; `jest-axe` reports zero critical/serious violations;
    mobile nav keyboard open/close + Escape-returns-focus; Final CTA form validation + mock success.
  - `src/test/FaqPage.test.jsx` (12 tests, spec §8): page header/3 categories/all 14
    questions/closing CTA render with zero console errors/warnings; document title; route-change H1
    focus; exact heading outline (h1 → h2 ×3 → h3s, no skipped levels); accordion aria wiring
    (`aria-expanded`/`aria-controls`/`role="region"`/`aria-labelledby`) and multi-open (not
    exclusive) behavior; Arrow/Home/End keyboard navigation across all 14 triggers without
    wrapping; `jest-axe` zero critical/serious violations; route-aware Navbar/Footer link behavior
    (§8.2/§8.3), including the FAQ link's current-page active state.
- `npm run test:e2e` — **23 Playwright tests pass** (real Chromium, real layout/webfonts/focus),
  including a dedicated "FAQ page (spec §8)" suite: SPA-fallback direct navigation/hard refresh on
  `/faq` (verifies `public/_redirects` isn't needed in dev but the route itself resolves), heading
  outline, Navbar "FAQ" link navigation + H1 focus, accordion click + multi-open, Home/End across
  all 3 categories, the closing CTA's cross-page scroll back to `/#contact`, the Footer "FAQ" link,
  and no-horizontal-overflow at 375/768/1280px.
- Layout sanity-checked visually via full-page Playwright screenshots at 375px/768px/1280px against
  `DESIGN_SPEC.md` §8.6's responsive table (page header padding, category heading sizes, accordion
  row padding, content-column width, closing CTA band) in addition to the automated overflow checks
  above.

See `IMPLEMENTATION_NOTES.md` for the handful of judgment calls made where the spec left
something ambiguous.
