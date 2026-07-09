# Implementation Notes

Honest list of every place `DESIGN_SPEC.md` left a genuine gap and I had to make a call. Nothing
here contradicts the spec — these are all places it was silent or only gave an approximate
description.

1. **Eyebrow label color.** The type system (§3) defines the "Eyebrow / caption" *style*
   (Inter, 12px, 600, uppercase, 0.08em tracking) but never assigns it a *color*, and it's used on
   nearly every section. I used `brand-primary` (6.6:1 on white, an approved pair in §2's contrast
   table). I avoided `brand-secondary` because §2 reserves that token specifically for "secondary
   buttons/badges, 'how it works' step 1 & 3 accents."

2. **Pricing tier responsive reorder (§5.7).** "Tier 2 reorders to appear first in source order"
   on tablet/mobile is implemented with CSS `order` (each tile is wrapped in a div with
   `order-1 lg:order-2` etc.), not by literally changing DOM order per breakpoint. This is the
   standard way to do responsive reordering without duplicating markup or reaching for
   `matchMedia` in JS — the tradeoff is that screen-reader/tab order stays Audit → Growth →
   Partner at every breakpoint, even though the *visual* order flips below 1280px.

3. **"Contact" destination.** The nav's 5th link and the "Book a Call" buttons (nav, hero,
   pricing tiles, mobile menu) all scroll to `#contact`, which is the Final CTA section (§5.8).
   The spec never defines a separate "Contact" section, and §5.8 is clearly the intended landing
   spot (it holds the actual booking form).

4. **Footer desktop column widths (§5.9).** The spec describes desktop as "column 1 spans 4,
   columns 2–4 each span ~2–3, with remaining space as gutter" — already hedged with "~". I
   simplified to 4 equal-width columns on a `grid-cols-4`, which reads the same visually at the
   container's max-width and avoids inventing a precise, unhedged split the spec didn't actually
   commit to.

5. **Footer tablet grid, resolved reading the spec's own correction.** §5.9's tablet line first
   says "2×2 column grid" then immediately clarifies "Use: row 1 = brand column full-width, row 2
   = Company/Resources/Legal as 3 even columns" — I implemented the clarified version (a
   3-column grid at `md`, with the brand column spanning all 3 in row 1), since that's the
   version the spec explicitly tells the engineer to use.

6. **Footer "Resources"/"Legal" links** (Blog, Case Studies, FAQ, Privacy Policy, Terms of
   Service) have no destination page in scope, so they render as `href="#"` placeholders. The
   brief only calls out the two forms as requiring mock-only treatment; these links are just
   inert by necessity since there's nothing behind them to build.

7. **Hero illustration scaling.** §7.1 gives exact pixel geometry at the 480px desktop size and
   says nodes should "scale proportionally on smaller containers," but doesn't give tablet/mobile
   coordinates. I built the whole illustration as one inline SVG with a `0 0 480 480` viewBox and
   sized the outer `<svg>` responsively (480/360/280px); because SVG viewBoxes scale all internal
   geometry uniformly, every ring/node/hub/icon stays in the exact proportions described at every
   breakpoint without separate math.

8. **Anchor glyph bezier curves (§7.2).** The spec gives approximate coordinates and a plain-
   English description of the flukes ("curving outward and up to (6,15)... (18,15)") rather than
   exact SVG path commands. I hand-picked cubic-bezier control points that hit the stated
   endpoints while reading as a simplified anchor.

9. **Mock success copy.** The spec requires "a clearly-labeled mock success state" for both forms
   but doesn't script exact wording. Final CTA form: "Request received." + a sentence explicitly
   stating it's a demo and no message was sent. Newsletter: "Subscribed. (Demo only — no email
   was sent.)" Both also carry a small "Demo form" disclaimer above the fields before submission.

10. **Skip-to-content link.** Not specified by the design spec, but added to satisfy the brief's
    "full keyboard navigation" accessibility requirement — standard practice for a page with a
    persistent fixed nav.

11. **Avatar background contrast check (§5.6).** The spec names `brand-accent`'s "darker sibling
    `#B45309`" for the third testimonial avatar specifically so white initials stay readable, but
    that pair isn't in §2's contrast table. I computed it manually (~5.0:1 relative luminance
    contrast for white on `#B45309`), which clears the 4.5:1 AA threshold for normal text.

12. **npm audit findings.** `npm audit` reports vulnerabilities in `esbuild`/`vite`'s dev-server
    request handling (dev-time only, not present in the production build). Fixing them requires a
    breaking upgrade to Vite 8; left as-is for this deliverable rather than risking an
    unvalidated major-version jump on a from-scratch project.

---

## Bug-fix pass (post-QA, TEST_REPORT.md)

QA's `e2e/smoke.spec.js` (Playwright) caught 4 real bugs that the earlier Vitest/jsdom suite
couldn't, because they only manifest under real browser layout (`backdrop-filter` containing
blocks, real webfont metrics, real Tab-key focus movement). Fixed in this pass:

13. **Bug #1 (critical) — mobile menu collapsed to 0 height.** `<header>` had `backdrop-blur-sm`,
    which creates a new containing block for `position: fixed` descendants, so the mobile overlay
    (`fixed inset-0 top-16`, nested inside the header) resolved against the header's own ~64px box
    instead of the viewport. Fixed by rendering the overlay through `createPortal(..., document.body)`
    so it's a DOM sibling of `<header>`, not a descendant — it no longer shares that containing
    block. Also added `visibility: hidden` + `aria-hidden="true"` on `#main-content` and `<footer>`
    while the menu is open, so the background is genuinely non-visible/non-interactive rather than
    merely covered by an opaque layer (this is also what makes the "h1 is hidden" E2E assertion
    meaningful rather than incidental).

14. **Bug #2 (high) — no focus trap in the mobile dialog.** Added a hand-rolled Tab/Shift+Tab trap
    in `Navbar.jsx` (no new dependency): on every `Tab` keydown while the menu is open, it computes
    the dialog's first/last focusable element and wraps focus at the ends. Escape-to-close and
    return-focus-to-trigger were already correct and are unchanged.

15. **Bug #3 (high) — nav wraps at 768px with real webfonts loaded.** The nav's own row now uses a
    dedicated `.nav-container` class (in `src/index.css`) instead of the sitewide `.container-page`
    — same 20px/64px mobile/desktop side padding, but 24px instead of 40px specifically in the
    768–1279px tablet band. Combined with a tighter tablet link gap (`gap-3` = 12px instead of
    `gap-5` = 20px, reverting to the spec's 32px at `lg`) and a new `compact` prop on `<Button>`
    (smaller padding below `lg`, exact spec padding at `lg`) applied only to the nav's "Book a
    Call" button, this reclaims enough width that nothing wraps at 768px with Space Grotesk/Inter
    fully loaded. This is a deliberate, spec-diverging judgment call: DESIGN_SPEC.md §4's 40px
    tablet container padding is a sitewide default, and §5.1 doesn't tie the nav specifically to
    that value — it only requires the tablet nav to fit on one line, which took precedence.

16. **Bug #4 (medium, fixed opportunistically) — CTA gap wasn't a fixed 24px.** The nav row
    previously split all leftover space with a single `justify-between` across 3 children (logo,
    links, button), so the links↔button gap scaled with viewport width. Restructured so the links
    `<ul>` and the CTA button are grouped in one wrapper with a fixed `gap-6` (24px) between them;
    `justify-between` now only governs the gap between the logo and that whole group.

17. **Bug #5 (low) — left unfixed.** QA correctly flagged that service/step/pricing-tier titles
    render as `<h3>` instead of the spec-mandated `<h4>`. I did not change this in this pass: QA's
    own `e2e/smoke.spec.js` ("Growth pricing tile is visually first below 1280px") queries
    `#pricing h3` to identify the tiles, so retagging to `<h4>` would silently break that
    already-passing, permanent regression test as a side effect of an explicitly low-severity,
    non-blocking fix. Flagging back rather than editing QA's test file myself to make a
    low-priority fix land.
