# Handoff: Al-Qarawiyyīn Academy — Islamic Online Course Platform

## Overview

A premium online madrasa platform for **Sheikh Abdulhakim**, selling video-based courses in the classical Islamic sciences (Qur'an / Tajwīd, Arabic, Fiqh, ʿAqīdah, Seerah, Hadith). The platform serves three audiences:

1. **Public visitors** — learn about the academy, browse courses, watch sample lectures, enroll
2. **Enrolled students** — watch their courses, track progress, take notes, earn certificates (ijazah)
3. **The Sheikh (instructor/admin)** — manage courses, see revenue, manage students, run coupons

The aesthetic is **reverent and scholarly** (Al-Azhar / Qarawiyyin university feel), trilingual (English / Arabic / Somali), with subtle Islamic geometric motifs (mihrab arches, 8-point stars, arabesque tile patterns) and an editorial publishing-house typography system.

---

## About the Design Files

The files in this bundle are **design references created in HTML** — clickable prototypes showing the intended look, copy, and interactions. They are **not production code**.

Your task is to **recreate these designs in a real codebase** using whichever framework is most appropriate. The PRD this design was built against describes a Next.js + Postgres + Stripe + Mux stack, which is a sensible choice:

- **Next.js 15 (App Router) + React 19 + TypeScript**
- **Tailwind CSS** for utility styling, or migrate the existing CSS variables/classes from `styles.css`
- **Postgres + Prisma** for the data layer
- **NextAuth.js** for authentication (email/password + Google OAuth)
- **Stripe Checkout** for one-time course purchases and the optional MRR subscription product
- **Mux** (or Bunny.net Stream) for video hosting with signed playback URLs
- **Resend / Postmark** for transactional email

But the design is framework-agnostic. Recreate it in whatever stack you have.

## Fidelity

**High-fidelity.** Every color, font, spacing value, hover state, and copy line is intentional. Recreate this pixel-perfectly. The design tokens are in `styles.css`'s `:root` block — lift them directly into your CSS-vars / Tailwind config.

The exception is **video** and **payment processing**: the player is a mock (real implementation needs Mux/HLS.js), and the checkout posts nothing (real implementation needs Stripe Elements or Stripe Checkout).

---

## How to Read the Prototype

Open `index.html` in a browser. The prototype is a single SPA with hash-based routing. Use the **bottom-left "Jump to screen"** floating button to navigate between all 11 screens. Use the **Tweaks** toolbar button (top right of the toolbar in the host environment, if available) to change hero variants, color palettes, and density.

The screens map onto these routes:
- `#landing` — public landing page (Editorial hero is the chosen default)
- `#catalog` — course catalogue with filters & search
- `#course/<slug>` — course detail / sales page
- `#login`, `#signup` — auth
- `#checkout`, `#checkout-success` — Stripe-style checkout flow
- `#dashboard` — student dashboard (tabs: My courses, Continue, Certificates, Receipts, Account)
- `#lesson/<slug>/<lessonIndex>` — video lesson player
- `#admin` — instructor dashboard (tabs: Overview, Courses, Students, Revenue, Coupons)

---

## Brand System

### Identity
- **Name**: Al-Qarawiyyīn Academy (after the historic university in Fez, founded 859 CE — the oldest continuously operating university in the world)
- **Arabic name**: القرويين
- **Tagline**: "A quiet madrasa, for the seeking."
- **Mark**: A mihrab archway with an 8-point star centered inside, foiled in gold, set on a deep forest-green ground. See `ornaments/favicon.svg` and the `<Mark>` component in `motifs.jsx`.

### Color Tokens

| Token | Hex | Purpose |
|---|---|---|
| `--forest` | `#1F3D2E` | **Primary accent.** The dominant brand color — buttons, links, dark headers, the auth mark pane. |
| `--forest-2` | `#163024` | Forest on press / footer background. |
| `--forest-3` | `#2C5240` | Forest lifted (success states, success ticks). |
| `--forest-soft` | `oklch(0.92 0.04 150)` | Forest tinted background (success badge bg). |
| `--gold` | `#C9A84C` | Manuscript-illumination gold. Borders inside dark panels, hairlines, divider stars. |
| `--gold-2` | `#DCB65E` | Brighter foil — used for text/icons on dark forest backgrounds. |
| `--gold-3` | `#A8893B` | Gold ink — for small text on light backgrounds. |
| `--clay` | `#BA7D51` | Terracotta accent. Alternate palette option. |
| `--clay-2` | `#A3683E` | Clay on press. |
| `--slate` | `#5D768D` | Slate blue accent. Alternate palette option. |
| `--umber` | `#5C4234` | Deep brown. Body ink on light surfaces and alternate palette accent. |
| `--paper` | `#FAF5E9` | **Primary background** — warm ivory parchment. |
| `--paper-2` | `#F2EAD3` | Sidebar / card surface. |
| `--paper-3` | `#E8DCBF` | Hover surface / sunken background. |
| `--vellum` | `#F5EDD8` | Warm cream — used as foreground on dark backgrounds. |
| `--ink` | `#2B1F16` | Primary text. Near-black with a warm undertone. |
| `--ink-2` | `#4E3C2D` | Secondary text. |
| `--ink-3` | `#7A6754` | Tertiary text / metadata. |
| `--ink-4` | `#A8957F` | Placeholder / disabled text. |
| `--rule` | `#D8C8A8` | Default border. |
| `--rule-strong` | `#B8A47F` | Strong border. |
| `--rule-soft` | `#E6D9BC` | Soft hairline. |

**Theme variants** (applied via `[data-theme="..."]` on `<html>`):
- `forest` (default), `terracotta`, `slate`, `umber` — each remaps `--accent` and friends.

### Background texture
The body has a subtle paper-grain SVG noise + two warm radial gradients (top-left, bottom-right). See `body { background-image: ... }` in `styles.css`. This is the defining tactile gesture — do not omit it.

### Typography

Four families, loaded from Google Fonts:

| Variable | Family | Use |
|---|---|---|
| `--font-display` | **Cormorant Garamond** (400, 500, 600, italic) | All headings. Italic variants are signature. |
| `--font-body` | **Source Serif 4** (300–700, italic) | Body text, UI labels, navigation. |
| `--font-arabic` | **Amiri** (400, 700, italic) | All Arabic text. Direction: rtl. |
| `--font-mono` | **JetBrains Mono** (400, 500) | Timestamps, references, transaction IDs, durations. |
| `--font-sc` | Source Serif 4 + `font-variant: small-caps` | Eyebrow labels, table headers, navigation sections. |

Type scale (`--text-*`): 12 / 13 / 15 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 84 px.

Display headings should mix roman and italic:
```html
<h1>Knowledge is <em>light</em>, and light cannot be hoarded.</h1>
```
The `<em>` renders in italic + accent color. This is consistent across all H1/H2s.

Tracking:
- `--tracking-tight: -0.015em` for display
- `--tracking-sc: 0.18em` for small-caps eyebrows

### Spacing scale
8px base. Tokens `--space-1` through `--space-12` (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 96 / 128). Use `gap: var(--space-X)` on flex/grid layouts — do not rely on per-element margins.

### Radii
Very restrained: `--radius-xs: 2px`, `--radius-sm: 3px`, `--radius-md: 4px`, `--radius-lg: 6px`, `--radius-xl: 10px`. This is a publishing aesthetic, not Silicon Valley SaaS.

### Shadows
Warm shadows tinted brown: `rgba(60, 38, 18, 0.10–0.26)`. Five tiers (sm, md, lg, xl, vignette).

### Motion
- `--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)` — for everything
- `--duration-fast: 150ms` (hover state changes)
- `--duration-base: 220ms` (button presses, modal opens)
- `--duration-slow: 320ms` (panel transitions)
- `--duration-entrance: 480ms` (page enters, card reveals)

---

## Screen Inventory

### 1. Landing Page (`#landing`)

**Purpose**: Convert visitors into enrolled students. Establish authority and aesthetic immediately.

**Layout** (top to bottom):

1. **Top navigation** (sticky, blurred): Mark + "Al-Qarawiyyīn · القرويين" wordmark on the left, links (Home / Courses / About / Contact), and `[Sign in] [Enroll]` buttons on the right.

2. **Editorial Hero** (DEFAULT VARIANT — user chose this) — see "Hero Variants" below for full spec. Forest green background, two columns: copy left, featured-lecture stack right.

3. **Bismillah belt** — a single centered strip with the bismillah in Amiri Arabic + italic English translation. 32px padding, soft bottom border.

4. **"Why study here" values grid** — 4 columns × 1 row, each cell with a line icon (Book, Lamp, Globe, Ribbon), display heading, and 2-line description. Cells separated by hairline `--border-soft` verticals.

5. **Ornamental divider** — `hr.ornament` with the gold 8-point star divider SVG centered.

6. **Featured courses section** — heading "Eight courses, slowly *illuminated*" + lede + 4-column course poster grid. Each poster is a CoursePoster component (see below). "View the whole catalogue →" button below.

7. **Instructor profile** — full-bleed `paper-2` section, 2-column grid: left is a forest-green portrait plate (placeholder avatar with Arabic ع character, in a circle of gold, on a tile-patterned forest panel), right is a pull quote + dropcap-leading bio + stats row (students / courses / years of experience).

8. **Second ornamental divider**.

9. **Testimonials** — heading "Students, *from many places*" + 3-column card grid. Each card has a large oxidized-gold quote mark, italic display-serif body, name + title + circular avatar.

10. **Closing CTA** — full-bleed forest green, centered, with bismillah-style Arabic quote (Sūrat az-Zumar 39:9), italic translation, display heading "Begin where you are.", and two large buttons (Browse / Create account).

11. **Footer** — 4 columns on forest-2 background: brand block + 3 link columns (Study / The Academy / Connect). Bottom strip with copyright + domain.

#### Hero Variants

Three variants for the hero — all share the bismillah, headline, lede, CTA buttons, and stats row, but differ in layout. The Tweaks panel lets the user switch between them. **The Editorial variant is the default and the user's chosen final.**

##### A. Editorial Hero (DEFAULT — chosen by user)

Two-column grid on a deep forest-green ground.

- **Left column** (1fr):
  - Bismillah in Amiri (28px, `--gold-3` color, RTL, line-height 1.5)
  - Small-caps eyebrow: "Spring term · 1446 AH / 2026 CE" in `--gold-2`
  - H1: "Knowledge is *light*, and light cannot be hoarded." — Cormorant Garamond 500, 72px, line-height 1.05, `--paper` color, `<em>` in italic + `--gold-2`
  - Lede: 19px italic, `rgba(245,237,216,0.78)`, max-width 540
  - CTA row: `[Browse the library]` (`btn--gold` xl) + `[Watch a sample lecture]` (`btn--ghost` xl with gold border)
  - Stats row: 3 stats divided by hairlines, each is `--gold-2` numeral (38px Cormorant) over small-caps label

- **Right column** (1fr):
  - Eyebrow with pulsing dot: "Most-watched this month"
  - Stacked Course Poster motif: 3 posters layered, slight rotation (-2.4° / +1.6° / 0°), back two are translated + blurred + dimmed. Front poster is clickable; on hover translates up 6px.
  - Below the stack: a glassy "now-playing" strip — `rgba(245,237,216,0.08)` background with `rgba(220,182,94,0.28)` border and `backdrop-filter: blur(6px)`. Gold play-circle icon, italic display-serif lesson title, lesson source meta, mono timestamp on the right.

- **Background ornament**: full-bleed faint tile pattern (`ornaments/tile.svg` at 160px size, 6% opacity) + warm radial gradient from top-left (`rgba(220, 182, 94, 0.18) → transparent`).

This is the variant to ship.

##### B. Archway Hero (alternate)
Two-column. Left is the same copy block on a paper background; right is a tall mihrab arch SVG plate (forest green panel with gold mihrab outline and 8-point star center, the word "العلم نور" in Amiri inside). Reference: `HeroArchway` component in `screens-public.jsx`.

##### C. Wall Hero (alternate, was called "Bookshelf")
Centered copy + a 4×2 grid of all 8 Course Posters arranged on the page with slight alternating rotations. Posters tilt to neutral on hover. Reference: `HeroBookshelf` component.

---

### 2. Course Catalogue (`#catalog`)

**Purpose**: Browse and filter all courses.

**Layout**:
1. **Page header** — `paper-2` background, small-caps "The Library" eyebrow, H1 "All *courses*.", italic lede.
2. **Sticky toolbar** (sticky below topnav, blurred bg, hairline divider) — category chips on the left (All / Qur'an / Arabic / Fiqh / Aqeedah / Seerah / Hadith — each with count), search field on the right (icon + italic placeholder "Search the library…").
3. **Grid** — `repeat(auto-fill, minmax(260px, 1fr))`, gap 48px vertical / 24px horizontal. Each cell is a CoursePoster + meta.
4. **Footer**.

**Filter logic**: chips set a single active category. Search filters by title / blurb / arabic title (case-insensitive substring).

---

### 3. Course Detail (`#course/<slug>`)

**Purpose**: Sell a single course. Show what's inside, by whom, for how much.

**Layout**:
1. **Hero / Detail block** — full-bleed forest-green section with tile-pattern overlay. Two columns:
   - Left: small-caps category + level eyebrow, H1 course title with italic `<em>` accent in `--gold-2`, Amiri Arabic title (36px), italic lede, instructor row (avatar + name + title + rating), 4-column meta strip (Lessons / Duration / Enrolled / Language).
   - Right (sticky, 360px wide): **enroll card** on paper background with `--gold` border. Top is the CoursePoster, then `$XX` price (Cormorant 48px in accent color), then "One-time payment · Lifetime access" meta, then the primary CTA button. List of inclusions below with check icons.

2. **Curriculum section** — `paper` background. Two columns:
   - Left (1fr): small-caps "The Curriculum" + H1 "What we will *study*." + accordion of modules. Each module is a button with Roman numeral, title, lesson count, and chevron. Expanding reveals the lessons table — each row has a status icon (lock / play / check), title, free-preview pill if applicable, and mono duration.
   - Right (360px): "What you'll receive" card (frame style with inner border), blurb, and a 4-row dl of meta (audio quality, video quality, last updated, access). Below that, a `--gold-soft` callout about scholarships.

3. **Footer**.

---

### 4. Sign In (`#login`)

**Purpose**: Authentication for returning students.

**Layout**: 1fr / 1.1fr two-column split, full viewport height.
- **Left pane** (`paper` bg): Brand mark, "Welcome *back*." H1, italic lede, email + password fields, "Forgot your password?" link, "Keep me signed in" checkbox, primary submit button (full-width), "or" divider, Google OAuth button (white with Google logo), "New to the academy? Create an account" footer.
- **Right pane** (forest-green `auth__mark-pane` with tile-pattern overlay, padding 80px): Brand mark large, then Arabic "القرويين" (32px gold), display H2 "The seminary, in the *palm of your hand*.", italic lede; at the bottom, a hadith pull-quote ("Whoever travels a path in search of knowledge…") with small-caps citation underneath.

---

### 5. Sign Up (`#signup`)

**Purpose**: Account creation in 2 steps.

**Step 1**: name / email / password fields + "Continue" button + Google OAuth.
**Step 2**: "What brings you here?" — 4 selectable goal cards (Tajwīd / Arabic / Fiqh / Full curriculum). Selected card uses `--accent-soft` background + `--accent` border + check icon.

Right mark pane shows different copy: "اقرأ بِاسْمِ رَبِّكَ" + display H2 "Read, in the name of *your Lord*." + a 4-item list of what users get when they join.

---

### 6. Checkout (`#checkout`)

**Purpose**: Pay for a course via Stripe.

**Layout**: 1.2fr / 1fr two-column grid, 1080px max-width.
- **Left**: Brand mark + 3-step indicator (Cart ✓ / Payment · / Confirmation), "Complete your *enrollment*." H1, then sections:
  - Account: email + full name fields
  - Payment details: card number / expiry / CVC / country / postal — with "Secured by Stripe" lock icon
  - Discount code field + Apply button
  - Big primary submit button "Pay $XX and enroll" (shows processing state for 1.1s)
- **Right**: Order summary card (sticky), with the CoursePoster + course meta, subtotal / discount / tax / total lines (total in Cormorant 22px accent color), then "What's included" sub-card listing benefits.

---

### 7. Checkout Success (`#checkout-success`)

**Purpose**: Confirm purchase and direct to first lesson.

**Layout**: Centered max-width 640px content. Forest-soft circular checkmark, Arabic "الْحَمْدُ لِلَّهِ", small-caps "Enrollment confirmed", H1 "Welcome to *the course*.", italic lede, mini-receipt card (paper-2 with frame border) showing CoursePoster + course title + Arabic + transaction details (mono reference ID, date, amount), then `[Begin the first lesson]` + `[Go to my library]` buttons.

---

### 8. Student Dashboard (`#dashboard`)

**Purpose**: Logged-in student home base.

**Layout**: 240px sidebar + 1fr main grid.

#### Sidebar (`dash__side`)
Sticky, paper-2 background, hairline right border. Brand mark at top, "Library" small-caps section label, then nav buttons. Active item has a 2px-wide accent-colored bar on its left. User profile at the bottom.

#### Main area
- **Topbar** (sticky): breadcrumb-style page label on the left, `[Browse the library]` + greeting on the right.
- **Page content** — varies by tab. Tab keys: `courses` (default) / `continue` / `ijazah` / `receipts` / `account`.

#### "My courses" tab (default)
- Page head: "As-salāmu ʿalaykum, Layla" eyebrow + H1 "Your *library*." + lede + `[Add a course]` button on the right.
- **Continue card**: a full-bleed forest-green panel with tile overlay, 3-column grid (poster / metadata / resume button). Inside: small-caps "Continue where you stopped", Cormorant H2 course title, Arabic title, Somali title in italics, "Module II · Lesson 2 · 42% complete", gold progress bar, large `[Resume]` button on the right.
- Section divider with small-caps "All enrolled courses" label.
- **mc-grid**: `auto-fill minmax(280px, 1fr)` grid of compact cards. Each card has the CoursePoster + category badge + title + instructor + progress bar + "Continue reading →" footer.

#### "Continue" tab
List of recent lessons, each a row: small CoursePoster (80px) + course meta + last-opened timestamp + Play icon.

#### "Certificates" tab
A single rendered **ijazah certificate**: 1.45:1 aspect ratio, paper background, two nested ornamental gold borders (2px outer, 0.5px inner), centered content:
- Bismillah in Amiri
- "Al-Qarawiyyīn Academy" smallcaps (32px tracking)
- Ornamental divider
- "This is to certify that" eyebrow
- Student name in italic Cormorant 48px
- 2–3 line body referencing the completed course
- 3-column footer: instructor signature (italic Cormorant) + date (mono, in Hijri format) + reference number (mono)
- `[Download as PDF]` button below

#### "Receipts" tab
Standard data table: Date / Reference (mono ID) / Course (display serif) / Method (Visa · 4242) / Amount (display serif, accent color) / PDF download button.

#### "Account" tab
Two-column form: left is profile (avatar + change photo button + name / Arabic name / email / time zone fields); right is security & preferences (current/new/confirm password + language select + two notification checkboxes). Sticky save/cancel footer.

---

### 9. Lesson Player (`#lesson/<slug>/<idx>`)

**Purpose**: Watch a lesson, take notes, navigate the curriculum.

**Layout**: 320px sidebar + 1fr main, full viewport, no global topnav.

#### Sidebar
- Course header: brand mark (small) + small-caps category + H2 course title + progress row ("8/22 ▰▱▱▱ 36%")
- Module list, each module label is small-caps, lessons below are buttons with: status icon (check / play / number), title, mono duration. Active lesson has accent left-bar and lifted bg.

#### Main
- **Topbar**: `[← My library]` on left, "Lesson X of Y" + `[Mark as complete]` on right.
- **Video region**: 16:9, dark gradient background, tile pattern at 5% opacity, centered content with large play-circle button, italic Cormorant lesson title, mono meta line. Bottom overlay has timestamps + scrubber (gold-2 fill at 32%).
- **Lesson page** below the video:
  - Small-caps module eyebrow, H1 lesson title, italic lede paragraph
  - 4 tabs: My notes / Resources / Transcript / Arabic text
    - **Notes**: textarea persists to state (real implementation: persist to DB per-user-per-lesson). Bottom meta "Auto-saved · these notes appear only to you."
    - **Resources**: list of downloadable cards (icon + name + size + download icon)
    - **Transcript**: paragraphs with mono timestamps as inline labels
    - **Arabic text**: centered 32px Amiri verse + translation
  - **Lesson nav footer**: `[← Previous]` / `[Next →]` buttons

---

### 10. Admin Dashboard (`#admin`)

**Purpose**: Sheikh's view of the academy.

Same sidebar pattern as student dashboard, but the label is "Instructor" and the nav items differ: Overview / Courses / Students / Revenue / Discount codes.

The top-bar shows the Sheikh's name + a gold "Admin" badge + `[New course]` button.

#### Overview tab
- Page head with "Last 30 days" + "Export CSV" buttons
- **Stats strip**: 4-column joined card with hairline dividers. Total revenue / Active students / Courses published / Average rating. Each shows the metric in Cormorant 38px (key digits italic accent), small-caps label, and a delta line.
- **Revenue chart**: 12-month bar chart in SVG (custom — see `RevenueChart` component in `screens-admin.jsx`). Bars are accent-colored with a gold cap, value labels above each bar in italic Cormorant, month labels below.
- Two side-by-side tables: "Top-performing courses" and "Recent enrollments".

#### Courses tab
Data table of all courses: poster thumb + title meta / category badge / status (published green dot / draft clay dot) / students / revenue / rating / `[Edit]`.

Clicking edit opens the **Course Builder** view:
- Page head with `[← Back]`, "Edit *course*." H1, publish/draft toggle, `[Preview]` + `[Save changes]` buttons
- Two columns:
  - **Main (1fr)**:
    - "Course details" card: title / Arabic title (RTL Amiri input) / Somali title / slug / description textarea / price + category + level row
    - "Curriculum" card: list of modules, each with Roman numeral + title + Rename/Reorder/Delete actions. Inside each module: lesson rows with number / title / Free pill if applicable / duration / Edit. "Add lesson" button below.
  - **Sidebar (320px)**:
    - Cover preview card (live CoursePoster) + "Change cover" button
    - Video host card: Mux status indicator + last sync time
    - SEO card: meta title field, OG image auto-generate button, structured data checkbox

#### Students tab
Filter chips (All / Active this week / New this month / Completed a course / By course…) + search field. Data table: avatar + name + email / course count / last active / progress bar with % / lifetime value / quick actions (eye, mail).

#### Revenue tab
Stripe-style. 4-stat strip (This month / Net payouts / Refunds / MRR) + a payments table (Date / Reference / Student / Course / Method / Status / Amount).

#### Coupons tab
Data table: Code (mono in pill) / Discount / Uses / Restricted to / Expires / Edit. `[+ New code]` button in page head.

---

## Components

The prototype defines these reusable components — recreate them as React components in your codebase.

### `<Mark>` — brand mark
Inline SVG, 64×64 viewBox. Mihrab arch with 8-point star, forest-green ground, gold foil. Color-locked, accepts `size` prop. See `motifs.jsx`.

### `<CoursePoster course={course}>` — the workhorse
The most important component. Renders a 3:2 video-lecture poster:
- Dark cinematic gradient background (palette varies by `course.coverColor`: forest / clay / umber / gold / slate)
- Faint tile pattern of 8-point stars
- SVG noise grain
- Large outlined mihrab arch silhouette
- Centered gold play button (large circle with triangular play glyph)
- Bottom gradient fade for legibility
- Top-left small-caps category eyebrow
- Top-right duration pill (mono, in a dark pill with gold border)
- Title block bottom-centered: Cormorant 28px title + 20px Amiri Arabic
- Footer rule with "Sheikh Abdulhakim" italic on the left and lesson count on the right
- 4 corner ornaments (L-shape with dot)

In the prototype this is exported as `BookCover` for backwards-compatibility — **rename to `CoursePoster` in the real codebase.**

### `<Divider>` — ornamental rule
SVG: two horizontal hairlines flanking a small 8-point star + three dots on each side, all gold.

### `<Icon>` — line-icon set
A flat object exporting Book / Lamp / Globe / Ribbon / Search / Lock / Play / PlayCircle / Check / CheckCircle / Arrow / ArrowLeft / Home / Library / GraduationCap / Receipt / Settings / Users / Coin / Plus / Download / FileText / Clock / Star / Stripe / Eye / ChevronDown / Mail. All are 1.5-stroke line icons. Use `lucide-react` in production — these are stylistically identical.

### `<TopNav>` — public top navigation
Sticky, blurred bg, hairline bottom. Brand left, 4 text links center, sign in / enroll buttons right.

### `<Footer>` — site footer
Forest-2 background, 4-column grid (brand + 3 link cols), gold-2 small-caps section headers, bottom strip with copyright.

### `<CourseCard>` — catalogue card
The poster + category badge + title + instructor line + stars + price footer. Whole card is a button.

### `<Field>` — labeled input
Small-caps label above + 1px-border field. Focus state: accent border + 3px accent-soft halo.

### `<Stars>` — rating display
5 gold stars + numeric value in italic meta.

### `<DashSidebar>` — student/admin sidebar
240px wide, paper-2 bg, brand + nav items with optional count, user profile at the bottom.

### `<TweaksPanel>` and friends
Already implemented — used only during design exploration. **Do not port to production.**

---

## Interactions & Behavior

### Routing
Hash-based in the prototype; in production use Next.js App Router or React Router.

### Authentication
- Two providers: email/password + Google OAuth (NextAuth.js)
- Sign-up is 2-step: account creation, then a "What brings you here?" goal-picker that we use to recommend a starting course

### Enrollment flow
1. Visitor hits `#course/<slug>`, clicks `[Enroll now]`
2. → `#checkout` with the course in cart
3. POST to Stripe Checkout (server-side, real cents amount)
4. On success redirect → `#checkout-success`, which displays the receipt
5. Student then clicks `[Begin the first lesson]` → `#lesson/<slug>/0`

For non-enrolled visitors clicking a paid lesson row in the curriculum, link to `#course/<slug>` instead. Free-preview lessons should be playable without enrollment.

### Video playback
Mock in the prototype. Real implementation:
- Each lesson row in the DB stores a Mux `playback_id`.
- Server endpoint creates a Mux signed JWT (5-min TTL) given the user is enrolled.
- Client uses `<MuxPlayer>` or hls.js + the signed URL.
- Store playback position (last second) in the DB on `timeupdate` (debounced 5s) — used by the dashboard's "Continue where you stopped" feature.

### Notes
Per-lesson notes textarea, debounced auto-save to `notes` table (`userId, lessonId, body, updatedAt`).

### Progress tracking
- Mark lesson complete when user clicks `[Mark as complete]` or when playback >= 95% of duration
- Course progress = `completedLessons / totalLessons`
- "Continue where you stopped" picks the most-recently watched in-progress course

### Ijazah issuance
- Issue when the student completes all lessons of a course AND passes an "oral examination" (a manual step the Sheikh confirms in admin)
- Generated as PDF server-side (e.g., react-pdf or puppeteer rendering the cert design)
- Email the PDF + display in the Certificates tab

### Admin behavior
- The "Import from YouTube" button on Courses page is a CSV/YouTube playlist importer — out of scope for v1, leave as a stub
- The course builder's save action should patch all editable fields. Curriculum reordering needs drag-and-drop (dnd-kit recommended)

---

## Data Model

See `data.js` for the prototype's sample data. The shape implies the following Postgres tables:

```sql
-- Core
users (id, email, name, name_arabic, password_hash, google_id, time_zone, language, created_at)
instructors (id, user_id, title, bio, signature_svg)
categories (id, slug, label, label_arabic, sort_order)

-- Catalog
courses (id, slug, instructor_id, category_id, title, title_arabic, title_somali,
         blurb, lede, price_cents, level, duration_label, cover_palette,
         is_published, students_count_denorm, rating_denorm, created_at, updated_at)
modules (id, course_id, title, sort_order)
lessons (id, module_id, title, title_arabic, duration_seconds, is_free_preview,
         mux_playback_id, sort_order)
lesson_resources (id, lesson_id, kind, name, size_bytes, url)

-- Enrollment & progress
enrollments (id, user_id, course_id, stripe_payment_intent_id, amount_paid_cents,
             coupon_code, created_at)
lesson_progress (user_id, lesson_id, last_position_seconds, completed_at, PRIMARY KEY (user_id, lesson_id))
notes (id, user_id, lesson_id, body, updated_at)

-- Certificates
ijazah (id, user_id, course_id, reference_no, issued_at, pdf_url)

-- Marketing
testimonials (id, course_id NULL, user_id, body, name_override, title_text, published)
coupons (code, percent_off, max_uses, used_count, course_id NULL, expires_at, created_at)

-- Audit
purchases (id, user_id, course_id, amount_cents, stripe_charge_id, method_brand, method_last4, status, created_at, refunded_at)
```

---

## Assets

The prototype includes 3 SVG ornament files in `ornaments/`:
- `tile.svg` — arabesque tile pattern (8-point stars + connecting lines). Used as a low-opacity background on dark forest sections.
- `divider.svg` — horizontal rule with a gold star + dots. Used as `<hr class="ornament">`.
- `favicon.svg` — the brand mark, sized for a favicon.

Real implementation will additionally need:
- **Instructor portrait** — replace the placeholder `ع` roundel on the landing page with an actual photo of Sheikh Abdulhakim.
- **OG / social images** — generated per-course from the CoursePoster template.
- **Email header art** — a small mihrab-arch wordmark for transactional emails.

No emoji used anywhere. Do not introduce any.

---

## Files

All in `/design_handoff_qarawiyyin/`:

| File | What it is |
|---|---|
| `index.html` | App shell — React + Babel script loader |
| `styles.css` | All design tokens + every screen's CSS |
| `data.js` | Sample data (instructor, courses, categories, testimonials, enrollments) |
| `motifs.jsx` | `<Mark>`, `<CoursePoster>` (exported as `BookCover`), `<Divider>`, `<Icon>` set, palettes |
| `components.jsx` | `<TopNav>`, `<Footer>`, `<CourseCard>`, `<Stars>`, `<Field>` |
| `screens-public.jsx` | Landing (with 3 hero variants), Catalog, Course Detail |
| `screens-auth-checkout.jsx` | Login, Signup, Checkout, Checkout Success |
| `screens-dashboard.jsx` | Student Dashboard (5 tabs) and Lesson Player |
| `screens-admin.jsx` | Admin Dashboard (5 tabs) including Course Builder |
| `app.jsx` | Hash router + Tweaks panel wiring |
| `tweaks-panel.jsx` | Tweaks shell — design-time only, do not port |
| `ornaments/*.svg` | Decorative SVGs |

To run the prototype locally: serve the folder with any static server (`python3 -m http.server` works) and open `index.html`. Hash routes update in the URL bar — share `index.html#dashboard` to deep-link.

---

## Recommended Build Order

1. **Tokens + brand**: lift `styles.css` `:root` block into Tailwind config or a tokens file. Drop in the Google Font imports. Get the body grain working. Build the `<Mark>` component.
2. **Public landing** with editorial hero (no real video stack yet — placeholder posters).
3. **Catalog + course detail** reading from a JSON seed file. No DB yet.
4. **Auth** with NextAuth.js (email + Google).
5. **Stripe checkout** wired up — test mode, no Mux yet.
6. **Student dashboard** + a stubbed video player. Enrollment unlocks lessons.
7. **Mux integration** — signed URLs, hls.js player, progress tracking.
8. **Lesson player** notes + transcript + resources.
9. **Admin overview** + courses table + builder.
10. **Admin revenue & students**.
11. **Ijazah generator** (manual issuance flow, PDF rendering).
12. **Coupons + admin polish**.
13. **Mobile-responsive sweep** — the prototype has minimal `@media (max-width: 960px)` rules; a real audit is needed at 768 / 414 / 375.

Polish pass at the end: animation tuning, empty states, error states, loading skeletons (a Cormorant italic "loading…" with a small shimmer fits the aesthetic better than a spinner).

Good luck. Keep the typography sharp, the spacing generous, and the geometry quiet — and the design will hold.
