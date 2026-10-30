# KW East Idaho Careers

The agent recruiting site for Keller Williams Realty East Idaho (Idaho Falls and Pocatello). One job: turn agents, soon-to-be agents and team leaders into booked career conversations, and give current agents something they're proud to share.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Vitest. Deploys to Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional
npm run dev                  # http://localhost:3000
npm test                     # calculator + quiz unit tests
npm run build && npm start   # production build
npm run preview              # static click-through preview in ./preview (forms simulated)
```

## Where things live

| What | File |
|---|---|
| Every number, phone, address, stat, leader, video | `content/config.ts` |
| KW MyWay plans (split, caps, fees) | `content/compensation.ts` |
| Events (auto-hide after they end) | `content/events.ts` |
| FAQ | `content/faqs.ts` |
| Hero headlines (A/B/C), persona copy, value stack, first 90 days | `content/copy.ts` |
| City page copy | `content/cities.ts` |
| Agent stories | `content/stories.ts` |
| Calculator math | `lib/calculator.ts` (+ `calculator.test.ts`) |
| Quiz questions, persona routing, lead scoring | `lib/quiz.ts` (+ `quiz.test.ts`) |
| Lead intake + fan-out | `app/api/lead/route.ts`, `lib/lead/fanout.ts` |
| Tracking | `lib/analytics.ts`, `components/Analytics.tsx`, `docs/event-map.md` |
| A/B split for the home hero | `proxy.ts` |

Nothing is hard-coded in components. Anything marked `TODO` is a fact leadership still has to supply. While `NEXT_PUBLIC_SHOW_PLACEHOLDERS` is not `false`, the site shows dashed TODO boxes where those things go (agent story videos, leader welcome video, local leaders). Set it to `false` for launch.

### How to edit content (no developer needed for most changes)

Open the file on GitHub, click the pencil, change the value, commit. Vercel redeploys in about a minute.

- **Roster stats** (update monthly): `roster` in `content/config.ts`.
- **Profit share**: `profitShare` in `content/config.ts`. Keep the period label exact.
- **Add an event**: copy the object in `content/events.ts`, change the id, dates (with `-06:00` or `-07:00` offset for Mountain Time) and text. Set `primaryCta: true` to show it as the dated hero banner.
- **Add an agent story**: add an entry in `content/stories.ts` (real agents, written permission). The placeholder slots disappear automatically once stories exist.
- **Add a testimonial**: add to `testimonials` in `content/config.ts` with a photo. It then shows beside every form.
- **Booking calendar**: set `NEXT_PUBLIC_BOOKING_URL` to Debbie's Cal.com or Calendly link. Until then, /book shows a 3-field "request a time" form that routes to Debbie.

### How to change calculator values

Edit `content/compensation.ts`. Each plan has `mcSplit`, `mcCap`, `teamMemberCap`, `royaltyRate`, `royaltyCap`, `monthlyFee`, `annualFee`, `transactionFee` (`every` / `afterCap` / `none`), `compliancePerDeal`, `eoPerDeal`, `eoAnnualCap`. Then run `npm test`: the four leadership test cases in `lib/calculator.test.ts` must still pass (update them if leadership changes the plans on purpose).

Math, deal by deal in order: 30% to the market center until cap (partial on the capping deal), 6% royalty until $3,000, per-deal fees; "after cap" transaction fees only on deals that close once cap is already met; monthly × 12 + annual fee. Supported eligibility: newly licensed, or more than 7 transactions in the previous 12 months.

## Lead pipeline

Every form posts to `/api/lead` with first name / mobile / email (never more than 3 fields) plus hidden data: persona, quiz answers, calculator inputs, UTMs, landing page, referrer, referring-agent code, hero variant. The route validates, drops honeypot spam, dedupes repeat submits (10 minutes), scores the lead (Hot / Warm / Nurture) and fans out. Each integration runs only if its env vars are set:

1. **KW Command**: `KW_COMMAND_LEAD_EMAIL` (lead-intake address for the account; confirm with KW tech support) and/or `KW_COMMAND_WEBHOOK_URL`.
2. **Google Sheet backup**: `GOOGLE_SHEET_WEBHOOK_URL` = an Apps Script web app. Minimal script:
   ```js
   function doPost(e) {
     const d = JSON.parse(e.postData.contents);
     if (d.secret !== PropertiesService.getScriptProperties().getProperty("SECRET")) return;
     const sh = SpreadsheetApp.getActive().getSheetByName("Leads");
     const head = sh.getRange(1, 1, 1, sh.getLastColumn() || 1).getValues()[0].filter(String);
     Object.keys(d).forEach((k) => { if (k !== "secret" && !head.includes(k)) { head.push(k); sh.getRange(1, head.length).setValue(k); } });
     sh.appendRow(head.map((h) => d[h] ?? ""));
   }
   ```
3. **Owner alerts**: email (Resend) + SMS (Twilio) to Debbie. Hot leads also text everyone in `HOT_LEAD_SMS_LIST`.
4. **Speed to lead**: auto-text (only with SMS consent) and auto-email in Debbie's name within seconds.
5. **Events**: confirmation text now, reminders 24h and 2h before (Twilio message scheduling).
6. **Meta Conversions API**: server-side `Lead` with the same `event_id` as the Pixel.

Twilio texting from a 10-digit number needs A2P 10DLC brand + campaign registration before launch.

Nurture sequences (21–45 days by persona) run in KW Command SmartPlans: tag on `persona` and `score` from the lead.

## A/B testing the hero

- `/` is split 50/50 between variants A and B by `proxy.ts` (sticky cookie `kwei_hero`, 30 days). Variant B is rendered from `/v/b` while the URL stays `/`.
- Every page view sends `hero_variant`; every lead carries `heroVariant`. Compare `lead_submit / page_view` by variant in GA4.
- Paid traffic: send ads to `/lp/a`, `/lp/b` or `/lp/c` (navigation hidden, noindex).

## Media

Originals live in `../assets` (project files). `npm run media` rebuilds the responsive AVIF/WebP set (`scripts/optimize-media.mjs`) and the hero loop/videos (`scripts/encode-video.sh`, needs ffmpeg). Images use `<picture>` with explicit sizes and blur placeholders (`components/Picture.tsx`) so the output is identical on Vercel or any static host.

For launch, move the click-to-play videos (Skilled Agents Win, RED Day, agent stories) to Mux, Cloudflare Stream or YouTube for adaptive streaming and put the URLs in `content/config.ts` → `videos`.

## Fonts and logo

- **Nimbus Sans** (headers) is licensed: add the woff2 files to `public/fonts/` and uncomment the `@font-face` block in `app/globals.css`. Until then headers fall back to Helvetica Neue / Arial.
- **Logo**: `components/Brand.tsx` shows the official Keller Williams Realty East Idaho DBA logo from `public/brand` (black on light, reversed white on dark). EPS masters are in the project assets. Clear space = width of the "W", min 72px wide, no recoloring or effects.

## Deploy (Vercel)

1. Push this folder to a GitHub repo, import it in Vercel (framework: Next.js).
2. Add the env vars from `.env.example`.
3. Point the domain (e.g. `careers.kweastidaho.com`) at Vercel and set `NEXT_PUBLIC_SITE_URL`.
4. Run through `docs/launch-checklist.md`.
