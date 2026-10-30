# Tracking event map

All events go through `track()` in `lib/analytics.ts`, which pushes to `dataLayer` (GTM-ready), GA4 (`gtag`) and the Meta Pixel (`fbq`). Set the IDs in env vars (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, optional `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`). Nothing loads until an ID is set.

| Event | Fires when | Params | GA4 key event? | Meta | Google Ads |
|---|---|---|---|---|---|
| `hero_variant` | Home page loads | `variant` (a/b/c) | | custom | |
| `persona_select` | Hero chip tapped | `persona` | | custom | |
| `cta_click` | Hero / sticky / page-hero CTA tapped; also "See how it works at KW" on the problem cards (`cta=how_it_works_here`, `card=problem_1..3`) | `cta`, `card` | | custom | |
| `quiz_start` | First quiz answer | | | custom | |
| `quiz_step` | Each quiz answer | `step`, `value` | | custom | |
| `quiz_complete` | Contact step submitted | `persona`, `score` | ✓ | CompleteRegistration | |
| `calculator_used` | First change to any calculator input | | ✓ (retargeting) | custom | |
| `lead_submit` | Any form succeeds | `source` (quiz, calculator, event, booking-request, exit-offer, refer, notify), `event_id` | ✓ | **Lead** (deduped with CAPI by `event_id`) | conversion (`NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`) |
| `event_register` | Event registration succeeds | `event` | ✓ | CompleteRegistration | |
| `booking_complete` | Cal.com / Calendly reports a booking (Google booking page opens in a new tab, so track `cta_click` with `cta=booking_calendar_open` instead) | | ✓ | **Schedule** | add a second conversion label if wanted |
| `video_play` | Click-to-play started / RED Day sound on | `video` | | custom | |
| `video_50` | 50% watched | `video` | | custom | |
| `video_complete` | Watched to the end | `video` | | custom | |
| `click_to_text` | "Text Us" tapped | `from` | ✓ | custom | |
| `exit_offer_view` | Exit / scroll-depth offer shown | | | custom | |

Every lead also carries (hidden fields): `persona`, quiz answers, calculator inputs, `utm_source/medium/campaign/term/content`, `gclid`, `fbclid`, `landing_page`, `referrer`, `ref` (referring agent code from /refer links), `heroVariant`, `page`. UTMs persist across sessions in localStorage (`lib/attribution.ts`).

## Server side

- **Meta Conversions API**: `/api/lead` sends `Lead` with hashed email/phone/first name and the same `event_id` as the browser Pixel, when `META_CAPI_TOKEN` is set.

## Retargeting audiences

| Audience | Rule |
|---|---|
| Calculator, no lead | `calculator_used` in last 30 days AND NOT `lead_submit` |
| Leadership video viewers | `video_50` where `video` = "Real Estate in a Tough Market: Why Skilled Agents Win" |
| City page visitors | page path is `/idaho-falls` or `/pocatello` (one audience each) |
| Quiz drop-offs | `quiz_start` AND NOT `quiz_complete` |

## Funnel dashboard (GA4 Explore → Funnel)

1. `page_view` (landing) → 2. `quiz_start` or `calculator_used` → 3. `lead_submit` → 4. `booking_complete`. Break down by `heroVariant`, `utm_source` and `persona`. Visitor-to-lead and lead-to-appointment rates are the two numbers to watch weekly.
