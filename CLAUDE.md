# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site for Yaz A. Caleb built with Next.js 14, React 18, and Tailwind CSS. The site features:
- A homepage with dynamic content sections
- An essays/blog system with MDX support
- Dark mode theme switching
- RSS feed generation
- Dynamic OG image generation
- Static site generation for essays

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Run development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start
```

## Architecture

### Content Management System

Essays are stored as Markdown files in `data/essays/` with frontmatter metadata. The system uses:
- **gray-matter** for parsing frontmatter
- **next-mdx-remote** for rendering MDX content
- **remark-gfm** for GitHub Flavored Markdown support
- **sugar-high** for syntax highlighting

Each essay file includes:
```yaml
---
title: "Essay Title"
publishedAt: "YYYY-MM-DD"
summary: "Brief description"
image: "https://..." # optional cover image
featured: true # optional, for homepage display
---
```

### Data Flow

1. **Content Loading**: `app/essays/utils.ts` contains all content loading logic
   - `getEssays()` - Loads all essays from `data/essays/`, caches results
   - `getEssay(slug)` - Loads single essay by slug
   - `getHomepageData()` - Loads `data/home.md` for projects and "Now" section
   - `getBackstoryData()` - Loads `data/backstory.md`

2. **Essay Pages**: Dynamic routes use `app/essays/[slug]/page.tsx`
   - Static generation via `generateStaticParams()`
   - Automatic reading time calculation (200 WPM)
   - "Read next" suggestions based on publish date
   - Custom MDX components via `CustomMDX` from `app/components/mdx.tsx`

3. **MDX Rendering**: Custom components in `app/components/mdx.tsx`
   - Auto-generated heading anchors with slugs
   - Custom link handling (internal vs external)
   - Code syntax highlighting via sugar-high
   - Custom `WikipediaLink` component available in essays

### Routing Structure

```
/                    - Homepage (app/page.tsx)
/essays              - Essay listing (app/essays/page.tsx)
/essays/[slug]       - Individual essay (app/essays/[slug]/page.tsx)
/og                  - Dynamic OG image generation (app/og/route.tsx)
/feed.xml            - RSS feed (app/feed.xml/route.ts)
/sitemap.xml         - Auto-generated sitemap
/robots.txt          - Auto-generated robots.txt
```

### Styling & Theming

- **Tailwind CSS** with custom config in `tailwind.config.ts`
- **Dark mode** via `next-themes` with class-based strategy
- **Typography**: Geist font (sans) for UI, Georgia/serif for essay prose
- **Prose styling**: Uses `@tailwindcss/typography` plugin
- Essay pages use 65ch max-width centered column for optimal readability

### Key Components

- `app/components/mdx.tsx` - MDX rendering with custom components
- `app/components/ThemeToggle.tsx` - Dark/light mode toggle
- `app/components/home/*` - Homepage section components
- `app/components/EssayList.tsx` - Essay listing with filtering
- `app/components/tldr-button.tsx` - TLDR functionality
- `app/essays/WikipediaLink.tsx` - Custom Wikipedia link component

### Static Assets

- Images stored in `public/` directory
- OG images can be external URLs or generated via `/og` route
- Remote images allowed from any HTTPS domain (configured in `next.config.mjs`)

## Content Editing

When adding or editing essays:
1. Create/edit `.md` file in `data/essays/`
2. Include required frontmatter: `title`, `publishedAt`, `summary`
3. Optional frontmatter: `image` (cover), `featured` (homepage display), `ogImage`
4. Use standard Markdown with GFM support (tables, strikethrough, etc.)
5. Can use custom `<WikipediaLink>` component in MDX

## Important Technical Details

- Essays are cached in memory after first load (`essaysCache` in `app/essays/utils.ts`)
- Reading time calculated at 200 words per minute
- Em dashes (—) in content are replaced with ` - ` for better rendering
- Image component configured to allow SVG and all HTTPS remote images
- Date formatting handled by `app/lib/format.ts` using Intl.DateTimeFormat
- RSS feed includes all essays, sorted by publish date

## Deployment

This site is deployed on Vercel (evidenced by `.vercel/` directory and Vercel analytics/speed insights). The build process:
1. Statically generates all essay pages at build time
2. Homepage and essay list are also statically generated
3. OG images are generated on-demand at edge runtime
4. RSS feed generated on-demand
