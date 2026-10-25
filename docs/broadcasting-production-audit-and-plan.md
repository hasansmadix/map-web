# Broadcasting and Production — Audit and Implementation Plan

**Status:** Revised plan. No production code, routes, or content have been changed.
**Repository:** `map-web`. The API lives in the sibling repository `map-server`.
**Revision:** 25 October 2026. This document replaces the first recommendation. The codebase audit stands. The information architecture does not.
**Language:** English only. No locale prefixes, no Arabic content, no hreflang alternates.

How to read this document:

- **Verified** — observed in the working tree, a public page, or the broadcasting-units API.
- **Confirmed capability** — MAP has stated that the company provides this service. Publish it as a service. Do not invent the equipment, licences, headcount, or client names behind it.
- **Needs confirmation** — a specific technical or commercial fact that is still unverified. Omit that fact until MAP confirms it. Do not omit the service.

---

## Part A — Executive Assessment

### Current state

The public site is a Next.js 16 App Router application (`map-web`, Next.js 16.0.10, React 19.2.3). Production pages and the broadcasting marketing copy are static TypeScript. The fleet is not. Unit lists, unit pages, unit metadata, and unit sitemap URLs are loaded at request time from a NestJS API.

What exists today is a narrow broadcasting tree:

| URL | What it actually is |
| --- | --- |
| `/broadcasting` | A hub that compares a truck with a flight-case system. |
| `/broadcasting/outside-broadcast` | An outside-broadcast service page with an API fleet band embedded in it. |
| `/broadcasting/portable-broadcast-systems` | The same pattern for flight cases. |
| `/broadcasting/units/[unitSlug]` | One API-backed specification page per unit. |
| `/broadcasting/units/studio-preview`, `/broadcasting/units/ob-van-preview` | Noindex 3D previews. |

Production is five static pages under `/services`: commercial, corporate, event coverage, live, and studio.

That tree describes two deployment methods. It does not describe MAP’s broadcasting business. Sports, transmission and contribution, technical crew, and live multi-camera production as its own engagement are missing as pages. Applications and GCC coverage are sentences inside the hub, not a structure a buyer can navigate.

The first draft of this plan treated those gaps as a reason to keep the current tree. That decision is withdrawn. Missing pages are a website limitation, not evidence that MAP does not offer the service.

### Confirmed service capabilities

MAP confirms that it provides:

- Outside broadcast production, including OB van rental and operations
- Flypacks and portable broadcast systems
- Live broadcasting and multi-camera production
- Sports broadcasting
- Broadcast transmission and contribution
- Broadcast engineering and technical crew
- Broadcasting for conferences, concerts, government events, television productions, and other professional live events

These are in scope as services. Specific transmission technologies, licences, permanent offices, in-country equipment, crew rosters, and client credits remain unverified and must not be invented.

### Fleet verified from the API

On 25 October 2026 the public endpoint on the configured local API returned **6 published units** and no further pages:

`GET http://localhost:7001/api/v1/broadcast-units/published?limit=100`

| Slug | API title | Type | Gallery | Metadata |
| --- | --- | --- | --- | --- |
| `ob-van-1` | Outside Broadcast Vehicle (OB VAN 1) | `OBVAN` | None | Title and description present |
| `flightcase-1` | Portable Broadcast Unit (Flight Case 1) | `FLIGHT_CASE` | None | Present |
| `flightcase-2` | Portable Broadcast Unit (Flight Case 2) | `FLIGHT_CASE` | None | Present |
| `flightcase-3` | Portable Broadcast Unit (Flight Case 3) | `FLIGHT_CASE` | None | Present |
| `flightcase-4` | Portable Broadcast Unit (Flight Case 4) | `FLIGHT_CASE` | None | Present |
| `studio-1` | Studio 1 | `STUDIO` | None | Empty |

The commented Render host (`https://map-server-kpyg.onrender.com`) returns HTTP 404 for `/` and for the units path. It is not the active environment. Local `NEXT_PUBLIC_API_URL` is. The seed file `map-server/src/scripts/seeds/units.json` is an older copy: shorter titles, no meta fields, display-label groups, and a `description` the current entity does not return. **The API records are the migration source.**

There are no unit photographs. That is expected and is not a blocker.

### Other verified problems that still stand

- Mobile Broadcast links go to `/broadcasts`, which has no page. Desktop links go to `/broadcasting/*`. The sitemap still lists `/broadcasts`.
- `/services/live-event-production` and the broadcasting hub describe the same truck-versus-flypack decision.
- Proposal buttons go to `/contact?subject=…`. The contact page does not read the query and does not render a form. **A new enquiry system is out of this project.** CTAs must still land on a real page.
- The website `BroadcastType` enum is `OBVAN` and `FLIGHT_CASE` only. The API returned `STUDIO`. The server enum in source lists `SNG` and `INTERNET_BROADCAST` and does not list `STUDIO`. The database value is what gets published.
- Unit JSON-LD is a `Product` with `Offer` availability `InStock`.
- Local `.env` sets `NEXT_PUBLIC_SITE_URL` to `https://www.blendlab.net`. Confirm the deployment uses the public MAP origin before launch.
- Address and tenure disagree across surfaces: the working tree footer uses “B29, Dubai Production City” and the footer blurb says “since 2015”; About says “25+ years”; the live site and the stale Vercel broadcasting page use “BS 18, Dubai Studio City”. This project does not print a new address or a new years-in-business claim.
- The Vercel preview at `/broadcasting` still serves an older, keyword-dense page, including a REMI claim. Do not copy it. The working tree is the code to change. `maproduction.ae` is a separate, older property.

### Strategic direction

Build Broadcasting as four layers, not as two deployment pages.

1. **Services** — the engagement a buyer is trying to purchase.
2. **Fleet and systems** — the OB van, the flypacks, and the studio, each with a specification page.
3. **Applications** — sports, concerts, conferences, government, television. Sports is a service page because the workflow is distinct. The others are sections and cross-links, because the operation is the same.
4. **Regional coverage** — Dubai as the base, engagements across the six GCC countries, stated on the hub and on service pages. No country doorway pages in this launch.

Production stays the home of finished programmes and of the end-to-end live engagement. Broadcasting is the technical operation and the infrastructure. Both live pages remain. They are given different jobs so they do not compete.

The fleet moves into version-controlled TypeScript modules validated with Zod, generated as static pages, with no runtime units API. The Nest module and the dashboard stay until a separate decommissioning task.

Enquiry-form, email, and CRM work is deferred. It must not block this release.

---

## Part B — Codebase Audit

Findings below were verified in the repositories. Recommendations in later parts supersede any “keep the current tree” conclusion from the first draft.

### Stack

| Item | Verified |
| --- | --- |
| Web | Next.js 16.0.10, App Router, React 19.2.3. Package name is `"new"`. |
| API | NestJS 11, TypeORM, PostgreSQL. Global prefix `api/v1` (`map-server/src/main.ts`). No `map-web/app/api` routes. |
| Web client | `map-web/services/base.service.ts` uses `NEXT_PUBLIC_API_URL`, falling back to `http://localhost:7001/api/v1`. |
| UI | shadcn/ui (`new-york`), Radix, Tailwind CSS v4, `components/website/common/marketing-styles`. |
| Validation | Zod. |
| Tests | No test runner and no test files in `map-web`. |
| i18n | `lang="en"`. No locale routing. |

Public marketing pages are server components. Unit data is fetched on the server, not in a client hook. TanStack Query unit hooks are dashboard-only, except `useBroadcastUnitsPublic` and `useBroadcastUnitBySlug`, which nothing production-imports.

### Broadcasting files

| URL | File | Data |
| --- | --- | --- |
| `/broadcasting` | `app/(home)/broadcasting/page.tsx` | `broadcastingContent` via `BroadcastPage`. No units. Title tag still says “Live Broadcasting & Production Solutions in Dubai”. H1 is “Broadcast production”. |
| `/broadcasting/outside-broadcast` | `outside-broadcast/page.tsx` | Static copy plus `BroadcastUnitsBand` for `OBVAN`. Query: `page`, `limit`, `search`. |
| `/broadcasting/portable-broadcast-systems` | `portable-broadcast-systems/page.tsx` | Same for `FLIGHT_CASE`. |
| `/broadcasting/units/[unitSlug]` | `units/[unitSlug]/page.tsx` | `broadcastsService.getUnitBySlug` in the page and in `generateMetadata`. |
| Preview routes | `units/studio-preview/page.tsx`, `units/ob-van-preview/page.tsx` | Static 3D, `robots: noindex`. |

`BroadcastPage` (`components/website/broadcasting/broadcast-page.tsx`) conditionally renders deployments, a comparison table, specification rows, requirements, fit, deliverables, programmes, process, FAQ, related links, and a CTA. It fits a single “choose a deployment” essay. It does not fit a services-and-fleet hub, and it should not be stretched until every new page is the same essay with different paragraphs.

Unit UI under `components/website/broadcasts/`:

- Used: `broadcasts-section.tsx`, `broadcast-unit-row-card.tsx`, `unit-quick-stats.tsx`, `unit-visual.tsx`, `unit-gallery.tsx`, `unit-items.tsx`, `unit-specifications.tsx`.
- Unused by the current unit page: `unit-hero.tsx`, `unit-description.tsx`, `unit-navigation.tsx`.
- `unit-visual.tsx` draws a text schematic from equipment groups. It is not a photograph. It is safe to keep on an image-free page.
- `components/website/broadcasts/data.ts` is unused except `broadcastTypes`, which the sitemap imports. Its stats (“500+ Productions”, “50+ Broadcast Units”) must not be published.
- `utils/seo/schema/broadcasts/broadcasts-schema.ts` targets `/broadcasts` and has no importers.

### Production files

All five service routes and the index use `ServiceLinePage` and a `ServiceLineContent` object in `components/website/services/`. `service-page.tsx` is an older unused layout.

`next.config.ts` permanently redirects the old root paths (`/commercial-video-production` and the four siblings) to `/services/...`. There is no `/broadcasts` redirect and no redirect from the service live URL.

### API map

Public, no auth, used by the website:

| Method | Path | Used for |
| --- | --- | --- |
| `GET` | `/api/v1/broadcast-units/published` | Fleet band and sitemap. Filter is `type` plus pagination. `search` is accepted by the web client and ignored by `PublicBroadcastUnitFilterDto`. |
| `GET` | `/api/v1/broadcast-units/slug/:slug` | Unit page and metadata. |

`GET .../slug/:slug` calls `findBySlug`, which does **not** filter `isPublished`. `getBySlugPublic` does, and the controller does not use it. After the migration only `published: true` records get a route, so this stops mattering for the website.

Admin, authenticated, used by the dashboard only:

`POST/GET/PATCH/DELETE /api/v1/admin/broadcast-units`, plus publish and unpublish actions the web client never calls.

Web pieces: `services/broadcasts.service.ts`, `types/broadcasts/*`, `validations/broadcasts/*`, `hooks/api/broadcasts/*`, `app/dashboard/broadcast-units/**`, `utils/seo/sitemap/sitemap-utils.ts`, `utils/seo/schema/broadcasts/single-broadcast-schema.ts`, `broadcast-type-schema.ts`.

Shared, and not part of this removal: `ApiService`, `mediaService`, equipment, articles, intents, settings, staff, gallery schema.

`generateBroadcastUrls` requests `limit: 100` once per type and swallows errors. An API failure drops unit URLs from the sitemap silently.

### API retrieval for this revision

| Source | Result |
| --- | --- |
| `http://localhost:7001/api/v1/broadcast-units/published?limit=100` | HTTP 200. `pagination.total` is 6. One page. |
| `https://map-server-kpyg.onrender.com/api/v1/broadcast-units/published` | HTTP 404. The host in the commented `.env` line is obsolete. |
| Admin list | Not called. It requires an authenticated role. Unpublished drafts, if any, are not in this export. |

The response wrapper is `{ data, pagination, meta }`. Records were updated between 24 and 25 October 2026, except `studio-1` (1 January 2026). Implementation must fetch again at migration time rather than retype this summary from memory.

### API inventory to preserve

**`ob-van-1`** — Outside Broadcast Vehicle (OB VAN 1). HD/4K, 12 camera chains, Hanabi HVS-490, 64×64 routing, Midas M32, RTS Adam, APC UPS 40kV, mobility “Mobile”, deployment “OB Van”. Use cases: Sports, Live Events, Broadcast Production. 26 line items, including Grass Valley 86N chains, Fujinon and Canon lenses, replay, monitoring, Ericsson RF receiver, fibre drums. Meta title and description exist and are Dubai-led. Gallery empty. View count on the record: 117 (an internal counter, not search analytics).

**`flightcase-1`** — Portable Broadcast Unit (Flight Case 1). HD/4K ready, AC powered, “Rapid Setup”. No `cameraChains` value. 20 line items. Meta present. Gallery empty.

**`flightcase-2`** — Portable Broadcast Unit (Flight Case 2). HD, FOR-A HVS-492WOU and HVS-490, 64×64, Midas M32, RTS Odin. 19 line items. Meta present.

**`flightcase-3`** — Portable Broadcast Unit (Flight Case 3). HD, 6 chains, Sony MVS-3000A, Sony HSC100R, Nevion 32×32. `intercom` is an empty string; `intercomList` is RTS Odin and Clear-Com HME DX210. 21 line items. Meta present.

**`flightcase-4`** — Portable Broadcast Unit (Flight Case 4). HD, 10 chains, FOR-A HVS-2000 (2ME), Sony HDC-1500, 32×32, RTS ZEUS-3, Midas M32. 21 line items. The seed’s `mixerPanel` field is not on the API record. Meta present.

**`studio-1`** — Studio 1. 600 m², broadcast-ready, lighting grid, makeup, changing, guest, and edit rooms. FOR-A HVS-492WOU and HVS-490, 64×64, Midas M32, RTS Odin, Sennheiser EW500 G3. 23 line items. No meta title or description. Gallery empty. The current site can open `/broadcasting/units/studio-1` by slug, but neither fleet band requests `STUDIO`, and the web type union cannot name it. The breadcrumb parent falls through to `/broadcasting`.

Seed versus API, where they differ: prefer the API. Notable seed drift: internal titles (“OB Van 1”, “FlightCase 3”), missing meta, group labels instead of enums, a `description` string the response DTO does not expose, and `mixerPanel` on flight case 4. Item counts are close. The seeder reads `broadcast-units.json`, which does not exist, so the seed path is not a reliable re-import.

Do not “correct” model names during migration. Preserve “Wholer Quad Monitor” and “APC UPS 40kV” as stored. Flag them in Part H. Do not sum camera bodies, CCUs, and OCPs into a camera-chain count the record does not already have. Flight Case 1 stays without that number.

### Navigation, SEO, contact

Desktop Broadcast (`broadcast-dropdown.tsx`): Overview, Outside broadcast, Portable systems.

Mobile Broadcast (`broadcast-accordion.tsx`): `/broadcasts?type=OBVAN`, `/broadcasts?type=FLIGHT_CASE`, `/broadcasts`.

Production trigger label is “Media Production”. Items point at `/services` and the five slugs. Footer Services column has three labels that all go to `/services`, then the five slugs. Footer does not link to Broadcasting. Homepage production panel omits live.

Metadata helper: `utils/seo/meta/enhanced-meta.ts` (canonical is the relative pathname plus `metadataBase`). Robots allow `/` and disallow `/dashboard/` and `/api/`. Sitemap entities include broadcasts, intents, services, blog, and static. The services entity emits only `/services`; the five children are repeated under static, together with `/broadcasts`.

Service pages have no JSON-LD. Unit pages emit `Product` and `InStock`.

`/contact` is `PageHero` plus `ContactDetails`. `ContactForm` is unused and its submit call is commented out. `map-server` has no contact module. Existing CTAs use `/contact?subject=broadcasting` and `/contact?subject=broadcasting&unit=`. Those links resolve. They do not submit a brief. This project leaves that as it is.

Equipment intents under `/equipment-rental` stay out of scope. A `projects` module exists on the server, is unused by the website, and includes `githubUrl`. It is not a broadcast case-study model. Do not wire it.

### What the current components are good at

`ServiceLinePage`, breadcrumbs, FAQ, CTA, definition-list specifications, and grouped equipment lists are worth keeping. They are not a page strategy. New service and fleet pages need their own hierarchy, built from shared sections rather than one component with a dozen optional blocks.

---

## Part C — Information Architecture

The current routes do not define this structure. Each URL below earns its place by a different buyer decision. Where two pages share a subject, the split is stated so they do not publish the same essay twice.

### Broadcasting sitemap

```text
/broadcasting                                  Hub

Services
/broadcasting/outside-broadcast                Outside broadcast production
/broadcasting/live-production                  Live and multi-camera production
/broadcasting/sports-broadcasting              Sports broadcasting
/broadcasting/transmission                     Transmission and contribution
/broadcasting/technical-crew                   Engineering and technical crew

Fleet and systems
/broadcasting/ob-vans                          OB van index
/broadcasting/ob-vans/ob-van-1                 Unit
/broadcasting/flypacks                         Flypack index
/broadcasting/flypacks/flightcase-1            Unit
/broadcasting/flypacks/flightcase-2            Unit
/broadcasting/flypacks/flightcase-3            Unit
/broadcasting/flypacks/flightcase-4            Unit
/broadcasting/studios                          Studio facility index
/broadcasting/studios/studio-1                 Unit

Unchanged, noindex
/broadcasting/units/ob-van-preview
/broadcasting/units/studio-preview
```

Applications and GCC coverage do not add URLs in this launch. They are navigation and page sections. The content model should still allow a country page later without a rewrite (Part F).

### Why services and fleet are different URLs

A service page answers “will you run this for me, and what do I get?”. A fleet page answers “what system are you putting on my site, and what is in it?”. A technical director and a producer often arrive together and then split. Putting the equipment list in the middle of the service essay serves neither of them.

`/broadcasting/outside-broadcast` stays the **service**. It loses the embedded unit catalogue. `/broadcasting/ob-vans` becomes the catalogue. The same split turns `/broadcasting/portable-broadcast-systems` into a redirect (below) and `/broadcasting/flypacks` into the catalogue. Live production, sports, transmission, and crew do not get a fake fleet of their own. They link to the systems they actually use.

### Service pages

#### `/broadcasting` — hub, rebuild

| | |
| --- | --- |
| Decision | Do I need a service engagement, a specific system, or both? |
| Audience | Executive producer, head of broadcast, agency producer, international partner. |
| Intent | Broadcast production partner for the UAE and GCC. |
| Job | Route the visitor into one service or one fleet within one screen, and state the operating area. |
| Overlap | None of the child pages should repeat the full index. The hub is the index. |

#### `/broadcasting/outside-broadcast` — keep the URL, change the job

| | |
| --- | --- |
| Decision | Is an outside broadcast the right engagement for this site and this programme? |
| Audience | Producer or organiser of a ceremony, concert, public event, or any show that needs a mobile control facility. |
| Intent | Outside broadcast services, mobile production, end-to-end OB. |
| Job | Explain the engagement: survey, build, show, strike, what the venue must provide, what MAP is accountable for. |
| Links | Fleet: `/broadcasting/ob-vans`. Siblings: live production, sports, transmission, crew. |
| Not this page | The camera-chain table for OB VAN 1. The sports match workflow. How a flypack is packed. |

The existing URL is kept because it already matches the service name and is the desktop nav target. Changing it to `/broadcasting/ob-production` would be cosmetic.

#### `/broadcasting/live-production` — new

| | |
| --- | --- |
| Decision | Can MAP switch, record, and deliver a live multi-camera programme? |
| Audience | Technical producer, director, broadcast operations. |
| Intent | Live broadcast production, multi-camera production, vision mixing, live streaming and recording as a broadcast craft. |
| Job | Describe the workflow: cameras, vision, audio, graphics, record, destinations. Name the systems only by linking to the fleet. |
| Division from `/services/live-event-production` | This page is the operation. The production page is the client engagement: brief, accountability, the programme the audience sees. See Production below. |
| Division from outside broadcast | OB is one way to house the operation. Live production also runs on a flypack or in the studio. A ballroom conference is live production and is often not an OB van. |

#### `/broadcasting/sports-broadcasting` — new

| | |
| --- | --- |
| Decision | Can MAP cover a match, a venue, or a tournament? |
| Audience | Sports organiser, host-broadcast producer, federation or venue technical lead. |
| Intent | Sports broadcasting, live sports production, tournament coverage. |
| Job | Match and session coverage, multi-camera sports, replay, a production that runs to a competition clock rather than a conference run of show. |
| Why its own page | The buyer and the workflow differ from a ceremony OB. Replay and a 12-camera vehicle are already in the OB VAN 1 record. That supports the workflow description. It does not support naming tournaments, rights holders, or a host-broadcast mandate. |
| Division from OB | OB explains the mobile facility. Sports explains the sports programme and then sends the reader to the OB van and, where a venue cannot take a truck, to flypacks. |
| Do not claim | Specific leagues, “official broadcaster”, or a dedicated sports compound that is not in the unit data. |

#### `/broadcasting/transmission` — new

| | |
| --- | --- |
| Decision | Who gets the signal from the venue to the destination? |
| Audience | Broadcaster or production that needs contribution and distribution, with or without MAP also producing the pictures. |
| Intent | Broadcast contribution, signal distribution, transmission for a live event. |
| Job | Describe contribution from the venue and distribution to the destinations named in the brief, as a service that can be scoped alone or with a production. |
| Division from live production | Live production makes the programme. Transmission moves it. A show can need both. The pages link. They do not both carry a technology catalogue. |
| Claim boundary | MAP has confirmed the service. The API has no SNG unit. One OB line item is an Ericsson RF receiver. That is not a licence to claim a satellite fleet, fibre network, bonded cellular, or IP contribution platform. The page says the path is specified per engagement. Named technologies are added only after Part H confirms which ones MAP operates. |

#### `/broadcasting/technical-crew` — new

| | |
| --- | --- |
| Decision | Can I hire broadcast engineers and operators, including when I am not hiring the whole show? |
| Audience | Visiting production, international partner, producer who has a format and needs a local technical crew. |
| Intent | Broadcast crew, vision operators, camera operators, replay operators, broadcast engineers. |
| Job | Role list and how a crew is scaled to the camera count and the system. State that crew is included with a MAP unit and can also be engaged for a production MAP does not fully produce. |
| Division from the service pages | Those pages say “a crew comes with the engagement”. This page is the offer to hire the people. |
| Do not claim | A headcount, a 24/7 roster, or crews resident in each GCC country. |

### Fleet and unit URLs

| URL | Role |
| --- | --- |
| `/broadcasting/ob-vans` | Index of `kind: obvan`. Today that is one vehicle. The page is still an index so the next vehicle is a content change, not a redesign. |
| `/broadcasting/ob-vans/[slug]` | Specification page. |
| `/broadcasting/flypacks` | Index of the four flight-case units. |
| `/broadcasting/flypacks/[slug]` | Specification page. |
| `/broadcasting/studios` | Index of `kind: studio`. Today that is Studio 1, already published in the API. |
| `/broadcasting/studios/[slug]` | Specification page, including area and rooms. |

`/broadcasting/units/[slug]` is retired as the public URL.

Keeping it would preserve a shorter redirect list and one dynamic route. It would also hide the thing the URL is for. `units/ob-van-1` does not tell a buyer they are looking at a vehicle, and a studio, a truck, and a flypack would share one undifferentiated family. The site has six known slugs, a sitemap we control, and view counters rather than evidence of a large backlink set. Clarity wins. Each old slug gets a permanent redirect onto the new fleet URL. A leftover route at `/broadcasting/units/[unitSlug]` looks the slug up in the static registry and redirects, so a slug added later cannot leave an old link as a 404. Preview paths stay where they are because they are static segments and must not be captured by that redirect.

`/broadcasting/portable-broadcast-systems` redirects to `/broadcasting/flypacks`. The current page is a systems page. Its service advice (when a room cannot take a truck) moves onto the flypack index as a short chooser, and onto the OB and live pages as a cross-link. A second service URL for “portable systems” would compete with the flypack index and with live production.

Flypack is the industry word. Flight case is the word already in the unit titles. The flypack index uses both in the title and the lead. Do not also publish `/broadcasting/flight-cases`.

### Applications — visible, mostly not separate URLs

| Application | Where it lives | Why not its own URL |
| --- | --- | --- |
| Sports and tournaments | Dedicated service, `/broadcasting/sports-broadcasting` | Distinct workflow and buyer. |
| Concerts and live entertainment | Section on outside broadcast and on live production. Linked from the hub. | Same OB operation as other large shows. A concert URL would rank against the OB service. |
| Conferences and exhibitions | Section on live production. Recorded deliverables stay on the production event page. | The conference buyer who needs a switch is a live-production buyer. |
| Government and institutional events | Section on outside broadcast and live production. Hub link. | Same operation, different client. A government page with no distinct procedure would be thin. |
| Television and studio productions | Studio fleet page, studio unit page, and the production studio service. Hub link. | The facility page is the technical destination. A “TV production” marketing URL would collide with studio production. |

The hub has an Applications band with these five entries. Each entry is a few lines and a link. That is the discoverability, without a second copy of the service page.

### Redirects

Permanent:

| From | To |
| --- | --- |
| `/broadcasts` | `/broadcasting` |
| `/broadcasts?type=OBVAN` | `/broadcasting/ob-vans` |
| `/broadcasts?type=FLIGHT_CASE` | `/broadcasting/flypacks` |
| `/broadcasting/portable-broadcast-systems` | `/broadcasting/flypacks` |
| `/broadcasting/units/ob-van-1` | `/broadcasting/ob-vans/ob-van-1` |
| `/broadcasting/units/flightcase-1` … `flightcase-4` | `/broadcasting/flypacks/{slug}` |
| `/broadcasting/units/studio-1` | `/broadcasting/studios/studio-1` |
| Any other `/broadcasting/units/:slug` except the two preview paths | Registry lookup, then the fleet URL, or 404 if the slug is unknown |

Query redirects may need a tiny matcher because `next.config.ts` redirects do not always carry query conditions. Match only `/broadcasts`. Do not add a general middleware policy.

Existing production redirects in `next.config.ts` stay.

### Production sitemap

```text
/services                                      Production overview
/services/commercial-video-production          Commercial and advertising
/services/corporate-video-production           Corporate film
/services/event-video-production               Event coverage, the record
/services/live-event-production                Live production, the engagement
/services/studio-video-production              Studio sessions
```

No URL moves. The live page is repositioned, not redirected.

#### What was considered and not given a URL

| Candidate | Decision | Reason |
| --- | --- | --- |
| TV and programme production | Section on the production hub, plus studio and live links | Television work is real and is already expressed by the studio facility and by live production. A new URL needs a distinct deliverable (a series, a commission, a format) that has not been specified. Putting a thin “TV production” page beside studio production would split one intent. |
| Film and documentary | Not in this launch. Optional later. | Not in the confirmed broadcasting list, and not described as its own production process. The old public site mentions films and documentaries. That is not enough to open a landing page. The hub may say MAP produces filmed programmes. It may not advertise a documentary slate. |
| Production support | Not a page | Crew is `/broadcasting/technical-crew`. Equipment hire is `/equipment-rental`, which this project does not restructure. A third “support” page would be another door to the same crew. |
| Renaming `/services` to `/production` | Rejected | Permanent redirects already point at `/services/...`. The visible name becomes Production. The path stays. |

#### Pages that stay, and why

| Page | Buyer | Deliverable | Change |
| --- | --- | --- | --- |
| `/services` | Someone who needs a programme and has not chosen the line | A route into the right line, including a clear door to broadcasting | Rebuild the opening so Production is finished work and accountable engagements, and Broadcasting is the technical operation. Add television and live as routes, not as new URLs. |
| Commercial | Agency, brand | Spots, cutdowns, ratios | Keep. Sharpen only if a paragraph claims a live truck. |
| Corporate | Communications, leadership | An institutional film | Keep. |
| Event coverage | Event owner who needs the record after the day | Highlights, session films, a stage record | Keep the URL. Make the first screen say this is the film, not the live switch. Link to the live engagement page and to `/broadcasting/live-production`. |
| Live engagement | Client who wants MAP to own the live programme | A directed programme for the room and the remote audience, with one accountable team | Keep the URL. Remove the duplicated vehicle-versus-flypack essay. One section, “How it is produced”, links to live production, OB, flypacks, and crew. |
| Studio sessions | Team that needs a controlled filming day | Interviews, pieces to camera, product, green screen | Keep. Link to `/broadcasting/studios` for the facility specification. The session page does not repeat the 600 m² inventory. |

#### Live engagement versus broadcast operation

This is the overlap that matters.

| | `/services/live-event-production` | `/broadcasting/live-production` |
| --- | --- | --- |
| Question | Will you take responsibility for the live programme? | How is the programme made, and on what? |
| Buyer | Event owner, agency, communications | Technical producer, director, visiting engineer |
| Content | Outcome, scope, accountability, schedule, what is delivered | Cameras, vision, audio, graphics, record, destinations, which MAP system |
| Fleet detail | Links only | Links only. The specification stays on the unit page. |
| Title direction | Live Event Production | Live and Multi-Camera Production |

Someone who needs both moves by the cross-link in the first screen. The pages must not share a comparison table, a specification list, or the same FAQ answers.

### Navigation

**Broadcast**, grouped the same way on desktop and mobile:

- Services: Overview, Outside broadcast, Live production, Sports, Transmission, Technical crew
- Systems: OB vans, Flypacks, Studios

Nine links in one flat list is hard to scan. Two groups match the architecture. Do not put unit names in the header.

**Production:**

- Overview, Commercial, Corporate, Event coverage, Live production (the engagement URL), Studio
- A text link in the menu footer: “Broadcasting operations” → `/broadcasting`

Rename the trigger from “Media Production” to “Production”.

**Footer:** one Production link to `/services`, the production children, and a Broadcasting group for the hub, outside broadcast, and the three fleet indexes. Drop the three labels that all point at `/services`.

**Homepage:** the broadcasting door stays. Its panel should link to outside broadcast, live production, and the OB van index, not only to the old pair of pages. The production panel adds the live engagement. Equipment rental is untouched.

The mobile Photography link to `/solutions/photography` has no page. Out of scope. Do not “fix” it inside the broadcast accordion work beyond avoiding a regression.

---

## Part D — Static Broadcasting Units

### End state

- Records live in `map-web/content/broadcast-units/`.
- Published units are static pages under the fleet URLs.
- Metadata and sitemap entries come from those records.
- A change to a unit is a git change.
- No public page calls `broadcastsService` or any `/broadcast-units` endpoint.
- Equipment, articles, intents, settings, media, and the rest of the API stay.

### Website migration versus backend decommissioning

**In this project:** stop the public site reading the units API.

**Not in this project:** drop the table, delete `map-server/src/modules/broadcast`, or remove the dashboard screens. Do that only in the deferred task in Part G, after a release where the website no longer depends on the module and after confirming no other client calls it.

Until that task, the dashboard can still edit the database. Those edits will not appear on the site. Put one sentence on the dashboard list page saying the public site reads the repository, not this screen. That is a warning, not a rebuild of the dashboard.

### Source of the records

At implementation, fetch:

`GET {NEXT_PUBLIC_API_URL}/broadcast-units/published?limit=100`

The active local value is `http://localhost:7001/api/v1`. Re-fetch even though this audit already did. Units were edited on 25 October 2026. If that host is down, do not guess a new host and do not use the Render URL. Stop and use a snapshot taken from this audit’s response only if MAP confirms the local API cannot be started. The seed file is not the source.

Map API `type` to content `kind`:

| API `type` | `kind` | Parent |
| --- | --- | --- |
| `OBVAN` | `obvan` | `/broadcasting/ob-vans` |
| `FLIGHT_CASE` | `flight-case` | `/broadcasting/flypacks` |
| `STUDIO` | `studio` | `/broadcasting/studios` |

There is no `SNG` or `INTERNET_BROADCAST` record in the payload. Do not create empty units for those enum values.

Copy every returned field that the page can show: slug, title, summary, specs (including keys the old TypeScript interface omitted, such as `areaSqm`, `features`, `wirelessAudio`, `broadcastReady`, `intercomList`), items, order, meta title, meta description, meta keywords, gallery. Gallery will be an empty array. Keep it on the schema.

Normalise `intercom` to `string[]`. For flight case 3, ignore the empty string and use `intercomList`. Do not drop line items. Groups in the API are already `BroadcastUnitItemGroup` values, so the seed label map is unnecessary for this payload.

`published` follows `isPublished`. All six current records are published, including the studio. Publish the studio page. It is already public via the API.

Write meta title and description for `studio-1` from its own fields (name, 600 m², Dubai studio facility). Do not leave a published unit without a description. Do not reuse the Dubai-stuffed keyword lists from the other units as a template for stuffing. The existing meta titles may be kept as the starting title and then aligned with Part F so five pages do not all lead with the same “Dubai” phrase. Preserve the facts in them.

Do not carry `viewCount` or the numeric `id` into the public content model. The redirect table does not need them.

### Schema and location

TypeScript modules plus Zod. JSON is how the seed drifted. MDX hides specification fields. JSX-hardcoding was ruled out.

```text
map-web/content/broadcast-units/
  schema.ts
  index.ts              validates on import, exports queries
  units/ob-van-1.ts
  units/flightcase-1.ts
  units/flightcase-2.ts
  units/flightcase-3.ts
  units/flightcase-4.ts
  units/studio-1.ts
```

`index.ts` throws on duplicate slugs, reserved slugs (`ob-van-preview`, `studio-preview`), a published unit with an empty title or summary, an unknown item group, or a gallery `src` that is not a `public/` path or an allowed remote URL. `next build` is the check. Do not add a test framework.

Queries: `listUnits({ kind })`, `getUnit(slug)`, `listPublished()`.

Kind-specific specs:

- `obvan` and `flight-case` share format, camera chains, camera system, vision mixer or mixers, routing, audio mixer, intercom list, power, power backup, mobility, deployment, use cases.
- `studio` adds `areaSqm`, `features`, `broadcastReady`, `wirelessAudio`.
- Extra keys from the API must fit the schema. Do not use an untyped blob that silently drops `areaSqm` the way the current web interface does.

Optional physical fields (`vehicleLength`, `expanding`, `uplink`) exist on the schema and stay absent until MAP supplies them.

Images:

```ts
interface BroadcastUnitImage {
  src: string
  alt: string
  order: number
}
```

Empty is valid. No generated photography, no stock frames presented as the vehicle, no `example.com` paths from old Postman bodies. When a real file exists later, it goes in `public/broadcast-units/{slug}/` and the gallery renders above the equipment list without a layout rewrite.

### Rendering

- `generateStaticParams` from published slugs, split by the fleet route that owns the kind.
- `dynamicParams = false` on each fleet slug route.
- System marketing pages and fleet indexes import the registry. They do not fetch.
- Remove `search` and pagination from the fleet UI. Six units do not need a pager. Add it back only if one kind exceeds twelve published units.
- Sitemap reads the registry. No HTTP, no swallowed failure.

### Cleanup inside the website PR

Remove public methods from `broadcasts.service.ts` once nothing calls them, and delete `useBroadcastUnitsPublic`, `useBroadcastUnitBySlug`, and `broadcasts-schema.ts`. Leave admin methods and the dashboard until the deferred decommission. Leave `map-server` untouched.

---

## Part E — UX and Page Strategy

Scale should read as specific equipment, named roles, and a complete service map. It should not read as a statistic strip. The figure of more than USD 20 million in equipment is context for how serious the presentation must be. Do not print it unless MAP approves that sentence. Do not print “50+ units”, “500+ productions”, or “110k hours”.

### Hub — `/broadcasting`

**Journey.** A producer lands from search or the homepage and has to choose a door in under a minute.

**Decision.** Service engagement, a particular system, or a conversation about both.

**Information.** What MAP operates, the six services, the three system classes with real counts from the registry (1 OB van, 4 flypacks, 1 studio), the five applications as links, and the GCC operating line.

**Hierarchy.**

1. Title and one paragraph: mobile units, flypacks, a Dubai studio, and the crews that run them, for programmes across the GCC.
2. Two primary paths: “Broadcast services” and “Fleet and systems”, each a short list of text links. This is the architecture, visible.
3. Service rows: name, the buyer’s outcome in one sentence, link. Not six identical icon cards.
4. A generated system summary: for each class, the count and the lead fact from the records (12 camera chains on the OB van, four portable units, 600 m² studio). These numbers come from the registry. If a record changes, the sentence changes.
5. Truck versus flypack, kept as a compact comparison for people who arrived unsure. It is a module, not the whole page.
6. Applications, five text links into the owning page.
7. Operating area: based in Dubai; engagements in the UAE, Saudi Arabia, Qatar, Oman, Bahrain, and Kuwait. No map of offices.
8. One CTA.

**Reuse.** Breadcrumb, type styles, FAQ component if a short FAQ remains, CTA section.

**Replace.** `BroadcastPage` as the hub layout. A `BroadcastHub` composition should own this page. Reusing the current conditional template would bury services under the old comparison essay.

**Omit.** Hero video, logo cloud, animated counters, the 3D previews, a unit-by-unit dump (that is the fleet index).

### Service landing

Used by outside broadcast, live production, sports, transmission, and technical crew.

**Journey.** The visitor arrives with a job title and a problem. They need to know whether this is the right engagement, what they receive, and where the hardware lives.

**Decision.** “This is the service I should enquire about”, or “I actually need the sibling page”.

**Hierarchy.**

1. Title, lead, primary CTA, and a text link to the sibling a mistaken visitor needs (sports ↔ OB, live ↔ the production engagement, transmission ↔ live, crew ↔ the service they would otherwise buy whole).
2. Who it is for, in prose, not six persona cards.
3. What the engagement includes. A scope list is enough.
4. How it runs. The existing four-step survey / build / show / strike fits OB and live. Sports uses a competition version of that sequence. Transmission uses path and redundancy. Crew uses roles and scale. Do not force one process metaphor onto all five.
5. Systems used: links to fleet indexes and, where one unit is the obvious match, to that unit. No copied equipment tables.
6. Related applications, only the ones this service actually covers.
7. The same operating-area sentence, not a rewritten country essay.
8. FAQ of three or four questions that this page alone can answer.
9. CTA.

**Reuse.** `PageBreadcrumb`, `PageFaq`, `CTASection`, marketing type styles, the scope-list pattern from `ServiceLinePage`.

**Build.** One `BroadcastServicePage` that takes those sections as data. Do not clone `broadcast-page.tsx` five times, and do not keep adding optional flags to it.

**Omit.** Fleet grids, invented case studies, technology brand walls, a repeated “why MAP” icon row.

### Fleet index

**Journey.** The visitor knows the class of system and is choosing among units, or confirming the class is real.

**Decision.** Which unit to open, or whether this class is wrong (truck versus flypack).

**Hierarchy.**

1. What this class is, in one paragraph, including when to choose the sibling class.
2. A comparison built from the registry: title, format, camera chains if present, vision mixer, routing. Empty cells stay empty. Flight Case 1 will not show a camera count.
3. One specification card per unit: title, summary, those facts, link. No image frame.
4. CTA.

**Reuse.** Row-card structure, rewritten so it does not depend on `gallery[0]`. A missing image must not leave a broken frame or a grey box that looks like a failed photo.

**Omit.** Pagination, the dead search box, marketing stats.

### Unit page

**Journey.** A technical director has to decide whether this unit fits, then send the page to someone else.

**Decision.** Fit, based on format, camera capacity, mixer, routing, and the line list.

**Hierarchy.**

1. Breadcrumb: Broadcasting → fleet index → unit. Eyebrow is the class (“OB van”, “Flypack”, “Studio”).
2. Title and summary.
3. Primary CTA, “Request this unit”, to `/contact?subject=broadcasting&unit={slug}`. Secondary link back to the fleet index. Beside the buttons, the published phone and email from the existing contact details, so the page works while the form still does not read the query.
4. Quick facts from specs. Hide any fact the record lacks.
5. `UnitVisual` as a small schematic of the groups, labelled as a diagram. It sits with the facts. It is not a hero photograph.
6. Specifications as a definition list. Studio pages include area and rooms here.
7. Equipment by group, in a fixed order defined next to the registry (vision, cameras, lenses, support, routing, replay, monitoring, audio, intercom, RF, power, cabling, studio tools). Quantities visible. This is the main body and the substitute for photography.
8. Use cases from the record, as a short list, not as extra landing pages.
9. Sibling units in the same class.
10. CTA again.

When `gallery` is non-empty, render it between the facts and the equipment list. When it is empty, render nothing in that slot. No placeholder, no stock, no blurred panel.

**Reuse.** `UnitSpecifications`, `UnitItems`, `UnitQuickStats`, `UnitVisual`, `PageBreadcrumb`, `CTASection`.

**Retire from this layout.** The unused `unit-hero.tsx` and `unit-description.tsx` unless a quick check shows they do this job better. Do not maintain two heroes.

**Omit.** “In stock”, a price, a calendar, related commercials, the 3D canvas. The previews may be linked from the OB van page and the studio page as “View a layout”, still noindex. They are optional and not required for launch.

### Production pages

**Overview.** Open with the distinction: Production delivers the programme; Broadcasting operates the systems and the technical crew. Then the lines, each with its deliverable named in the link. Live is “MAP runs the live programme”. Event coverage is “MAP delivers the film afterwards”. Studio is “a controlled session”. Commercial and corporate stay as they are.

**Service pages.** `ServiceLinePage` matches this content shape and should stay for commercial, corporate, event, studio, and the repositioned live engagement. The work is the copy boundary and the links, not a new production template. Replace it only if the live page cannot express “how it is produced” as links without pretending to be a second fleet page. It can: related links and one scope section already exist.

**Omit on production pages.** OB specification tables, unit cards, GCC country grids, broadcast crew rosters (link to the crew page instead).

### Desktop and mobile

The grouped broadcast menu is the navigation redesign. Build it once and use it in the desktop dropdown and the mobile accordion so the mobile bug cannot return under a different href. Active state should match both the service path and the fleet path.

Touch targets and the specification definition list already stack to one column. Check the new comparison table at a narrow width: each unit is a card, not a six-column table that overflows.

### CTA wording

| Page | Button | Destination |
| --- | --- | --- |
| Hub and service pages | Request a proposal | `/contact?subject=` set to a stable token: `outside-broadcast`, `live-production`, `sports-broadcasting`, `transmission`, `technical-crew` |
| Fleet index | Request a proposal | The same token as the class: `ob-van`, `flypack`, `studio-facility` |
| Unit | Request this unit | `/contact?subject=broadcasting&unit={slug}` |
| Production pages | Request a proposal | Keep the current subject tokens |

The contact page will not prefill anything. That is a known limit, documented as deferred. The buttons must not say “Book”, “Check availability”, or “Instant quote”.

---

## Part F — SEO and GCC

No search volumes were available. Themes below are **search hypotheses** from the service names, the current metadata, and the way comparable GCC operators split OB, flypacks, sports, and contribution (NEP Middle East, IPG, Wise Concepts, Provision). They are not traffic figures. Competitor page structure is evidence that these intents are sold separately. It is not a sitemap to copy. NEP’s country hubs exist because NEP publishes local operating bases. MAP has not.

### Intent by page

| URL | Audience | Primary intent | Secondary themes | Commercial job | Overlap to guard |
| --- | --- | --- | --- | --- | --- |
| `/broadcasting` | Producer, partner | Broadcast production partner, UAE and GCC | Outside broadcast, flypack, live production | Choose a service or a system | Do not target “OB van rental” here. That is the fleet page. |
| `/broadcasting/outside-broadcast` | Event and ceremony producer | Outside broadcast production | Mobile production, end-to-end OB | Win the OB engagement | Do not target the vehicle SKU. Link to the van. |
| `/broadcasting/live-production` | Technical producer | Live multi-camera production | Vision mixing, live streaming, recording | Explain the operation | Different title and H1 from the production live page. |
| `/broadcasting/sports-broadcasting` | Sports organiser, host producer | Sports broadcasting | Live sports production, replay, tournament coverage | Win sports enquiries | Link to the OB van for the hardware. Do not paste its line list. |
| `/broadcasting/transmission` | Broadcaster, production manager | Contribution and distribution | Signal path for a live event | Win transmission scope | No satellite or IP claims until confirmed. |
| `/broadcasting/technical-crew` | Visiting production | Broadcast technical crew | Engineers, operators, replay, cameras | Hire people | Not a second OB page. |
| `/broadcasting/ob-vans` | Technical director | OB van rental and operations | Outside broadcast vehicle | Choose a vehicle | One index even while only one van exists. |
| `/broadcasting/ob-vans/ob-van-1` | Technical director | That vehicle’s specification | 12 camera, HVS-490, 4K | Confirm fit | Title from the unit name, not a generic “OB van Dubai” essay. |
| `/broadcasting/flypacks` | Conference and venue technical lead | Flypack and portable broadcast systems | Flight case, multi-camera portable | Choose a unit | This URL absorbs the old portable-systems intent. |
| `/broadcasting/flypacks/flightcase-*` | Technical director | That unit’s specification | HD or 4K, mixer, chain count | Confirm fit | Keep the API titles. Differentiate on specs, not on five copies of “portable broadcast system Dubai”. |
| `/broadcasting/studios` | Producer needing a facility | Broadcast studio facility | Studio hire, television production space | Inspect the studio | Distinct from `/services/studio-video-production`. |
| `/broadcasting/studios/studio-1` | Engineer, producer | Studio 1 specification | 600 m², control inventory | Confirm the room | Write meta. The API left it empty. |
| `/services` | Marketing lead, agency | Production company | Film, commercial, corporate, live programmes | Route the enquiry | Hub copy must mention broadcasting so the sections are not two unrelated firms. |
| `/services/commercial-video-production` | Agency, brand | Commercial and advertising production | TV spots, cutdowns | Win the film | Keep the current title pattern. |
| `/services/corporate-video-production` | Communications | Corporate video | Company films | Win the film | Keep. |
| `/services/event-video-production` | Event owner | Event video, the record | Conference filming, highlights | Win the post-event film | Description must not promise a live switch. |
| `/services/live-event-production` | Event owner, agency | Live event production as an engagement | Conference production, hybrid audience | Win the accountable show | Do not rank it for “OB van”. |
| `/services/studio-video-production` | Comms, product team | Studio filming | Interviews, green screen | Win the session | Do not rank it for the facility specification. |

Dubai or UAE belongs in descriptions, because that is the base. It should not lead every title. The current unit meta titles all start with a Dubai keyword phrase. On migration, keep one clear geographic mention in the description and let the title name the unit and the class: `{Unit title} | OB Van | MAP`, `{Unit title} | Flypack | MAP`, `Studio 1 | Broadcast Studio | MAP`.

Suggested service titles:

- Hub: `Broadcast Production for the UAE and GCC | MAP`
- Outside broadcast: `Outside Broadcast Production | MAP`
- Live (broadcast): `Live and Multi-Camera Production | MAP`
- Sports: `Sports Broadcasting | MAP`
- Transmission: `Broadcast Transmission and Contribution | MAP`
- Crew: `Broadcast Engineering and Technical Crew | MAP`
- OB vans: `OB Vans | MAP`
- Flypacks: `Flypacks and Portable Broadcast Systems | MAP`
- Studios: `Broadcast Studio | MAP`
- Production live: `Live Event Production | MAP`

H1s stay readable and match the title’s meaning. One H1 per page.

### Evidence each new page needs before it is more than a thin variant

| Page | Enough to launch | Must wait |
| --- | --- | --- |
| Outside broadcast | Confirmed service. Existing page copy can be edited to the new job. | Vehicle dimensions, power draw, uplink. |
| Live production | Confirmed service. Unit records prove multi-camera, mixers, recording. | A claim of REMI or cloud production. The stale Vercel page made that claim. The API does not. |
| Sports | Confirmed service. OB VAN 1 lists sports as a use case and carries replay and 12 chains. | Event names, federations, “host broadcaster”. |
| Transmission | Confirmed service, described as a scoped path. | Which of IP, fibre, satellite, or cellular MAP actually operates. |
| Crew | Confirmed roles. | Names, headcount, photos of staff, in-country residency. |
| Studio fleet | API record, including 600 m² and the room list. | A day rate, or a claim that outside clients can book it on published terms beyond “this is the facility”. The record is already public. Publish the facts it contains. |
| Unit pages | The API payload. | Photographs. Launch without them. |

### Regional

**Confirmed:** MAP can undertake broadcasting projects across the GCC, not only in Dubai. Countries in scope for that statement: United Arab Emirates, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait.

**Not confirmed:** a local office, equipment stationed in-country, a resident crew, a filming permit, or a transmission licence in any country other than the Dubai base. The working-tree address is Dubai. Which street address is current is still unresolved, so service pages do not repeat a street address. The footer already shows one.

**Launch treatment.**

- One operating-area paragraph on the hub.
- The same facts, in one or two sentences, on each broadcasting service page. Same facts, not five rewritten location essays.
- `areaServed` in structured data lists the six countries and the organisation’s Dubai base.
- No `/saudi-arabia`, `/qatar`, `/oman`, `/bahrain`, `/kuwait`, or `/uae` service clones.
- No `/broadcasting/gcc` in this launch. It would compete with the hub for the same regional query. The hub is the regional page.

**Later, without a redesign.** Keep coverage as data (`content/broadcasting/coverage.ts`: country name, and a status of `served-from-dubai`). A country URL is justified only when MAP has a fact that is true of that country and untrue of the others, plus enough original copy to stand as its own page, plus at least one engagement that may be published. Saudi Arabia is the likely first candidate because of market size, not because a template should be filled in now. Until that fact exists, the status stays `served-from-dubai` and no route is generated.

English only. No `/en/` prefix.

### Technical SEO, carried forward

1. Canonical remains the relative pathname resolved with `metadataBase`. Confirm production `NEXT_PUBLIC_SITE_URL`.
2. Permanent redirects in Part C. Do not chain them. The portable-systems URL redirects once, to flypacks, not via an intermediate units URL.
3. Sitemap: drop `/broadcasts`. Emit each new service URL, each fleet index, and each published unit once. Emit the five production URLs once, not also inside a second entity. Remove the empty duplicate.
4. Static generation for every new page and every unit page. Broadcasting and Production must build with the units API unreachable.
5. JSON-LD: `Service` for service pages and for unit pages, with `provider` and `areaServed`, and without `Offer` or `InStock`. `BreadcrumbList` on all of these pages. No review stars.
6. Preview routes stay `noindex, nofollow`.
7. Internal links follow Part C. The homepage and footer gaps are crawl paths as well as navigation bugs.
8. Alt text only when a real image exists.
9. Do not embed the 3D previews on indexable pages. They are client-only and heavy.
10. Heading order: one H1, then the section H2s the hierarchy already lists. Do not skip levels to restyle a label.

---

## Part G — Implementation Roadmap

Estimates are engineering days for one engineer who knows this repository. They include layout and the copy passes described here. They exclude waiting on MAP for transmission technologies, photographs, and named credits. They exclude RFQ work.

**Essential launch:** Phases 1–7, about **22.5 days**.
**Optional:** about **2 days**, only if pulled in.
**Deferred:** RFQ, and backend decommissioning. Not in the launch estimate.

### Phase 1 — Architecture and routes

**Objective.** The new URL map exists, old URLs redirect, and navigation shows services and systems as two groups. Pages may still use short draft copy.

**Tasks.**

1. Add routes for the three new service pages, three fleet indexes, and the nested unit routes.
2. Add the redirect table, including the registry-backed fallback from `/broadcasting/units/[slug]` that ignores the two preview slugs.
3. Replace the broadcast dropdown and the mobile accordion with the grouped menu and the same hrefs.
4. Point footer and homepage broadcasting links at the new tree.
5. Rename the production trigger to “Production”.

**Files.** `app/(home)/broadcasting/**`, `next.config.ts` or a single-purpose matcher for `/broadcasts`, `components/layout/header/broadcast-dropdown.tsx`, `broadcast-accordion.tsx`, `components/layout/footer/**`, `components/website/home/home-page.data.ts`, `media-production-nav.data.ts`.

**Depends on.** Nothing.

**Effort.** 3 days.

**Risks.** The unit fallback route swallowing `studio-preview` and `ob-van-preview`. Those folders must remain static routes and the fallback must exclude them.

**Acceptance.** Every URL in the sitemap section returns 200 or a single 301 to the right destination. Mobile and desktop broadcast menus match. Previews still return 200 and stay noindex.

### Phase 2 — Static unit migration

**Objective.** The six API records are the only source of unit pages, and the public site does not call the units API.

**Tasks.**

1. Re-fetch the published endpoint from the configured API. Diff against the inventory in Part B. The fetch wins.
2. Write the Zod schema and one module per unit. Normalise intercom. Keep studio-specific specs. Leave galleries empty.
3. Write studio meta from the record.
4. Point unit routes, fleet indexes, and the sitemap at the registry. `generateStaticParams`, `dynamicParams = false`.
5. Remove public `broadcastsService` usage. Leave the dashboard and `map-server` in place. Add the one-line dashboard notice.

**Files.** `content/broadcast-units/**`, `app/(home)/broadcasting/ob-vans/**`, `flypacks/**`, `studios/**`, `utils/seo/sitemap/sitemap-utils.ts`, `services/broadcasts.service.ts`, `hooks/api/broadcasts/*` (public hooks only).

**Depends on.** Phase 1 routes. The local API, or an explicit decision to freeze the 25 October payload.

**Effort.** 3 days.

**Risks.** A record edited in the dashboard after the snapshot. Mitigation: fetch on the day of the PR and record the `updatedAt` values in the PR description. Publishing “40kV” or “Wholer” as stored is correct. Changing them is not.

**Acceptance.** With `NEXT_PUBLIC_API_URL` pointed at a closed port, all six unit URLs and three fleet indexes return 200 and show the API line items. Unknown slugs 404. Sitemap lists the new unit paths and not `/broadcasting/units/ob-van-1`. Old unit paths 301.

### Phase 3 — Broadcasting services

**Objective.** The hub and five service pages carry the jobs in Part C and Part E, in a shared service layout that is not the old deployment essay.

**Tasks.**

1. Build `BroadcastHub` and `BroadcastServicePage` from existing type styles, FAQ, breadcrumb, and CTA.
2. Rewrite hub content: services, systems, applications, coverage, one comparison module.
3. Rewrite outside-broadcast content so the fleet band is gone and the OB van index is linked.
4. Write live production, sports, transmission, and crew to the claim boundaries in Part F.
5. Service JSON-LD and titles from Part F.

**Files.** `components/website/broadcasting/**`, `app/(home)/broadcasting/page.tsx`, `outside-broadcast/page.tsx`, new page files, `utils/seo/schema/**`.

**Depends on.** Phase 2, so system counts and unit links are real.

**Effort.** 6 days.

**Risks.** Transmission copy naming a technology MAP has not confirmed. Sports copy naming an event. Review the diff against Part F before merge.

**Acceptance.** Each service page has one H1, a distinct first paragraph, a cross-link to its sibling, and no equipment line list. The hub shows 1 / 4 / 1 from the registry. Transmission does not say satellite, fibre, or IP unless Part H was answered yes for that item.

### Phase 4 — Fleet and unit presentation

**Objective.** Indexes compare real specs. Unit pages read as specification sheets with zero images.

**Tasks.**

1. Fleet index comparison and cards, image-free.
2. Unit layout from Part E, including the schematic, the definition list, grouped quantities, siblings, and CTA with phone and email.
3. Hide the gallery region when empty.
4. Replace `Product` / `InStock` JSON-LD with `Service`.
5. Optional in this phase if time remains: a text link to the matching noindex preview from the OB van and studio pages. If it slips, it goes to optional work, not a blocker.

**Files.** `components/website/broadcasts/unit/**`, `components/website/broadcasts/type/**`, fleet page files, `single-broadcast-schema.ts`.

**Depends on.** Phase 2.

**Effort.** 4 days.

**Risks.** The row card still assumes `gallery[0]`. Remove that assumption rather than guarding it with an empty string.

**Acceptance.** Each unit page shows its API groups and quantities with no image request and no empty image frame. Flight Case 1 does not show a camera-chain number. Studio 1 shows 600 m² and the room list. Narrow and desktop layouts both keep the spec list readable.

### Phase 5 — Production

**Objective.** Production states the engagement-versus-operation split, without new URLs.

**Tasks.**

1. Rewrite the production hub opening and the live card.
2. Reposition `live-event-production.data.ts`: remove the truck-versus-flypack essay, add the operations links.
3. Add one boundary sentence and a link on the event page and on the studio session page.
4. Confirm commercial and corporate pages do not claim an OB van. Edit only if they do.
5. Add `Service` JSON-LD on the production pages if Phase 3’s helper is shared. Otherwise do it in Phase 6.

**Files.** `components/website/services/*.data.ts`, `app/(home)/services/**`.

**Depends on.** Phase 3 URLs, so the links resolve.

**Effort.** 2.5 days.

**Risks.** Rewriting commercial and corporate into a new tone. Do not. Touch the overlapping lines only.

**Acceptance.** The two live URLs both return 200 and do not share a comparison table. Event coverage does not offer a truck. Studio sessions link to `/broadcasting/studios`. No production redirect is added.

### Phase 6 — SEO and internal linking pass

**Objective.** Titles, canonicals, sitemap, schema, and cross-links match Parts C and F after the pages exist.

**Tasks.**

1. Apply the title and description table. One geographic mention, not a repeated Dubai prefix on every unit.
2. Rebuild sitemap generation from the registries and the static route list.
3. Confirm redirects are single-hop.
4. Check breadcrumbs on a service page, a fleet index, and a unit page.
5. Confirm homepage, header, and footer do not still point at `/broadcasts` or `/broadcasting/portable-broadcast-systems`.

**Files.** Page `generateMetadata` functions, `app/sitemap/**`, `utils/seo/**`, layout link data.

**Depends on.** Phases 3–5.

**Effort.** 2 days.

**Acceptance.** Sitemap XML contains the new URLs once, contains no `/broadcasts`, and contains no `/broadcasting/units/{slug}` except nothing — unit URLs are the fleet paths. View-source on a unit shows `Service` and no `InStock`. Canonical host matches the deployment origin.

### Phase 7 — Verification

**Objective.** The launch paths work together.

**Tasks.**

1. `next build` with the units API unreachable.
2. Request every new URL, every redirect, both previews, and the five production URLs.
3. Desktop and a narrow viewport: hub, one service page, flypack index, one unit page, production hub, mobile menu.
4. One H1, breadcrumb, form-free CTA still landing on `/contact`, accordion name and expanded state.
5. Equipment rental still loads when its API is up. A failure there with the API down is expected and out of scope.

**Effort.** 2 days, including fixes found in the pass.

**Acceptance.** The Phase 1–6 acceptance checks pass on a production build. No public broadcasting module imports `broadcastsService`.

### Optional, not required to launch

| Item | Effort | Note |
| --- | --- | --- |
| Link the 3D previews from the OB and studio pages | 0.5 day | Stay noindex. |
| Publish an approved asset-value or tenure sentence | 0.5 day | Only with the exact sentence MAP signs off. |
| Country-page route that stays ungenerated until a country has unique facts | 1 day | The coverage data file is enough for launch. |

### Deferred

**RFQ and contact, a separate project.** Do not build forms, server actions, email providers, CRM, lead storage, booking, uploads, or new analytics events in this work. Preserve `/contact` and the subject query links. A later project can read `subject` and `unit` because those tokens will already be stable.

**Backend decommissioning, a separate task after this release.**

1. Confirm nothing other than the dashboard calls `/broadcast-units` or `/admin/broadcast-units`.
2. Remove the dashboard screens and the web admin client.
3. Remove the Nest broadcast module. Keep migrations as history. Do not drop `broadcast_units` in the same change as the website cutover. Take a dump first.
4. Estimate when it is scheduled: 2 days, plus whoever owns the database.

**Also deferred.** Case studies and client marks. Photographs. Vehicle dimensions and uplink details. Named transmission technologies. Film and documentary or TV-programme URLs. Country URLs. Any change to equipment rental.

### Suggested PR sequence

1. Phase 1 and Phase 2 together if the API fetch is ready. Otherwise Phase 1 first.
2. Phase 4 next, so specification pages exist before service copy links to them. Phase 4 can follow Phase 2 immediately and overlap Phase 3’s writing.
3. Phase 3, then Phase 5.
4. Phase 6 and Phase 7 last.

Rollback of the website PR restores the API client. Do not drop the database as a rollback step. Redirects are permanent; add them only when the destination is the one this plan names.

---

## Part H — Open Questions

Capabilities in Part A are confirmed. The items below are details. Unanswered items use the safer column and do not remove the service page.

| # | Question | If unanswered |
| --- | --- | --- |
| 1 | Are the six API records, as fetched on 25 October 2026, the public fleet? Any unpublished unit that must be included? | Re-fetch at migration. Publish those six. Do not invent a seventh. Admin-only drafts stay unpublished. |
| 2 | Are the public names the API titles (“Outside Broadcast Vehicle (OB VAN 1)”, “Portable Broadcast Unit (Flight Case N)”, “Studio 1”)? | Use the API titles. |
| 3 | Is “APC UPS 40kV” the intended figure, or a stored error for kVA? Is “Wholer” the intended spelling? | Publish the stored strings. |
| 4 | Which contribution paths does MAP operate: IP, fibre, satellite, cellular, something else? Any licence that may be stated? | Transmission page describes the service and does not name a technology. |
| 5 | May any sports event, broadcaster, or government client be named? | No names, no logos. |
| 6 | Is Studio 1 bookable by outside clients on stated terms, or only described as MAP’s facility? | Publish the API facts. Do not add a rate or a booking promise. |
| 7 | Which street address is current, B29 Dubai Production City or BS 18 Dubai Studio City? | Service pages omit the street. Footer stays as it is. |
| 8 | Which tenure line is approved, “25+ years” or “since 2015”? | Do not add either to these sections. |
| 9 | Is the deployment list exactly UAE, Saudi Arabia, Qatar, Oman, Bahrain, and Kuwait? | Use that list, as confirmed for this revision. Remove a country only if MAP says it is wrong. |
| 10 | Are there unit photographs to add later, and who will supply them? | Launch with empty galleries. |
| 11 | Vehicle length, expansion, generator, and power requirement for OB VAN 1? | Omit the fields. |
| 12 | Is production `NEXT_PUBLIC_SITE_URL` the public MAP origin? | Check before launch. Do not treat the local Blend Lab value as production. |
| 13 | Does any client other than this website call the units API? | Required before the deferred decommission, not before launch. |
| 14 | Does MAP want a film, documentary, or commissioned-TV page once a distinct deliverable is defined? | Not in this launch. |

### Do not invent during implementation

- A seventh unit, an SNG truck, or a REMI workflow.
- Camera chains for Flight Case 1.
- 4K on a unit whose record says HD. OB VAN 1 and Flight Case 1 are HD/4K. Flight cases 2, 3, and 4 are HD.
- Offices, permits, or resident crews outside Dubai.
- Prices, availability, or a held date.
- Client logos, tournament names, or “official broadcaster”.
- Photographs of vehicles the project does not have.

---

## Appendix — Files

**Change in this project**

- `map-web/app/(home)/broadcasting/**`
- `map-web/app/(home)/services/**` (copy and links)
- `map-web/components/website/broadcasting/**`
- `map-web/components/website/broadcasts/**`
- `map-web/components/website/services/*.data.ts`
- `map-web/components/layout/header/broadcast-dropdown.tsx`
- `map-web/components/layout/header/broadcast-accordion.tsx`
- `map-web/components/layout/header/media-production-nav.data.ts`
- `map-web/components/layout/footer/**`
- `map-web/components/website/home/home-page.data.ts`
- `map-web/content/broadcast-units/**` (new)
- `map-web/services/broadcasts.service.ts` (public methods)
- `map-web/utils/seo/sitemap/**`
- `map-web/utils/seo/schema/broadcasts/**`
- `map-web/app/sitemap/**`
- `map-web/next.config.ts`

**Read as the migration source, do not hand-edit as a substitute for the API**

- Live `GET /api/v1/broadcast-units/published` on the configured host
- `map-server/src/modules/broadcast/**` for shape only
- `map-server/src/scripts/seeds/units.json` only to explain drift, not to overwrite API fields

**Do not use as copy**

- The stale Vercel `/broadcasting` page (REMI, Studio City, keyword blocks)
- `maproduction.ae` statistics and the photography / social / music-video list
- `components/website/broadcasts/data.ts` stats and benefits
- Postman examples that point at `example.com`

**Do not build in this project**

- Contact form, email delivery, CRM, booking
- Deletion of the Nest broadcast module or the `broadcast_units` table
- Country landing pages
- Equipment rental changes
