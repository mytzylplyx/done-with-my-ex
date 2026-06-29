# DoneWithMyEx — v1 Build Handoff

Strategy + brand pass + v1 design are done. Build the v1 wedge. Ship-oriented; the #1 risk is never shipping.

## Repos & branch
- BUILD in `mytzylplyx/done-with-my-ex`. Parts donor: `mytzylplyx/dwmx-old`.
- Work on `claude/done-with-my-ex-redesign-hv37kf` (branched from `...-l9yldq`). Commit + push there.
- Design is committed: `docs/DESIGN-v1.md` + `design/v1/` (HTML mock + screenshots). Strategy report: `docs/INTERROGATION.md`.

## Locked decisions
- Audience: BOTH, alimony-led (data model handles child support too).
- Paid wedge (v1): Payment Logger + Proof Vault. Expense Splitter = v1.5 fast-follow.
- 6-mo success metric (Dec 2026): 250–500 PAYING USERS (proof-of-demand).
- Founder: anonymous/pseudonymous — the crow is the face.
- Pricing: one Pro plan, $4.20/mo AND $42/yr (annual nudged). War Chest deferred.

## Hard guardrails
- NO tax-deduction messaging. Never "court-admissible." Pro-you, not anti-ex. CS countdown = neutral milestone, never "free from your kid." Minimize third-party (ex) data. Persistent disclaimers. US-only at launch.

## Brand / design
- "Financial Insurgent" tokens + components fully specified in `docs/DESIGN-v1.md`.
- Logo: interim DWMX crow — `DWMX Crow.png` in Ace's Google Drive, file id `1vf9t372uSxx9R-Awe5zg9CENCWIzik4P`. Pull via Drive MCP during scaffolding, optimize/resize, set as logo; replace placeholder `favicon.svg`. If Drive unavailable, ask Ace to commit it.

## Reuse map (from dwmx-old)
- Auth/RLS/schema: `supabase/migrations/001_initial_schema.sql` (trim to v1 tables).
- Stripe checkout + webhook: `supabase/functions/stripe-webhook` + `src/components/stripe` (re-point price IDs).
- Design tokens: `DESIGN.md`. Reference screens: `Screenshots/`.
- Countdown + humor/nerd unit math: rebuild clean; unit table as DATA.

## Countdown content
- Default/demo parole window: 8/1/2025 → 6/22/2028 (≈31.5%, ~723 days).
- Humor units: Stairways to Heaven, Taco Tuesdays, Oppenheimers, Solar Cycles, Snoozes, Therapy Sessions, Ex-Spouse Guilt Trips, Why-We-Can't-Co-Parent Rants, Haircuts, Tinder Left Swipes.
- Nerd units: Fortnights, Lunar Months, Martian Years, Dog Years, Olympiads, Microfortnights, Heartbeats, Nanoseconds.
- Support multiple countdown display styles (flip / straight / minimal) as a toggle.

## v1 scope (IN)
Landing · Freedom Countdown (free, logged-out, share card via dynamic OG) · Auth (Supabase) · Payment Logger (paid, receipts to RLS storage) · Proof Vault (paid, server-side PDF+CSV, disclaimered) · Stripe paywall (port webhook) · funnel analytics (countdown→signup→paywall view→subscribe) · 3–5 SEO blog posts. App Dashboard ties it together.

## Free vs Paid
Free: countdowns, humor/nerd, share cards, log payments — export locked. Pro: unlimited logging, Proof Vault export, receipt storage.

## Data model (trim from 001)
profiles · subscriptions · obligations(type: alimony|child_support, amount, cadence, start_date, end_date) · payments(+receipts storage) · blog_posts · analytics_events.

## OUT of v1 (deferred order)
Expense Splitter (v1.5) → Budget Guardian → Diary → Freedom Coach AI (v3) → Community (v4) → War Chest tier.

## Stack
React + Vite + TS + Tailwind + shadcn · Supabase · Stripe (Edge Function webhook) · Vercel. Server-side PDF. Countdown pure client. Share cards via Vercel OG.

## Confirm with Ace early
New Stripe price IDs · Supabase project (new vs reuse) · domain/deploy · blog topics/states.
