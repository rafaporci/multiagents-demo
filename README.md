# Anchorpoint AI — Marketing Landing Page

A single-page marketing site for the fictional company **Anchorpoint AI**, built strictly from
the design spec in [`DESIGN_SPEC.md`](./DESIGN_SPEC.md). No real backend: the "Book a Call" form
and the footer newsletter form are clearly-labeled demo forms with client-side validation and a
mock success state — no network requests are made.

## Tech stack

- **React 18 + Vite** — as required by the brief.
- **Tailwind CSS** (not plain CSS) — chosen because the design spec already hands over a
  fully-specified design-token system (exact hex colors, an 8px spacing scale, two exact
  breakpoints, a type scale) and even includes a ready-made `tailwind.config.js` reference in
  section 4. Encoding those tokens once in `tailwind.config.js` and then composing them as
  utility classes was faster and less error-prone here than hand-writing/maintaining a parallel
  CSS file with the same values, and it keeps every component's spacing/color/breakpoint usage
  visible right next to the markup it affects.
- **lucide-react** for every icon named in the spec's icon map.
- Two hand-built inline SVGs per spec section 7: `<AnchorMark />` (the anchor glyph, reused in the
  nav logo, hero hub, and footer logo) and `<HeroIllustration />` (the hub-and-orbit graphic).
- **Vitest + React Testing Library + jest-axe** for automated tests, including an accessibility
  (axe-core) check.

No other runtime dependencies. No photography, no AI-generated imagery, no icon libraries beyond
`lucide-react`.

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

## Project structure

```
index.html                  Vite entry HTML, Google Fonts <link> tags
tailwind.config.js           All design tokens (colors, spacing, breakpoints, fonts) from spec §2–4
postcss.config.js
vite.config.js               Also configures the Vitest test environment
src/
  main.jsx                   React root
  App.jsx                    Assembles the 9 sections in order + skip link
  index.css                  Tailwind directives, global resets, box-sizing, focus fallback
  hooks/
    useSmoothScrollTo.js      Anchor-nav scrolling, respects prefers-reduced-motion
    useScrollSpy.js           IntersectionObserver-based active-nav-link tracking
  components/
    ui/                       Shared primitives: AnchorMark, Button, TextLink, Card,
                               SectionHeader, FormField (TextField/TextareaField),
                               PricingTile, HeroIllustration
    sections/                 Navbar, Hero, ProblemSection, Services, HowItWorks,
                               Testimonials, Pricing, FinalCTA, Footer
  test/
    setup.js                  jsdom polyfills (matchMedia, IntersectionObserver, scrollIntoView)
    App.test.jsx               Renders the app; asserts section copy present, zero console
                               errors/warnings, no serious/critical axe violations, mobile-menu
                               keyboard behavior, and the Final CTA form's validation/success flow
public/
  favicon.svg                 Anchor glyph favicon
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

- `npm install` — clean install.
- `npm run dev` — boots without errors (started, confirmed, stopped).
- `npm run build` — succeeds with zero errors.
- `npm test` — 4 Vitest/RTL tests pass:
  1. All 9 sections render with their real spec copy, zero `console.error`/`console.warn` calls.
  2. `jest-axe` reports zero violations of any severity (not just critical/serious).
  3. Mobile nav opens/closes via keyboard; Escape returns focus to the trigger.
  4. The Final CTA form shows field errors on invalid submit and a mock success state on valid
     submit.
- Responsive behavior at 375px / 768px / 1280px was reviewed class-by-class against
  `DESIGN_SPEC.md` §4 and each section's responsive notes (no visual browser tool was available in
  this environment).

See `IMPLEMENTATION_NOTES.md` for the handful of judgment calls made where the spec left
something ambiguous.
