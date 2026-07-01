# Handoff — The Money Path (next session)

**Read `CLAUDE.md` first** (project overview, architecture, voice, and the HARD guardrails).
This doc is the plan for the next phase: turning the demo app into a real product with
accounts, persistence, and paid features.

## Where things are (as of 2026-07-01)
- **Next.js 15 (App Router)**, React 19, TS, Tailwind v4. Deployed on Vercel:
  **https://done-with-my-ex.vercel.app**. `main` = source of truth; **push to `main` →
  production deploy** (feature-branch push → preview URL). Build + lint clean.
- Reskinned to **"The Yard"** (light + dark) on the theme engine (`src/lib/theme/`).
- **Everything runs on in-memory demo data.** `src/lib/freedom.ts` (`computeFreedom()`) is
  the math source of truth; it's fed `DEFAULT_PROPS` + generated `demoPays`. There is **no
  auth, no database, and no payments yet.** The screens are presentational.

## Goal: build the money path, in this order
1. **Supabase auth** — email magic-link (or password). Users can sign in / out.
2. **Real persistence** — replace demo data with per-user rows; Row-Level Security so each
   user only sees their own. Feed real case data into `freedom.ts` instead of `DEFAULT_PROPS`.
3. **Stripe checkout + webhook** — the Pro plan. **Port from the `dwmx-old` repo** (it already
   has working checkout/webhook code).
4. **Entitlement gating** — Free vs Pro. Free = countdown + logging; Pro = Proof Vault export
   + receipt storage. (Logger already has an "Unlock export & receipt storage" CTA to wire up.)
5. **Server-side Proof Vault export** — generate **PDF + CSV** server-side, gated behind Pro.

## Prerequisites — the human must provide/authorize before wiring live
- **Supabase**: authorize the Supabase connector (OAuth, needs an interactive session) *or*
  provide the project URL + anon/service keys. Decide the auth method (magic-link recommended).
- **Stripe**: authorize the Stripe connector *or* provide test keys (publishable, secret,
  webhook signing secret) and the price IDs.
- **`dwmx-old` repo location** (local path or GitHub) to port the checkout/webhook.
- **Confirm pricing** (from `docs/DESIGN-v1.md` §6): Free "On Parole" $0 · Pro "Done" **$42/yr
  (nudged) or $4.20/mo** · War Chest ~$120/yr *coming soon* (no tax-pack claim).

You can scaffold auth + the DB schema with **env placeholders** before the credentials land.

## Implementation notes
- The app is a client tree (`src/app/page.tsx` → `App.tsx` is `'use client'`). Add:
  - **Supabase clients** in `src/lib/supabase/` — a browser client and a server client via
    `@supabase/ssr`; **middleware** (`middleware.ts`) to refresh the session cookie.
  - **Route handlers** under `src/app/api/`:
    - `stripe/webhook/route.ts` — **Node runtime**, verify the signature against the **raw**
      body (`await req.text()`), then update the user's plan on
      `checkout.session.completed` / subscription events.
    - `export/route.ts` — PDF/CSV generation, gated by plan.
  - **Server actions** (or route handlers) to log payments → DB, then refetch.
- **Data model sketch** (Postgres/Supabase, RLS on `user_id = auth.uid()`):
  - `profiles` (id = auth user, `plan` default `'free'`, `stripe_customer_id`, …)
  - `cases` (id, user_id, type, monthly_amount, parole_start, parole_end)
  - `payments` (id, user_id, case_id, type, amount, period, logged_at, receipt_path)
  - **receipts** in a **private Supabase Storage bucket**; store the path on `payments`.
- **Wire points in existing code**:
  - `Logger.tsx` `onLogPayment` → server action → `payments` insert.
  - `Vault.tsx` "Download PDF" / "Export CSV" → the export route (Pro-gated). Statement rows
    come from `freedom.ts` demo today; use real `payments`.
  - Read `profiles.plan` for gating; free users keep the locked-export CTA.
- **Env vars** (set on Vercel via `vercel env` or dashboard, and `.env.local`):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
  (server only), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, publishable key + price IDs.
- **PDF**: server-side (`@react-pdf/renderer` or `pdfkit`) in a route handler; CSV is trivial.
  Keep the doc's disclaimer + "organized records for negotiation, disputes & peace of mind."

## HARD guardrails (compliance — critical for Stripe / app stores)
- **No tax-deduction messaging. Never "court-admissible."** Frame proof as *"organized records
  for negotiation, disputes & peace of mind."*
- **Child support = neutral milestone; love the kids.** Never "free from your kid."
- **Never name/target a real person on public/shareable surfaces** (defamation + platform risk).
- **Persistent disclaimer: "Not legal, financial, or tax advice."** Keep stored ex data minimal.

## Commands & deploy
```bash
npm ci
npm run dev     # Next dev → http://localhost:3000
npm run build   # next build
npm run lint    # eslint .
```
- Deploy = **push to `main`** (auto production deploy). Don't run `vercel --prod` (auto-mode
  blocks it and it isn't needed). Feature-branch pushes get their own preview URLs.
- Vercel project `done-with-my-ex` (`prj_blPS1x9poi4cUU28nkzGtZHRmxE5`, team
  `team_EcUYqBXpcNyK3bfSA7ZH4k8g`, account `ace-3747`). GitHub `mytzylplyx/done-with-my-ex`.

## Suggested first move
Confirm the three prerequisites (Supabase access, Stripe access, `dwmx-old` location), then
scaffold Supabase auth + the schema (placeholders OK), verify sign-in locally, and only then
move on to persistence → Stripe → export. Work on a feature branch; merge to `main` to ship.
