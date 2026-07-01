# DoneWithMyEx — working notes for Claude

A payer's-side money-and-sanity tracker for people paying alimony / child support:
a free, funny **freedom countdown** to the day the obligation ends, plus paid
**payment logging** and **proof export**. US-only at launch.

## Where the project is right now
- v1 **desktop** UI is a faithful React implementation of the Claude Design canvas
  (`design/claude-design/DoneWithMyEx-Desktop.dc.html`), and is now **responsive /
  mobile-ready** (see `src/lib/useBreakpoint.ts` + the drawer nav in `App.tsx`).
- **`main` is the source of truth.** Build passes, lint clean.
- **Active thread — visual redesign.** The founder isn't happy with the current
  "Financial Insurgent" navy+gold look. Iterate on the *look*; the plumbing (math,
  routing, responsive shell) is good — don't rewrite working internals to reskin.
- **Planned — migrate Vite → Next.js (App Router), to be done in a fresh session.**
  Why: the funnel is SEO/share-driven (landing + blog + logged-out countdown +
  dynamic OG share cards), which a client-only Vite SPA serves poorly. `freedom.ts`,
  `tokens.ts`, and the components port ~1:1 (plain React + inline styles). Do the
  Next migration **before** the money path (Supabase auth → Stripe → Vault export).
  If the look gets rebuilt from scratch, start that rebuild **on Next.js** so we
  don't migrate frameworks twice.

## Stack & commands
React 19 · TypeScript · Tailwind v4 · Node 22 (see `.nvmrc`).
**Currently Vite 8; migrating to Next.js (App Router) on Vercel + Supabase.**
```bash
npm ci          # install from lockfile
npm run dev     # Vite dev server → http://localhost:5173   (changes after Next migration)
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

## Voice & tone (founder direction)
> **"Be humorous, sarcastic, pitiful and a slight bit angry and bitter."**

Edgy and cathartic — a payer's release valve, like venting with a friend who gets
it. This is a deliberate niche: the old "pro-you, never anti-ex" rule is **relaxed**.
Leaning into frustration at the ex is on-brand, and an optional "crank up the ire"
intensity is a feature worth exploring. Reflect how a lot of these guys actually
feel; don't sand it down to corporate-safe.

Where the edge stays (business self-interest, not politics): aim it at **your**
situation and **your** ex. Punch at the experience — not at women as a category.
That distinction is what keeps it edgy-relatable instead of hate speech that gets
the app dropped by Stripe / the app stores.

## HARD guardrails — never cross, through any redesign
- **Love the kids — absolute.** The child-support countdown is a neutral milestone
  about the *obligation* ending. Never frame it as being "done with," "free from,"
  or counting down your *kid*. The ire never touches children.
- **Don't name or target a real person on public / shareable surfaces.** Venting
  inside the app is fine; a share card or public page that names and trashes a
  specific real ex is defamation + platform-policy risk. Keep public/share content
  about the *situation*, and keep stored third-party (ex) data minimal.
- **No tax-deduction messaging. Never "court-admissible."** Proof is framed as
  *"organized records for negotiation, disputes & peace of mind."*
- Persistent disclaimer: **"Not legal, financial, or tax advice."**

## Not built yet (deferred, per HANDOFF-v1-build.md)
Auth (Supabase RLS) · Stripe checkout/webhook (port from `dwmx-old`) ·
server-side PDF/CSV · real persistence (screens run on in-memory demo data) ·
landing page · funnel analytics · SEO blog posts.
