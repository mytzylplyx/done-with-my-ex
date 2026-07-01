# DoneWithMyEx — working notes for Claude

A payer's-side money-and-sanity tracker for people paying alimony / child support:
a free, funny, sarcastic **freedom countdown** to the day the obligation ends, plus paid
**payment logging** and **proof export**. US-only at launch.  Mainly men-focused (since men typically pay alimony) but open for women who pay too.  Be humorous, sarcastic, pitiful and a slight bit angry and bitter.

## Where the project is right now
- Migrated **Vite → Next.js 15 (App Router)** on the Vercel + Supabase-ready shell.
  Behavior/plumbing unchanged in the move; the app is a client tree under
  `src/app/page.tsx` (`App.tsx` is `'use client'`).
- Reskinned to **"The Yard"** — an institutional / parole look (warm concrete, one
  hazard-orange accent, Oswald stencil display, IBM Plex Mono case-file ledger, sharp
  corners), shipping **light + dark** with a "lights out" toggle. Built on an
  **extensible theme engine** (`src/lib/theme/`); the old navy "Financial Insurgent"
  look is retained as a hidden `insurgent` style. Adding a new style = one file.
- **Deployed on Vercel**, linked to GitHub (`mytzylplyx/done-with-my-ex`):
  **https://done-with-my-ex.vercel.app**. Pushes auto-deploy.
- **`main` is the source of truth.** Build passes, lint clean.
- Direction comps for the reskin live in `public/mockups/` (`yard`, `yarddark`,
  `receipts`, `afterhoursmasc`) — kept as references; **"After Hours"** is the likely
  next selectable style.

## Stack & commands
React 19 · **Next.js 15 (App Router)** · TypeScript · Tailwind v4 (`@tailwindcss/postcss`).
Node 22 (see `.nvmrc`). Fonts via `next/font` (Oswald, IBM Plex Mono, Inter).
```bash
npm ci          # install from lockfile
npm run dev     # Next dev server → http://localhost:3000
npm run build   # next build
npm run lint    # eslint .
```

## Architecture — where things live
- `src/lib/freedom.ts` — **single source of truth** for all countdown/progress
  math (`computeFreedom()`). Every visual — donut, bars, digits, %, ledger totals —
  derives from here. Don't fork this math. (Copy strings like humor sublabels live
  here too; edit copy freely, leave the math alone.)
- `src/lib/theme/` — **the theme engine** (replaced the old `src/lib/tokens.ts`).
  `tokens.ts` holds the style registry (`yard` + `insurgent`, each light+dark) plus
  `makeHelpers`, `PAGE_BG`, and the anti-flash `THEME_INIT_SCRIPT`; `store.ts` persists
  the `{style, mode}` selection via a hydration-safe `useSyncExternalStore`; `index.ts`
  exposes `useTheme()` → resolved `t` (`C`, `decor`, `motif`, fonts, helpers, controls);
  `ThemeSync.tsx` keeps the `<html>` background in sync. **To restyle, edit HERE** — do
  not hardcode hex in components. Every component reads `const t = useTheme()`.
- `src/lib/useBreakpoint.ts` — JS breakpoint hook (mobile ≤767 / tablet ≤1023 /
  desktop). The app styles via inline style objects, so responsiveness is JS-driven.
- `src/lib/useHydrated.ts` — SSR-safe "have we hydrated yet" flag; the app gates its
  first paint on it so the time/localStorage-driven UI hydrates cleanly.
- `src/app/` — `layout.tsx` (fonts, metadata, theme init script + `ThemeSync`),
  `page.tsx` (renders `<App/>`), `globals.css`.
- `src/App.tsx` — `'use client'`; state (route/layout/clock/toast/drawer), routing, 1s tick.
- `src/components/` — `Sidebar` `Topbar` `Toast` `FlipClock` `Countdown` `Logger`
  `Vault`; `dashboard/` has `MissionControl` `Cinematic` `Editorial` (3 switchable
  dashboard layouts, persisted to localStorage).
- `docs/` — strategy (`INTERROGATION.md`), design spec (`DESIGN-v1.md` — describes the
  now-superseded navy look), build handoff (`HANDOFF-v1-build.md`), Claude Design brief.

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
