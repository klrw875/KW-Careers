# Launch checklist

## Facts still needed from leadership
- [x] Official Keller Williams Realty East Idaho DBA logo (PNG from the EPS masters, in `public/brand`)
- [x] KW MyWay logo (calculator section)
- [ ] Optional: SVG exports of both logos (sharper at large sizes); the MyWay PNG is only 408px wide
- [ ] Nimbus Sans font files (license) → `public/fonts/`
- [x] Debbie's calendar link (Google booking page, links out). Optional: swap in Google's "Website embed" URL (ends in ?gv=true) for an inline calendar
- [x] Debbie's headshot and bio (a larger original photo would look sharper) → `content/config.ts` (`leadOwner.photo`, `leaders[0].bio`)
- [ ] 60–90s leader welcome video + transcript → `videos.leaderWelcome`
- [ ] 3–6 agent story videos (30–60s, name, city, years, one specific result) → `content/stories.ts`
- [x] 3–6 real testimonials with photo and written OK → `testimonials` (Steven confirmed video + name permission for all featured agents, 2026-10-30)
- [ ] Pocatello office: address, phone, local leaders; local market snapshot numbers
- [x] Designated broker (Dwayne Coburn) + brokerage license # PT39082 in the footer
- [ ] Number of offices for the hero subhead ("[X] offices"), if more than one
- [ ] Local mission statement (`localMission` in `content/copy.ts`)
- [x] Lead magnet: "The East Idaho Agent Playbook" approved 2026-10-28, served at /guides/east-idaho-agent-playbook.pdf, link sent in the auto-email (needs RESEND_API_KEY + verified sending domain)
- [ ] Lead magnet: "The New Agent’s First 90 Days in East Idaho" (not written; new agents are offered the Playbook until it exists)
- [ ] Confirm domain

## Compliance sign-off (operating principal / MCA)
- [ ] Income and profit share wording, disclaimers and `/disclosures` (link the official KW profit share disclosure)
- [ ] FAQ answers tagged "TODO: leadership to confirm" (listings, part-time, team names, switching time)
- [ ] Idaho licensing steps on `/new-agents` against current IREC requirements
- [ ] KW Belief System wording against the current KW brand kit
- [ ] TCPA consent text and privacy policy reviewed by counsel
- [ ] Photo consent: identifiable attendees in the training photos; blur stays on the Zoom grid until each person OKs it
- [ ] Anderson Hicks Group OK for the Market Pulse slide photo
- [ ] Brand kit check: colors, logo clear space, no effects
- [ ] Turn off placeholders: `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`

## Integrations
- [ ] KW Command lead intake confirmed with KW tech support; test lead appears with all hidden fields
- [ ] Google Sheet backup receives the test lead
- [ ] Twilio A2P 10DLC registered; Debbie gets the SMS alert; auto-text arrives in under 60 seconds
- [ ] Auto-email arrives from Debbie's name (Resend domain verified: SPF/DKIM)
- [ ] Event registration: confirmation now, 24h and 2h reminders scheduled
- [ ] Eventbrite: events page pulls upcoming events from the KW East Idaho Eventbrite organizer (API key set in hosting env, never in the repo); each card links to its Eventbrite registration. Until then, add Eventbrite links to `content/events.ts` by hand
- [ ] Hot lead pings `HOT_LEAD_SMS_LIST`
- [ ] Booking embed fires `booking_complete`
- [ ] GA4 key events, Meta Pixel + CAPI (check dedupe in Events Manager), Google Ads conversion
- [ ] Retargeting audiences built (see `docs/event-map.md`)

## Quality gates
- [ ] Lighthouse mobile ≥ 95 on /, /calculator, /new-agents, /book (last run in preview build: Perf 92–100, A11y 100, Best Practices 100, SEO 100)
- [ ] Accessibility: keyboard-only run through quiz, calculator, booking; screen reader pass (VoiceOver iOS)
- [ ] Every page at 390px and 1440px: headline works alone, one obvious next step, proof within a thumb-scroll of every CTA
- [ ] Broken-link check (`npx linkinator https://<domain> --recurse`)
- [ ] Schema validation (Rich Results Test): Organization, LocalBusiness, FAQPage, VideoObject, Event, JobPosting
- [ ] Submit `sitemap.xml` in Google Search Console
- [ ] Videos moved to a video CDN
- [ ] Form end-to-end test from a phone on cellular
