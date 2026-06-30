# Claude Design — v1 Kickoff Brief

Paste-ready brief for designing the DoneWithMyEx v1 wedge in **Claude Design** (claude.ai, Pro/Max-gated, Opus 4.7).

## How to use
1. Open Claude Design. **Attach** the references: the 8 screenshots from `design/v1/` (regenerate with `node design/v1/render.js`), both `design/v1/wedge-roll*.html`, and `DWMX Crow.png` (from Ace's Drive).
2. Paste the brief block below.
3. Work screen-by-screen — start with **Countdown** + **Dashboard** (most distinctive), then logger/vault/paywall, then mobile + states.
4. Export via **"Handoff to Claude Code"** (not a Vercel import). Optionally "Send to Vercel" for a quick live preview.
5. That bundle becomes the UI source of truth for the build (see `HANDOFF-v1-build.md`).

## Pricing note
Pro ($20) only allows ~3–4 design prompts/week — too thin for 6 screens + mobile + states. **Max 5x ($100) is the realistic tier for the design sprint**, or batch aggressively.

---

```
PROJECT: DoneWithMyEx — v1 wedge UI design

WHAT IT IS: a payer's-side money-and-sanity tracker for people (mostly men) paying alimony / child support — a free, funny "freedom countdown" to the day the obligation ends, plus paid payment-logging + proof export. The crow (breaking a chain) is the brand's face; the founder stays anonymous.

GOAL OF THIS SESSION: produce high-fidelity, responsive, component-based screens for the v1 wedge. I'm attaching reference mocks (screenshots + HTML) and the logo — match and elevate them, don't reinvent the system.

DESIGN SYSTEM — "Financial Insurgent" (use these tokens EXACTLY):
- Surfaces (deep lacquered navy): base #051036, darkest #010A31, containers #0E193E / #131D43 / #293359. Never pure black.
- Spotlight gold ("Freedom Yellow"): 135deg gradient #FFE4AF -> #FFC107. Use SPARINGLY as a spotlight (CTAs, countdown numerals, key accents) — not a flood.
- Accent teal: #97F7F6 (deep #008080).
- Text: #DDE1FF; muted rgba(221,225,255,.58); faint .36. Hairline rgba(221,225,255,.10).
- Type: Space Grotesk (700, display), Inter (body), Work Sans (600/700 uppercase labels, letter-spacing .16–.22em).
- Rules: sharp / low-radius corners, NO wireframe outlines (depth via tonal layering, not borders), dramatic type scale, monolithic surfaces, editorial financial-journal feel.

BRAND:
- Wordmark lockup: crow mark + vertical gold divider rule + "DONE" (gold gradient) over "WITH MY EX" (lavender #DDE1FF), heavy geometric caps, two lines. Make a compact variant for nav/sidebar.
- Logo mark: the attached DWMX crow (angular two-tone navy/gold crow breaking a chain). Use in nav + as the favicon source.

VOICE & COMPLIANCE GUARDRAILS (hard limits — copy must obey):
- Freedom-forward, pro-you, mock the SITUATION / system / calendar / your own wallet — NEVER attack exes / women / mothers.
- No tax-deduction claims (post-2018 alimony isn't deductible; CS never was). Never say "court-admissible." Frame proof as "your organized records for negotiation, disputes & peace of mind."
- The child-support countdown is a NEUTRAL financial milestone ("the finish line on payments") — never "free from your kid."
- Persistent disclaimer: "Not legal, financial, or tax advice." US-only at launch.

SCREENS TO DESIGN (6 — references attached):
1. Landing — hero "Your freedom has a date," countdown teaser + humor line, single gold CTA, 3 value cards, disclaimer footer.
2. Freedom Countdown (free, no login) — hero countdown; SUPPORT MULTIPLE COUNTDOWN STYLES as a toggle (split-flap flip-clock / straight / minimal); progress bar w/ real dates; Straight/Humor/Nerd mode toggle with unit chips; "Share my freedom card" + "Save -> Sign up."
3. Payment Logger (paid) — framed as PROTECTION not bookkeeping; typed rows (alimony vs child support), 10-second log panel, receipt upload, free-tier "Export locked" state.
4. Proof Vault (paid) — branded PDF/CSV statement preview with the disclaimer on the document; receipt vault grid.
5. Paywall — "Gate the records, never the lure." Free "On Parole" $0 / Pro "Done" $42yr (nudged) or $4.20mo / War Chest ~$120yr "Coming soon." Export crossed out on Free.
6. App Dashboard — sidebar + Freedom Clock hero + "The Ledger" (Paid so far / Left to pay / On track) + progress donut + daily-cost + a freedom-nudge card.

DO THE WORK THE MOCKS DON'T HAVE YET (this is the point of this session):
- MOBILE / responsive layouts for every screen (the share card + monthly logging habit live on mobile).
- Component states: default / hover / focus / empty / loading / error; and free-vs-Pro (locked vs unlocked) variants.
- Real fonts rendered (Space Grotesk / Inter / Work Sans).
- Swap the placeholder crow glyph for the real attached crow.
- Design the shareable "freedom card" / OG image (the viral surface — screenshot-worthy, group-chat-friendly, not a public-feed flex).
- A consistent component library: buttons (gold/ghost), cards, pills (default/teal/lock), inputs, segmented controls, nav/sidebar, the flip-clock, the progress donut/bar, and the cream "statement document."

CONSISTENCY RULE: any progress visual (countdown / bar / donut / %) must be mathematically consistent — drive them from one set of numbers (e.g. 723 days left ≈ 1y 11m 23d ≈ 31.5% of the term).

DELIVERABLE: high-fidelity, component-structured, responsive screens + a small component library. Keep markup clean and component-structured in HTML/CSS — the framework conversion to React/Tailwind happens later at the Claude Code handoff, so organize for a clean export.
```
