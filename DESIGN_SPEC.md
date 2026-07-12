# DESIGN_SPEC.md
### Anchorpoint AI — Marketing Landing Page
Version 1.0 — prepared for frontend implementation. This document is the single source of truth. Nothing described here is a suggestion; where a decision was ambiguous, the decision has already been made below.

**Stack note:** Build in React 18 + Vite. Styling may be Tailwind CSS or plain CSS — that choice is explicitly left to the engineer. Every other visual decision (colors, type, spacing, copy, layout, states, imagery) is fixed by this spec. Use `lucide-react` for all icons (exact icon names are specified per use). No photography and no AI-generated imagery are used anywhere on this page — all visuals are SVG/CSS geometric shapes or `lucide-react` icons.

---

## 1. Brand Foundation

**Company name:** Anchorpoint AI

**Tagline:** "Agentic AI, grounded in your business."

**Brand voice (3 adjectives):** Grounded, Confident, Plainspoken.
- *Grounded* — no sci-fi language, no hype about "the future of work." Every claim ties to a concrete workflow or number.
- *Confident* — declarative sentences, active voice, short paragraphs. Never hedges with "might" or "could potentially."
- *Plainspoken* — writes like a smart operator talking to another operator, not like a research paper. Avoids jargon (no "leverage synergies," no "paradigm").

**Trust paragraph (for use in About/hero-adjacent context, and to brief the engineer on tone):**

> Anchorpoint AI exists because most SMB owners don't need another dashboard — they need their busywork gone. We're former operators, not just engineers: we've run support queues, chased invoices, and built sales pipelines ourselves. Every agent we deploy starts with a plain-English audit of your actual workflows, runs inside the tools you already use, and comes with a named human you can call. No lock-in contracts, no black-box automations — just measurable hours given back to your team, in writing, before you sign anything.

---

## 2. Color Palette

### Core colors

| Token | Hex | Name | Primary use |
|---|---|---|---|
| `brand-primary` | `#2F5D9F` | Anchor Blue | Primary buttons, links, active nav states, icon accents |
| `brand-primary-dark` | `#14213D` | Ink Navy | Nav/footer dark backgrounds, H1 on light bg, hero text |
| `brand-secondary` | `#0F766E` | Signal Teal | Secondary buttons/badges, "how it works" step 1 & 3 accents |
| `brand-accent` | `#F59E0B` | Beacon Amber | "Most popular" badges, highlight underlines, small tags — background use only (see contrast notes) |

### Neutral scale

| Token | Hex |
|---|---|
| `gray-50` | `#F8FAFC` |
| `gray-100` | `#F1F5F9` |
| `gray-200` | `#E2E8F0` |
| `gray-300` | `#CBD5E1` |
| `gray-400` | `#94A3B8` |
| `gray-500` | `#64748B` |
| `gray-600` | `#475569` |
| `gray-700` | `#334155` |
| `gray-800` | `#1E293B` |
| `gray-900` | `#0F172A` |

`white` = `#FFFFFF`.

### Semantic colors

| Token | Hex | Notes |
|---|---|---|
| `success-500` | `#16A34A` | Icons, dots, checkmarks only — see contrast note below |
| `success-700` | `#15803D` | Use for white-text-on-green buttons/banners |
| `error-500` | `#DC2626` | Error text on white, error button backgrounds with white text |
| `error-50` | `#FEF2F2` | Error banner/toast background (pair with `error-500` or `gray-900` text) |

### Contrast reference (WCAG AA — 4.5:1 normal text, 3:1 large text ≥24px or 19px bold)

Computed via the standard relative-luminance contrast formula. Use only the pairs below for text-on-background; do not invent new pairs.

| Foreground | Background | Ratio | Verdict / use |
|---|---|---|---|
| `white` | `brand-primary` #2F5D9F | 6.6:1 | AA pass, normal text — primary buttons |
| `white` | `brand-primary-dark` #14213D | 16.0:1 | AA pass — nav/footer dark sections |
| `gray-900` | `white` | 17.9:1 | AA pass — default body text |
| `gray-700` | `white` | 10.4:1 | AA pass — secondary text, subheads on white |
| `gray-500` | `white` | 4.8:1 | AA pass, this is the **minimum** lightness for text — never use `gray-400` or lighter for text on white |
| `white` | `brand-secondary` #0F766E | 5.5:1 | AA pass — secondary buttons, teal badges |
| `gray-900` | `brand-accent` #F59E0B | 8.3:1 | AA pass — amber badges/tags always use dark text |
| `white` | `brand-accent` #F59E0B | 2.1:1 | **FAILS** — never place white text on amber; amber is a background-only accent for badges/underlines with dark text or as an icon fill |
| `white` | `error-500` #DC2626 | 4.8:1 | AA pass — error buttons/banners |
| `white` | `success-700` #15803D | 5.0:1 | AA pass — success buttons/banners |
| `white` | `success-500` #16A34A | 3.3:1 | Fails for normal text; only use `success-500` for icons, dots, or bold text ≥24px |
| `brand-primary` | `white` | 6.6:1 | AA pass — links/text links on white |

---

## 3. Type System

**Heading font:** Space Grotesk (Google Fonts) — weights 500, 600, 700.
**Body font:** Inter (Google Fonts) — weights 400, 500, 600.

Load both via `<link>` to Google Fonts or self-hosted `@font-face`; either is fine. Fallback stack: `"Space Grotesk", "Helvetica Neue", Arial, sans-serif` for headings, `"Inter", "Helvetica Neue", Arial, sans-serif` for body.

### Desktop (≥1280px) type scale

| Element | Font | Size | Line-height | Weight | Letter-spacing |
|---|---|---|---|---|---|
| H1 | Space Grotesk | 56px | 64px | 700 | -0.02em |
| H2 | Space Grotesk | 40px | 48px | 700 | -0.01em |
| H3 | Space Grotesk | 28px | 36px | 600 | 0 |
| H4 | Space Grotesk | 20px | 28px | 600 | 0 |
| Lead / intro body | Inter | 18px | 28px | 400 | 0 |
| Body (default) | Inter | 16px | 26px | 400 | 0 |
| Small / label | Inter | 14px | 20px | 500 | 0 |
| Eyebrow / caption | Inter | 12px | 16px | 600 | 0.08em, uppercase |
| Button label | Inter | 16px | 24px | 600 | 0 |

### Mobile (375px–767px) scaling

| Element | Size | Line-height |
|---|---|---|
| H1 | 36px | 44px |
| H2 | 28px | 36px |
| H3 | 22px | 30px |
| H4 | 18px | 26px |
| Lead | 17px | 26px |
| Body | 16px | 26px (unchanged) |
| Small/label | 14px | 20px (unchanged) |

Tablet (768–1279px) uses a midpoint: H1 44px/52px, H2 32px/40px, H3 24px/32px, H4 19px/27px; all other sizes match desktop.

---

## 4. Spacing / Grid System

### Spacing scale (8px base, with a 4px half-step)

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon-to-label micro gaps, fine alignment nudges |
| `space-2` | 8px | Badge/tag internal padding, tight stacks (e.g. label above input) |
| `space-4` | 16px | Default gap between related elements (form field to form field, list item spacing) |
| `space-6` | 24px | Card internal padding on mobile, gap between stacked cards on mobile, gutter at tablet/desktop |
| `space-8` | 32px | Card internal padding on tablet/desktop, spacing between a heading and the content under it |
| `space-12` | 48px | Gap between major sub-blocks within a section (e.g. section intro to card grid) |
| `space-16` | 64px | Section vertical padding (top/bottom) on mobile |
| `space-24` | 96px | Section vertical padding (top/bottom) on tablet/desktop |

### Grid & container

- Container `max-width`: **1280px**, centered (`margin-inline: auto`).
- Container side padding: **20px** at mobile, **40px** at tablet, **64px** at desktop. Above 1280px content width, padding continues to grow via the centered container so content never touches viewport edges on ultra-wide screens.
- Breakpoints (exact values, mobile-first `min-width`):
  - Base (mobile): `375px` minimum supported width, no media query (default styles)
  - `md`: `min-width: 768px`
  - `lg`: `min-width: 1280px`
- Tailwind config reference (if the engineer chooses Tailwind):
  ```js
  // tailwind.config.js
  module.exports = {
    theme: {
      screens: {
        md: '768px',
        lg: '1280px',
      },
      extend: {
        colors: { /* map tokens from Section 2 */ },
        fontFamily: {
          heading: ['"Space Grotesk"', 'sans-serif'],
          body: ['"Inter"', 'sans-serif'],
        },
      },
    },
  }
  ```
- Column behavior:
  - Mobile (375–767px): **4-column grid**, 16px gutter. Most content is single-column (stacked); the 4-col grid governs things like the problem-stat cards (2-up on mobile at 2 cols each).
  - Tablet (768–1279px): **8-column grid**, 24px gutter. Card grids that are 3-up on desktop become 2-up on tablet.
  - Desktop (≥1280px): **12-column grid**, 24px gutter. Card grids run at their full intended column count (e.g., 3-up service cards = 4 columns each).

---

## 5. Section-by-Section Copy & Layout

### 5.1 Nav bar

**Copy:**
- Logo wordmark: "Anchorpoint" in `gray-900` + "AI" in `brand-primary`, both Space Grotesk 700, 20px, set immediately after the logo mark with 8px gap.
- Anchor links (in order): `Services`, `How It Works`, `Results`, `Pricing`, `Contact`
- CTA button (top-right): **"Book a Call"**

**Layout:**
- Sticky, fixed to top of viewport, `z-index` above all content.
- Height: 72px desktop/tablet, 64px mobile.
- Background: `white` at 92% opacity with `backdrop-filter: blur(8px)`; on scroll past 8px of page scroll, add `box-shadow: 0 1px 2px rgba(15,23,42,0.06), 0 2px 8px rgba(15,23,42,0.06)` and reduce to solid `white`.
- Left: logo mark (32×32px, see Section 7) + wordmark. Center-right: the 5 anchor links, Inter 14px/500, `gray-700`, 32px horizontal gap between links, in a single row. Far right: primary button "Book a Call" (see Section 6 for button spec), 24px gap from the last nav link.
- Active/current-section link state: `brand-primary` text color + a 2px `brand-primary` underline offset 6px below the text (updates via scroll-spy as the user scrolls past each section).

**Responsive behavior:**
- At `<768px`: the 5 anchor links and wordmark collapse; only the logo mark + a hamburger icon (lucide `Menu`, 24px, `gray-900`) remain, right-aligned, with the "Book a Call" button hidden from the bar itself (it reappears inside the mobile menu).
- Tapping the hamburger opens a full-screen overlay menu (`white` background, slides down 200ms ease) with the 5 links stacked, Space Grotesk 600, 24px, `gray-900`, 32px vertical gap, centered, and the "Book a Call" button full-width at the bottom, 48px from the last link. A close icon (lucide `X`, 24px) replaces the hamburger icon while open.
- At 768–1279px: full nav bar shows, but link gap reduces to 20px to fit; wordmark stays visible.

---

### 5.2 Hero

**Copy:**
- Eyebrow label: **"AI AGENTS FOR GROWING BUSINESSES"**
- H1: **"Your business, minus the busywork."**
- Subhead (Lead style): "Anchorpoint AI designs and deploys AI agents that answer tickets, qualify leads, and keep your back office running — so your team can focus on the work only humans can do."
- Primary CTA button: **"Book a Free Agent Audit"**
- Secondary CTA (text link with trailing chevron): **"See How It Works"** — scrolls to the How It Works section (5.5)
- Micro-reassurance line under the buttons, Small style, `gray-500`: "No commitment. No sales pitch. Just a clear roadmap."

**Layout:**
- Two-column layout at desktop: left column (7 of 12 columns) holds eyebrow, H1, subhead, CTA row, reassurance line, all left-aligned. Right column (5 of 12 columns) holds the hero illustration (see Section 7.1), vertically centered against the left column's text block.
- Section vertical padding: `space-24` (96px) top, `space-16` (64px) bottom, on top of the 72px nav bar (hero sits directly under nav, no additional gap).
- CTA row: primary button and secondary link sit on the same row, 24px gap, primary button first (left).
- Background: `white`, with a very subtle full-bleed radial gradient wash from `brand-primary` at 4% opacity (top-right origin) to transparent, purely decorative, sitting behind all hero content.

**Responsive behavior:**
- At `<768px`: single column. Order top-to-bottom: eyebrow → H1 → subhead → CTA row (buttons stack full-width, primary on top, secondary link centered below with 16px gap) → reassurance line → hero illustration (scaled to 280px, centered, `space-12` (48px) margin-top).
- At 768–1279px: still stacks vertically (illustration below text) but illustration renders at 360px and CTA buttons stay side-by-side (not full width) since there's room.
- At ≥1280px: two-column side-by-side as described above, illustration at full 480px.

---

### 5.3 Problem statement

**Copy:**
- Eyebrow: **"THE HIDDEN COST"**
- H2: **"Manual work is quietly taxing your business."**
- Subhead: "Every unanswered ticket, every manual data-entry pass, every 'I'll get to it Friday' is a small tax your business pays every single week. It adds up faster than most owners realize."
- Three stat cards:
  1. **"22 hrs"** — "Average hours per employee spent weekly on repetitive digital tasks."
  2. **"68%"** — "Of inbound support tickets are answerable without a human."
  3. **"$54K"** — "Estimated annual cost of one unfilled operations hire."
- Caption under the stat row, Small style, `gray-400`, centered: "Source: Anchorpoint Workflow Index, 2025 (composite of client workflow audits)."

**Layout:**
- Centered header block (eyebrow, H2, subhead), max-width 640px, center-aligned text, margin-bottom `space-12` (48px).
- Below it, a row of 3 generic cards (see Section 6), each containing: a large stat number (Space Grotesk 700, 40px, `brand-primary`), then the description (Body style, `gray-700`) below it with `space-2` (8px) gap, and a small icon (28px, `gray-400`) positioned top-left of the stat within the card padding. Icons: card 1 lucide `Clock`, card 2 lucide `Headset`, card 3 lucide `CircleDollarSign`.
- Cards sit on a `gray-50` full-bleed section background to visually separate this section from the hero (which is `white`).

**Responsive behavior:**
- Desktop (≥1280px): 3 cards in a single row, equal width, `space-6` (24px) gaps.
- Tablet (768–1279px): 3 cards in a single row still fit (each card narrower), same gap; if content wraps awkwardly, cards may go 2-up + 1 centered below — but the default is a single row.
- Mobile (<768px): cards stack full-width, `space-4` (16px) vertical gap between them.

---

### 5.4 Solution / Services

**Copy:**
- Eyebrow: **"WHAT WE DO"**
- H2: **"Three ways we put agents to work for you."**
- Subhead: "Whether you need a clear-eyed audit or a fully managed rollout, we meet you where you are."
- Service card 1 — **"Agent Audit & Roadmap"**: "We map your busiest workflows and hand you a prioritized list of exactly where an AI agent will save the most time and money — before you spend a dollar on build."
- Service card 2 — **"Agent Implementation"**: "We design, build, and launch AI agents inside the tools you already use — your helpdesk, CRM, and inbox — fully integrated, not a bolt-on app nobody opens."
- Service card 3 — **"Training & Ongoing Support"**: "We train your team to run alongside their new agents and stay on call to tune, expand, and troubleshoot as your business changes."
- Section-level CTA below the cards: **"See Pricing & Packages"** (text link with trailing chevron, scrolls to Pricing section 5.7)

**Layout:**
- Same centered-header pattern as 5.3 (eyebrow, H2, subhead, max-width 640px, centered).
- 3 generic cards in a row below, each: icon in a 56px rounded-square tile (12px radius, `brand-primary` at 10% opacity background, icon 28px `brand-primary` centered) at the top, H4 title with `space-4` (16px) gap below the icon tile, body copy with `space-2` (8px) gap below the title. Icons: card 1 lucide `ClipboardCheck`, card 2 lucide `Workflow`, card 3 lucide `LifeBuoy`.
- Section-level CTA link centered below the card row, `space-12` (48px) margin-top.

**Responsive behavior:**
- Desktop: 3 cards in one row, equal width, `space-6` (24px) gap.
- Tablet: 2 cards per row, third card centered on its own row below (or wraps naturally to a 2-column grid with the third spanning centered).
- Mobile: cards stack full-width, `space-4` (16px) vertical gap.

---

### 5.5 How it works

**Copy:**
- Eyebrow: **"THE PROCESS"**
- H2: **"From first call to live agent in four steps."**
- Step 1 — **"Discover"**: "A 45-minute call and a short workflow questionnaire tell us where your team's time actually goes."
- Step 2 — **"Design"**: "We map the exact agent workflow, the tools it touches, and the guardrails it runs inside — and get your sign-off before building anything."
- Step 3 — **"Deploy"**: "Your agent goes live in a limited pilot first, then rolls out fully once it's proven on real tickets, leads, or tasks."
- Step 4 — **"Optimize"**: "We monitor performance monthly and tune the agent as your business and volume grow."

**Layout:**
- Centered header block, same pattern as prior sections.
- Below it, a horizontal 4-step process rail at desktop: each step is a numbered node (see Section 6 "step marker" — a 48px circle, `brand-primary` background, white bold number 1–4 in Space Grotesk) connected by a horizontal 2px `gray-200` line running through all 4 node centers. Below each node: H4 step title, then body copy, both center-aligned, max-width 240px per step column.
- Icons appear inside each node instead of the number is NOT used — numbers are used in the node; a small icon (20px, white) sits directly above the step title instead, outside the node: step 1 lucide `Search`, step 2 lucide `LayoutTemplate`, step 3 lucide `Rocket`, step 4 lucide `TrendingUp`, each icon colored `brand-primary`.

**Responsive behavior:**
- Desktop (≥1280px): all 4 steps in one horizontal row with the connecting line, equal-width columns.
- Tablet (768–1279px): 2×2 grid of steps, connecting line removed (replaced by nothing — cards simply sit in a grid with `space-8` (32px) row/column gap).
- Mobile (<768px): single vertical column, steps stacked top-to-bottom; connecting line becomes a single vertical 2px `gray-200` line running behind the step number circles, with `space-8` (32px) vertical gap between steps.

---

### 5.6 Social proof

**Copy:**
- Eyebrow: **"RESULTS"**
- H2: **"Businesses like yours, running lighter."**
- Testimonial 1: "We killed our support backlog in six weeks, not six months." — **Renata Osei**, Owner, Harborlight Dental Group
- Testimonial 2: "Our sales team stopped drowning in follow-up emails. The agent does it better than we did, honestly." — **Miguel Ferris**, VP Sales, Fenwick & Cole Logistics
- Testimonial 3: "Anchorpoint didn't sell us dashboards. They sold us hours back." — **Dana Whitfield**, COO, Kestrel Manufacturing
- Client logo row label (Small, `gray-500`, centered, above the logos): "Trusted by SMBs across services, logistics, and manufacturing"
- Client wordmarks (6, text-only logotype chips): Harborlight Dental Group, Fenwick & Cole Logistics, BrightLeaf Realty, Kestrel Manufacturing, Third Coast Insurance, Palisade Home Services

**Layout:**
- Centered header (eyebrow + H2 only, no subhead needed here).
- 3 testimonial cards in a row below: each card has a large lucide `Quote` icon (32px, `brand-primary` at 20% opacity) top-left, the quote text in italic Lead style (18px) `gray-900` below it, then `space-4` (16px) gap, then an attribution row: a 40px circular avatar showing the person's initials (white text, Space Grotesk 600 16px, on a solid color background cycling through `brand-primary`, `brand-secondary`, `brand-accent`'s darker sibling `#B45309` for the 3 cards respectively so text stays readable) + name (Small, 600, `gray-900`) and title/company (Small, 400, `gray-500`) stacked to the right of the avatar with 12px gap.
- Below the testimonial row, the client logo row: label centered, then the 6 wordmarks in a single horizontal row, each rendered as plain text (Space Grotesk 600, 16px, `gray-400`), evenly spaced, `space-8` (32px) gap, no borders or boxes — just grayscale text logotypes to suggest a client roster without using real photography or logos.

**Responsive behavior:**
- Desktop: 3 testimonial cards in one row, `space-6` (24px) gap. Logo row: all 6 in one line.
- Tablet: 2 testimonial cards per row (third wraps to its own centered row). Logo row: wraps to 2 rows of 3.
- Mobile: testimonial cards stack full-width, `space-4` (16px) gap. Logo row: wraps to 2 columns × 3 rows, center-aligned, `space-4` (16px) row gap.

---

### 5.7 Pricing / Engagement tiers

**Copy:**
- Eyebrow: **"ENGAGEMENT MODELS"**
- H2: **"Simple pricing, scoped to how far you want to go."**
- Subhead: "Start with clarity, or go all-in on a fully managed rollout. Every tier includes a named point of contact — never a ticket queue."

**Tier 1 — "Audit"**
- Price: **$2,800** — "one-time"
- Description: "A focused 2-week engagement to map your workflows and identify your highest-ROI agent opportunities."
- Includes: "Full workflow audit across 3 departments", "Prioritized agent opportunity roadmap", "ROI estimate for each use case", "90-minute findings presentation", "30 days of email support after delivery"
- CTA button (secondary style): **"Start with an Audit"**

**Tier 2 — "Growth"** (marked "Most Popular")
- Price: **$6,500** — "/month, 3-month minimum"
- Description: "End-to-end design, build, and launch of your first 1–3 AI agents, fully integrated into your existing stack."
- Includes: "Everything in Audit", "Up to 3 custom agents designed & deployed", "Integration with your existing CRM/helpdesk/tools", "2 live team training sessions", "Bi-weekly optimization check-ins", "Dedicated Slack support channel"
- CTA button (primary style): **"Start Growing"**

**Tier 3 — "Partner"**
- Price: **"Starting at $12,000"** — "/month, custom scoped"
- Description: "Ongoing agent design, monitoring, and expansion — a fractional AI operations team for your business."
- Includes: "Everything in Growth", "Unlimited agent iteration & new use-case design", "Dedicated reliability monitoring & monthly reporting", "Quarterly strategy roadmap review", "Priority same-day support", "Named senior AI strategist as your point of contact"
- CTA button (secondary style): **"Talk to a Strategist"**

**Layout:**
- Centered header block as in prior sections.
- 3 pricing tiles in a row, equal width except Tier 2 which is visually emphasized (see Section 6 pricing tile spec: 2px `brand-primary` border, slight scale/elevation, "Most Popular" badge in `brand-accent` background with `gray-900` text pinned to the top edge of the card, centered horizontally, overlapping the card's top border by 12px).
- Each tile, top to bottom: tier name (H4), price (H2 size, Space Grotesk 700, `gray-900`) with the billing cadence in Small/`gray-500` directly after it on the same baseline, description (Body, `gray-700`), a `gray-200` 1px horizontal divider, then the "Includes" list (each item: lucide `Check` icon 16px `success-700` + text, Small style, `gray-700`, `space-2` (8px) vertical gap between items), then the CTA button pinned to the bottom of the tile.

**Responsive behavior:**
- Desktop: 3 tiles in a row, `space-6` (24px) gap, Tier 2 rendered ~8px taller/scaled 1.03x to stand out.
- Tablet: 3 tiles stack to a single column (2-up doesn't divide evenly and pricing needs full reading width), full-width, `space-6` (24px) vertical gap, Tier 2 reorders to appear **first** in source order so it's the first thing seen on tablet/mobile.
- Mobile: same single-column stack as tablet, Tier 2 first, full-width tiles, `space-4` (16px) vertical gap.

---

### 5.8 Final CTA

**Copy:**
- H2: **"Let's find your first agent."**
- Subhead: "Book a free 30-minute audit call. We'll look at one workflow together and tell you honestly whether an agent is a fit — before you spend anything."
- Form fields: **Name** (text input, placeholder "Jordan Reyes"), **Work email** (email input, placeholder "jordan@yourcompany.com"), **What's slowing your team down?** (textarea, placeholder "e.g. our support inbox is buried every Monday morning")
- Submit button: **"Request My Audit Call"**
- Reassurance line under the form, Small, `gray-500`: "No commitment. No sales pitch. We reply within one business day."

**Layout:**
- Full-bleed section background: `brand-primary-dark` (#14213D), all text on this section defaults to `white` or `gray-300` for secondary text (per contrast table, white on this navy = 16:1).
- Two-column layout at desktop: left column (5 of 12 cols) holds H2, subhead, reassurance line, left-aligned, vertically centered against the form. Right column (7 of 12 cols) holds the contact form in a `white` card (radius 16px, padding `space-8`/32px, shadow `0 20px 40px rgba(15,23,42,0.25)`).
- Form field order top to bottom: Name, Work email, textarea, submit button (full width of the card). `space-4` (16px) gap between fields.

**Responsive behavior:**
- Desktop (≥1280px): two columns side by side as described.
- Tablet (768–1279px): stacks to single column, text block first, form card below with `space-12` (48px) gap, form card max-width 560px centered.
- Mobile (<768px): single column, text block first (center-aligned text this time, to match the more compact mobile hero pattern... — no: keep left-aligned for consistency with desktop reading pattern), form card full-width minus container padding, `space-8` (32px) gap between text block and form.

---

### 5.9 Footer

**Copy:**
- Column 1 (brand): logo mark + "Anchorpoint AI" wordmark, then tagline "Agentic AI, grounded in your business.", then contact email **hello@anchorpoint.ai**
- Column 2 heading "Company": links "Services", "How It Works", "Results", "Pricing"
- Column 3 heading "Resources": links "Blog", "Case Studies", "FAQ"
- Column 4 heading "Legal": links "Privacy Policy", "Terms of Service"
- Newsletter mini-form (sits in Column 1 under the email): label "Get monthly agentic AI insights", an email input (placeholder "you@company.com") with an inline submit button labeled **"Subscribe"**
- Bottom bar: left — "© 2026 Anchorpoint AI. All rights reserved."; right — social icons (LinkedIn, X)

**Layout:**
- Full-bleed `gray-900` background, white/`gray-300` text (white for headings/links, `gray-400` for the tagline and copyright line — verify: `gray-400` #94A3B8 on `gray-900` is a decorative/tertiary line only, so also acceptable to bump the copyright line to `gray-300` for stronger legibility; use `gray-300` for the copyright line to be safe).
- 4-column layout at desktop (12-col grid: column 1 spans 4, columns 2–4 each span ~2–3, with remaining space as gutter), `space-12` (48px) row, top padding `space-16` (64px), bottom padding `space-8` (32px) before the bottom bar.
- Column headings: Small style, 600, `white`, `space-4` (16px) margin-bottom above their link list. Links: Body-small, `gray-300`, `space-2` (8px) vertical gap, hover underline + `white`.
- Bottom bar: 1px `gray-700` top border, `space-6` (24px) padding top/bottom, flex row with copyright left and 2 social icons right (lucide `Linkedin` 20px; a hand-rolled monoline "X" glyph SVG 20×20, stroke 1.5px, since lucide's logo icons are inconsistent — draw two crossing diagonal strokes inside a 20×20 box), both icons `gray-400` default.

**Responsive behavior:**
- Desktop: 4 columns side by side as described.
- Tablet: 2×2 column grid (brand column spans full width on its own row on top, then the 3 link columns as a 3-column row below — or simpler: 2 columns × 2 rows, brand column first spanning both grid columns). Use: row 1 = brand column full-width, row 2 = Company/Resources/Legal as 3 even columns.
- Mobile: single column, all 4 blocks stacked in source order, `space-8` (32px) gap between blocks, each column's links stacked (already the default). Bottom bar stacks: copyright centered on top, social icons centered below, `space-4` (16px) gap.

---

## 6. Component Inventory

For every interactive state: transitions are `150ms ease` unless noted. Focus rings must be visible for keyboard users (never `outline: none` without a replacement).

### 6.1 Nav
Covered fully in 5.1. Additional states: nav link default `gray-700`; hover `brand-primary` with no underline change until active; focus-visible gets a 2px `brand-primary` outline, 2px offset, 4px border-radius.

### 6.2 Primary button
- Default: background `brand-primary` (#2F5D9F), text `white`, Inter 600 16px, padding 14px 28px, border-radius 8px, border none, `box-shadow: 0 1px 2px rgba(15,23,42,0.08)`.
- Hover: background darkens to `#24487D`, `box-shadow: 0 4px 12px rgba(47,93,159,0.35)`, cursor pointer.
- Focus-visible: retains hover/default background, adds `2px solid #F59E0B` outline with `2px` offset (amber ring reads clearly against blue).
- Active/pressed: background darkens further to `#1D3A66`, no shadow (flattens to suggest a press).
- Disabled: background `gray-300`, text `gray-500`, no shadow, cursor `not-allowed`, no hover/active response.

### 6.3 Secondary button
- Default: background `transparent`, text `brand-primary`, border `1.5px solid #2F5D9F`, padding 12.5px 26.5px (accounts for border so total size matches primary button), border-radius 8px.
- Hover: background `rgba(47,93,159,0.08)`, border color unchanged.
- Focus-visible: `2px solid #F59E0B` outline, 2px offset.
- Active: background `rgba(47,93,159,0.14)`.
- Disabled: border `1.5px solid #CBD5E1` (gray-300), text `gray-400`, background transparent, cursor `not-allowed`.

### 6.4 Cards (generic)
- Default: background `white`, border `1px solid #E2E8F0` (gray-200), border-radius 12px, padding 32px (desktop/tablet) / 24px (mobile), `box-shadow: 0 1px 3px rgba(15,23,42,0.08)`.
- Hover (only for cards that are also links/clickable, e.g. none of the current cards are fully clickable — this state applies only if a card wraps a link in future iterations): `transform: translateY(-4px)`, `box-shadow: 0 12px 24px rgba(15,23,42,0.12)`, transition `200ms ease`.
- Focus (if clickable): same as hover plus `2px solid #2F5D9F` outline, 2px offset.
- Static/non-interactive cards (stat cards, service cards, step cards as used in this spec): default state only, no hover/focus treatment needed since they are not interactive elements.

### 6.5 Pricing tile
- Default: same base as generic card, but border-radius 16px, padding 32px, and includes the internal divider/list structure from 5.7.
- Featured tile (Tier 2 "Growth"): border `2px solid #2F5D9F`, `box-shadow: 0 12px 32px rgba(47,93,159,0.18)`, `transform: scale(1.03)` on desktop only (no scale on tablet/mobile since it's full width there), "Most Popular" badge: background `#F59E0B`, text `gray-900` Small/600, padding 6px 16px, border-radius 999px (pill), positioned centered, top: -14px relative to the tile.
- Hover (all tiles, desktop only): `translateY(-4px)`, shadow increases by roughly 50% opacity, `200ms ease`.
- CTA button inside tile inherits primary/secondary button states as specified (Tier 2 uses primary button; Tiers 1 & 3 use secondary button).

### 6.6 Testimonial card
- Default: same base as generic card (white, `gray-200` border, 12px radius, `0 1px 3px rgba(15,23,42,0.08)` shadow), padding 32px.
- No hover/focus state — static content, not interactive.

### 6.7 Form fields

**Text input / Email input**
- Default: height 48px, padding 12px 16px, border `1px solid #CBD5E1` (gray-300), border-radius 8px, background `white`, text `gray-900` 16px Inter 400, placeholder `gray-400`.
- Hover: border darkens to `#94A3B8` (gray-400).
- Focus: border `2px solid #2F5D9F`, `box-shadow: 0 0 0 4px rgba(47,93,159,0.12)` (soft focus ring), padding compensates for thicker border by reducing to 11px/15px so the field doesn't jump size (use `box-sizing: border-box` throughout to avoid this entirely — specify border-box globally).
- Error: border `2px solid #DC2626`, helper text below the field in `error-500`, Small style, e.g. "Enter a valid email address."
- Disabled: background `gray-100`, text `gray-400`, border `1px solid #E2E8F0`, cursor `not-allowed`.

**Textarea**
- Same visual spec as text input, min-height 140px, `resize: vertical` only (not horizontal), padding 12px 16px.

**Submit button**
- Uses Primary button spec (6.2) at full width of its container.
- Loading/submitting state (additional state beyond default/hover/focus/disabled, required since this is a real form submission): button becomes effectively disabled (same visual as Disabled state background/text) but shows a 16px spinner (simple CSS border-spin animation, `white` on default-colored background before it locks to gray — keep background `brand-primary` during loading, not gray, so it doesn't read as "broken") to the left of the label text, which changes to "Sending…"; spinner is a 16px circle, `2px` border, `rgba(255,255,255,0.3)` base with `white` top border, `rotate 600ms linear infinite`.

---

## 7. Imagery Direction

All imagery on this page is either a **lucide-react** icon (stroke width 2px unless noted) or a hand-built inline SVG/CSS geometric shape. No photography, no illustration libraries beyond lucide, no AI-generated images anywhere.

**Icon map (complete reference):**

| Location | Icon(s) | Color |
|---|---|---|
| Nav logo mark | custom hand-rolled anchor glyph (see 7.2) | `brand-primary` |
| Nav hamburger / close | `Menu` / `X` | `gray-900` |
| Problem stat cards | `Clock`, `Headset`, `CircleDollarSign` | `gray-400` |
| Service card 1 (Audit) | `ClipboardCheck` | `brand-primary` |
| Service card 2 (Implementation) | `Workflow` | `brand-primary` |
| Service card 3 (Training/Support) | `LifeBuoy` | `brand-primary` |
| How it works steps 1–4 | `Search`, `LayoutTemplate`, `Rocket`, `TrendingUp` | `brand-primary` |
| Testimonial quote mark | `Quote` | `brand-primary` at 20% opacity |
| Pricing "includes" list bullets | `Check` | `success-700` |
| Footer social | `Linkedin`, custom "X" glyph (see 5.9) | `gray-400` default, `white` on hover |
| Hero illustration node icons | `Headset`, `TrendingUp`, `Workflow`, `Users` | see 7.1 |

### 7.1 Hero illustration (the one non-icon graphic on the page)

An abstract "hub and orbit" composition suggesting a central business surrounded by agents handling different workflows. Build as inline SVG (or layered CSS circles) at 480×480px on desktop, 360×360px on tablet, 280×280px on mobile, centered in its container.

Layers, back to front:
1. **Outer ring**: circle, no fill, stroke `gray-200` (#E2E8F0), stroke-width 1.5px, diameter = 100% of container, dash pattern `4 6`. Slowly rotates 360° over 60s, linear, infinite — disable this animation entirely (render static) when the user's OS has `prefers-reduced-motion: reduce`.
2. **Middle ring**: circle, no fill, stroke `brand-primary` at 30% opacity, stroke-width 2px, diameter = 67% of container (≈320px at desktop scale), concentric with the outer ring.
3. **Connecting lines**: 4 thin curved bezier strokes (1px, `gray-300`), one from each orbiting node (below) to the center hub, subtly curved (not straight lines) to suggest flow rather than rigid structure. Under normal motion, apply a subtle animated `stroke-dashoffset` (dash `2 4`, animating over 3s linear infinite) to suggest activity; disable under `prefers-reduced-motion`.
4. **Orbiting nodes**: 4 small circles, 48px diameter (scale proportionally on smaller containers), positioned at 0°, 90°, 180°, 270° along the middle ring. Each: `white` fill, `1px solid gray-200` border, drop shadow `0 2px 6px rgba(15,23,42,0.08)`, containing one centered 20px icon: top node `Headset` (teal `brand-secondary`), right node `TrendingUp` (amber `#B45309` — a darkened amber for sufficient icon contrast against white fill), bottom node `Workflow` (blue `brand-primary`), left node `Users` (teal `brand-secondary`).
5. **Center hub**: filled circle, 96px diameter, fill `brand-primary`, `box-shadow: 0 8px 24px rgba(47,93,159,0.35)`, containing a centered 32px **white** version of the same custom anchor glyph used in the nav logo.

### 7.2 Custom anchor glyph (used in nav logo + hero hub)

A simplified monoline anchor icon, built as a 24×24 viewBox inline SVG, stroke-based (no fill, 2px stroke, round line caps/joins):
- A small circle (ring) centered at top, ~4px diameter, positioned at roughly (12, 4).
- A vertical line from the bottom of that ring straight down to about (12, 18).
- A short horizontal crossbar at about y=10, spanning from x=8 to x=16, centered on the vertical line (the anchor's "arms").
- Two curved hook strokes at the bottom (from around (12,18) curving outward and up to (6,15) on the left and (18,15) on the right), suggesting anchor flukes.
- Stroke color: `brand-primary` (#2F5D9F) when used standalone in the nav (on white background); `white` when used inside the filled hero hub (on brand-primary background) — both combinations meet AA per the contrast table (brand-primary on white 6.6:1; white on brand-primary 6.6:1).

This is the only "logo" asset needed; it should be built as a reusable inline SVG/React component (e.g. `<AnchorMark color="..." size={...} />`) so the engineer can drop it into both the nav and the hero without duplicating markup — the exact vector coordinates above are sufficient for the engineer to draw the path.

---

## Definition of done — verification

- All 9 required sections (Nav, Hero, Problem, Solution/Services, How It Works, Social Proof, Pricing, Final CTA, Footer) have finished copy (no lorem ipsum), an explicit layout description, and a responsive behavior note covering 375px/768px/1280px. ✅
- Component inventory covers nav, primary button, secondary button, generic cards, pricing tile, testimonial card, and all form fields (text input, email input, textarea, submit button) with default/hover/focus/disabled states (plus a loading state for submit, since the form requires it). ✅
- Imagery direction names the icon library (`lucide-react`), gives a complete icon-to-location map, and fully specifies the one custom illustration (hero graphic) and the one custom glyph (anchor mark) in enough geometric detail to build without further decisions. ✅
- Every color, font, spacing value, and breakpoint is a specific token/hex/px value — nothing is left as "engineer's choice" except the Tailwind-vs-plain-CSS decision, which is explicitly and intentionally left open per the brief. ✅

---

## 8. FAQ Page

Version 1.1 addendum — extends the landing page spec above with a new FAQ destination. Reuses the palette (Section 2), type system (Section 3), spacing/grid (Section 4), and component patterns already defined (Sections 5–7) without modification. Nothing in Sections 1–7 above changes; this section only adds new content and two small, precisely-specified integration points into the existing `Navbar` and `Footer`.

### 8.1 Integration decision: separate route, not a landing-page section

**Decision: the FAQ is a full separate route, `/faq`, not a section appended to the single-page landing flow, and there is no condensed "top questions" teaser section added to the landing page.**

Rationale a skeptical stakeholder would need:
- The landing page's section order is tuned as a conversion funnel: Problem → Services → How It Works → Proof → Pricing → Final CTA. Inserting an FAQ block anywhere in that sequence (most naturally between Pricing and Final CTA) puts a wall of objection-handling text directly in front of the page's one conversion moment — the audit-call form. That risks talking a warm visitor out of the room right before the ask.
- FAQ content serves a different visitor intent than the landing page: it's reference material for someone who already has a specific question (pricing mechanics, data handling, cancellation terms) rather than a persuasion narrative. That content is better served as an on-demand, linkable, bookmarkable destination than as mandatory scroll-through content.
- The existing Footer already ships a "FAQ" link under the Resources column (`src/components/sections/Footer.jsx`, currently a placeholder `href="#"`) — the information architecture already anticipated a distinct FAQ destination, not an anchor into the homepage.
- Keeping the landing page's section count and flow exactly as documented in Sections 5.1–5.9 (unchanged) avoids re-litigating a page that is already fully specified and, per the Definition of Done at the end of that spec, considered complete.

**New dependency required:** `react-router-dom` (pin to `^6.26.0` — the stable v6 line; do not adopt v7's data-router APIs for this addition, which aren't needed for two static routes and would add unrelated migration surface).

**Routing structure:**
- Wrap the existing render tree in `<BrowserRouter>`.
- Extract the current landing-page body (everything currently inside `<main id="main-content">` in `src/App.jsx`: `Hero`, `ProblemSection`, `Services`, `HowItWorks`, `Testimonials`, `Pricing`, `FinalCTA`) into a `LandingPage` component.
- Add a new `FaqPage` component (content and layout specified in 8.5–8.7 below).
- `<Routes>` has exactly two entries: `path="/"` → `LandingPage`, `path="/faq"` → `FaqPage`.
- `Navbar` and `Footer` continue to render once, outside/around `<Routes>`, exactly as they do today (already siblings of `<main>` in `App.jsx`) — they are shared chrome across both routes. `<main id="main-content">` now wraps `<Routes>` instead of wrapping the section list directly; the skip-link target and the mobile-menu `aria-hidden`/`visibility` logic already in `Navbar.jsx` (lines 77–94) continue to work unchanged since they operate on `#main-content` and `footer` regardless of which route is rendered inside `<main>`.
- Document title: set via a simple `useEffect(() => { document.title = '<value>'; }, [])` in each page component (no new dependency needed for this). Landing page title: `"Anchorpoint AI — Agentic AI, grounded in your business."` FAQ page title: `"FAQ — Anchorpoint AI"`.
- Cross-page anchor links (e.g., a `/faq` visitor clicking "Pricing" or the FAQ page's own "Book a Free Agent Audit" CTA, both of which must land on a section that only exists on `/`): use `<Link to="/#pricing">` / `<Link to="/#contact">` etc. React Router v6 does not auto-scroll to a URL hash on route change, so `LandingPage` must add one small effect that reuses the existing `useSmoothScrollTo` hook (`src/hooks/useSmoothScrollTo.js`, already in the codebase): on mount and whenever `location.hash` changes, if `location.hash` is non-empty, call `scrollTo(location.hash.slice(1))` once the section DOM has rendered. This is the only behavioral change required of `LandingPage` beyond the extraction described above.
- **Deployment note (SPA fallback):** because `/faq` is now a real client-side route with no matching static file, direct navigation or a hard refresh on `/faq` must be rewritten to `index.html` by the host, or it will 404. Configure whichever applies to the eventual host: Netlify → add a `public/_redirects` file containing `/*  /index.html  200`; Vercel → add a `rewrites` entry in `vercel.json` sending `/(.*)` to `/index.html`; a custom Node/Nginx server → `try_files $uri /index.html` in the server block. This is a one-time config addition, not an open decision — whichever host is used, apply the matching rule above.

### 8.2 Navbar integration (`src/components/sections/Navbar.jsx`)

**Nav link order changes from 5 items to 6:** `Services`, `How It Works`, `Results`, `Pricing`, `FAQ`, `Contact` — `FAQ` is inserted immediately before `Contact` (the existing rightmost link, which leads into the booking form), keeping the CTA button as the final, rightmost element exactly as today.

**Behavioral split by current route** (the same `NAV_LINKS`-driven list renders differently depending on `useLocation().pathname`):

| Link | On `/` (landing) | On `/faq` |
|---|---|---|
| Services, How It Works, Results, Pricing, Contact | Unchanged from today: `<a href="#id">` + `useSmoothScrollTo`, in-page smooth scroll, scroll-spy drives the active-state underline (5.1/6.1, unchanged) | Rendered as `<Link to="/#id">`, a real navigation back to `/` that lands and then smooth-scrolls to that section via the hash effect in 8.1. Never show the active/current underline state on `/faq` — scroll-spy does not run here since none of these sections exist on this route. |
| FAQ | Rendered as `<Link to="/faq">`. Never shows the active state on `/` — it's a plain, always-default-styled link (no scroll-spy target exists for it on this route). | Rendered as `<Link to="/faq">`. Shows the **current-page active state**: the exact same visual treatment already defined for scroll-spy active links in 5.1 (`brand-primary` text + 2px `brand-primary` underline offset 6px below the text) — driven here by `pathname === '/faq'` (a simple route match), not by scroll position. |
| "Book a Call" button | Unchanged: scrolls to `#contact` on the current page | Renders as a `<Link to="/#contact">` styled identically to the existing primary-button CTA; lands on `/` and scrolls to the Final CTA form via the hash effect |

**Mobile menu:** the same 6-link list (in the same order, `FAQ` between `Pricing` and `Contact`) replaces the current 5-link list inside the full-screen overlay (`Navbar.jsx` lines 176–206), with the identical route-aware behavior described in the table above applied per link. All existing mobile-menu mechanics — focus trap, `Escape` to close, portal to `document.body`, `aria-hidden`/`visibility` toggling of `#main-content` and `footer` — are unchanged and apply equally on both routes.

### 8.3 Footer integration (`src/components/sections/Footer.jsx`)

- `RESOURCE_LINKS`'s `"FAQ"` entry (currently `href="#"`, line 13/127 area) becomes a real `<Link to="/faq">`. No active-state treatment is needed here — the Footer has never shown a current-link indicator anywhere in the existing spec, and that stays true for the FAQ link too.
- `COMPANY_LINKS` (`Services`, `How It Works`, `Results`, `Pricing`) gets the same route-aware treatment as the Navbar's equivalent links: on `/`, unchanged (`useSmoothScrollTo`); on `/faq`, rendered as `<Link to="/#id">` instead, since the Footer is shared chrome rendered on both routes exactly like the Navbar.
- No other Footer copy or layout changes.

### 8.4 Page identity

**Page title (browser tab):** "FAQ — Anchorpoint AI"

**URL:** `/faq`

**Eyebrow label:** "QUESTIONS, ANSWERED"

**H1:** "Straight answers before you book a call."

**Subhead (Lead style):** "We wrote these because operators asked us — not because a template told us to. If something below doesn't cover it, ask us directly; a real person replies within one business day."

### 8.5 FAQ content (copy)

14 entries across 3 categories (within the "10–20 total" guidance). All 10 baseline SaaS-FAQ topics supplied in the brief are represented (mapped 1:1 below in source order: free trial → Q1, trial-ends → Q2, cancel anytime → Q3, monthly/annual billing → Q4, upgrade/downgrade → Q5, integrations → Q7, data residency → Q8, data export → Q9, API → Q10, startup/nonprofit discount → Q6), plus 4 added questions (Q11–Q14) that close gaps the existing Pricing/How-It-Works/Trust copy already implies but never states outright (onboarding technical burden, error handling, timeline, industry fit).

#### Category 1 of 3 — "Pricing & Plans"

**Q1. Do you offer a free trial?**
A. Not in the software-trial sense — Anchorpoint isn't a tool you install and click around in. It's a team that audits your workflows and builds agents for you, so there's nothing to "trial" until we've actually looked at your business. What we do offer for free is the same 30-minute Agent Audit call from our homepage: we look at one real workflow together and tell you plainly whether an agent is a fit, before any money changes hands. If you want to go further, the Audit tier itself is a low-commitment way in — a scoped 2-week engagement, $2,800 one-time, with no ongoing contract attached.

**Q2. What happens when my Audit engagement ends?**
A. You keep everything. At the end of your 2-week Audit, you get the full workflow audit, the prioritized agent roadmap, and the ROI estimates — plus 30 days of email support to ask questions about it. If you decide to move into Growth or Partner, we carry that work forward instead of starting over. If you decide not to continue, the roadmap is yours to keep or hand to another vendor. Nothing is deleted, and nothing is held back.

**Q3. Can I cancel anytime?**
A. Yes. Growth has a 3-month minimum commitment — enough time to actually get an agent live and proven — and after that it's month-to-month; cancel whenever you want with a message to your named contact, no cancellation fee and no retention call. Partner engagements are custom-scoped, so the exact minimum term is set when we scope yours, but the same rule applies: no auto-renewal traps, no surprise fees.

**Q4. Do you offer monthly and annual billing?**
A. Growth and Partner both bill monthly by default. If you'd rather pay upfront, we offer annual prepay at roughly 17% off — about two months free — for either tier, with the same terms otherwise. The Audit tier is a one-time $2,800 engagement, so billing cadence doesn't apply there.

**Q5. Can I upgrade or downgrade my plan?**
A. Anytime. Moving up — say, from Audit into Growth, or Growth into Partner — takes effect immediately, and we pick up right where your last engagement left off instead of re-starting the audit. Moving down takes effect at the start of your next billing cycle, so you're never charged twice or cut off mid-cycle.

**Q6. Is there a discount for startups or nonprofits?**
A. Every Anchorpoint client is already an SMB, so we don't run a separate "startup tier" on top of that — the Audit tier ($2,800 one-time) is already priced to be the low-risk way for a small or early-stage team to start. What we do offer is a Community Impact Rate: verified 501(c)(3) nonprofits get 20% off any Growth engagement. Ask your point of contact about verification.

#### Category 2 of 3 — "Data, Security & Integrations"

**Q7. Does Anchorpoint integrate with the tools we already use?**
A. That's the whole design principle — agents run inside your existing stack, not a separate app your team has to remember to open. We regularly integrate with helpdesks (Zendesk, Help Scout, Front), CRMs (HubSpot, Salesforce, Pipedrive), and everyday tools like Slack and Gmail/Outlook. Anything outside that list, we connect through Zapier or a direct webhook during the Design step of onboarding (see How It Works) — and we confirm every integration with you before anything goes live.

**Q8. Where is our data stored, and is it compliant?**
A. Your data stays in AWS, in the US East region by default, with an EU-West option available on request if you need data residency for GDPR. We maintain a SOC 2 Type II report available under NDA, and everything is encrypted in transit and at rest. This is also where "no black-box automations" becomes concrete: every agent action is logged, timestamped, and auditable, so you can always see exactly what data an agent touched and why.

**Q9. What if we need to export our data?**
A. Ask your named contact or drop a request in your dedicated Slack channel (Growth and Partner tiers) and we'll deliver a full export — workflow configs, agent logs, and roadmap documents — as CSV/JSON within 5 business days. Because agents run inside your own CRM, helpdesk, and inbox rather than a walled-garden platform, the bulk of "your data" never left your systems in the first place. That's the point of "no lock-in contracts": leaving costs you a conversation, not a migration.

**Q10. Do you have an API?**
A. Growth includes a read-only reporting API plus webhook notifications for agent activity, so you can pipe agent metrics into your own dashboards. Partner adds full API access — you can trigger and configure agents programmatically — plus dedicated webhook endpoints for your engineering team. The Audit tier doesn't include API access, since it's a one-time engagement with no live agents running yet.

#### Category 3 of 3 — "Working With Anchorpoint"

**Q11. How long until our first agent is live?**
A. Most clients see a working pilot agent inside 3–4 weeks of kicking off a Growth engagement: about a week for Discover and Design (see How It Works), then the agent launches in a limited pilot on real tickets, leads, or tasks before we roll it out fully. Timeline shifts with the complexity of what you're automating, but we give you a specific date, in writing, before you sign anything.

**Q12. What happens if an agent gets something wrong?**
A. Every agent we design ships with guardrails and an escalation path to a human — that's part of the Design step, not an afterthought. When an agent hits a situation outside its guardrails, it hands off to your team instead of guessing. And because every action is logged (see "Where is our data stored"), we can always trace exactly what happened and tune the agent so it doesn't happen again. If something does go wrong, you call your named contact directly — never a support ticket queue.

**Q13. Do we need in-house technical staff to work with you?**
A. No. We built Anchorpoint for operators, not IT departments. Our team designs, builds, and integrates the agents; your team's job is just to tell us where the time is going and sign off on the workflow before we build it. The 2 live training sessions included in Growth are there to get your non-technical staff comfortable running alongside the agent, not to teach anyone to code.

**Q14. Is our industry a good fit for agentic AI?**
A. If your team spends real hours on repetitive digital work — answering routine tickets, chasing invoices, qualifying leads, moving data between systems — it's worth a look. We've deployed agents for dental groups, logistics operators, manufacturers, insurance agencies, and home services businesses, which is a wide enough spread that industry alone rarely disqualifies you. The honest answer comes from the free Agent Audit call, where we tell you plainly if the volume and repetition are there to justify it.

#### Closing CTA row copy

- H3 (see 8.6 for the visual/semantic note on this heading level): **"Still have questions?"**
- Body copy: "We'd rather talk it through than have you guess. Ask us anything above on a real call — no script, no ticket queue, no obligation."
- Primary button label (reuses the exact Hero CTA copy from 5.2 for consistency, since it is the same offer): **"Book a Free Agent Audit"** — routes to `/#contact`.
- Secondary line next to the button, Small style, `gray-500`, `mailto:hello@anchorpoint.ai` link (underline + `brand-primary` on hover, matching the Footer's link hover treatment): **"or email hello@anchorpoint.ai"**

### 8.6 Layout & responsive behavior

**Overall page structure, top to bottom:** `Navbar` (shared, 8.2) → page header block → 3 category blocks (each: category heading + accordion list) → closing CTA band → `Footer` (shared, 8.3).

**Page header block:**
- Background `white`. Centered text block, max-width 640px (reusing the exact centered-header-block convention from 5.3–5.7), containing eyebrow → H1 → subhead in that order, `space-4` (16px) gaps between them, matching the Hero's internal spacing rhythm.
- Padding: mirrors the Hero's role as "first thing under the nav" (5.2) — `space-24` (96px) top / `space-16` (64px) bottom at tablet and desktop (≥768px); `space-16` (64px) top / `space-8` (32px) bottom at mobile (<768px). Sits directly under the fixed nav bar exactly as Hero does, no extra gap.

**Category blocks (×3):**
- Each block: a category heading, then `space-8` (32px) gap (reusing the token already defined for "spacing between a heading and the content under it"), then the accordion list container.
- Category heading is semantically an `<h2>` (correct document outline: H1 page title → H2 category → H3 question — see 8.7), but is *visually* styled using the existing H3 scale (28px/36px desktop, 24px/32px tablet, 22px/30px mobile, Space Grotesk 600, `gray-900`) rather than the full H2 scale. This is an intentional, explicit decoupling of semantic level from visual size — identical in spirit to how 5.9's footer treats copyright-line color — done here because repeating the full 40px H2 treatment three times on one page reads as oversized; no new type size is introduced, this only reuses the H3 row of the existing scale (Section 3) under an H2 tag.
- Gap between category blocks: `space-16` (64px) at tablet/desktop, `space-8` (32px) at mobile — smaller than the `space-24` (96px) inter-section padding used between full landing-page sections, because these are sub-sections of one continuous page, not independent, alternating-background landing sections.
- Content column max-width: **720px**, centered (`margin-inline: auto`) within the standard page container. This is intentionally wider than the 640px header-block convention (which is reserved for short eyebrow/H2/subhead intros) because this column holds full paragraph answers that need more breathing room — consistent with the spec's existing practice of defining purpose-specific pixel widths (640px header blocks, 560px form card, 480/360/280px hero illustration).

**Accordion list container (per category):**
- `white` background, `1px solid` `gray-200` border, `12px` border-radius (reusing the generic-card token from 6.4). No drop shadow (this is a list, not a floating card).
- Each question is one full-width row inside the container. Rows are separated by a `1px solid` `gray-200` internal divider (reusing the exact divider convention from the Pricing tile, 5.7/6.5); the last row in a container has no trailing divider, since the container's own bottom border closes it off.
- Row padding: `24px` vertical (`space-6`) at all breakpoints; horizontal padding `32px` (`space-8`) at tablet/desktop, `24px` (`space-6`) at mobile — both values reused directly from the existing card-padding tokens in Section 4, not new values.
- Row content: question text left-aligned, a `ChevronDown` icon (lucide-react, 20px) right-aligned, vertically centered against the question text. See 8.7 for the full interactive spec.

**Closing CTA band:**
- Full-bleed `gray-50` background (reusing the exact background used to separate the Problem section from Hero, 5.3), sitting directly below the last category block with `space-16` (64px) top/bottom padding at tablet/desktop, `space-12` (48px) at mobile.
- Centered content, max-width 640px: H3 "Still have questions?" (real H3, both semantically and visually this time — no decoupling needed since it appears once, not three times), body copy below it with `space-2` (8px) gap, then a CTA row with `space-4` (16px) top margin: primary button ("Book a Free Agent Audit") and the secondary mailto text link on the same row at desktop/tablet (24px gap between them, matching the Hero CTA row pattern from 5.2), stacking to full-width button + centered link below (16px gap) on mobile — this is the identical responsive pattern already specified for the Hero CTA row in 5.2, reused here rather than invented anew.

**Responsive behavior summary:**

| Breakpoint | Category headings | Accordion rows | Content column |
|---|---|---|---|
| Mobile (375–767px) | H3-visual scale at 22px/30px | Full width of container minus 20px side padding; 24px padding all sides | Fluid, no 720px cap needed (never reached) |
| Tablet (768–1279px) | H3-visual scale at 24px/32px | Full width of the 720px-capped column; 24px/32px padding | Fluid up to 720px cap, centered |
| Desktop (≥1280px) | H3-visual scale at 28px/36px | Full width of the 720px-capped column; 24px/32px padding | Fixed 720px, centered within the 1280px container |

No column-count changes are needed at any breakpoint — the FAQ list is always single-column; only the outer container padding and heading sizes change per breakpoint, per the table above.

### 8.7 Accordion / disclosure component — full interaction spec

This is a real, keyboard- and screen-reader-operable disclosure widget, following the WAI-ARIA Authoring Practices "Accordion" pattern. **Multiple items may be expanded at the same time** (this is explicitly not an exclusive single-open accordion) — decided this way because FAQ readers frequently want to compare two answers at once (e.g., "monthly vs. annual billing" next to "upgrade/downgrade"), and an exclusive accordion would force them to lose their place.

**Markup structure per item:**
```
<h3>
  <button
    id="faq-trigger-{n}"
    aria-expanded="true|false"
    aria-controls="faq-panel-{n}"
  >
    {question text}
    <ChevronDown /> {/* decorative, aria-hidden="true" */}
  </button>
</h3>
<div
  id="faq-panel-{n}"
  role="region"
  aria-labelledby="faq-trigger-{n}"
>
  {answer text}
</div>
```
- Question heading level is semantically `<h3>` (correct outline under the category's `<h2>` — see 8.6), but is *visually* styled using the existing H4 scale (20px/28px desktop, 19px/27px tablet, 18px/26px mobile, Space Grotesk 600) — the same decoupling technique used for category headings in 8.6, applied one level down, so that 14 stacked questions don't render at full 28px H3 weight.
- Answer text uses the existing Body scale (16px/26px, Inter 400, `gray-700`) unchanged across all breakpoints.

**Animation technique (must be both accessible and smooth):** the panel `<div>` uses a CSS `grid-template-rows` transition between `0fr` (collapsed) and `1fr` (expanded), `200ms ease`, with an inner wrapper `div` set to `overflow: hidden` around the answer text so content doesn't reflow visibly during the transition. In addition to the grid-row animation, set `aria-hidden="true"` on the panel's inner content wrapper whenever `aria-expanded="false"` on its trigger, so collapsed answer text is correctly removed from the accessibility tree (not just visually clipped) while still allowing the smooth height animation. Because answer paragraphs contain no interactive elements (no links, no buttons), there is no tab-order leakage to guard against inside a collapsed-but-still-in-DOM panel.

**States (all transitions `150ms ease` unless noted):**

| State | Visual spec |
|---|---|
| Default (collapsed, not hovered/focused) | Row background `transparent` (container background `white` shows through); question text `gray-900`; chevron `gray-500`, pointing down, no rotation |
| Hover | Row background `gray-50`; question text and chevron colors unchanged from default; `150ms ease` background-color transition; cursor `pointer` |
| Focus-visible (keyboard focus on the trigger `<button>`) | `2px solid` `brand-primary` outline, `2px` offset, `4px` border-radius — identical to the nav-link focus ring already specified in 6.1, reused here for consistency |
| Expanded | Question text switches to `brand-primary` (signals "open," matching the existing convention that `brand-primary` text means "active/current" used for nav active-link state in 5.1/6.1); chevron rotates `180deg` over `200ms ease` (transform only, no color change beyond matching the question text's new `brand-primary`); row background returns to `transparent`/`white` unless also hovered, in which case `gray-50` hover still applies on top |
| Collapsed (after having been open) | Identical to Default — no "recently closed" residual styling |
| Disabled | N/A — no FAQ item is ever disabled; this state does not apply to this component |
| Loading | N/A — content is static and pre-rendered; there is no async loading state for this component |

**Keyboard interaction (complete, per WAI-ARIA Accordion pattern):**
- `Tab` / `Shift+Tab`: moves focus linearly between trigger buttons in visual (DOM) order, then into the closing CTA button, then into the Footer — expanded panels add no additional tab stops, since answer text has no focusable content.
- `Enter` or `Space` (trigger button focused): toggles that item's `aria-expanded` value and its panel's visibility, via native `<button>` activation semantics — no custom key handling required for this part.
- `Down Arrow` (trigger button focused): moves focus to the next question's trigger button. Does not wrap past the last item.
- `Up Arrow` (trigger button focused): moves focus to the previous question's trigger button. Does not wrap past the first item.
- `Home`: moves focus to the first trigger button on the page (first question of Category 1), regardless of which category currently has focus.
- `End`: moves focus to the last trigger button on the page (last question of Category 3).
- Focus order matches visual/reading order exactly at every breakpoint; no `tabindex` values other than the default `0` (native button) are used anywhere in this component.

### 8.8 Accessibility requirements (page-level)

- Heading outline for the page must read, in order: `<h1>` "Straight answers before you book a call." → `<h2>` "Pricing & Plans" → three `<h3>` questions → `<h2>` "Data, Security & Integrations" → four `<h3>` questions → `<h2>` "Working With Anchorpoint" → four `<h3>` questions → `<h3>` "Still have questions?" (a real H3, not decoupled, since it appears once). No heading level is skipped anywhere on the page.
- Every trigger button carries `aria-expanded` (boolean, kept in sync with actual panel visibility) and `aria-controls` pointing to its panel's `id`, per 8.7's markup structure — this is the mechanism both the frontend engineer and QA should check against; a row that merely *looks* expanded/collapsed without these two attributes wired correctly does not meet this spec.
- Each panel carries `role="region"` and `aria-labelledby` pointing back to its trigger's `id`, so assistive technology announces "Q1, region" style landmarks correctly when navigating by region.
- The decorative `ChevronDown` icon is `aria-hidden="true"` and carries no independent label; the question text inside the `<button>` is the button's full accessible name (do not add a separate `aria-label` that duplicates or overrides the visible question text).
- Collapsed-panel content is excluded from the accessibility tree via `aria-hidden="true"` on the inner content wrapper (see 8.7's animation technique) — verify with a screen reader that collapsed answers are not announced when using "next heading" or "next region" navigation commands.
- Focus order equals DOM order equals visual order at all three breakpoints (375/768/1280) — no CSS-only reordering (e.g., `flex-direction: row-reverse`, `order`) is used anywhere on this page, so keyboard/AT navigation order can never diverge from what's visually presented.
- Route-level focus management: on navigating to `/faq` via a `Link` click (whether from Navbar, Footer, or the landing page's cross-links), focus must move to the page's `<h1>` (via a `ref` + `.focus()` call on mount, with `tabIndex={-1}` on the `h1` so it's programmatically focusable without adding it to the regular tab order). This matches standard SPA route-change accessibility practice and ensures screen reader users landing on `/faq` aren't left with focus stranded on the nav link they just activated.
- The existing skip link ("Skip to main content", already in `App.jsx`) continues to work unchanged on `/faq` since `#main-content` still wraps whichever page is active.
- Color/contrast: this page introduces no new foreground/background text pairings beyond ones already verified in Section 2's contrast table (`gray-900`/`gray-700` on `white`, `white` on `brand-primary-dark`/`brand-primary` for the shared Navbar/Footer chrome, `brand-primary` on `white` for the expanded-question and active-nav-link states, `gray-500` on `white` for the secondary mailto link, `gray-500` on `gray-50` for the closing-band body copy — this last pairing is a lighter background than pure white but a *lighter* background only ever increases contrast versus the already-passing `gray-500`/`white` ratio of 4.8:1, so it remains AA-pass without recomputing). No new color pairing is introduced.

### 8.9 Icons used on this page

All from `lucide-react` (already a project dependency, per Section 7's imagery direction — no new icon library introduced).

| Location | Icon | Color |
|---|---|---|
| Accordion row, collapsed | `ChevronDown` | `gray-500` |
| Accordion row, expanded | `ChevronDown`, rotated 180deg via CSS transform (same icon, no swap to `ChevronUp`, to avoid an extra icon import for a purely rotational state change) | `brand-primary` |

No other new imagery is introduced on this page — no new illustration, no photography, matching the rest of the site.

### 8.10 Definition of done — FAQ page verification

- Integration approach is decided and justified (separate `/faq` route, no landing-page teaser section), with the exact new dependency (`react-router-dom` `^6.26.0`), routing structure, cross-page anchor-scroll mechanism, and SPA-fallback hosting config all specified — nothing left for the engineer to decide. ✅
- Navbar and Footer integration is fully specified per link, per route (table in 8.2), including the FAQ link's current-page active state and the existing 5 links' route-aware behavior when visited from `/faq`. ✅
- All 10 required baseline FAQ topics are represented (see mapping at the top of 8.5), rewritten in full in Anchorpoint AI's Grounded/Confident/Plainspoken voice with real, specific details (exact prices, tier names, percentages, timeframes) pulled from this same document's existing Pricing (5.7) and Trust Paragraph (Section 1) content — no bracketed placeholders remain. 4 additional questions close gaps implied elsewhere in the spec. ✅
- Full layout description and responsive behavior at 375px/768px/1280px are specified for the page header, category blocks, accordion list, and closing CTA band. ✅
- The accordion component's default/hover/focus-visible/expanded/collapsed states are fully specified with exact colors/transitions, disabled/loading are explicitly marked not-applicable with reasoning (rather than silently omitted), and the full keyboard interaction set (Tab, Enter/Space, Arrow keys, Home/End) is specified per the WAI-ARIA Accordion pattern. ✅
- Accessibility requirements name the exact markup contract (`aria-expanded` + `aria-controls` + `role="region"` + `aria-labelledby`), the exact heading-level outline, and route-change focus management — precise enough for QA to verify pass/fail without further interpretation. ✅
- No new color, font, or spacing token is introduced; every value used on this page traces back to an existing token or an already-established purpose-specific pixel width in Sections 2–7. ✅
