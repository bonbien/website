# Bright Luxury Redesign — Bốn Biển Homepage

**Date:** 2026-05-04
**Status:** Approved (proceed to implementation plan)
**Direction:** Editorial White (option B from style brainstorm)

## Goal

Convert the current dark-elegant homepage to a bright, luxurious editorial aesthetic — gallery / magazine feel — while keeping the site's structure, content, and i18n behaviour intact.

The user's stated motivation: the dark theme was meant to feel premium but reads "too dark." We want bright + premium, not bright + casual.

## Reference

Aesop, Vogue, Nobu, premium boutique hotel sites — pure white surfaces, dramatic display serif headings, thin gold rule accents, sharp rectangular images, generous whitespace, strong charcoal–white contrast.

## Scope

**In scope:**
- `src/styles/theme.css` — color tokens (light), shape radii (sharper), section spacing
- `src/styles/typography.css` — display serif (Playfair Display) + sans (Inter) Google Fonts; heading sizes/weights
- `src/pages/[...lang]/index.astro` — section-level CSS rewrite (hero, gallery, about, menu, location)
- `src/components/core/Header.astro`, `Footer.astro`, `Nav.astro` — color/border adjustments to fit light theme
- `src/components/LanguageSwitcher.astro` — color tweaks if needed
- `src/layouts/Base.astro` / `Page.astro` — body bg + meta theme-color update

**Out of scope:**
- Content / copy changes (Korean / English / Vietnamese / Russian translations stay as-is)
- Image assets (existing `/public/assets/images/gallery/*.webp` and `/public/menu/*.jpg` are reused)
- Routing, i18n logic, language redirect, gallery rotation script, lightbox script — all preserved
- 404 page (out of scope unless trivially affected)
- PDF menus
- New sections or removed sections — section list stays the same

## Design Tokens

### Colors

```css
/* Surfaces */
--theme-bg: #FFFFFF;            /* primary background */
--theme-surface-1: #FAFAFA;     /* alternate section background (gallery, menu) */
--theme-surface-2: #F4F1EA;     /* warm card / hover (subtle ivory) */

/* Text */
--theme-on-bg: #1A1A1A;         /* primary charcoal */
--theme-text-secondary: #6B6B6B; /* muted body */
--theme-text-tertiary: #9A8055;  /* warm brass — used for eyebrows, gold rules */

/* Brand / accent */
--theme-primary: #1A1A1A;        /* solid CTA bg */
--theme-on-primary: #FFFFFF;
--theme-primary-hover: #000000;
--theme-accent-gold: #9A8055;    /* thin rules, eyebrows, hover underlines */
--theme-border: #EFEFEF;         /* hairlines */
--theme-border-warm: #E8E2D2;    /* warm hairlines (location dividers) */

/* KakaoTalk yellow stays for the kakao CTA only */
--kakao-yellow: rgb(255, 239, 0);
--kakao-on-yellow: #3C1E1E;
```

### Shape

```css
--theme-shape-radius: 0;          /* was clamp(1rem, 2rem, 3rem) */
--theme-button-border-radius: 0;  /* was 3rem — sharp rectangular buttons */
--theme-image-radius: 0;          /* gallery + menu images go sharp */
```

Single exception: the Kakao CTA keeps a small pill radius (24px) so the brand button remains recognizable — see "Kakao decision" below.

### Typography

Add Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Or self-host via existing `/public/assets/fonts/` pattern (preferred for Lighthouse score — implementation plan will decide).

```css
--theme-font-family-serif: 'Playfair Display', 'Noto Serif KR', Georgia, serif;
--theme-font-family-sans: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
```

Type scale (kept similar to current but with editorial proportions):
- Hero title (h1): clamp(3rem, 6vw, 5rem), weight 500, letter-spacing -0.005em, line-height 0.95
- Section title (h2): clamp(2rem, 3.5vw, 2.8rem), weight 400-500, letter-spacing -0.005em
- Menu item name (h3): clamp(1.5rem, 2.5vw, 2.1rem), weight 500
- Eyebrow / label: 0.62-0.7rem, Inter 500, letter-spacing 0.32-0.45em, uppercase, color `--theme-text-tertiary`
- Body: existing base size, line-height 1.65-1.85, weight 300-400, color `--theme-text-secondary`
- Italic accent (subtitle, descriptors): Playfair italic, weight 400, color `--theme-text-secondary`

### Spacing

- Section vertical padding: 6.5rem desktop / 4rem mobile (was 6rem / 4rem — slightly more generous)
- Section heading margin-bottom: 4rem (was 2rem)
- Container max-width unchanged

### Lines / Dividers

- Thin gold rule (1px × 36px) used as separator under eyebrow text or above CTAs
- Hairline section borders use `--theme-border` (#EFEFEF) for cool, `--theme-border-warm` for content boundaries (e.g., location columns)

## Component-by-Component Changes

### Hero (`src/pages/[...lang]/index.astro`)

**Current:** Full-viewport photo, brightness 0.4 + dark gradient overlay, white logo + subtitle + yellow Kakao button centered. Event banner pinned at bottom.

**New:** Two-row layout.
- Top row (380px desktop / 280px mobile): full-width photo, **no darkening**, no gradient. Photo shows in true color. Optional small caption pill bottom-right ("Cam Ranh, Vietnam") for editorial feel — confirm during implementation.
- Bottom row (auto, ~420px desktop): white plate (`--theme-bg`) with stacked: eyebrow ("Vietnamese Coastal Seafood") → large Playfair `Bốn Biển` wordmark → italic Playfair subtitle ("— four seas, one table —" or t('hero.subtitle')) → 36px gold rule → CTA row.

The current `<img src="/logo.svg">` is white; for the white plate we either (a) swap to a dark-fill variant, or (b) replace with text wordmark in Playfair Display (recommended — preserves brand without additional asset, and looks more editorial). Implementation chooses one and notes it in the plan.

CTAs in hero:
- Primary: solid black "Reserve a Table" / `t('cta.reserve')` — opens KakaoTalk window (same handler as current Kakao button)
- Secondary: black-outline ghost "View Menu" → `/menu.pdf`

**Kakao decision:** The current standalone yellow Kakao button moves into the hero CTA row but switches to **black solid** treatment. Kakao brand yellow does not coexist well with the editorial-white aesthetic. The button text (`t('kakao.cta')`) and click handler (open KakaoTalk chat popup) remain. We trade one beat of brand-recognition for visual coherence.

If during implementation it feels too cold and Korean visitors lose the visual cue, fallback: a small Kakao-yellow "icon-only" pill next to the dark CTA, or a Kakao yellow accent stripe — implementation plan should leave a small toggle flag so this is easy to revert.

### Event Banner

**Current:** Floating element pinned at bottom of hero, white text on dark photo.

**New:** Thin **dark announcement strip at the very top of the page** (above the nav). Black bg (#1A1A1A), white body text, gold (`--theme-accent-gold`) eyebrow word ("OPENING EVENT"). 0.65rem, 0.32em tracking, uppercase. Two items inline, separated by a centered dot. On mobile, stacks vertically.

This frees the hero from competing elements and acts like a magazine wrap-band.

### Gallery

**Current:** 4-col grid, 0.75rem gap, 8px border-radius, auto-rotate every 4s.

**New:** Same 4-col grid (2-col mobile), gap reduced to 0.5rem, **border-radius 0** (sharp), background `--theme-surface-1`. Auto-rotation logic unchanged. Lightbox unchanged but lightbox bg goes from black to charcoal #0F0F0F (still dark for photo viewing).

### About + Features

**Current:** Centered title + body text, then 2-col features grid (uppercase title + body).

**New:** Centered eyebrow ("ABOUT") in gold + Playfair section title + lead paragraph + thin 1px hairline (--theme-border-warm) + 2-col features grid. Each feature gets a small italic Playfair "— 01" / "— 02" enumerator in gold above the title. Feature title in Playfair, body in Inter.

### Menu Showcase

**Current:** 5 items, alternating left/right, **circular** 240px images with brightness/saturate filters.

**New:** Same 5 items, same alternation, but **rectangular 4:5** images at full color (no filters). Each item gets:
- Italic Playfair "No. 01" / "No. 02"… enumerator in gold
- Two-line Playfair name with italic descriptor as second line (e.g., "Lobster" / *"in golden sauce"*)
- Inter body description

Mobile stacks vertically (current behaviour preserved). Image hover: subtle scale 1.03 (was 1.05) + filter unchanged or removed.

CTAs at end (Full Menu / Lunch Menu): black solid + black ghost outline (was white-on-dark pills).

### Location

**Current:** 3-col flex layout, centered, dark bg.

**New:** 3-col grid on white bg, separated by **vertical hairlines** (`--theme-border-warm`). Each column: eyebrow label in gold (uppercase, wide tracking) + value in charcoal. Mobile stacks with horizontal hairlines between rows. Phone link hover transitions to gold underline instead of opacity change.

### Header / Nav

**Current:** Likely dark bg with white text/logo.

**New:** White bg, 1px bottom hairline (`--theme-border`), Playfair brand wordmark on left, uppercase Inter nav links (0.22em tracking) middle/right, language switcher with current language emphasized.

### Footer

Minimal: 1px top hairline, gold-tinted small uppercase text (e.g., "Bốn Biển · Cam Ranh · 2025").

### Layout / Base

- `body` bg: `--theme-bg` (white)
- `<meta name="theme-color" content="#FFFFFF">` updated in `Base.astro`
- Lightbox stays dark — keep existing `rgba(0,0,0,0.95)` for photo viewing UX

## What stays exactly the same

- All copy, all i18n keys, all 4 languages
- Routing and language redirect script (`sessionStorage.langRedirected`)
- Gallery auto-rotation logic and lightbox keyboard/popstate handling
- Astro structure, file layout, components organization
- Icons via astro-icon
- Fonts loading mechanism (Lighthouse-friendly)
- KakaoTalk chat popup open behaviour
- PDF menu links

## Edge cases / risks

- **Korean / Vietnamese / Russian glyph coverage** — Playfair Display lacks Korean and Vietnamese diacritic coverage. Solution: serif stack falls through to `'Noto Serif KR'` for Korean, system serif for Vietnamese diacritics. The Bốn Biển wordmark uses Vietnamese diacritics — verify Playfair renders ơ and ể correctly (it does — Playfair includes Latin Extended). For Korean h1 in `/ko/`, fallback to Noto Serif KR is intentional and acceptable.
- **Hero photo without darkening** may have insufficient contrast for any text overlay. Solution: text moves to white plate below the photo, so no overlay legibility problem.
- **Korean users losing Kakao yellow recognition** — flagged above. Implementation leaves room for revert.
- **Lighthouse performance** — Playfair Display + Inter from Google Fonts add network requests. Self-hosting via `/public/assets/fonts/` is preferred to keep the perfect Lighthouse score the README advertises.

## Acceptance criteria

- All 4 language pages (`/`, `/ko/`, `/vi/`, `/ru/`) render with the new theme without layout breakage
- Gallery rotation + lightbox keep working
- Mobile (≤640px), tablet (≤968px), desktop ≥1240px all render correctly
- Kakao CTA still opens the KakaoTalk popup window
- No regression in Lighthouse score (Performance, Accessibility, SEO, Best Practices) vs main
- Dark elements (lightbox, top announcement strip) remain dark intentionally — verified contrast
