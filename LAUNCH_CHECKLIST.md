# Go Bjoun launch handoff

Updated: 29 July 2026

## What is ready now

Go Bjoun is ready to launch as a public **Jamaica discovery beta**:

- 160 real Jamaican locations across beaches, nature, culture, food, nightlife,
  stays, and adventure.
- Interactive Jamaica map with clustering, filters, search, place details,
  directions, and device-saved places.
- Location data sourced from OpenStreetMap through a repeatable Overpass import.
- Map rendering from OpenFreeMap with MapLibre.
- No paid places API, Google Maps API key, or account is required for the
  current discovery experience.
- Partner experiences are clearly marked as previews. The site does not claim
  that a booking, price, review, or reservation is live.

Refresh the location snapshot with:

```bash
npm run data:refresh
npm run build
```

Review material changes before publishing. OpenStreetMap is community-maintained
data, not a substitute for checking a venue directly.

## Your shortest route to revenue

Start with the Viator Affiliate API rather than processing marketplace payments
yourself. Viator says Basic Access has no sign-up cost, sends the visitor to
Viator to complete the purchase, remains merchant of record, handles customer
service, and pays commission. Apply here:

https://partnerresources.viator.com/travel-commerce/affiliate/

After approval, provide:

```text
VIATOR_API_KEY
VIATOR_PARTNER_ID
```

Then replace the three preview experiences with live product content,
availability, prices, reviews, images, tracking links, and the required Viator
attribution. Do not scrape those fields from a travel marketplace.

## Accounts and decisions needed for a full marketplace

These are not required for the discovery beta. They are required if customers
will create accounts or transact directly on Go Bjoun.

### 1. Domain and customer contact

- Buy or connect the final domain.
- Create a monitored support address such as `hello@your-domain`.
- Confirm the business name and trademark availability before a paid campaign.
- Decide the legal business name, address, and support response hours.

### 2. Accounts and cloud saves

Recommended provider: Clerk.

```text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SIGNING_SECRET
```

Go Bjoun currently saves places only on the visitor's device. Once accounts are
approved, add a D1 database and store users, saved places, trip plans, vendors,
products, and consent records server-side.

### 3. Direct checkout and host payouts

Only add this if Go Bjoun will be the marketplace or merchant of record.
Recommended provider: Stripe Connect.

```text
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

Before implementation, decide and document:

- Who is merchant of record.
- Go Bjoun's commission and currency policy.
- Host onboarding and verification.
- Payout timing and reserves.
- Cancellation, refund, chargeback, and dispute ownership.
- Tax invoicing and which Caribbean markets can legally be served.

Have a qualified Jamaican/Caribbean lawyer and accountant review the model.

### 4. Transactional email

Recommended provider: Resend.

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
```

Verify the sending domain, then create booking, cancellation, refund, payout,
support, and account-security templates. Email is not wired into the beta
because there is no verified sender domain yet.

### 5. Operations before accepting money

- Verify each launch partner and the person authorized to manage its listing.
- Confirm description, inclusions, exclusions, capacity, accessibility, meeting
  point, price, taxes, opening hours, contact details, photos, and cancellation
  terms.
- Test one successful payment, decline, refund, cancellation, webhook retry,
  host payout, and customer-support escalation.
- Publish Privacy, Terms, Cookie, Refund/Cancellation, Accessibility, and Vendor
  Agreement pages.
- Add a listing correction/report workflow and a monitored incident channel.
- Obtain written rights for all partner photos and copy.

## Free data and map stack

| Capability | Current provider | Key/cost | Important condition |
| --- | --- | --- | --- |
| Place catalogue | OpenStreetMap via Overpass | No key | Keep ODbL attribution; verify changing details |
| Interactive map | OpenFreeMap + MapLibre | No key on public instance | Attribution required; public service has no SLA |
| Directions handoff | Google Maps URL | No key | Opens the user's maps app/site |
| Device saves | Browser local storage | No key | Does not sync between devices |

Official references:

- OpenStreetMap attribution:
  https://osmfoundation.org/wiki/Licence/Attribution_Guidelines
- OpenStreetMap tile policy:
  https://operations.osmfoundation.org/policies/tiles/
- Overpass API:
  https://wiki.openstreetmap.org/wiki/Overpass_API
- OpenFreeMap:
  https://openfreemap.org/
- Google Maps URLs:
  https://developers.google.com/maps/documentation/urls/get-started
- Stripe Connect marketplaces:
  https://docs.stripe.com/connect/marketplace
- Clerk environment keys:
  https://clerk.com/docs/guides/development/clerk-environment-variables
- Resend API:
  https://resend.com/docs/api-reference/introduction

## Recommended release sequence

1. Launch the no-login Jamaica discovery beta and collect listing corrections.
2. Connect the final domain, support inbox, analytics, and legal pages.
3. Add Viator Affiliate inventory for the quickest low-operations revenue path.
4. Add accounts and cloud-synced saves after the first evidence of repeat use.
5. Onboard direct local partners only after payments, legal, support, and refund
   operations are ready.
