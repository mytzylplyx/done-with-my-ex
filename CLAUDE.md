# DoneWithMyEx — working notes for Claude

A payer's-side money-and-sanity tracker for people paying alimony / child support:
a free, funny **freedom countdown** to the day the obligation ends, plus paid
**payment logging** and **proof export**. US-only at launch.

## Where the project is right now
- v1 **desktop** UI is a faithful React implementation of the Claude Design canvas
  (`design/claude-design/DoneWithMyEx-Desktop.dc.html`), and is now **responsive /
  mobile-ready** (see `src/lib/useBreakpoint.ts` + the drawer nav in `App.tsx`).
- **`main` is the source of truth.** Build passes, lint clean.
- **Active thread: the founder wants to refine the _visual design_.** The current
  "Financial Insurgent" navy+gold look is not yet where they want it. The plumbing
  (math, routing, compliance copy, responsive shell) is good — iterate on the
  *look* in place; don't rewrite the working internals to change the skin.

## Stack & commands
React 19 · Vite 8 · TypeScript · Tailwind v4. Node 22 (see `.nvmrc`).
```bash
npm ci          # install from lockfile
npm run dev     # Vite dev server → http://localhost:5173
npm run build   # tsc -b && vite build
npm run lint
```

## Architecture — where things live
- `src/lib/freedom.ts` — **single source of truth** for all countdown/progress
  math (`computeFreedom()`, a port of the canvas `renderVals()`). Every visual —
  donut, bars, digits, %, ledger totals — derives from here. Don't fork this math.
- `src/lib/tokens.ts` — **all design tokens** (colors `C`, gold gradient, fonts,
  segmented/nav helpers). To change the *look*, start HERE (and `src/index.css`
  `@theme`), not by hardcoding hex in components.
- `src/lib/useBreakpoint.ts` — JS breakpoint hook (mobile ≤767 / tablet ≤1023 /
  desktop). The app styles via inline style objects, so responsiveness is
  JS-driven; components branch their layout on this.
- `src/App.tsx` — state (route/layout/clock/toast/drawer), routing, the 1s tick.
- `src/components/` — `Sidebar` `Topbar` `Toast` `FlipClock` `Countdown` `Logger`
  `Vault`; `dashboard/` has `MissionControl` `Cinematic` `Editorial` (3 switchable
  dashboard layouts, persisted to localStorage).
- `docs/` — strategy (`INTERROGATION.md`), design spec (`DESIGN-v1.md`), build
  handoff (`HANDOFF-v1-build.md`), Claude Design brief (`CLAUDE-DESIGN-BRIEF.md`).

## HARD compliance guardrails — preserve through ANY redesign
- **No tax-deduction messaging. Never "court-admissible."** Proof is framed as
  *"organized records for negotiation, disputes & peace of mind."*
- **Pro-you, not anti-ex.** The child-support countdown is a neutral milestone —
  never "free from your kid." Minimize third-party (ex) data.
- Persistent disclaimer: **"Not legal, financial, or tax advice."**

## Not built yet (deferred, per HANDOFF-v1-build.md)
Auth (Supabase RLS) · Stripe checkout/webhook (port from `dwmx-old`) ·
server-side PDF/CSV · real persistence (screens run on in-memory demo data) ·
landing page · funnel analytics · SEO blog posts.
