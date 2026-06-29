# DoneWithMyEx — Project Interrogation Report

**Prepared for:** Ace's AI Council
**Date:** 2026-06-29
**Status:** Pre-build strategy. Decisions locked where noted; open questions flagged for council input.

---

## 0. How to read this

This report is the output of a structured interrogation of the DoneWithMyEx project. It exists to (a) lock the decisions already made, (b) surface the blindspots and risks before a single line of the new build is written, and (c) hand your AI council a tight set of high-leverage open questions. It is deliberately opinionated — push back on it.

The product in one line:

> **DoneWithMyEx** is the payer's-side money-and-sanity tracker for people (primarily men) paying alimony and child support — track every payment, hoard the proof, see the day you go free, and laugh on the way there.

---

## 1. Decisions locked (from interrogation)

| Decision | Answer | Implication |
|---|---|---|
| **Ambition / resourcing** | Serious venture, real budget | Build for paid acquisition from day one. Unit economics must close. SEO + paid both on the table. |
| **v1 scope** | Sharp wedge + viral hook | Ship **Payment Logger + Proof Vault** (paid anchor) and the **free Freedom Countdown w/ Humor & Nerd modes** (lure). Defer budget splitter, diary, community. |
| **Pricing** | $4.20 wink + annual + top tier | $4.20/mo stays as on-brand entry; real money lives in annual + a "War Chest" tier. |
| **Voice** | Spicy but pro-you, not anti-her | Cathartic and masculine, aimed at *your freedom* — not attacking exes/women. Protects Stripe + Meta standing. |
| **Codebase** | Fresh build in `done-with-my-ex` | `DWMX-old` is a *parts donor* (Supabase schema, Stripe webhook, auth, `DESIGN.md`). Lovable widgets get rebuilt clean. |

---

## 2. Asset inventory (what already exists)

You are not starting from zero. You have two half-products and strong vision docs.

- **`DWMX-old`** — React + Vite + TS + Tailwind/shadcn + **Supabase (auth, DB, RLS)** + **Stripe billing (working `stripe-webhook` edge function + subscriptions flow)**. Pages already built: Dashboard, Ledger, Budget, Diary, Milestones, Blog, Landing, Login, Signup, Settings. Ships `Starting Prompt.md` (full freemium spec, the exact child-expense-splitter columns from your real Google Sheet) and `DESIGN.md` (the **"Financial Insurgent"** dark-navy/gold design system — genuinely good, reuse it).
- **Lovable live site (donewithmyex.com)** — the **Freedom Countdown** with **Humor Mode** (Stairways to Heaven, Taco Tuesdays, Oppenheimers, Snoozes, Ex-Spouse Guilt Trips, Tinder Left Swipes) and **Nerd Mode** (Fortnights, Lunar Months, Martian Years, Dog Years, Microfortnights, Heartbeats, Nanoseconds). This is the differentiator and the share engine. Code lives in Lovable, not Git — it gets **rebuilt**, not imported.
- **Brand seed** — crow-breaking-chains concept art + the "smart, resilient bird" rationale. Strong, ownable mascot.

**Reuse map for the fresh build:**

| New repo needs | Lift from | Notes |
|---|---|---|
| Auth, RLS patterns, DB schema | `DWMX-old/supabase/migrations/001_initial_schema.sql` | Audit + trim to v1 wedge tables only |
| Stripe checkout + webhook | `DWMX-old/supabase/functions/stripe-webhook` + `src/components/stripe` | Re-point to new price IDs (monthly/annual/War Chest) |
| Design tokens & rules | `DWMX-old/DESIGN.md` | Keep; layer crow brand on top |
| Countdown + unit-conversion logic | Lovable site (rebuild) | The humor/nerd unit math is the IP — recreate cleanly |

---

## 3. Product strategy

### 3.1 The wedge (v1)

Two surfaces, two jobs:

1. **Freedom Countdown (free, logged-out-friendly)** — *top of funnel.* Enter your end date(s) → live countdown + Humor/Nerd modes + a **shareable "freedom card."** No login required to play; login required to save. This is your SEO + viral loop.
2. **Payment Logger + Proof Vault (paid anchor)** — *willingness-to-pay.* Log each alimony/CS payment, attach a receipt/screenshot, and one-click export a clean, branded **PDF/CSV statement** with a disclaimer. This is what people pay to *keep* and won't risk losing.

Everything else (budget guardian, expense splitter, diary, blog, community) is **post-v1**. The original `Starting Prompt.md` 5-feature MVP is the *roadmap*, not the *launch*.

### 3.2 Funnel vs. paywall (the core mental model)

> The funny countdown gets them in the door and gets you shared/ranked. The boring, essential record-keeping is what they pay for. **Never gate the lure; always gate the records.**

### 3.3 Phased roadmap

- **v1 (wedge):** Countdown + Humor/Nerd + share card · Payment Logger · Proof Vault PDF/CSV · auth · Stripe paywall · 3–5 SEO blog posts.
- **v2 (the spreadsheet killer):** Child-Expense Splitter (the exact columns from your sheet, real-time math, monthly report) + Budget Guardian. This is the highest-retention "real work" feature.
- **v3 (moat + stickiness):** "Freedom Coach" search/AI over the user's own data + blog, milestone notifications, monthly auto-emailed report.
- **v4 (audience):** Community / vent space — *only* with a moderation plan (see §6).

---

## 4. Monetization & unit economics

### 4.1 Proposed tiers

| Tier | Price | Gets |
|---|---|---|
| **Free ("On Parole")** | $0 | 1 countdown, Humor/Nerd modes, share cards, 1 month of payment logging (read-only export locked) |
| **Pro ("Done")** | **$4.20/mo** | Unlimited countdowns, unlimited logging, Proof Vault PDF/CSV export, receipt storage |
| **Pro Annual** | **$42/yr** (~17% off, the real conversion target) | Same as Pro; the price you actually push |
| **War Chest** | **~$12–15/mo or ~$120/yr** | Everything + expense splitter, budget guardian, priority/early features, "case file" bulk export, maybe a yearly tax pack |

### 4.2 The math problem you're solving

At $4.20/mo, after Stripe fees (~$0.43 on a $4.20 charge ≈ 10%+) you net **~$3.75/mo**. Against any paid CAC, that LTV is brutal unless retention is long. The fix is structural, and it's the one you chose:

- **Push annual** — collect $42 up front, kills monthly churn, funds CAC.
- **War Chest carries the margin** — a serious payer managing a real custody-expense war with their ex will happily pay 3× for the splitter + reports. Price discrimination is the whole game here.
- **Keep $4.20 as a brand wink**, not the business. It's a hook, not the model.

### 4.3 The one metric to validate first

**Free-countdown → paid conversion.** Everything hinges on whether the cathartic free toy converts to people who pay to keep *records*. Instrument this from day one. If it's healthy, pour fuel (ads) on it; if not, the wedge is wrong before you've spent on growth.

---

## 5. Positioning & brand

- **Mascot:** the chained crow breaking free — smart, resilient, a little menacing, ownable. Strong enough to anchor logo, loading states, empty states, email, and milestone art. (I can generate polished logo/mascot variations via Flux when you're ready.)
- **Design system:** `DESIGN.md`'s "Financial Insurgent" (deep navy surfaces, gold spotlight, Space Grotesk display, no-line tonal layering) already nails masculine/dark/premium. Keep it; don't re-explore from scratch — that's how the third rewrite never ships.
- **Voice guardrails (locked: pro-you, not anti-her):**
  - **DO:** mock the *situation*, the system, the calendar, your own wallet. "Your wallet called. It misses you." "723 days till parole."
  - **DON'T:** attack exes/women/mothers as a class. No misogyny, no "weaponize this against her" framing. This is a brand *and* a compliance boundary (Stripe/Meta).
  - Litmus test: *funny to a divorced dad, not quotable in a screenshot that gets you deplatformed.*

---

## 6. Legal, compliance & risk (read this twice)

This is the section most likely to sink a "serious venture," so it's the longest.

1. **Not legal / not financial / not tax advice.** You're adjacent to all three. Persistent disclaimers in footer, blog posts, and any "Freedom Coach" output. Have a lawyer review ToS + disclaimers before launch.
2. **Don't overclaim "court-admissible."** Incumbents (OurFamilyWizard — accepted in all 50 states, often *court-ordered*; TalkingParents; SupportPay) own that ground and have the infrastructure to back it. Frame the Proof Vault as **"your organized records for taxes, negotiation, and your own peace of mind,"** not "guaranteed admissible in court." Overpromising here is both a legal and a competitive trap.
3. **Payment processor risk (Stripe).** Stripe restricts/limits certain content. The "anti-ex / men's grievance" angle, done wrong, can trip content reviews or get an account flagged. The pro-you voice mitigates this — keep it clean. Have a fallback processor in mind (e.g., Paddle as merchant-of-record) if Stripe ever balks.
4. **Ad platform policy (Meta/Google).** Targeting on divorce/financial-hardship and "personal attributes" is restricted on Meta. Creative and targeting must be reviewed against policy before spend, or campaigns get rejected/accounts restricted. Plan SEO + content as the durable channel that doesn't depend on ad-platform goodwill.
5. **Sensitive data.** You'll store financial records, receipts (with names/amounts), and custody-adjacent info. Treat security as a feature: Supabase RLS audited, storage buckets locked down, encryption, least-privilege, a real privacy policy, and CCPA/CPRA (and GDPR if you take EU users) handling. A breach here is reputationally fatal for *this* audience.
6. **Community = liability.** A vent forum invites defamation (naming exes), harassment, and content-moderation duty. Section 230 helps in the US but isn't a free pass. **Defer community to v4** and launch it with clear rules + moderation + "no naming/identifying real people" policy.
7. **Jurisdiction.** Alimony/child-support rules vary wildly by US state (and country). Keep the app *record-keeping and motivational*, not *advisory*, to avoid implying state-specific legal guidance. Decide launch geography (recommend US-only at first).

---

## 7. Tech architecture (fresh build, `done-with-my-ex`)

- **Stack (carry over, proven):** React + Vite + TypeScript + Tailwind + shadcn/ui · Supabase (auth, Postgres, storage, RLS) · Stripe (Checkout + webhook via Supabase Edge Function) · deploy on Vercel.
- **Why fresh-but-reuse:** clean canonical repo and history, but lift the *working* Stripe/auth/schema from `DWMX-old` instead of rebuilding billing from scratch. Don't reinvent solved problems; do reinvent the messy UI.
- **v1 data model (trim from `001_initial_schema.sql`):** `profiles`, `subscriptions`, `countdowns`, `payments` (+ `receipts` in storage), `blog_posts`. Defer splitter/budget/diary tables to v2.
- **Proof Vault export:** server-side PDF (clean, branded, disclaimered) + CSV. Keep generation off the client for consistency and to protect the template.
- **Countdown engine:** pure client logic; unit-conversion table (humor + nerd) as data, not hardcoded, so new funny units ship without redeploys.
- **Share cards:** dynamic OG image generation (e.g., Vercel OG) so a shared freedom card renders a branded image with the live-ish number — this is the viral surface, make it look great.
- **Analytics from day one:** funnel events (countdown created → signup → paywall view → subscribe), so §4.3 is measurable.

---

## 8. Retention & growth (the countdown novelty problem)

A countdown is a **one-time dopamine hit** — the risk is they set it, screenshot it, and leave. Build reasons to return:

- **Monthly cadence:** payments are monthly → logging is the natural monthly return trigger. Reinforce with reminders ("Log this month's payment / hoard the proof").
- **Milestones & notifications:** "First Steak Dinner," "Halfway to parole," anniversary of progress → push/email with crow art and a fresh share card.
- **Monthly auto-report email:** "Here's your month: $X paid, Y days closer, Z saved." Sticky + shareable.
- **Streaks / freedom-fund tracker:** light gamification on logging consistency.
- **Content engine (SEO):** the blog spec already exists; payer-focused, sarcastic, SEO-optimized posts are a durable, ad-policy-proof channel. This is likely your #1 growth lever given §6.4.
- **Viral loop:** the humor/nerd share cards are inherently screenshot-able — make sharing one-tap and branded.

---

## 9. Competitive landscape (grounding)

| Player | What they are | Why DWMX is different |
|---|---|---|
| **OurFamilyWizard** | Court-accepted (50 states), often court-ordered co-parenting + expense + comms | Neutral, both-parent, sober, expensive, court-mandated. DWMX is payer-side, voice-driven, opt-in. |
| **TalkingParents** | Unalterable comms records for high-conflict cases | Comms-focused, not money-freedom-focused; no brand/catharsis. |
| **SupportPay** | Split/track/share family expenses + payments, "legally admissible records" | Closest on features; neutral family-finance positioning, no payer-male voice, no freedom/countdown hook. |
| **Onward, Coparently, 2Houses, dcomply, Amicable** | Various co-parenting finance/coordination | All neutral-tone coordination tools. None own the "payer's catharsis + freedom" brand. |

**The gap DWMX fills:** every incumbent is a neutral, conflict-reducing, both-parent utility — often imposed by a court. **Nobody serves the payer's emotional reality with humor and a freedom narrative.** That white space *is* the business. The flip side: incumbents already own "records for court," so compete on **voice, payer-centric UX, and the freedom funnel**, not on out-documenting OFW.

---

## 10. Open questions for you / the council

These are the genuine unknowns that should shape the build. Bring answers back.

1. **Founder story:** Is Ace himself a payer (the Aug 2025 → Jun 2028 countdown suggests a real "parole date")? An authentic founder story is the single best marketing asset for this audience — how much of it do you want to put forward publicly?
2. **Geography:** US-only at launch? Which states first for blog/SEO targeting (alimony-heavy states)?
3. **Proof Vault promise:** Comfortable framing as "your records / tax & negotiation ammo" (recommended) vs. fighting incumbents on "court-ready"?
4. **Community timing & form:** v4 forum, or a lighter/safer first step (anonymous "win wall," moderated subreddit, Discord) to get the catharsis without the liability?
5. **Growth bet:** Given ad-platform policy friction (§6.4), what's the split between SEO/content (durable) and paid (fast but fragile)? Where does the "real budget" go first?
6. **AI "Freedom Coach":** in-scope as a v3 differentiator, or a distraction from the wedge? (My vote: v3.)
7. **Name/domain:** keep DoneWithMyEx (clear, a little narrow, "ex"-centric) — any appetite to test a freedom-forward alternative, or is the brand fixed?
8. **Success definition:** what does "money maker" mean in 6 months — a specific MRR, paying-user count, or break-even on ad spend? Pin the number so we build toward it.

---

## 11. Recommended pipeline from here

1. **This report → AI council** for insight (you are here).
2. **Brand pass:** generate crow logo/mascot + 1–2 key screen looks (Flux) to lock the visual identity.
3. **Design the v1 wedge** (Claude Design): landing + countdown + payment logger + Proof Vault + paywall. Just the wedge — resist scope creep.
4. **Build in `done-with-my-ex`** (Claude Code): scaffold fresh, port Stripe/auth/schema from `DWMX-old`, rebuild the countdown engine, ship the wedge.
5. **Instrument + launch small**, watch §4.3 conversion, then pour budget on what converts.

> The single biggest risk to this project is not design or features — it's **starting over a third time and never shipping.** Every decision above is biased toward *ship the wedge, measure, then expand.*
