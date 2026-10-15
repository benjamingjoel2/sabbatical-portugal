# Porto Season: reference map and build plan

Captured 15 Oct 2026 at 1440px wide and 390px mobile. Pages captured:
flyward.com (home, /about, /private-service, /corporate-service, /contact) and
kultiveret.com (home, /categories/neighborhoods with an experience opened, /info, /privacy-policy),
plus the menus, dropdowns and hover states.
Values below are measured from the rendered pages (computed styles and screenshots).
Nothing is copied from either site: no markup, CSS, JS, images, audio, fonts or wording.

---

## 1. Reference A: Flyward (homepage structure, conversion flow, polish)

**Global system**
- Fonts: a light, high-contrast display serif ("Apris"), always uppercase, weight 400 (500 for small titles), tracking about +0.02em, line-height 0.9.
  Paired with a grotesque text face ("Founders Grotesk Text") at 12–18px.
- Type scale at 1440px:
  - Section display: 80px with 72px line-height (scroll-pinned headlines)
  - h2: 62px / 56px
  - Hero h1 and card titles: 52px / 47px
  - Testimonial name: 32px
  - Step title: 24px / 500 / +1.2px
  - Form card title: 20px / 500
  - Labels: 18px / −0.9px
  - Body: 16px
  - Nav and buttons: 12–14px uppercase / +0.08em
- Colours: dark umber `#3d2d20` (all text and dark panels), ivory `#fbf8f3` (page background), white,
  near-black `#1c2124` (dark map section), border `#e8e4de`.
- Recurring motifs:
  1. Faint 4×2 **grid lines** (1px, about 6% opacity) behind sections, inset 32px.
  2. **Torn-paper edges** where sections overlap (organic SVG mask on the top and bottom of image sections).
  3. **Line-art coastline/contour maps** drawn in thin strokes over ivory sections.
  4. A **6-point star** used as a bullet and divider.
  5. **Wavy hand-drawn path** connecting numbered images.
  6. **Numbered dark circular badges** (24px, umber background, white numerals) on image corners.
- Motion: Lenis smooth scroll and GSAP ScrollTrigger pinning. Sections are pinned and scrubbed, so pages are very long
  (the homepage is about 11,000px of scroll). Headlines fade and scale on scroll, images rise with parallax, stats count up,
  and testimonials use a slider.
- Header (fixed, transparent, about 56px tall, 32px side padding):
  - Left: ABOUT / PRIVATE / CORPORATE / CAREERS at 12px uppercase, gap about 18px.
  - Centre: tracked serif wordmark.
  - Right: outlined pill "CONTACT" (1px border, radius 999px, 12px uppercase).
  - Hover: links fade, and the pill fills.
  - Mobile: wordmark left, a staggered 3-line icon right. It opens a full-screen image menu
    (Menu / Socials / Location columns with live date and time).
- Buttons: white or ivory pill, 14px uppercase, +1.12px tracking, about 44px tall.
  Hover swaps the background to white or umber. The secondary style is outlined.

**Homepage sections, in order**

| # | Section | Layout and behaviour |
|---|---|---|
| A1 | Hero "With you at every horizon" | Ivory background with grid lines. The photo is masked inside a large **map silhouette** (about 80% of viewport height) with a centred 52px uppercase title, a 16px intro and a "DISCOVER" pill. Pinned: on scroll the mask scales up and the image zooms (layered parallax). |
| A2 | "We make complex travel simple" | Same pinned scene. The title slides in at 80px over the expanding mask, and a 3-paragraph intro (14px) sits right of centre. A dark torn edge rises from the bottom. |
| A3 | Map transition "Travel designed around you" | Near-black section. An 80px **outlined/stroke** title and a line-art coastline map in thin white strokes. A torn edge reveals the cards below. |
| A4 | Two service cards | Two images side by side, edge to edge with a 6px gap and a torn top edge, each about 100vh tall. Bottom left has a small outlined "EXPLORE ↗" pill and a 52px title. Bottom right has a 14px description. Hover: image scale 1.05. |
| A5 | "How we support every journey" | Ivory with a coastline line-art background. A centred 62px title. Four numbered images (portrait, about 260×330) in a staggered zig-zag with a numbered badge on the corner. Each has a 24px uppercase title and 14px text. Images parallax at different speeds while pinned. |
| A6 | Stats "Experience you can rely on" | A full-bleed sunset photo with a torn top edge. The title fades out and four stats appear, each with an 11px label, an 80px serif number counting up, and a 6-point star. Partner logos follow in a 5×2 grid labelled "★ PARTNERS". |
| A7 | Testimonials "Trusted by travelers who return" | A pastel gradient sky with a centred 62px title. A slider shows a small square photo, a 32px uppercase name, an 11px tag, a 22px serif quote and circular ← → buttons (outlined; hover fills umber). It sits over a landscape with a torn bottom edge. |
| A8 | Security "Uncompromising security for the modern traveler" | Ivory with grid lines. An 80px title is pinned top left. Two staggered 14px paragraphs sit in grid cells, and a closing 52px statement sits at the bottom right. This includes an on-demand "delete my data" promise. |
| A9 | Contact CTA "Beyond the reach…" and "Shall we begin?" | A photo background with a 62px centred statement. A **3-column form card** rises on scroll: a white form (first and last name side by side, email, phone with country picker, message, all as underlined inputs with 18px labels), plus a narrow dark umber column holding "SHALL WE BEGIN?" (20px), line art, and a white "SEND REQUEST" pill. |
| A10 | Footer | A full-bleed photo with a dark overlay. Three columns: MENU, SOCIALS, LOCATION (city, **live date**, **live ticking time**). Registration lines sit at the right, then a © row with legal links, then a **giant cropped wordmark** spanning the full width. |

**Inner pages**
- **/private-service** (template for Plans, Families and Destination detail pages):
  - Hero: grid lines, a centred 52px title, a 16px intro, and a cut-out image with a torn bottom edge.
  - "How we make your travel seamless": pinned stack where each step swaps. A numbered image on the left. On the right, a 24px title and a 2×2 feature list (bold lead-in, then grey text).
  - "Perfectly suited for": three numbered images along a wavy path, each with a title and description.
  - Then the stats, testimonials, FAQ accordion (chevron, 18px question, 12px answer) and a CTA hero with a "SHALL WE BEGIN?" pill.
- **/about**:
  - Full-bleed photo hero with a torn edge.
  - "We combine…": three numbered images along a wavy line.
  - Leadership photo with a thumbnail strip.
  - Board list: rows with hover fill.
  - "Principles": four corner texts around a central object.
  - "3 worldwide locations" plus a four-stat row with descriptions.
  - Partnerships, FAQ, CTA.
- **/contact**:
  - Photo background.
  - Left: a translucent dark panel with a 52px title, two contact headings, and Contact / Chat channels / Socials columns.
  - Right: the same 3-column form.
  - Below: a "Find us here" pair of map cards.
  - Footer.

## 2. Reference B: Kultiveret (personality, editorial style, inner pages)

**Global system**
- Fonts:
  - Geometric grotesk display ("Epilogue"), weight 600, very tight tracking (−0.07em), line-height 0.7–1.0. Used for the logo and huge headings.
  - Neo-grotesk text face ("Switzer") at 300–500.
- Sizes are viewport-relative (1em ≈ 0.92vw). At 1440px:
  - Hero logo: 96px
  - Statements: 40px / −0.02em
  - Body: 18px
  - Small: 13px
  - Micro: 11.5px uppercase
  - Numerals: 10px superscript
- Colours: warm off-white `#edece2` (background), beige `#e6e3d9` (cards), dark brown `#1d1917` (text and dark boxes),
  blue `#5a8db0` (accent links and the rotating word), light blue `#bfccd2` (menu and founder backgrounds), 70% text for secondary copy.
- Square corners everywhere. Thin 1px rules.
- Motion: Lenis, GSAP SplitText (line and letter reveals), Barba page transitions (fade/slide between pages).
  Images sit blurred and sharpen on hover. The partner names run as a marquee.
- **Sound gate** (first visit): a full-screen off-white overlay with the 96px logo centred, an animated squiggle wave icon,
  a 12px uppercase question ("Would you like to enable the sounds of …?"), and two square buttons (YES filled dark, NO outlined).
  The choice is remembered. A wave icon in the header toggles sound afterwards.
- Header: big logo top left (shrinks to 40px on inner pages). Right: wave sound icon and a dark square **MENU ☰** button.
- **Image-led mega menu**:
  - Full-screen light-blue overlay; the MENU button turns into "MENU ×".
  - A portrait image top left with a cut-out object overlapping it.
  - Right half: 24px headings ("Tours & Experiences", "About", "Booking Info & FAQs"), each with a 13px link list (two columns for categories).
  - Bottom: a contact block (32px email and phone, blue "design your visit →") and WhatsApp / Instagram at the bottom left.
  - Mobile: stacked, with the image centred.

**Homepage sections, in order**

| # | Section | Layout and behaviour |
|---|---|---|
| B1 | Sound gate | See above. |
| B2 | Hero | The 96px logo top left with a 13px intro under it. A **rotating tagline**: "— cultivating relationships / through [category]", where the coloured word cycles with a letter-split slide. Behind it, **numbered category images** are scattered across the viewport (blurred, about 100–220px, each labelled "architecture⁰¹", "design⁰²" …). Hovering one sharpens it and it links to its category. |
| B3 | Intro | A 40px statement paragraph indented on its first line. A large image, two-thirds width. A right column of 13px paragraphs. A full-height image pair. |
| B4 | Meaning of the name | A full-bleed photo with a dark brown box top left: a 24px title ("X — cultivated — 'kultur' (Danish for culture) — …") and an 18px explanation. |
| B5 | Founder | Light-blue section. A 24px quote with a ” mark and a 13px attribution. Left: a **vertical career timeline** (year plus 11px line, with tick marks). Centre: a small landscape photo with a cut-out object overlapping it. Right: a three-paragraph bio. Bottom: a **"Selected partners" marquee** ("NAME (role) — NAME (role) …", 18px uppercase names and 11px roles). |
| B6 | Portrait and testimonial | A full-height founder portrait. A dark box at the bottom right holds a 13px quote between “ ” marks and a group photo. |
| B7 | Contact block | "Get in touch" at 18px. Large 40px email and phone, then **"design your visit →"** underlined in blue. WhatsApp and Instagram on one row. A micro footer row: company and registration, privacy and ©, credits. |

**Inner pages**
- **Category page** (`/categories/[slug]`):
  - A sticky header phrase "through (09) neighborhoods ▾" at 40px / 600. Clicking ▾ opens a blurred overlay listing all categories at 24px / 600, with the current one marked ▸.
  - A 13px intro, then a **row list** of experiences on beige cards: a 40px title on the left; on the right "■ tag" and a duration.
  - Hovering a row shows a **floating thumbnail** that follows the cursor.
  - Clicking expands the row: a large image with a round/oval cut-out second image overlapping it, a long description, **Pricing**, and a "design my visit →" link.
- **/info**:
  - "Pricing and guidelines" at 96px / 600 with tight tracking, then two columns of 18px text at 70% opacity.
  - "Booking Info & FAQs": 40px heading, a **tab row** (13px, active tab marked ■, the rest at 50%), and accordions on beige cards (+ icon, 13px question and answer).
  - "E-Gift Cards": a numbered "How to purchase" list with boxed 01–04 numbers.
  - A **2-step booking form**: a blurred photo background, a dark card with a photo at the top, underlined inputs with 11px uppercase labels, and a light footer bar showing "1/2 · Final step →".
  - The contact block.
- **/privacy-policy**: plain long-form text under the large heading, then the contact block.

## 3. Shared design tokens for Porto Season

Each Porto Season colour replaces a reference colour and is used in the same places.

| Token | Hex | Replaces | Used for |
|---|---|---|---|
| `harbor` (navy) | `#14263B` | Flyward umber `#3d2d20`, Kultiveret brown `#1d1917` | All text, dark panels, form column, badges, MENU button |
| `harbor-deep` | `#0C1826` | Flyward `#1c2124` | Map-transition section, footer overlay |
| `azulejo` | `#2F5E9A` | Kultiveret blue `#5a8db0` | Rotating word, "plan my season →" links, focus rings, tile pattern |
| `azulejo-mist` | `#C6D3DF` | Kultiveret light blue `#bfccd2` | Mega menu and "Meet your specialist" backgrounds |
| `terracotta` | `#C2643A` | (new accent) | Primary hover fills, active tab marker ■, stars, step-number highlights |
| `port` (burgundy) | `#6B1E2C` | (sparing accent) | Quote marks, "placeholder" flags, one CTA hover |
| `limestone` | `#E7E0D2` | Kultiveret beige `#e6e3d9`, Flyward border `#e8e4de` | Cards, accordion rows, rules |
| `shell` (off-white) | `#F8F5EE` | Flyward ivory `#fbf8f3`, Kultiveret `#edece2` | Page background, sound gate |

**Fonts** (Google Fonts via `next/font`, self-hosted at build):
- **Gilda Display** takes the role of the uppercase display serif: hero, section titles, stats, card titles.
- **Hanken Grotesk** (300–600) covers the text, nav, labels and buttons. At weight 600 with −0.06em tracking it also does Kultiveret's tight display role (logo lockup, rotating tagline, "Pricing" style headings).

Two families keep the site coherent. Epilogue is deliberately not used, to stay clearly distinct from Kultiveret.

**Type scale (clamp, mobile → 1440):**
- display-xl 44→80
- display-l 36→62
- display-m 30→52
- title 18→24
- statement 24→40
- body 15→16 (editorial 16→18)
- small 13
- micro 11 uppercase

**Motifs carried over (rebuilt from scratch):**
- Grid lines
- Torn-paper edge: our own SVG paths, styled as a **wave/shoreline edge** to fit the harbour theme
- Line-art coastline: our own SVG of Portugal's coast, Madeira and the Azores
- An 8-point compass star instead of the 6-point star
- Numbered badges
- Wavy path

The azulejo tile pattern appears only as a faint accent in the map section, the form column and the 404 page.

## 4. Porto Season page map: which reference section each part duplicates

### Global
| Porto Season | Duplicates | Content |
|---|---|---|
| Sound gate | B1 | "Porto Season" lockup, wave icon, "Would you like to hear the sounds of Portugal?", Yes/No. Off by default; audio starts only after Yes. The choice is saved in localStorage. The overlay is keyboard-trapped and Esc means No. |
| Header | Flyward header layout combined with Kultiveret controls | Left: Destinations · Plans · Homes · Life in Portugal. Centre: "PORTO SEASON" tracked serif wordmark with a small harbour-wave mark. Right: sound wave toggle, currency switcher (EUR/USD/GBP/CAD/AUD/BRL), "Plan my season" pill, square MENU button. Mobile: wordmark, wave, MENU. |
| Mega menu | Kultiveret image-led menu | Azulejo-mist overlay. The image swaps as you hover headings. Headings: Destinations (12 links, two columns), Life in Portugal (01–09), Plans (4) + Homes, Visas · Families · About · Journal · Info & FAQ · Contact. Bottom: email, phone, "plan my season →", WhatsApp, Instagram. |
| Floating WhatsApp | (new) | A round button at the bottom right linking to `wa.me/[NUMBER]` from config. |
| Footer | A10 | Photo with a harbor-deep overlay. MENU (all 8 nav items), SOCIALS (Instagram, WhatsApp), LOCATION ("Lisbon, Portugal", live Lisbon date and ticking time). Right: [COMPANY NAME], NIPC [NUMBER], RNAVT [RNAVT NUMBER]. Legal: Privacy · Cookies · Terms. A giant cropped "PORTO SEASON" wordmark. "Welcome to your season." above the © row. |
| Contact block (inner pages) | B7 | "Get in touch", email, phone, "plan my season →", WhatsApp · Instagram, office hours (Lisbon time). |
| Page transitions | Kultiveret Barba fades | A Framer Motion fade/slide in `template.tsx`. |

### Homepage
| # | Porto Season section | Duplicates | Content |
|---|---|---|---|
| 1 | Sound gate | B1 | As above |
| 2 | Hero | A1 (mask and pin) plus B2 (rotating tagline) | The image is masked inside a **Portugal mainland silhouette**, with two layers: a harbour at golden hour behind and Lisbon rooftops in front, moving at different parallax speeds. Title: "YOUR HARBOR IN PORTUGAL". Rotating line: "for **living / working / slowing down / belonging** — for a season". Intro: "One to twelve months in Portugal's best towns, coasts and islands. Planned end to end by one specialist." Buttons: "Discover ↓" pill and "Plan my season". |
| 3 | Intro | A2 | The mask expands to full bleed. "WE MAKE A BIG MOVE FEEL SIMPLE." Paragraphs: we don't just find a rental · we handle the whole move, before, during and after · from Lisbon to the Azores. |
| 4 | Map transition | A3 | Harbor-deep section. Outlined title "A SEASON DESIGNED AROUND YOU". A line-art map of the mainland plus Madeira and the Azores (inset boxes, as on real maps of Portugal), with 12 destination pins that draw in on scroll. Faint azulejo pattern. |
| 5 | Service cards | A4 | "SOLO & COUPLES" / "FAMILIES". Each has an "Explore ↗" pill, a description, and links to /plans and /families. |
| 6 | How we make it easy | A5 | Four numbered images in the zig-zag: Your plan · Your visa · Your arrival · Your season (the copy you gave). |
| 7 | Life in Portugal 01–09 | B2 (scattered numbered images) plus the B category header | "living through **[category]**" with the rotating word. Nine images scattered and blurred, labelled "neighborhoods⁰¹ … island life⁰⁹". Hover sharpens; click goes to /life/[slug]. Mobile: a numbered two-column grid. |
| 8 | Destinations | Flyward A5 rhythm plus Kultiveret B category row list | 12 rows on limestone cards: name (40px), one-line vibe, "■ Best for …", "From €X/mo" (converted to the selected currency). A floating thumbnail follows the cursor on hover. "All destinations →". |
| 9 | Stats | A6 (top half) | Guests hosted · Average stay (months) · Repeat guests % · Homes vetted · Destinations (12). Counters with a compass star. Each has a "PLACEHOLDER" flag and a site-wide note. |
| 10 | Our people in Portugal | A6 logo strip motion plus B5 marquee content | A two-row marquee of names and roles ("[HOST NAME] (Lisbon host)" …), moving in opposite directions, labelled "★ OUR PEOPLE IN PORTUGAL". |
| 11 | Testimonials | A7 | Six placeholder testimonials, each clearly labelled "Placeholder testimonial". |
| 12 | Your documents, handled with care | A8 | Covers passport scans, income documents and visa paperwork: encrypted storage, shared only with our partner lawyers, access-logged, and **deleted on request within [X] days**. |
| 13 | Shall we begin? | A9 | "THE BEST SEASONS START WITH A CONVERSATION". The 3-column form (first name, last name, email, phone, message). The dark column has "SHALL WE BEGIN?", "Send", and a link: "Prefer the full season planner →". |
| 14 | Footer | A10 | As above |

### Inner pages
| Route | Duplicates | Structure |
|---|---|---|
| `/about` | Kultiveret B3–B7 | Statement intro (B3) → "Porto = harbour" meaning box over a harbour photo (B4) → **Meet your specialist** on azulejo-mist with a quote, career timeline, photo with cut-out and bio (B5) → "Our people in Portugal" as a **grid** of eight placeholder cards (photo, name, role, town) plus the marquee → portrait and testimonial box (B6) → contact block with office hours, WhatsApp and Instagram (B7) |
| `/life` and `/life/[category]` | Kultiveret category page | "living through (01) neighborhoods ▾" sticky header with a blurred dropdown → intro → experience rows (floating hover thumbnail, click-to-expand with image, cut-out image, description, "Included in: plans", "From €X", "plan my season →") |
| `/destinations` | B category rows plus A1 hero | Hero with the map → 12 destination rows grouped by region (Mainland city, Coast, Countryside, Islands) |
| `/destinations/[slug]` | Flyward /private-service | Hero (title, vibe, image with wave edge) → overview + who it's for → neighbourhoods (numbered images along the wavy path) → cost-of-living snapshot (stat row: rent, coworking, coffee, dinner; all editable, in the chosen currency) → climate by month (12-column bar strip, temperature + sea + rain) → internet and community → homes there (cards) → FAQ → CTA |
| `/plans` | A4 cards ×4 | Four large image cards: Taster · Season · Full year · Family season, each "From €X / month" |
| `/plans/[slug]` | Flyward /private-service | Hero → what's included (pinned numbered stack, 2×2 feature lists) → sample month (week 1–4 along the wavy path) → price box → FAQ accordion → CTA. The Season plan shows the 90/180 note; Full year shows D8/D7 with the visa disclaimer. |
| `/homes` | Kultiveret rows plus filters | Filter by type (city apartment, beach house, quinta, island home) and destination → cards |
| `/homes/[slug]` | Flyward /private-service, light | Gallery (one big image plus two side images, with a cut-out) → facts (bedrooms, workspace, Mbps, walk score) → description → "Request this home" CTA |
| `/visas` | Kultiveret /info layout | "Visas, honestly." at 96px → disclaimer bar ("Guidance only, not legal advice. Verified as of [date]") → cards: Schengen 90/180 · D8 (€3,680/month) · D7 (figure to verify) · EES (in operation) · ETIAS (coming soon / required, driven by config) → partner lawyers ([PARTNER NAME]) → official sources (AIMA, the Portuguese consular network, the EU travel portal) → FAQ tab "Visas & admin" |
| `/families` | Flyward /private-service ("Perfectly suited for") | Hero → schools guidance → family-friendly towns (numbered along the wavy path) → Family season plan → FAQ |
| `/info` | Kultiveret /info | "Pricing and guidelines" (96px) with two text columns and a plan price table → "Booking info & FAQs" with **6 tabs** (Your stay · Payment & booking · Cancellations & changes · Visas & admin · Families & accessibility · Miscellaneous) and `?tab=` deep links → "How booking works 01–04" (boxed numbers, from the gift-card block) → contact block |
| `/contact` | Flyward /contact | Photo background → dark translucent panel ("LET'S PLAN YOUR SEASON", office hours, WhatsApp, email, phone, socials) plus the 3-column form → "Find us here: Lisbon" card → footer |
| `/plan-my-season` (also a modal) | Kultiveret 2-step dark form card, with Flyward form styling | A blurred photo background and a dark navy card. Footer bar: "1/5 · Next step →" with a progress bar. The five steps are as in your spec, with image-card selection in step 2. Validates per step (zod), saves to localStorage, and posts to `/api/season-request` (logs the payload; `TODO` for email/CRM). The confirmation shows a likely visa path ("guidance only") and ends with "Welcome to your season." |
| `/journal` and `/journal/[slug]` | Kultiveret rows plus editorial article | A list of four MDX posts. The article page uses a 96px title, a 40px standfirst and an 18px body column |
| `/privacy` and `/terms` | Kultiveret privacy | Long-form placeholder text |

## 5. Folder structure

```
app/
  layout.tsx            fonts, Header, MegaMenu, SoundProvider, CurrencyProvider, Footer, WhatsAppFab, Lenis
  template.tsx          page transition
  page.tsx              homepage
  about/ contact/ visas/ families/ info/ journal/[slug]/ plan-my-season/
  destinations/[slug]/  plans/[slug]/  homes/[slug]/  life/[category]/
  @modal/(.)plan-my-season/   intercepting route → planner as a modal
  api/season-request/route.ts  api/contact/route.ts
  sitemap.ts robots.ts not-found.tsx opengraph-image.tsx
components/
  layout/   Header, MegaMenu, Footer, LiveClock, CurrencySwitcher, WhatsAppFab, ContactBlock, SmoothScroll
  sound/    SoundGate, SoundToggle, SoundProvider (WebAudio crossfade, off by default)
  motion/   RotatingWord, Reveal, SplitLines, Counter, Parallax, Marquee, PinnedSection, TornEdge, GridLines
  home/     MaskHero, IntroSimple, MapTransition, ServiceCards, StepsZigzag, CategoryScatter,
            DestinationRows, StatsCounters, PeopleMarquee, TestimonialSlider, DocumentsTrust, BeginForm
  shared/   Button(Pill/Square), Price, PlaceholderFlag, Accordion, Tabs, NumberBadge, WavyPath,
            ExperienceRow, FeatureStack, CostSnapshot, ClimateStrip, VisaDisclaimer, HomeCard, PersonCard
  planner/  SeasonPlanner, StepWhen, StepWhere, StepLife, StepWho, StepContact, Confirmation, visaPath.ts
  svg/      PortugalMask, PortugalLineMap, CompassStar, WaveMark, ShoreEdge, AzulejoPattern
config/     site.ts (brand, contact, hours, socials, registration), nav.ts, currency.ts (rates + symbols),
            visa.ts (figures, valid-as-of dates, sources, etiasStatus toggle), theme.ts
data/       types.ts, destinations.ts, plans.ts, homes.ts, categories.ts (with experiences), people.ts,
            testimonials.ts, faqs.ts, stats.ts
content/journal/*.mdx   4 starter posts
lib/        currency.ts, lisbonTime.ts, seo.ts, storage.ts
public/audio/PLACEHOLDER-README.md and placeholder ambience files (silence; see below)
public/images/          local fallbacks
```

## 6. Data types (summary)

```ts
type Money = number; // base EUR, converted at render time
interface Destination { slug; name; region: 'city'|'coast'|'countryside'|'islands'; vibe; bestFor: string[];
  monthlyBudgetFrom: Money; overview; whoFor; neighborhoods: {name; blurb; image}[];
  costs: { rent1Bed: Money; coworking: Money; coffee: Money; dinner: Money }; // placeholders
  climate: { month; highC; lowC; seaC?; rainDays }[]; internet: { typicalMbps; note };
  community; image; heroImage; mapPos: {x;y}; note?: string /* e.g. Évora 2027 */ }
interface Plan { slug; name; duration; summary; fromPerMonth: Money; included: IncludedItem[];
  sampleMonth: {week; title; text}[]; faqIds: string[]; visaNote?: 'schengen90'|'d8d7'|'family' }
interface Home { slug; name /* placeholder */; type: 'city-apartment'|'beach-house'|'quinta'|'island-home';
  destination; bedrooms; workspace; mbps; perMonth: Money; features: string[]; images: string[] }
interface Category { slug; number: '01'..'09'; name; intro; image; experiences: Experience[] }
interface Experience { slug; title; tag; duration; description; fromPrice?: Money; image; cutoutImage }
interface Person { name /* placeholder */; role; town; bio; image; placeholder: true }
interface Testimonial { name; from; stay; quote; image; placeholder: true }
interface Faq { id; tab: FaqTab; q; a }   // 6 tabs
interface Stat { label; value; suffix?; placeholder: true }
```

## 7. Audio

I'll create the ambient files with an offline synth script (ffmpeg noise plus filters, no samples), so no licence is needed:
waves (filtered brown noise), a soft gull-like chirp, tram bells (sine partials) and a café murmur (band-passed noise).
Each file is named `*-PLACEHOLDER.mp3`, with a README explaining how to swap in licensed recordings.
Audio stays off until the visitor says Yes. Volume fades in. The toggle has `aria-pressed`, and the gate is fully keyboard-operable.

## 8. Build phases (each runs on the dev server and is screenshotted next to its reference before moving on)

1. Tokens, fonts, header, mega menu, footer with live Lisbon clock, sound gate and toggle, currency provider, WhatsApp button
2. Homepage sections 2–13, compared with Flyward (and Kultiveret for sections 1 and 7)
3. Season planner (page and modal), homepage form, `/contact`, API routes
4. About, life categories, destinations, plans, homes, visas, families, info/FAQ tabs, journal, each compared with its reference page
5. Polish: reduced motion (pinning and parallax off, counters show final values), focus states, alt text, metadata/OG/sitemap, Lighthouse
6. Deploy to Vercel

## 9. Assumptions and open items
- Images: Unsplash photos of real Portuguese places, hot-linked through `next/image` (`images.unsplash.com` allowed in config).
- Currency rates are static placeholders in `config/currency.ts`, dated, to be replaced by a live feed later.
- Placeholders stay bracketed: `[NUMBER]`, `[COMPANY NAME]`, `[RNAVT NUMBER]`, `[PARTNER NAME]`, `[EMAIL]`.
- **Vercel:** deploying needs either a Vercel token added to this environment, or you importing the GitHub repo into Vercel (about 1 minute, auto-deploys on every push). I'll set the project up so either works.
