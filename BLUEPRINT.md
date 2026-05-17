# Al-Qarawiyyīn Academy — Project Blueprint

> **Living document.** Update this file as decisions are made, phases complete, and notes accumulate.
> Last updated: 2026-05-17

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Roles & Audiences](#2-roles--audiences)
3. [Tech Stack](#3-tech-stack)
4. [Infrastructure & Docker Architecture](#4-infrastructure--docker-architecture)
5. [Video Pipeline](#5-video-pipeline)
6. [Database Schema](#6-database-schema)
7. [i18n Strategy](#7-i18n-strategy)
8. [Auth & Security Model](#8-auth--security-model)
9. [Payment Flow](#9-payment-flow)
10. [Ijazah / Certificate Flow](#10-ijazah--certificate-flow)
11. [Build Phases & Progress](#11-build-phases--progress)
12. [Environment Variables](#12-environment-variables)
13. [Deployment Guide](#13-deployment-guide)
14. [Screen Inventory & Routes](#14-screen-inventory--routes)
15. [Design System Reference](#15-design-system-reference)
16. [Decision Log](#16-decision-log)
17. [Notes & Open Questions](#17-notes--open-questions)

---

## 1. Project Overview

**Platform name:** Al-Qarawiyyīn Academy (القرويين)
**Tagline:** "A quiet madrasa, for the seeking."
**Instructor:** Sheikh Abdulhakim — Imam, Mufassir, Founder

An online madrasa platform for selling and delivering video-based courses in the classical Islamic sciences: Qur'an / Tajwīd, Arabic, Fiqh, ʿAqīdah, Seerah, and Hadith.

The aesthetic is **reverent and scholarly** — inspired by Al-Azhar and the historic Qarawiyyin university in Fez (est. 859 CE). Warm parchment tones, Islamic geometric motifs (mihrab arches, 8-point stars, arabesque tiles), and an editorial publishing-house typography system.

The **existing prototype** is a complete HTML/JSX design reference in this directory (`index.html`, `styles.css`, all `screens-*.jsx` files). It is a clickable prototype only — not production code. The task is to build the real platform using this design as a pixel-perfect reference.

---

## 2. Roles & Audiences

| Role | Description |
|---|---|
| **Public visitor** | Browses landing page, catalogue, course detail pages. Can watch free-preview lessons. No account required. |
| **Enrolled student** | Has an account and has purchased at least one course. Accesses the student dashboard, lesson player, notes, certificates. |
| **Admin (Sheikh)** | Single admin account. Manages courses, uploads videos, monitors student progress and revenue, issues ijazah certificates, creates coupons. |

---

## 3. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** + **TypeScript** | SSR, API routes, file-based routing. Recommended in the design handoff. |
| Styling | **Tailwind CSS** + CSS custom properties (lifted from `styles.css`) | Design tokens map directly. RTL support via `dir` attribute. |
| ORM / DB | **Prisma** + **PostgreSQL** | Full schema already specced. Prisma migrations, type-safe queries. |
| Auth | **NextAuth.js v5** | Email/password + Google OAuth. Session stored in Redis. |
| Payments | **Stripe Checkout** (test mode initially) | One-time course purchases. Webhook confirms enrollment. Coupon support built-in. |
| i18n | **next-intl** | English / Arabic / Somali from day 1. RTL locale detection for Arabic. |
| Video storage | **MinIO** (self-hosted, S3-compatible) | Stores raw MP4 uploads and transcoded HLS segments on the VM. |
| Video transcoding | **FFmpeg** via **BullMQ** worker | Async job queue. Transcodes to 480p / 720p / 1080p HLS on upload. |
| Video delivery | **Nginx** → **Cloudflare CDN** | Nginx serves HLS with JWT auth. Cloudflare provides global edge caching for low-latency worldwide delivery. |
| Video player | **hls.js** | Universal HLS player. No proprietary SDK or licensing. |
| Job queue | **BullMQ** + **Redis** | FFmpeg transcoding jobs. Redis also used for sessions and caching. |
| Email | **Resend** | Transactional email: enrollment confirmation, ijazah PDF delivery, password reset. |
| PDF certificates | **react-pdf** | Renders the ijazah certificate design server-side to PDF. |
| Drag-and-drop | **dnd-kit** | Course builder curriculum reordering (modules and lessons). |
| Deployment | **Docker Compose** on **Hetzner** VM | 6-container stack. Cloudflare DNS proxy in front. |

---

## 4. Infrastructure & Docker Architecture

### Docker Compose Services

```
┌─────────────────────────────────────────────────────────────┐
│                  Cloudflare CDN (free tier)                 │
│         Global edge — caches HLS segments worldwide         │
└─────────────────────┬───────────────────────────────────────┘
                      │  DNS proxy (orange cloud)
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                   nginx  (port 80/443)                      │
│  • Reverse proxy → Next.js app (port 3000)                  │
│  • Serves /video/* HLS segments from MinIO                  │
│  • JWT token validation before serving any segment          │
│  • SSL termination (Cloudflare Origin Certificate)          │
└────────────┬─────────────────────────┬──────────────────────┘
             ↓                         ↓
┌────────────────────┐    ┌─────────────────────────────────┐
│  app  (Next.js)    │    │  minio                          │
│  port 3000         │    │  port 9000 (API)                │
│  • All pages/API   │    │  port 9001 (console)            │
│  • Pushes jobs     │    │  • Raw MP4 uploads              │
│    to BullMQ       │    │  • HLS segments (.m3u8, .ts)    │
└──────┬─────────────┘    │  • Lesson resources / PDFs      │
       │                  └─────────────────────────────────┘
       ↓
┌────────────────────┐    ┌─────────────────────────────────┐
│  postgres          │    │  worker (FFmpeg)                │
│  port 5432         │    │  • Consumes BullMQ video jobs   │
│  • Primary DB      │    │  • Pulls raw MP4 from MinIO     │
│  • All app data    │    │  • Transcodes → 3 HLS qualities │
└────────────────────┘    │  • Writes segments back MinIO   │
                          │  • Updates lesson DB record     │
                          └─────────────────────────────────┘
                                        ↑
                          ┌─────────────────────────────────┐
                          │  redis                          │
                          │  port 6379                      │
                          │  • BullMQ job queue             │
                          │  • NextAuth.js sessions         │
                          │  • API response cache           │
                          └─────────────────────────────────┘
```

### docker-compose.yml structure (planned)

```yaml
services:
  app:         # Next.js 15
  postgres:    # postgres:16-alpine
  redis:       # redis:7-alpine
  worker:      # Node + FFmpeg Alpine image
  minio:       # minio/minio
  nginx:       # nginx:alpine with custom config
```

Volumes:
- `postgres_data` — persistent DB
- `redis_data` — persistent queue state
- `minio_data` — persistent video segments (consider large disk on Hetzner)
- `nginx_certs` — SSL certificates

Networks:
- `internal` — app, postgres, redis, worker, minio communicate privately
- `public` — only nginx exposes ports 80/443

---

## 5. Video Pipeline

### Upload Flow

```
Admin browser
    → POST /api/admin/lessons/:id/upload  (multipart, streamed)
    → Next.js API route
    → Streams MP4 → MinIO (bucket: raw-uploads)
    → Pushes BullMQ job: { lessonId, minioKey }
    → Returns 202 Accepted + jobId
```

### Transcoding Flow (worker container)

```
BullMQ job dequeued
    → Worker pulls raw MP4 from MinIO
    → FFmpeg transcodes to 3 renditions:
        480p  → /segments/{lessonId}/480p/
        720p  → /segments/{lessonId}/720p/
        1080p → /segments/{lessonId}/1080p/
    → Generates master.m3u8 (adaptive bitrate playlist)
    → Uploads all segments + playlists → MinIO (bucket: hls-segments)
    → Updates DB: lessons.mux_playback_id = lessonId (repurposed field),
                  lessons.hls_ready = true,
                  lessons.duration_seconds = <from FFprobe>
    → Job complete
```

FFmpeg command (per rendition example for 720p):
```bash
ffmpeg -i input.mp4 \
  -vf scale=-2:720 \
  -c:v libx264 -crf 23 -preset fast \
  -c:a aac -b:a 128k \
  -f hls -hls_time 6 -hls_playlist_type vod \
  -hls_segment_filename 'seg_%03d.ts' \
  720p.m3u8
```

### Playback Flow

```
Student clicks Play
    → GET /api/lessons/:id/token
    → Server: checks enrollment in DB
    → Server: signs JWT { lessonId, userId, exp: now+2h }
    → Client: requests https://domain.com/video/{lessonId}/master.m3u8?token=JWT
    → Nginx: validates JWT signature (lua-resty-jwt or auth_request to Next.js)
    → Nginx: proxies segment requests from MinIO
    → Cloudflare: caches .ts segments at edge (Cache-Control: public, max-age=31536000)
    → hls.js: plays adaptive stream in browser
```

**Security:** Signed JWT is scoped to `lessonId + userId`. Token is short-lived (2h). Nginx rejects any request with invalid/expired token. Segments themselves are never directly publicly accessible in MinIO (private bucket).

### HLS Segment Caching Strategy (Cloudflare)

- `.m3u8` playlists: `Cache-Control: no-store` (dynamic, per-user token)
- `.ts` segments: `Cache-Control: public, max-age=31536000` (immutable content, safe to cache)
- Cloudflare Page Rule: cache `.ts` at edge → global students get low-latency delivery

### Progress Tracking

- `timeupdate` event on hls.js → debounced 5s → `PATCH /api/progress`
- Stores `last_position_seconds` in `lesson_progress` table
- Lesson marked complete when: `Mark as Complete` clicked OR playback >= 95% of duration
- "Continue where you stopped" = most recent `lesson_progress` record with `completed_at IS NULL`

---

## 6. Database Schema

Full Prisma schema (matches the README data model):

```sql
-- Users & Auth
users (id, email, name, name_arabic, password_hash, google_id,
       time_zone, language, notification_enrollment, notification_updates,
       created_at, updated_at)

instructors (id, user_id, title, bio, signature_svg)

-- Catalog
categories (id, slug, label, label_arabic, label_somali, sort_order)

courses (id, slug, instructor_id, category_id,
         title, title_arabic, title_somali,
         blurb, lede, price_cents, level,
         duration_label, cover_palette,
         is_published, students_count_denorm, rating_denorm,
         meta_title, og_image_url,
         created_at, updated_at)

modules (id, course_id, title, sort_order)

lessons (id, module_id, title, title_arabic,
         duration_seconds, is_free_preview,
         hls_ready, hls_master_key,   -- MinIO key for master.m3u8
         sort_order)

lesson_resources (id, lesson_id, kind, name, size_bytes, minio_key)

-- Enrollment & Progress
enrollments (id, user_id, course_id,
             stripe_payment_intent_id, amount_paid_cents,
             coupon_code, created_at)

lesson_progress (user_id, lesson_id,
                 last_position_seconds, completed_at,
                 updated_at,
                 PRIMARY KEY (user_id, lesson_id))

notes (id, user_id, lesson_id, body, updated_at)

-- Certificates
ijazah (id, user_id, course_id, reference_no,
        issued_at, pdf_minio_key, emailed_at)

-- Marketing
testimonials (id, course_id, user_id, body,
              name_override, title_text, published)

coupons (code, percent_off, max_uses, used_count,
         course_id, expires_at, created_at)

-- Payments
purchases (id, user_id, course_id, amount_cents,
           stripe_charge_id, method_brand, method_last4,
           status, created_at, refunded_at)
```

---

## 7. i18n Strategy

**Library:** next-intl
**Locales:** `en` (English), `ar` (Arabic / RTL), `so` (Somali)
**Default locale:** `en`

### File structure

```
messages/
  en.json    # English strings
  ar.json    # Arabic strings
  so.json    # Somali strings
```

### RTL handling

- Arabic (`ar`) locale sets `<html dir="rtl" lang="ar">`
- Tailwind `rtl:` variants used for layout mirroring
- Arabic text always uses `font-family: var(--font-arabic)` (Amiri) regardless of locale
- Course titles stored in DB in all 3 languages; displayed by active locale

### What gets translated

| Content | Translated? |
|---|---|
| UI strings (nav, buttons, labels) | Yes — all 3 locales |
| Course titles | Yes — `title`, `title_arabic`, `title_somali` in DB |
| Course descriptions / blurbs | English only (too expensive to maintain 3x) |
| Lesson content | English (instructor teaches in English) |
| Arabic Qur'anic text / hadith | Arabic always, English translation alongside |
| Certificates (ijazah) | Arabic + English on the same document |

### Locale switcher

- Available in: TopNav (globe icon dropdown), student Account tab
- Persists to `users.language` for authenticated users
- Cookie for guests

---

## 8. Auth & Security Model

### Authentication

- **Provider 1:** Email + password (bcrypt hashed, stored in `users.password_hash`)
- **Provider 2:** Google OAuth (NextAuth.js Google provider)
- **Sessions:** JWT strategy, stored in Redis via NextAuth.js
- **Middleware:** `middleware.ts` protects `/dashboard/*`, `/lesson/*`, `/admin/*`
- **Admin guard:** Separate `isAdmin` boolean on `users` table (or role enum). Only Sheikh's account has this set.

### Video security

- HLS segments in MinIO are **never publicly accessible** (private bucket, no public policy)
- Nginx proxies requests after JWT validation
- JWT scoped to `{ lessonId, userId }` — cannot be reused across lessons
- JWT TTL: 2 hours (refreshed on play, expired on logout)
- Free-preview lessons: issued tokens without enrollment check

### Stripe webhook security

- Webhook endpoint: `POST /api/webhooks/stripe`
- Validates `stripe-signature` header against `STRIPE_WEBHOOK_SECRET`
- Only processes `payment_intent.succeeded` to create enrollments
- Idempotent: checks `stripe_payment_intent_id` before inserting

---

## 9. Payment Flow

```
1. Student on Course Detail → clicks [Enroll now]
2. POST /api/checkout/session
     → Creates Stripe Checkout Session (server-side)
     → price: course.price_cents, metadata: { courseId, userId }
3. Redirect → Stripe-hosted Checkout page
4. Student completes payment (test card: 4242 4242 4242 4242)
5. Stripe → POST /api/webhooks/stripe (payment_intent.succeeded)
     → Creates enrollments record
     → Creates purchases record
     → Increments courses.students_count_denorm
6. Stripe → redirect → /checkout-success?session_id=...
7. Success page fetches session → renders receipt
8. [Begin first lesson] → /lesson/{slug}/0
```

### Coupons

- Admin creates coupon in dashboard (code, percent_off, max_uses, expiry, optional course restriction)
- Checkout page has discount code input
- `POST /api/checkout/apply-coupon` validates code, returns `{ discountPercent, newTotal }`
- Applied via Stripe Checkout `discounts` param

---

## 10. Ijazah / Certificate Flow

```
1. Student completes all lessons of a course
     → course progress = 100%
     → Admin sees student flagged in Students tab ("Eligible for ijazah")

2. Sheikh conducts oral examination (off-platform)

3. Sheikh clicks [Issue Ijazah] in admin Students tab
     → POST /api/admin/ijazah
     → Generates unique reference_no (e.g. QA-2026-00042)
     → react-pdf renders certificate PDF:
         - Bismillah in Amiri
         - Academy name (Arabic + English)
         - Student full name (italic Cormorant 48px)
         - Course completion statement
         - 3-column footer: Sheikh signature / Hijri date / reference no
     → Stores PDF in MinIO (bucket: certificates)
     → Creates ijazah DB record
     → Resend sends email to student with PDF attachment

4. Student → Dashboard → Certificates tab
     → Sees rendered certificate preview
     → [Download as PDF] button
```

**Hijri date:** Use `hijri-date` npm package for conversion. Display format: e.g. "١٧ ذو القعدة ١٤٤٧"

---

## 11. Build Phases & Progress

Track status with: `[ ]` = not started, `[~]` = in progress, `[x]` = complete

---

### Phase 1 — Foundation & Infrastructure
- [ ] `docker-compose.yml` — all 6 services, volumes, networks
- [ ] `Dockerfile` for Next.js app
- [ ] `Dockerfile` for FFmpeg worker
- [ ] Nginx config (reverse proxy + video serving)
- [ ] Prisma schema — full data model
- [ ] Initial migration + seed script (8 courses from `data.js`)
- [ ] Tailwind config — lift all design tokens from `styles.css`
- [ ] Google Fonts loaded (`@import` or `next/font`)
- [ ] Body paper texture (SVG grain + radial gradients)
- [ ] next-intl setup — en / ar / so locale files scaffolded
- [ ] `<Mark>` component (mihrab arch SVG)
- [ ] `<CoursePoster>` component (renamed from `BookCover`)
- [ ] `<Divider>` ornamental rule component
- [ ] `<Icon>` set (mapped to lucide-react)
- [ ] MinIO bucket initialization script

### Phase 2 — Public Site
- [ ] `<TopNav>` — sticky, blurred, locale switcher
- [ ] `<Footer>` — 4-column, forest-2 bg
- [ ] `<CourseCard>` — poster + meta
- [ ] `<Field>` — labeled input with focus halo
- [ ] `<Stars>` — rating display
- [ ] Landing page — Editorial hero (chosen variant)
- [ ] Landing page — Bismillah belt
- [ ] Landing page — Values grid (4 columns)
- [ ] Landing page — Featured courses section
- [ ] Landing page — Instructor profile section
- [ ] Landing page — Testimonials
- [ ] Landing page — Closing CTA (forest green)
- [ ] Course catalogue — category chips + search
- [ ] Course catalogue — auto-fill grid
- [ ] Course detail — hero with enroll card
- [ ] Course detail — curriculum accordion
- [ ] Course detail — free preview playable without account
- [ ] API: `GET /api/courses` (with filters)
- [ ] API: `GET /api/courses/:slug`

### Phase 3 — Auth
- [ ] NextAuth.js v5 config (email + Google providers)
- [ ] `middleware.ts` — route protection
- [ ] Sign In screen (2-pane layout)
- [ ] Sign Up screen — Step 1 (name / email / password)
- [ ] Sign Up screen — Step 2 (goal picker — 4 cards)
- [ ] Forgot password flow (Resend email)
- [ ] Google OAuth callback handling
- [ ] API: `POST /api/auth/register`

### Phase 4 — Payments
- [ ] Stripe Checkout session creation
- [ ] Checkout screen (2-column, card form mock + Stripe redirect)
- [ ] Checkout success screen (receipt + transaction details)
- [ ] Stripe webhook handler (`payment_intent.succeeded`)
- [ ] Coupon validation endpoint
- [ ] API: `POST /api/checkout/session`
- [ ] API: `POST /api/webhooks/stripe`
- [ ] API: `POST /api/checkout/apply-coupon`

### Phase 5 — Student Dashboard
- [ ] `<DashSidebar>` — 240px, nav items with active state
- [ ] Dashboard layout (sidebar + main, sticky topbar)
- [ ] My Courses tab — continue card (forest green)
- [ ] My Courses tab — enrolled courses grid
- [ ] Continue tab — recent lessons list
- [ ] Receipts tab — purchases table
- [ ] Account tab — profile form (left) + security/prefs (right)
- [ ] Account tab — save / cancel footer
- [ ] API: `GET /api/dashboard/courses`
- [ ] API: `GET /api/dashboard/recent`
- [ ] API: `GET /api/dashboard/receipts`
- [ ] API: `PATCH /api/dashboard/account`

### Phase 6 — Video Pipeline
- [ ] MinIO client setup (AWS SDK S3-compatible)
- [ ] Upload API — stream MP4 to MinIO
- [ ] BullMQ queue setup
- [ ] FFmpeg worker — transcodes to 480p / 720p / 1080p HLS
- [ ] FFprobe — extracts duration, updates DB
- [ ] Master m3u8 generation (adaptive bitrate)
- [ ] Nginx `location /video/` block — JWT validation
- [ ] JWT signing / verification (video tokens)
- [ ] hls.js player component
- [ ] Cloudflare: DNS proxy + Cache Rules for `.ts` segments
- [ ] Progress tracking — `timeupdate` debounce → API
- [ ] API: `POST /api/admin/lessons/:id/upload`
- [ ] API: `GET /api/lessons/:id/token`
- [ ] API: `PATCH /api/progress`

### Phase 7 — Lesson Player
- [ ] Lesson player layout (320px sidebar + main)
- [ ] Sidebar — course header, module list, lesson list
- [ ] Video region — hls.js player, 16:9 aspect
- [ ] Video region — scrubber (gold fill, timestamps)
- [ ] Topbar — back to library, mark as complete
- [ ] Notes tab — textarea, auto-save (500ms debounce)
- [ ] Resources tab — downloadable file list
- [ ] Transcript tab — paragraphs with mono timestamps
- [ ] Arabic text tab — centered Amiri verse + translation
- [ ] Lesson nav footer — prev / next
- [ ] Mark as complete (button + 95% threshold)
- [ ] API: `GET /api/lessons/:id`
- [ ] API: `POST /api/lessons/:id/complete`
- [ ] API: `PATCH /api/notes/:lessonId`

### Phase 8 — Admin Dashboard
- [ ] Admin sidebar (same component, "Instructor" label)
- [ ] Admin topbar — name + gold "Admin" badge + [New course]
- [ ] Overview tab — stats strip (revenue / students / courses / rating)
- [ ] Overview tab — SVG revenue bar chart (12 months)
- [ ] Overview tab — top courses table
- [ ] Overview tab — recent enrollments table
- [ ] Courses tab — data table (poster thumb + meta + status + edit)
- [ ] Course Builder — page head (publish toggle, preview, save)
- [ ] Course Builder — course details card (all fields including Arabic / Somali)
- [ ] Course Builder — curriculum card (modules + lessons, dnd-kit reorder)
- [ ] Course Builder — sidebar (cover preview, video status, SEO)
- [ ] Course Builder — video upload UI (drag-and-drop, progress bar)
- [ ] Students tab — filter chips + search + data table
- [ ] Students tab — progress bars + ijazah eligibility flag
- [ ] Revenue tab — 4-stat strip + payments table
- [ ] Coupons tab — table + [New code] modal
- [ ] API: `GET /api/admin/overview`
- [ ] API: `GET /api/admin/courses`
- [ ] API: `POST /api/admin/courses`
- [ ] API: `PATCH /api/admin/courses/:id`
- [ ] API: `GET /api/admin/students`
- [ ] API: `GET /api/admin/revenue`
- [ ] API: `GET /api/admin/coupons`
- [ ] API: `POST /api/admin/coupons`

### Phase 9 — Ijazah / Certificates
- [ ] react-pdf — certificate template (matches UI design)
- [ ] Hijri date conversion (`hijri-date` package)
- [ ] Admin: [Issue Ijazah] button in Students tab
- [ ] API: `POST /api/admin/ijazah`
- [ ] PDF stored in MinIO (certificates bucket)
- [ ] Resend — email with PDF attachment
- [ ] Student Certificates tab — certificate preview
- [ ] Student Certificates tab — [Download as PDF] button
- [ ] API: `GET /api/dashboard/certificates`

### Phase 10 — Polish
- [ ] Mobile responsive sweep — 960 / 768 / 414 / 375px breakpoints
- [ ] Loading skeletons (italic Cormorant "loading…" with shimmer)
- [ ] Empty states — enrolled courses, notes, receipts
- [ ] Error states — payment failure, video unavailable
- [ ] OG image generation per course (`@vercel/og` or similar)
- [ ] Animation tuning — entrance, hover, panel transitions
- [ ] `robots.txt` and `sitemap.xml`
- [ ] SEO metadata per page (next-metadata API)
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility sweep (keyboard nav, ARIA labels, focus states)

---

## 12. Environment Variables

Create `.env.local` for development, `.env.production` for the VM. Never commit these.

```bash
# App
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<random 32-byte string>

# Database
DATABASE_URL=postgresql://user:password@postgres:5432/qarawiyyin

# Redis
REDIS_URL=redis://redis:6379

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# MinIO
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_BUCKET_RAW=raw-uploads
MINIO_BUCKET_HLS=hls-segments
MINIO_BUCKET_CERTS=certificates

# Video JWT
VIDEO_JWT_SECRET=<random 32-byte string>
VIDEO_JWT_TTL_HOURS=2

# Resend (email)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# App config
ADMIN_EMAIL=sheikh@yourdomain.com   # Only this email gets isAdmin=true on first login
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 13. Deployment Guide

### Server setup (Hetzner VM)

Recommended: **Hetzner CX32** (4 vCPU, 8 GB RAM, 80 GB disk) — ~€13/mo
For video storage: **Hetzner Volume** (attach 500GB+ block storage) — ~€25/mo for 500GB

```bash
# On the VM
apt update && apt upgrade -y
apt install docker.io docker-compose-plugin git -y
systemctl enable docker

# Clone repo
git clone https://github.com/yourhandle/qarawiyyin-academy.git
cd qarawiyyin-academy

# Copy env file
cp .env.example .env.production
nano .env.production  # fill in all values

# Start
docker compose -f docker-compose.prod.yml up -d
```

### Cloudflare setup

1. Add your domain to Cloudflare (free plan)
2. Set DNS A record → Hetzner VM IP (orange cloud = proxied)
3. SSL/TLS mode: **Full (strict)**
4. Create Cloudflare Origin Certificate → install on Nginx
5. Page Rules (or Cache Rules):
   - `*.ts` files from `/video/*` → **Cache Everything**, Edge TTL: 1 year
   - `.m3u8` files → **Bypass Cache** (tokens change per user)
6. Enable **HTTP/3** (QUIC) — reduces video startup latency globally

### SSL (Origin Certificate from Cloudflare)

```nginx
# nginx/conf.d/default.conf
server {
    listen 443 ssl;
    ssl_certificate     /etc/nginx/certs/origin.crt;
    ssl_certificate_key /etc/nginx/certs/origin.key;
    # ... rest of config
}
```

### Updating production

```bash
git pull origin main
docker compose -f docker-compose.prod.yml build app worker
docker compose -f docker-compose.prod.yml up -d --no-deps app worker
docker compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

### Backups

- **Postgres:** `pg_dump` cron job → pipe to MinIO `backups/` bucket daily
- **MinIO data:** Hetzner Snapshot weekly or S3 replication to Backblaze B2
- **`.env.production`:** Store encrypted copy in a password manager

---

## 14. Screen Inventory & Routes

| Route | Screen | Auth required |
|---|---|---|
| `/` | Landing page | No |
| `/courses` | Course catalogue | No |
| `/courses/[slug]` | Course detail / sales page | No |
| `/auth/login` | Sign in | No (redirect if authed) |
| `/auth/signup` | Sign up (2 steps) | No (redirect if authed) |
| `/checkout` | Stripe checkout | Yes |
| `/checkout/success` | Enrollment confirmed | Yes |
| `/dashboard` | Student dashboard (tabs) | Yes |
| `/lesson/[slug]/[index]` | Lesson player | Yes + enrolled |
| `/admin` | Admin dashboard (tabs) | Yes + isAdmin |
| `/admin/courses/[id]/edit` | Course builder | Yes + isAdmin |

---

## 15. Design System Reference

### Color Tokens (from `styles.css`)

| Token | Hex | Purpose |
|---|---|---|
| `--forest` | `#1F3D2E` | Primary accent — buttons, links, dark headers |
| `--forest-2` | `#163024` | Footer background, press state |
| `--forest-3` | `#2C5240` | Success states |
| `--gold` | `#C9A84C` | Borders inside dark panels, divider stars |
| `--gold-2` | `#DCB65E` | Text/icons on dark forest backgrounds |
| `--gold-3` | `#A8893B` | Small text on light backgrounds |
| `--paper` | `#FAF5E9` | Primary background (warm ivory) |
| `--paper-2` | `#F2EAD3` | Sidebar / card surface |
| `--paper-3` | `#E8DCBF` | Hover surface |
| `--ink` | `#2B1F16` | Primary text |
| `--ink-2` | `#4E3C2D` | Secondary text |
| `--ink-3` | `#7A6754` | Tertiary / metadata |
| `--rule` | `#D8C8A8` | Default border |

### Typography

| Variable | Family | Use |
|---|---|---|
| `--font-display` | Cormorant Garamond | All headings, italic for em |
| `--font-body` | Source Serif 4 | Body, UI labels, nav |
| `--font-arabic` | Amiri | All Arabic text (RTL) |
| `--font-mono` | JetBrains Mono | Timestamps, IDs, durations |

### Radii (publishing aesthetic, NOT SaaS)
`xs: 2px` / `sm: 3px` / `md: 4px` / `lg: 6px` / `xl: 10px`

### Motion
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` for everything
- Hover: `150ms` / UI: `220ms` / Panel: `320ms` / Entrance: `480ms`

### Key rules
- No emoji anywhere in the UI
- Display headings always mix roman + italic: `Knowledge is <em>light</em>`
- `<em>` = italic + accent color (`--gold-2` on dark, `--accent` on light)
- Shadows are warm brown-tinted: `rgba(60, 38, 18, 0.10–0.26)`
- Body has SVG paper-grain + two warm radial gradients — do not omit

---

## 16. Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-17 | Video: Self-hosted FFmpeg + MinIO + Nginx (not Mux) | Cost — Mux charges per minute streamed; self-hosted is VM disk + bandwidth only |
| 2026-05-17 | CDN: Cloudflare free tier in front of Nginx | Students worldwide; Cloudflare edges HLS `.ts` segments globally; free |
| 2026-05-17 | i18n: All 3 locales (en / ar / so) from day 1 | User requirement |
| 2026-05-17 | Ijazah PDF: v1 feature | Core differentiator — Sheikh issues certificates on completion |
| 2026-05-17 | Stripe: test mode initially | Account not live yet; flip keys when ready |
| 2026-05-17 | VM: Hetzner | User's chosen provider |
| 2026-05-17 | Player: hls.js (not Mux Player) | No proprietary SDK; standard HLS compatible with self-hosted setup |

---

## 17. Notes & Open Questions

### Open Questions

- [ ] What is the domain name? (needed for Cloudflare setup, NextAuth URL, Stripe redirect)
- [ ] Does Sheikh Abdulhakim have a Stripe account? (need to flip from test → live keys)
- [ ] Will the instructor portrait be provided? (README mentions placeholder `ع` roundel)
- [ ] Hetzner VM already provisioned? What specs? (determine if volume for video is needed)
- [ ] Google OAuth app registered in Google Cloud Console? (need client ID + secret)
- [ ] Resend account created? (need API key for email)
- [ ] Should the free-tier subscription ("MRR" product) mentioned in the README be in scope? Or one-time purchases only for v1?

### Notes

- The design prototype is in this same directory. Run `python3 -m http.server` and open `index.html` to reference any screen during build.
- The `<CoursePoster>` component (called `BookCover` in `motifs.jsx`) is the most complex UI component — build it early, everything else depends on it visually.
- Somali course titles are stored in the DB; the instructor provides them. UI strings in Somali need translation — consider whether the Sheikh provides these or if a translator is needed.
- All Arabic text in the UI is *fixed copy* (bismillah, hadith quotes, etc.) — it does not need to be translatable, just correctly encoded in the source. Only course-specific Arabic fields come from the DB.
- The ijazah certificate design in the prototype (student dashboard → Certificates tab) is the reference. The react-pdf version must match it as closely as possible.
- The `TweaksPanel` in `tweaks-panel.jsx` is design-exploration only — do not port to production.
- `dnd-kit` is the recommended drag-and-drop library for the Course Builder curriculum reordering.
- Cloudflare's free plan is sufficient. No need for paid Workers or R2 — just DNS proxy + Cache Rules.

---

*End of blueprint. Update as the build progresses.*
