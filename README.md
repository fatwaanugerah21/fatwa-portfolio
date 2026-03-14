# Fatwa Anugerah — Personal Portfolio

A production-grade personal website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed for performance, SEO, and developer experience.

---

## Tech Stack

| Layer        | Technology                              |
|-------------|------------------------------------------|
| Framework   | Next.js 14 (App Router)                  |
| Language    | TypeScript                               |
| Styling     | Tailwind CSS                             |
| Animation   | Framer Motion                            |
| Blog        | MDX + gray-matter                        |
| Email       | Nodemailer (SMTP)                        |
| Fonts       | Playfair Display · DM Sans · JetBrains  |
| Deployment  | Docker + NGINX + VPS                     |
| SEO         | next-sitemap + Open Graph + RSS feed     |

---

## Project Structure

```
.
├── content/
│   └── blog/              # MDX blog posts
├── public/
│   └── Fatwa_Anugerah_CV_Final.pdf   # ← place your CV here
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout + SEO
│   │   ├── globals.css
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing
│   │   │   ├── [slug]/page.tsx       # Blog post
│   │   │   └── rss.xml/route.ts      # RSS feed
│   │   ├── projects/
│   │   │   ├── page.tsx              # Server: fetches GitHub
│   │   │   └── ProjectsClient.tsx    # Client: filtering UI
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── ContactForm.tsx
│   │   └── api/
│   │       └── contact/route.ts      # Email API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── StatsSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── SkillsSection.tsx
│   │       ├── FeaturedProjectsSection.tsx
│   │       └── TestimonialsSection.tsx
│   ├── lib/
│   │   ├── data.ts          # CV data — edit this
│   │   ├── github.ts        # GitHub API
│   │   ├── blog.ts          # MDX blog utilities
│   │   └── utils.ts         # cn(), formatDate()
│   └── types/index.ts
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── next-sitemap.config.js
```

---

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# → Fill in GITHUB_TOKEN, SMTP credentials, SITE_URL

# 3. Place your CV PDF
cp /path/to/your/cv.pdf public/Fatwa_Anugerah_CV_Final.pdf

# 4. Run dev server
npm run dev
# → Open http://localhost:3000
```

---

## Customising Your Content

All content is in **`src/lib/data.ts`** — no need to touch components:

```ts
// Edit projects
export const FEATURED_PROJECTS: Project[] = [ ... ]

// Edit testimonials
export const TESTIMONIALS: Testimonial[] = [ ... ]

// Edit skills
export const SKILLS_BY_CATEGORY = [ ... ]

// Edit experience timeline
export const EXPERIENCE = [ ... ]

// Edit hero stats
export const STATS = [ ... ]
```

---

## Writing Blog Posts

Create `.mdx` files in `content/blog/`:

```mdx
---
title: "Your Post Title"
excerpt: "One sentence summary for listing page and SEO."
date: "2025-01-15"
tags: ["TypeScript", "Architecture"]
featured: true
---

## Your content here

Write in standard Markdown. Code blocks, headings, lists — all work.
```

The RSS feed at `/blog/rss.xml` updates automatically.

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your domain e.g. `https://fatwaanugerah.dev` |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your GitHub username |
| `GITHUB_TOKEN` | GitHub personal access token (read:user, public_repo) |
| `SMTP_HOST` | SMTP server e.g. `smtp.gmail.com` |
| `SMTP_PORT` | Usually `587` |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (not your real password) |
| `CONTACT_TO_EMAIL` | Where contact form emails are delivered |

**Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords

---

## VPS Deployment

### Prerequisites
- VPS with Docker + Docker Compose installed
- Domain pointing to your VPS IP
- SSL certificate via Certbot

### Step 1 — Get SSL certificate
```bash
# On your VPS
sudo apt install certbot
sudo certbot certonly --standalone -d fatwaanugerah.dev -d www.fatwaanugerah.dev
```

### Step 2 — Clone & configure
```bash
git clone https://github.com/fatwaanugerah21/portfolio.git
cd portfolio
cp .env.local.example .env.local
nano .env.local   # fill in your values
```

### Step 3 — Update nginx.conf
Replace `fatwaanugerah.dev` with your actual domain in `nginx.conf`.

### Step 4 — Deploy
```bash
docker-compose up -d --build
```

### Step 5 — Auto-renew SSL
```bash
# Add to crontab
0 12 * * * /usr/bin/certbot renew --quiet && docker-compose restart nginx
```

### Updating the site
```bash
git pull
docker-compose up -d --build
```

---

## Adding next.config.mjs output: standalone

For the Dockerfile to work correctly, add `output: 'standalone'` to `next.config.mjs`:

```js
const nextConfig = {
  output: 'standalone',   // ← add this
  pageExtensions: [...],
  images: { ... },
};
```

---

## SEO Checklist

- [x] `<title>` and `<meta description>` on every page
- [x] Open Graph tags for social sharing
- [x] `robots.txt` generated by next-sitemap
- [x] `sitemap.xml` auto-generated on build
- [x] RSS feed at `/blog/rss.xml`
- [x] Canonical URLs
- [ ] Add `public/og-image.png` (1200×630px) for social previews
- [ ] Verify with Google Search Console after deployment

---

## Performance Tips

- Images: use `next/image` with `priority` prop on hero images
- Fonts: already using `display: swap` for all Google Fonts
- GitHub API: responses are cached for 1 hour via `next: { revalidate: 3600 }`
- Static pages: blog posts are statically generated at build time

---

## License

MIT — feel free to use this as a template.
