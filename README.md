# Elham Online Education — الهام آموزش آنلاین

A **bilingual (English / Dari)** website for a non-profit Afghan online educational institution,
built with **Next.js (App Router, JavaScript)**, **Tailwind CSS** and **MongoDB / Mongoose**.

It reproduces all eight pages of the Elegant Themes "Online Learning" layout pack — landing, home,
courses, single course, about, enrollment, blog and contact — rebuilt from scratch with original
artwork and original copy.

## This is a showcase, not a shop

Elham provides **free** education for Afghan girls and women, with a **50% scholarship** where an
external examination fee is unavoidable. Nothing is sold here:

- no prices, no currency, no plans with a monthly fee,
- no cart, no checkout, no payment processing,
- the only forms are a course **registration** request, a contact message, and a newsletter signup.

`Course` has an `access` label ('Free') instead of a price field, and `Plan` records are **access
routes** (`cost: 'Free'` / `'50% Scholarship'`) rather than products. The old `/pricing` URL
permanently redirects to `/enrollment`.

---

## Quick start

```bash
npm install
```

Create `.env.local` (copy `.env.example`) and set your connection string:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/elham-academy?retryWrites=true&w=majority
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Seed the database, then run the dev server:

```bash
npm run seed
```

```bash
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build (prerenders every course and blog post) |
| `npm start` | Serve the production build |
| `npm run seed` | Write `lib/seed-data.js` into MongoDB (safe to re-run) |

---

## The database

Mongoose models live in `models/`:

| Model | Collection | Holds |
| --- | --- | --- |
| `Course` | `courses` | 12 courses with curriculum modules, lessons, outcomes, requirements |
| `Category` | `categories` | 8 subject categories |
| `Instructor` | `instructors` | 12 instructor profiles |
| `Post` | `posts` | 6 blog articles |
| `Plan` | `plans` | 3 access routes (no prices — `cost` is a label) |
| `Testimonial` | `testimonials` | 5 student testimonials |
| `Faq` | `faqs` | 6 questions and answers |
| `Enrollment` | `enrollments` | Course enrolments submitted from a course page |
| `Message` | `messages` | Contact form submissions |
| `Subscriber` | `subscribers` | Newsletter signups (unique on email) |

`lib/mongodb.js` caches the connection on the global object so development reloads do not open a new
pool on every request.

### Content and the fallback

`lib/seed-data.js` is the single source of truth for all site content. It is used twice:

1. `npm run seed` writes it into MongoDB.
2. `lib/data.js` serves it directly when MongoDB is unreachable or a collection is empty.

That means **the site renders fully before you have ever run the seed**, and stays up during a
database outage. A short circuit breaker (20s) means a down database costs one timeout, not one per
query. Watch the terminal for:

```
[data] MongoDB unavailable, serving bundled content for the next 20s: ...
```

If you see that line, the pages you are looking at are coming from the bundled content, not Mongo.

To edit content, change `lib/seed-data.js` and re-run `npm run seed`.

---

## Bilingual: English and Dari

Every page is served under a locale prefix — `/en/...` and `/fa/...` (`fa` = Dari, دری). Dari pages
render right-to-left with Persian numerals and Solar-calendar dates.

| File | Holds |
| --- | --- |
| `lib/i18n.js` | Locale list, direction, path helpers, Accept-Language matching |
| `lib/dictionaries/en.js` | Interface strings and page copy (source language) |
| `lib/dictionaries/fa.js` | The Dari equivalents |
| `lib/translations/fa-general.js` | Dari for categories, teachers, plans, FAQs, values, milestones… |
| `lib/translations/fa-courses.js` | Dari for all 12 courses, including every module and lesson title |
| `lib/translations/fa-posts.js` | Dari for all 6 blog posts |
| `lib/localize.js` | Merges a Dari overlay onto an English record |
| `middleware.js` | Sends locale-less URLs to the right language |

**Translations are overlays, not copies.** English is the source of truth; the Dari files only carry
the fields that differ. Anything untranslated falls back to English rather than rendering blank, so
adding a course in English never breaks the Dari site. Three fields are deliberately never
translated — `category`, `level` and `language` are machine values that filtering depends on, and
their Dari display text comes from the dictionary or from a separate `categoryName` /
`languageLabel`. A course's `instructor` name is translated from the instructor overlay rather than
repeated per course.

Because overlays are applied when data is read, **the Dari site works without re-seeding** — Mongo
stores the English records only.

Language choice is remembered in a `NEXT_LOCALE` cookie, so a later visit to a bare URL lands in the
same language. `Accept-Language: fa` is honoured for first-time visitors.

Adding a third language means: add it to `locales` in `lib/i18n.js`, add a dictionary, and add a
translation bundle in `lib/translations/index.js`. Nothing else changes.

---

## Pages

Each route exists in both languages, e.g. `/en/courses` and `/fa/courses`.

| Route | Reference layout |
| --- | --- |
| `/[lang]` | Online Learning **Home** page |
| `/[lang]/landing` | Online Learning **Landing** page (how to join, teacher CTA) |
| `/[lang]/courses` | **Courses** page — category tiles, search, level/language filters, sorting |
| `/[lang]/courses/[slug]` | Single **Course** page — curriculum accordion, teacher bio, registration box |
| `/[lang]/about` | **About** page — the institution's own Dari text with English beside it, mission, vision, values, timeline, teachers |
| `/[lang]/enrollment` | **Enrollment** page (the pricing layout, reframed) — access routes, steps, comparison, FAQ |
| `/[lang]/blog` | **Blog** page — featured post, grid, sidebar |
| `/[lang]/blog/[slug]` | Single blog post |
| `/[lang]/contact` | **Contact** page — form, channels, office details, map panel, FAQ |
| `/[lang]/not-found` | Custom 404, in the language you were browsing |

`/pricing` → `/enrollment` is a permanent redirect. `sitemap.xml` lists every page in both locales
with `hreflang` alternates; `robots.txt` is generated too.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/courses?category=&limit=&featured=&popular=` | List courses |
| `GET` | `/api/courses/[slug]` | One course |
| `GET` | `/api/posts?limit=` | List blog posts |
| `POST` | `/api/enroll` | Register for a course (`courseSlug`, `name`, `email`, …) |
| `POST` | `/api/contact` | Save a contact message |
| `POST` | `/api/subscribe` | Add a newsletter subscriber |

The `GET` routes accept `?lang=` (unset means English). All three `POST` routes take a `lang` field
and reply in that language, so a Dari visitor gets a Dari confirmation or error.

The three `POST` routes validate input and **require a live database** — they return `503` with a
readable message rather than pretending to succeed, since silently losing a learner's enrolment would
be worse than an error.

---

## Design notes

- **No external assets.** All illustrations, icons and course artwork are hand-written SVG in
  `components/Illustrations.js`, `components/Icon.js` and `CourseThumb`. No image or font CDN request
  is made at runtime beyond the two self-hosted Google fonts Next.js inlines at build time. This was
  deliberate: a learner on a 3G connection in a province should not wait on a CDN.
- **The crest and the palette.** The logo is the institution's crest, drawn as SVG in
  `components/Crest.js` — `CrestMark` (compact shield) in the header, footer and browser tab, and
  `CrestFull` (laurel, motto banner, founding year) on the About page. The whole site takes its
  colours from that crest:

  | Token | Value | Used for |
  | --- | --- | --- |
  | `brand-700` | `#14284b` | Crest navy — primary buttons, dark panels, theme colour |
  | `brand-600` | `#2a4d7d` | Mid navy — links, active states, eyebrows |
  | `gold-500` | `#c9a34a` | Crest gold — accents, CTA buttons on navy, focus rings |
  | `gold-400` | `#e2c476` | Light gold — highlights and illustration fills |
  | `cream-100` | `#f8f6f0` | Crest cream — warm neutral surfaces |
  | `teal-500` | `#178d80` | Semantic only: free, complete, confirmed |
  | `clay-500` | `#c2543f` | Semantic only: form errors |

  `app/icon.svg` repeats the `CrestMark` artwork by hand, because a static icon file cannot import a
  component — **if you change one, change the other.**

- **Type.** Outfit for headings, Plus Jakarta Sans for body, Vazirmatn for Dari — all via `next/font`.
- **Accessibility.** Skip link, visible focus rings, labelled form fields, `aria-expanded` on every
  accordion and the mobile menu, semantic table headers on the comparison table, `dir="ltr"` on email
  and phone fields inside RTL pages, and a `prefers-reduced-motion` block that disables the count-up
  and float animations. The header crest is `aria-hidden` because the link around it already carries
  the accessible name.

## Project layout

```
app/
  [lang]/                 every page, per locale
    page.js               home
    landing/  courses/  about/  enrollment/  blog/  contact/
    layout.js             root layout: fonts, direction, Navbar, Footer
    not-found.js          404 in the browsing language
  api/                    courses, posts, enroll, contact, subscribe
  globals.css  icon.svg  sitemap.js  robots.js
components/               Navbar, Footer, Crest, CourseCard, Curriculum, EnrollBox, forms, SVG art …
lib/
  seed-data.js            all site content in English (source of truth)
  translations/           Dari overlays for courses, posts and general content
  dictionaries/           interface strings per language
  i18n.js  localize.js    locale helpers and overlay merging
  data.js                 data access with fallback + circuit breaker
  mongodb.js              cached connection
  ui.js  validate.js      formatting and input helpers
middleware.js             locale-less URLs -> the right language
models/                   Mongoose schemas
scripts/seed.js           npm run seed
```

---

## Troubleshooting

**`querySrv ETIMEOUT _mongodb._tcp.<cluster>.mongodb.net`**
Node cannot make the SRV DNS lookup that `mongodb+srv://` requires (common behind restrictive DNS or
a corporate network). Use the non-SRV form instead — resolve the shard hosts once with
`nslookup -type=SRV _mongodb._tcp.<cluster>.mongodb.net`, then:

```
MONGODB_URI=mongodb://<user>:<pass>@<shard-00-00>:27017,<shard-00-01>:27017,<shard-00-02>:27017/elham-academy?ssl=true&authSource=admin&retryWrites=true&w=majority
```

**`Could not connect to any servers in your MongoDB Atlas cluster`**
Your IP is not on the Atlas allowlist. In Atlas go to **Network Access → Add IP Address**, and add
your current IP (or `0.0.0.0/0` while developing). This is the most common cause, and Atlas gives no
more specific error because it drops the connection before the handshake completes.

**Pages load but show no database changes**
Check the terminal for the `[data] MongoDB unavailable` line, and confirm `npm run seed` completed.
