# DoneWithMyEx — v1 Wedge Design (roll 2)

**Status:** design locked for the v1 wedge. Logo is interim (existing DWMX crow); polish deferred post-launch.
**Branch note:** this work is on `claude/done-with-my-ex-redesign-hv37kf`, branched from `claude/done-with-my-ex-redesign-l9yldq` (which holds `docs/INTERROGATION.md`). Two sibling branches exist — reconcile/merge as desired.

Mockups live in `design/v1/` (HTML + screenshots). They are static reference mocks; the real build is React + Tailwind + shadcn. Rendered with system fallback fonts (build uses real Space Grotesk / Inter / Work Sans) and a placeholder crow glyph (real crow drops in).

---

## 1. Design system — "Financial Insurgent"

| Token | Value |
|---|---|
| Surface base | `#051036` |
| Surface darkest | `#010A31` |
| Containers | `#0E193E` / `#131D43` / `#293359` |
| Freedom Yellow (gold) | 135° gradient `#FFE4AF → #FFC107` (spotlight, used sparingly) |
| Success Teal | `#97F7F6` (deep `#008080`) |
| Text / on-surface | `#DDE1FF`; muted `rgba(221,225,255,.58)`; faint `.36` |
| Hairline | `rgba(221,225,255,.10)` |
| Display font | Space Grotesk (700) |
| Body font | Inter |
| Label font | Work Sans (600/700, uppercase, letter-spacing ~.16–.22em) |

**Rules:** sharp/low-radius corners, NO wireframe outlines (depth via tonal layering, not borders), gold as a single spotlight (not a flood), dramatic type scale, monolithic surfaces, editorial financial-journal feel. (Roll 2 added slightly rounded cards + the skeuomorphic flip-clock per founder preference — the system flexes.)

## 2. Logo / wordmark
- **Wordmark lockup:** crow mark + vertical gold divider rule + **DONE** (gold gradient) / **WITH MY EX** (lavender `#DDE1FF`), Space-Grotesk-style heavy caps, two lines. `.sm` variant for nav/sidebar.
- **Crow:** interim = existing **DWMX Crow.png** in Ace's Google Drive (My Drive root), file id `1vf9t372uSxx9R-Awe5zg9CENCWIzik4P`. In mocks it's a placeholder SVG glyph. Replace `favicon.svg` (currently a purple Lovable placeholder) with a vector trace of the crow at build time.

## 3. Components
- **Flip-clock countdown (`.flip-panel`/`.flip`):** split-flap tiles, gold digits, center seam + hinge caps, teal underglow bar, **faint vertical separators between unit groups**. Units = Years/Months/Days/Hours. NOTE: support multiple countdown styles as a build-time toggle (flip / straight / minimal).
- **Progress bar + donut:** all progress visuals MUST be driven from one source of truth and be mathematically consistent (e.g. 723 days left ≈ 1y 11m 23d; 333 days served / 723 to go ≈ 31.5%).
- Buttons (gold primary / ghost), pills (default / teal / lock), cards, sidebar nav, statement "document" (cream `#fbf7ee` on navy for the export preview).

## 4. Screens (mocks in `design/v1/`)
1. **Landing** — hero "Your freedom has a date", flip-clock + humor teaser, gold CTA, 3 value cards, disclaimer footer. (`r2-01-landing.jpg`)
2. **Freedom Countdown** — free toy: big flip-clock, progress bar w/ real dates (8/1/2025→6/22/2028, 31.5%), Straight/Humor/Nerd toggle, humor unit chips, Share card + Save→Signup. (`r2-02-countdown.jpg`)
3. **Payment Logger** — paid anchor framed as PROTECTION: typed rows (alimony vs child support), 10-sec log panel, free-tier "Export locked" chip. (`03-logger.jpg`)
4. **Proof Vault** — branded PDF/CSV statement preview with disclaimer on the doc, receipt vault. (`04-vault.jpg`)
5. **Paywall** — "Gate the records, never the lure"; Free / Pro ($42yr nudged, $4.20mo) / War Chest (coming soon). (`05-paywall.jpg`)
6. **App Dashboard** — Stitch-inspired: sidebar + Freedom Clock hero + Ledger (Paid so far / Left to pay / On track) + progress donut + daily-cost + freedom-nudge. (`r2-03-dashboard.jpg`)

## 5. Copy & compliance guardrails (LOCKED)
- Freedom-forward, pro-you, situation-mocking — NEVER anti-ex/anti-women. (Stitch sample's "Ransom / Extracted / reparations / spies" copy was rejected and swapped to "Paid so far / Left to pay / On track".)
- NO tax-deduction claims (post-2018 alimony isn't federally deductible; CS never was). Never "court-admissible" — frame as "organized records for negotiation, disputes & peace of mind."
- Child-support countdown framed as a neutral financial milestone, never "free from your kid."
- Persistent disclaimer: "Not legal, financial, or tax advice." US-only at launch.

## 6. Pricing
Free "On Parole" $0 (countdowns, humor/nerd, share cards, log payments — export locked) · **Pro "Done" $42/yr (nudged) or $4.20/mo** (unlimited logging, Proof Vault export, receipts) · War Chest ~$120/yr **Coming soon** (splitter, budget guardian, bulk case-file export — NO tax-pack claim).

## 7. Regenerate the mocks
`cd design/v1 && npm i playwright-core && node render.js` (uses preinstalled Chromium; external requests blocked so fonts fall back). Screens are element-screenshotted by id.
