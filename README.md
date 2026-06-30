# DoneWithMyEx — v1 Desktop

The v1 "wedge" UI for **DoneWithMyEx** — a payer's-side money-and-sanity tracker
for people paying alimony / child support. A free, funny **freedom countdown** to
the day the obligation ends, plus paid **payment logging** and **proof export**.

This app is a faithful React/Vite/TypeScript implementation of the **Claude Design**
canvas **`DoneWithMyEx Desktop.dc.html`** (kept for reference under
[`design/claude-design/`](design/claude-design/)). The Claude Design output is the
UI source of truth; the earlier `design/v1/` mocks are superseded reference only.

## What's implemented

A single authenticated app surface (sidebar + topbar) with four routes:

| Route | Highlights |
|---|---|
| **Dashboard** | Three switchable layouts — **Mission Control** (progress donut + ledger grid + share card), **Cinematic** (split-flap flip-clock hero), **Editorial** (calm typographic). The choice persists to `localStorage`. |
| **Countdown** | Flip / Straight / Minimal clock styles × Straight / Humor / Nerd unit modes (Taco Tuesdays, Microfortnights…), live-ticking, progress bar. |
| **Logger** | 10-second log panel (spousal vs child-support), on-record list, locked-export CTA. Logging a payment prepends a live row. |
| **Vault** | Cream PDF-style statement with the on-document disclaimer, plus a receipt grid. |

Every progress visual (countdown, bar, donut, percentage, ledger totals) is driven
from **one source of truth** in [`src/lib/freedom.ts`](src/lib/freedom.ts) — a direct
port of the canvas's `renderVals()` — so they stay mathematically consistent
(e.g. parole window `2025-08-01 → 2028-06-22`, `$2,400/mo`).

### Compliance copy is preserved as designed
Pro-you / situation-mocking (never anti-ex). No tax-deduction claims, never
"court-admissible" — proof is framed as *"organized records for negotiation,
disputes & peace of mind."* Persistent *"Not legal, financial, or tax advice."*

## Stack

React 19 · Vite · TypeScript · Tailwind v4. The screens mirror the canvas's exact
styling (via style objects reading tokens from [`src/lib/tokens.ts`](src/lib/tokens.ts));
the `@theme` tokens in `src/index.css` expose the "Financial Insurgent" palette for
future shadcn-style work.

> Scope note: this is the **UI** wedge. Auth (Supabase), Stripe checkout/webhook,
> server-side PDF/CSV, and persistence are deferred — to be ported from the
> `dwmx-old` donor repo per `docs/HANDOFF-v1-build.md`. The countdown/logger/vault
> currently run on in-memory demo data.

## Develop

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run lint
npm run preview  # serve the production build
```

## Layout

```
src/
  App.tsx                      state (route/layout/clock/toast), routing, the 1s tick
  lib/
    freedom.ts                 computeFreedom() — the single-source-of-truth math
    tokens.ts                  colors, fonts, gold gradient, segmented-control helpers
  components/
    Sidebar.tsx  Topbar.tsx  Toast.tsx  FlipClock.tsx
    Countdown.tsx  Logger.tsx  Vault.tsx
    dashboard/  MissionControl.tsx  Cinematic.tsx  Editorial.tsx
public/assets/crow-cut.png     brand mark (also the favicon)
design/claude-design/          the imported Claude Design source (reference)
```
