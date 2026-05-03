# Bright Luxury Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Bốn Biển homepage from dark-elegant to bright editorial-white aesthetic per the approved spec.

**Architecture:** Token-driven cascade. Replace dark color/shape tokens in `theme.css`, add Playfair + Inter to `BaseHead.astro`, then rewrite the homepage section CSS in `[...lang]/index.astro`. Layout chrome (Header/Footer/LanguageSwitcher) inherits via CSS variables. A top dark announcement strip is added via Page.astro's `announcement-bar` slot, replacing the in-hero event banner.

**Tech Stack:** Astro 4, vanilla CSS (no Tailwind), Google Fonts CDN, existing i18n.

**Spec:** `docs/superpowers/specs/2026-05-04-bright-luxury-redesign-design.md`

**Verification approach:** This is a visual/styling project with no unit-test scaffolding. Each task ends with a manual visual check (`npm run dev` → open localhost) and a build check (`npm run build` must succeed) before commit. All 4 language routes (`/`, `/ko/`, `/vi/`, `/ru/`) must render without console errors at the end.

---

## File Plan

| File | Change |
|------|--------|
| `src/styles/theme.css` | Replace dark tokens with light + add gold accent and border tokens |
| `src/styles/typography.css` | Update font-family vars to Playfair + Inter; adjust h1/h2/h3 weights and letter-spacing |
| `src/styles/global.css` | (Likely no change — body bg cascades from `--theme-bg`) |
| `src/components/head/BaseHead.astro` | Add Playfair Display + Inter to existing Google Fonts link; update theme-color meta |
| `src/layouts/Base.astro` | Add `<meta name="theme-color">`; floating Kakao button stays yellow (global contact widget) |
| `src/layouts/Page.astro` | Add top dark announcement strip via `announcement-bar` slot |
| `src/components/core/Header.astro` | Update scrolled bg from `rgba(0,0,0,0.85)` to `rgba(255,255,255,0.92)` + bottom hairline |
| `src/components/core/Footer.astro` | Tweak border-radius to 0; copy color stays via tokens |
| `src/components/LanguageSwitcher.astro` | Replace `border-bottom` color with `--theme-accent-gold`; tighten hover |
| `src/components/Logo.astro` | Add CSS filter to support light backgrounds (or swap to dark variant) |
| `src/pages/[...lang]/index.astro` | Major rewrite: hero structure, gallery sharp corners, about eyebrows, menu rectangles, location hairlines, kakao button → solid black |

---

## Task 1: Add new design tokens to theme.css

**Files:**
- Modify: `src/styles/theme.css` (entire file replacement)

- [ ] **Step 1: Replace `:root` block in `src/styles/theme.css` with light tokens**

```css
:root {
	/* Theme Colors — Bright Editorial (Light) */
	--theme-bg: #FFFFFF;
	--theme-on-bg: #1A1A1A;

	--theme-surface-1: #FAFAFA;          /* alt section background */
	--theme-on-surface-1: #1A1A1A;

	--theme-surface-2: #F4F1EA;          /* warm card / hover */
	--theme-on-surface-2: #1A1A1A;

	/* Brand / CTA */
	--theme-primary: #1A1A1A;            /* solid CTA bg */
	--theme-primary-hover: #000000;
	--theme-on-primary: #FFFFFF;

	/* Text */
	--theme-text-secondary: #6B6B6B;
	--theme-text-tertiary: #9A8055;      /* warm brass — eyebrows, gold rules */

	/* Accents and borders */
	--theme-accent-gold: #9A8055;
	--theme-border: #EFEFEF;
	--theme-border-warm: #E8E2D2;

	/* Kakao brand (used for floating chat button only) */
	--kakao-yellow: rgb(255, 239, 0);
	--kakao-on-yellow: #3C1E1E;

	/* Shapes — sharp editorial */
	--theme-shape-radius: 0;
	--theme-button-border-radius: 0;
	--theme-image-radius: 0;

	/* Transitions */
	--theme-transition: 0.2s ease-in-out;

	/* Layout */
	--section-margin: 6.5rem;
	--theme-grid-gap: 2rem;
	--container-max-width: 1400px;
	--container-max-width-narrow: 900px;
	--container-padding: 0 2rem;

	--theme-blog-post-header-width: 1200px;

	/* Fonts (set in typography.css after fonts load) */
	--theme-font-family-serif: 'Playfair Display', 'Noto Serif KR', Georgia, Cambria, 'Times New Roman', Times, serif;
	--theme-font-family-sans: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: build completes without errors. Pages may look unstyled in spots (expected — fonts not loaded yet, sections not rewritten yet).

- [ ] **Step 3: Commit**

```bash
git add src/styles/theme.css
git commit -m "Switch theme tokens to bright editorial palette"
```

---

## Task 2: Add Playfair Display + Inter to BaseHead

**Files:**
- Modify: `src/components/head/BaseHead.astro:23-26`

- [ ] **Step 1: Replace the Google Fonts link block in `src/components/head/BaseHead.astro`**

Find:
```astro
<!-- Google Fonts - Noto Sans KR -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
```

Replace with:
```astro
<!-- Google Fonts: Playfair Display (display serif) + Inter (UI sans) + Noto Sans KR (Korean fallback) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;500;600&display=swap" rel="stylesheet" />
<meta name="theme-color" content="#FFFFFF" />
```

(Note: Italic Playfair is included for `<em>` descriptors in menu names. Noto Serif KR added for Korean serif fallback.)

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Run dev server and verify fonts load**

Run: `npm run dev`
Open: `http://localhost:4321/`
DevTools → Network tab → filter "fonts.gstatic.com" → expect 4 requests (Playfair, Inter, Noto Sans KR, Noto Serif KR).
DevTools → Console → no errors.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/head/BaseHead.astro
git commit -m "Add Playfair Display + Inter fonts and white theme-color"
```

---

## Task 3: Update typography.css headings

**Files:**
- Modify: `src/styles/typography.css:91-119`

- [ ] **Step 1: Replace heading rules in `src/styles/typography.css`**

Find the block from `h1, h2, h3 {` through `h3 { font-weight: 500; }` and replace with:

```css
h1,
h2,
h3 {
	font-family: var(--theme-font-family-serif);
	font-weight: 500;
	letter-spacing: -0.005em;
	line-height: 1.05;
}

h1 {
	font-size: var(--font-size-xxl);
}

h2 {
	font-size: var(--font-size-xl);
}

h3 {
	font-size: var(--font-size-lg);
	font-weight: 500;
}

h1,
h2 {
	line-height: 1.05;
	font-weight: 500;
}
```

Also update the body block at `src/styles/typography.css:77-89` — change `font-weight: 300;` line to:

```css
	font-weight: 400;
```

(Inter at 300 is too light for body. 400 reads as the editorial baseline.)

Also update the heading margin block at `src/styles/typography.css:131-137` — change `letter-spacing: -0.02em` to `letter-spacing: -0.005em`.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/styles/typography.css
git commit -m "Refine heading weights and letter-spacing for Playfair display"
```

---

## Task 4: Update Header chrome for light theme

**Files:**
- Modify: `src/components/core/Header.astro:46-104`

- [ ] **Step 1: Replace the `<style>` block in `src/components/core/Header.astro`**

Replace from `<style>` to `</style>` with:

```html
<style>
  header {
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: transparent;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    border-bottom: 1px solid transparent;
  }
  header.scrolled {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: var(--theme-border);
  }
  header.header--right {
    display: grid;
    grid-template-columns: 1fr auto auto;
  }
  .header-logo__link {
    width: fit-content;
    color: inherit;
    text-decoration: none;
  }
  .header-logo-menu__container {
    display: flex;
    align-items: center;
    z-index: 100;
  }
  .header-action-item__container {
    z-index: 100;
  }
  nav {
    display: flex;
  }
  nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }
  nav ul li a {
    text-decoration: none;
    margin-right: 1rem;
    color: var(--theme-on-bg);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.7;
    transition: opacity linear 150ms;
  }
  nav ul li a:hover {
    opacity: 1;
  }
  @media(max-width: 600px) {
    .header-nav__container {
      display: none;
    }
  }
</style>
```

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/core/Header.astro
git commit -m "Light theme for sticky header with hairline border"
```

---

## Task 5: Update Logo for light backgrounds

**Files:**
- Modify: `src/components/Logo.astro`

- [ ] **Step 1: Replace `src/components/Logo.astro` entirely with**

```astro
---
---

<img src="/logo.svg" alt="Bốn Biển" class="site-logo" />

<style>
	.site-logo {
		height: 40px;
		width: auto;
		filter: invert(1) brightness(0);
		transition: opacity 0.2s ease;
	}
	.site-logo:hover {
		opacity: 0.7;
		cursor: pointer;
	}
</style>
```

The `filter: invert(1) brightness(0)` flips the white-filled SVG paths to solid black, matching the editorial palette without needing a new asset.

- [ ] **Step 2: Run build and dev**

Run: `npm run build`
Run: `npm run dev`
Open: `http://localhost:4321/` → confirm the logo appears dark in the header. Stop dev.

- [ ] **Step 3: Commit**

```bash
git add src/components/Logo.astro
git commit -m "Invert logo fill to render dark on light header"
```

---

## Task 6: Update Footer for light theme

**Files:**
- Modify: `src/layouts/Page.astro:35-46`
- Modify: `src/components/core/Footer.astro:69-77`

- [ ] **Step 1: Update Footer background prop in `src/layouts/Page.astro`**

Find:
```astro
<Footer
    slot="footer"
    background="var(--theme-surface-1)"
    color="var(--theme-on-surface-1)"
```

Replace with:
```astro
<Footer
    slot="footer"
    background="var(--theme-bg)"
    color="var(--theme-on-bg)"
```

- [ ] **Step 2: Update the footer CSS in `src/components/core/Footer.astro`**

Find:
```css
  footer {
    --footer-bg: var(--theme-primary);
    --footer-color: var(--theme-on-primary);
    background-color: var(--footer-bg);
    color: var(--footer-color);
    border-top-left-radius: var(--theme-shape-radius);
    border-top-right-radius: var(--theme-shape-radius);
  }
```

Replace with:
```css
  footer {
    --footer-bg: var(--theme-bg);
    --footer-color: var(--theme-on-bg);
    background-color: var(--footer-bg);
    color: var(--footer-color);
    border-top: 1px solid var(--theme-border);
  }
```

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Page.astro src/components/core/Footer.astro
git commit -m "Footer adopts light bg with hairline top border"
```

---

## Task 7: Update LanguageSwitcher accent color

**Files:**
- Modify: `src/components/LanguageSwitcher.astro:54-56`

- [ ] **Step 1: Replace the `.lang-link.active` rule in `src/components/LanguageSwitcher.astro`**

Find:
```css
	.lang-link.active {
		opacity: 1;
		border-bottom: 1px solid var(--theme-on-bg);
	}
```

Replace with:
```css
	.lang-link.active {
		opacity: 1;
		color: var(--theme-on-bg);
		border-bottom: 1px solid var(--theme-accent-gold);
	}
```

Also adjust the inactive `.lang-link` color from `var(--theme-on-bg)` to itself (no change needed — the cascade now resolves to dark charcoal on light bg).

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/LanguageSwitcher.astro
git commit -m "Active lang link uses brass gold underline"
```

---

## Task 8: Add top announcement strip via Page.astro slot

**Files:**
- Modify: `src/layouts/Page.astro` (add announcement slot content)
- Modify: `src/i18n/utils.js` (no change — just confirming `useTranslations` is exported)
- Modify: `src/pages/[...lang]/index.astro` (remove inline event banner from hero)

- [ ] **Step 1: Add an announcement strip block to `src/layouts/Page.astro`**

Update `src/layouts/Page.astro`. Replace the entire file with:

```astro
---
import { Header, Button, Footer } from '@components/odyssey-theme';
import Layout from './Base.astro';
import type { Props as BaseHeadProps } from '../components/head/BaseHead.astro';
import Logo from '../components/Logo.astro';
import LanguageSwitcher from '../components/LanguageSwitcher.astro';
import settings from '../config/settings';
import { getFooterLists, footerSocials, businessInfo } from '../config/footer';
import { getLangFromUrl, useTranslations } from '../i18n/utils';

export interface Props {
	seo?: BaseHeadProps;
}

import { getNav } from '../config/nav.js';

const { seo } = Astro.props as Props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const nav = getNav(lang);
const footerLists = getFooterLists(lang);
---

<Layout seo={seo}>
	<div class="announcement-bar" slot="announcement-bar">
		<span class="announcement-bar__label">OPENING&nbsp;EVENT</span>
		<span class="announcement-bar__item">{t('event.pickup')}</span>
		<span class="announcement-bar__divider">·</span>
		<span class="announcement-bar__item">{t('event.review')}</span>
	</div>
	<Header rightMenu navData={nav} slot="header">
		<span slot="logo">
			<Logo />
		</span>
		<span slot="action-item">
			<LanguageSwitcher />
		</span>
	</Header>
	<div id="page">
		<slot />
	</div>
	<Footer
		slot="footer"
		background="var(--theme-bg)"
		color="var(--theme-on-bg)"
		footerLists={footerLists}
		footerSocials={footerSocials}
		businessInfo={businessInfo}
		copyrightName={settings.name}
		showPlug={settings.showPlug}
	>
		<Logo slot="logo" />
	</Footer>
</Layout>

<style>
	.announcement-bar {
		background: #1A1A1A;
		color: #FFFFFF;
		font-family: var(--theme-font-family-sans);
		font-size: 0.65rem;
		font-weight: 400;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		padding: 0.55rem 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.4rem;
		flex-wrap: wrap;
		text-align: center;
	}
	.announcement-bar__label {
		color: var(--theme-accent-gold);
		font-weight: 500;
	}
	.announcement-bar__divider {
		color: rgba(255, 255, 255, 0.35);
	}

	@media (max-width: 640px) {
		.announcement-bar {
			gap: 0.4rem;
			font-size: 0.55rem;
			letter-spacing: 0.22em;
			padding: 0.5rem 0.8rem;
		}
		.announcement-bar__divider {
			display: none;
		}
	}
</style>
```

(Note: this file already has `Page.astro` semantics via `<Layout seo={seo}>` — we just add the slot content for `announcement-bar` and inline its CSS.)

- [ ] **Step 2: Confirm `useTranslations` export exists**

Run: `grep useTranslations src/i18n/utils.js`
Expected: an `export function useTranslations` line. (If missing, this task can't proceed — but the homepage already imports it from the same module, so it's there.)

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Run dev and visually check the strip**

Run: `npm run dev`
Open: `http://localhost:4321/` → confirm a thin dark band sits at the very top with "OPENING EVENT · Free Pickup … · Free Drink …".
Visit `/ko/`, `/vi/`, `/ru/` → confirm strip translates per-language.
Stop dev.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Page.astro
git commit -m "Add top announcement strip with i18n event copy"
```

---

## Task 9: Rewrite Hero section in editorial style

**Files:**
- Modify: `src/pages/[...lang]/index.astro` — replace the entire Hero section markup and its CSS rules

- [ ] **Step 1: Replace the Hero `<section class="hero">…</section>` block**

In `src/pages/[...lang]/index.astro`, replace the `<section class="hero">` block (currently lines ~37-62, including the `<div class="event-banner">…</div>` block — the event banner moves to the announcement strip and is removed from the hero) with:

```astro
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero__photo">
			<img src="/assets/images/gallery/1.webp" alt="Bốn Biển" />
		</div>
		<div class="hero__plate">
			<div class="hero__eyebrow">Vietnamese Coastal Seafood</div>
			<h1 class="hero__title">Bốn Biển</h1>
			<p class="hero__subtitle">{t('hero.subtitle')}</p>
			<div class="hero__rule"></div>
			<div class="hero__cta">
				<button
					class="btn btn--solid"
					onclick="window.open('https://pf.kakao.com/_xeKPQn/chat', 'kakao_chat', 'width=400,height=600')"
				>
					<span>{kakaoText[lang]}</span>
				</button>
				<a href="#about" class="btn btn--ghost">View More</a>
			</div>
		</div>
	</section>
```

- [ ] **Step 2: Replace the Hero CSS in the same file's `<style>` block**

In the `<style>` block of `src/pages/[...lang]/index.astro`, find the rules from `/* Hero Section */` through `/* Event Banner */` (the old `.hero`, `.hero__bg`, `.hero__content`, `.hero__logo`, `.hero__subtitle`, `.kakao-cta-btn` rules) plus the entire `.event-banner*` rule set, and replace with:

```css
	/* Hero — Editorial White */
	.hero {
		background: var(--theme-bg);
		display: grid;
		grid-template-rows: clamp(280px, 45vh, 480px) auto;
	}

	.hero__photo {
		overflow: hidden;
		background: var(--theme-surface-1);
	}

	.hero__photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.hero__plate {
		padding: 4rem 2rem 5rem;
		text-align: center;
		background: var(--theme-bg);
	}

	.hero__eyebrow {
		font-family: var(--theme-font-family-sans);
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.45em;
		text-transform: uppercase;
		color: var(--theme-accent-gold);
		margin-bottom: 1.2rem;
	}

	.hero__title {
		font-family: var(--theme-font-family-serif);
		font-size: clamp(3rem, 7vw, 5.5rem);
		font-weight: 500;
		letter-spacing: -0.005em;
		line-height: 0.95;
		margin: 0 0 1rem;
		color: var(--theme-on-bg);
	}

	.hero__subtitle {
		font-family: var(--theme-font-family-serif);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(1rem, 1.4vw, 1.2rem);
		line-height: 1.6;
		color: var(--theme-text-secondary);
		max-width: 640px;
		margin: 0 auto 0.5rem;
	}

	.hero__rule {
		width: 36px;
		height: 1px;
		background: var(--theme-accent-gold);
		margin: 1.6rem auto 1.4rem;
	}

	.hero__cta {
		display: inline-flex;
		gap: 0.8rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	@media (max-width: 640px) {
		.hero {
			grid-template-rows: 240px auto;
		}
		.hero__plate {
			padding: 2.5rem 1.5rem 3rem;
		}
	}
```

- [ ] **Step 3: Add a shared button rule set (if not already present)**

Append to the same `<style>` block (anywhere — convention: above existing `.button` rule which we replace next):

```css
	/* Buttons — Editorial */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.95rem 1.8rem;
		font-family: var(--theme-font-family-sans);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: var(--theme-button-border-radius);
		border: 1px solid var(--theme-on-bg);
		cursor: pointer;
		transition: background-color 0.2s ease, color 0.2s ease;
		white-space: nowrap;
	}
	.btn--solid {
		background: var(--theme-on-bg);
		color: var(--theme-bg);
	}
	.btn--solid:hover {
		background: var(--theme-primary-hover);
	}
	.btn--ghost {
		background: transparent;
		color: var(--theme-on-bg);
	}
	.btn--ghost:hover {
		background: var(--theme-on-bg);
		color: var(--theme-bg);
	}
```

Also delete the existing `.kakao-cta-btn`, `.kakao-cta-btn:hover`, `.kakao-cta-btn:active`, `.kakao-cta-btn svg` rules (they are no longer used — the inline button now uses `.btn .btn--solid`).

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: success. If it fails on undefined `t('hero.subtitle')` or similar, confirm imports at the top of the page are intact.

- [ ] **Step 5: Run dev and verify hero**

Run: `npm run dev`
Open: `http://localhost:4321/`
Verify:
- Photo occupies upper portion (≈45vh), full color, no darkening
- White plate below with eyebrow, large serif title, italic subtitle, gold rule, two buttons
- KakaoTalk inquiry button (text per `kakaoText[lang]`) is now solid black
- Visit `/ko/`, `/vi/`, `/ru/` — subtitles translate; click KakaoTalk button → opens chat popup
- Mobile (resize to 380px) — photo shrinks to 240px, plate padding compresses

Stop dev.

- [ ] **Step 6: Commit**

```bash
git add src/pages/[...lang]/index.astro
git commit -m "Rewrite hero as photo + white plate with editorial typography"
```

---

## Task 10: Restyle Gallery (sharp corners, tighter gap)

**Files:**
- Modify: `src/pages/[...lang]/index.astro` — gallery CSS rules

- [ ] **Step 1: Replace gallery CSS rules**

In `src/pages/[...lang]/index.astro`'s `<style>` block, find `/* Gallery Section */` and the `.gallery`, `.gallery__grid`, `.gallery__item`, `.gallery__item.fade-out`, `.gallery__item img`, `.gallery__item:hover img`, and second `.gallery__item img` blocks. Replace with:

```css
	/* Gallery — Editorial */
	.gallery {
		padding: 5rem 0;
		background: var(--theme-surface-1);
	}

	.gallery__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.gallery__item {
		aspect-ratio: 4/3;
		overflow: hidden;
		opacity: 1;
		transition: opacity 0.5s ease;
	}

	.gallery__item.fade-out {
		opacity: 0;
	}

	.gallery__item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		display: block;
	}

	.gallery__item:hover img {
		transform: scale(1.04);
	}
```

Also update the responsive overrides for `.gallery__grid` further down (in the `@media (max-width: 968px)` and `@media (max-width: 640px)` blocks) — they already exist with correct breakpoint targets, just verify the `gap` is `0.4rem` on mobile and `0.5rem` on tablet (or unify to `0.4rem`).

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Run dev and verify**

Run: `npm run dev`
Open: `http://localhost:4321/` → scroll to gallery → confirm:
- Tiles have sharp 90° corners (no rounded radius)
- Bg is off-white `#FAFAFA`
- Auto-rotation still cycles every 4 seconds
- Click a tile → lightbox opens (still dark — by design)

Stop dev.

- [ ] **Step 4: Commit**

```bash
git add src/pages/[...lang]/index.astro
git commit -m "Sharpen gallery corners and tighten grid for editorial look"
```

---

## Task 11: Restyle About + Features section

**Files:**
- Modify: `src/pages/[...lang]/index.astro` — markup of `<section id="about">` and CSS rules

- [ ] **Step 1: Replace the About section markup**

Find in `src/pages/[...lang]/index.astro`:

```astro
	<!-- About + Features -->
	<section id="about" class="about">
		<Container>
			<div class="about__content scroll-animate">
				<h2 class="section-title center">{t('about.title')}</h2>
				<p class="about__text">{t('about.text1')}</p>
			</div>
			<div class="features__grid">
				<div class="feature scroll-animate">
					<h3 class="feature__title">{t('feature.traditional')}</h3>
					<p class="feature__desc">{t('feature.traditional.desc')}</p>
				</div>
				<div class="feature scroll-animate">
					<h3 class="feature__title">{t('feature.view')}</h3>
					<p class="feature__desc">{t('feature.view.desc')}</p>
				</div>
			</div>
		</Container>
	</section>
```

Replace with:

```astro
	<!-- About + Features -->
	<section id="about" class="about">
		<Container>
			<div class="about__content scroll-animate">
				<div class="eyebrow">About</div>
				<h2 class="section-title">{t('about.title')}</h2>
				<p class="about__text">{t('about.text1')}</p>
			</div>
			<div class="features__grid">
				<div class="feature scroll-animate">
					<div class="feature__num">— 01</div>
					<h3 class="feature__title">{t('feature.traditional')}</h3>
					<p class="feature__desc">{t('feature.traditional.desc')}</p>
				</div>
				<div class="feature scroll-animate">
					<div class="feature__num">— 02</div>
					<h3 class="feature__title">{t('feature.view')}</h3>
					<p class="feature__desc">{t('feature.view.desc')}</p>
				</div>
			</div>
		</Container>
	</section>
```

- [ ] **Step 2: Replace About-related CSS**

In the `<style>` block, replace the rules `/* Section Title */`, `/* About Section */`, `.about__content`, `.about__text`, `.about .features__grid`, `.feature`, `.feature__title`, `.feature__desc` with:

```css
	/* Eyebrow label */
	.eyebrow {
		font-family: var(--theme-font-family-sans);
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.45em;
		text-transform: uppercase;
		color: var(--theme-accent-gold);
		margin-bottom: 1rem;
		text-align: center;
	}

	/* Section Title */
	.section-title {
		font-family: var(--theme-font-family-serif);
		font-size: clamp(1.8rem, 3vw, 2.6rem);
		font-weight: 500;
		letter-spacing: -0.005em;
		line-height: 1.1;
		margin: 0 0 1.4rem;
		color: var(--theme-on-bg);
		text-align: center;
	}

	/* About Section */
	.about {
		padding: 6.5rem 0;
		background: var(--theme-bg);
	}

	.about__content {
		max-width: 760px;
		margin: 0 auto 4rem;
		text-align: center;
	}

	.about__text {
		max-width: 640px;
		margin: 0 auto;
		font-size: clamp(0.92rem, 1.1vw, 1.05rem);
		line-height: 1.85;
		font-weight: 400;
		color: var(--theme-text-secondary);
	}

	.about .features__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
		max-width: 820px;
		margin: 0 auto;
		padding-top: 2.5rem;
		border-top: 1px solid var(--theme-border-warm);
	}

	.feature {
		text-align: left;
	}

	.feature__num {
		font-family: var(--theme-font-family-serif);
		font-style: italic;
		font-size: 0.95rem;
		color: var(--theme-accent-gold);
		margin-bottom: 0.6rem;
	}

	.feature__title {
		font-family: var(--theme-font-family-serif);
		font-size: 1.25rem;
		font-weight: 500;
		letter-spacing: -0.005em;
		margin-bottom: 0.6rem;
		color: var(--theme-on-bg);
		text-transform: none;
	}

	.feature__desc {
		font-size: clamp(0.88rem, 1.1vw, 0.98rem);
		line-height: 1.75;
		font-weight: 400;
		color: var(--theme-text-secondary);
	}
```

- [ ] **Step 3: Update mobile breakpoints**

Find `@media (max-width: 640px) { .about .features__grid { grid-template-columns: 1fr; gap: 0.75rem; } }` (or similar at line ~889) and update to:

```css
	@media (max-width: 640px) {
		/* …other rules unchanged… */
		.about .features__grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.about {
			padding: 4rem 0;
		}
	}
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Open: `http://localhost:4321/#about` → confirm:
- Gold "ABOUT" eyebrow
- Large serif title
- Body text below in muted grey
- Hairline above features
- Two features each with italic gold "— 01" / "— 02" enumerator

Visit `/ko/#about` → text translates correctly.

Stop dev.

- [ ] **Step 6: Commit**

```bash
git add src/pages/[...lang]/index.astro
git commit -m "Restyle About section with eyebrow, hairline, italic enumerators"
```

---

## Task 12: Restyle Menu Showcase (rectangles, italic descriptors)

**Files:**
- Modify: `src/pages/[...lang]/index.astro` — menu markup and CSS

- [ ] **Step 1: Replace the entire menu markup**

Find `<!-- Menu Showcase -->` through the closing `</section>` after `.menu__cta`. Replace with:

```astro
	<!-- Menu Showcase -->
	<section class="menu">
		<Container>
			<div class="menu__head scroll-animate">
				<div class="eyebrow">Signature Dishes</div>
				<h2 class="section-title">{t('menu.title')}</h2>
			</div>

			<div class="menu__item scroll-animate">
				<div class="menu__image">
					<img src="/menu/lobster-golden-sauce.jpg" alt={t('menu.lobster')} />
				</div>
				<div class="menu__info">
					<div class="menu__num">No. 01</div>
					<h3 class="menu__name">{t('menu.lobster')}</h3>
					<p class="menu__description">{t('menu.lobster.desc')}</p>
				</div>
			</div>

			<div class="menu__item menu__item--reverse scroll-animate">
				<div class="menu__image">
					<img src="/menu/crab-chili-sauce.jpg" alt={t('menu.crab')} />
				</div>
				<div class="menu__info">
					<div class="menu__num">No. 02</div>
					<h3 class="menu__name">{t('menu.crab')}</h3>
					<p class="menu__description">{t('menu.crab.desc')}</p>
				</div>
			</div>

			<div class="menu__item scroll-animate">
				<div class="menu__image">
					<img src="/menu/shrimp-garlic-butter.jpg" alt={t('menu.shrimp')} />
				</div>
				<div class="menu__info">
					<div class="menu__num">No. 03</div>
					<h3 class="menu__name">{t('menu.shrimp')}</h3>
					<p class="menu__description">{t('menu.shrimp.desc')}</p>
				</div>
			</div>

			<div class="menu__item menu__item--reverse scroll-animate">
				<div class="menu__image">
					<img src="/menu/geoduck-scallion-oil.jpg" alt={t('menu.geoduck')} />
				</div>
				<div class="menu__info">
					<div class="menu__num">No. 04</div>
					<h3 class="menu__name">{t('menu.geoduck')}</h3>
					<p class="menu__description">{t('menu.geoduck.desc')}</p>
				</div>
			</div>

			<div class="menu__item scroll-animate">
				<div class="menu__image">
					<img src="/menu/squid-grilled.jpg" alt={t('menu.squid')} />
				</div>
				<div class="menu__info">
					<div class="menu__num">No. 05</div>
					<h3 class="menu__name">{t('menu.squid')}</h3>
					<p class="menu__description">{t('menu.squid.desc')}</p>
				</div>
			</div>

			<div class="menu__cta scroll-animate">
				<a href="/menu.pdf" target="_blank" class="btn btn--solid">{t('menu.view')}</a>
				<a href="/lunch-menu.pdf" target="_blank" class="btn btn--ghost">{t('menu.lunch')}</a>
			</div>
		</Container>
	</section>
```

- [ ] **Step 2: Replace menu CSS**

In the `<style>` block, replace the rules `/* Menu Section */`, `.menu__item`, `.menu__item--reverse`, `.menu__item--reverse > *`, `.menu__image`, `.menu__image img`, `.menu__item:hover .menu__image img`, `.menu__info`, `.menu__item--reverse .menu__info`, `.menu__name`, `.menu__description`, `.menu__cta`, `.button`, `.button:hover`, `.button--secondary`, `.button--secondary:hover` with:

```css
	/* Menu — Editorial */
	.menu {
		padding: 6.5rem 0;
		background: var(--theme-surface-1);
	}

	.menu__head {
		text-align: center;
		max-width: 720px;
		margin: 0 auto 4.5rem;
	}

	.menu__item {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		max-width: 1000px;
		margin: 0 auto 4rem;
	}

	.menu__item--reverse {
		direction: rtl;
	}
	.menu__item--reverse > * {
		direction: ltr;
	}

	.menu__image {
		aspect-ratio: 4/5;
		overflow: hidden;
	}

	.menu__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		display: block;
	}

	.menu__item:hover .menu__image img {
		transform: scale(1.03);
	}

	.menu__info {
		padding: 0.5rem 0;
	}

	.menu__num {
		font-family: var(--theme-font-family-serif);
		font-style: italic;
		font-size: 0.95rem;
		color: var(--theme-accent-gold);
		margin-bottom: 0.6rem;
	}

	.menu__name {
		font-family: var(--theme-font-family-serif);
		font-size: clamp(1.5rem, 2.5vw, 2.1rem);
		font-weight: 500;
		letter-spacing: -0.005em;
		line-height: 1.1;
		margin: 0 0 1rem;
		color: var(--theme-on-bg);
	}

	.menu__description {
		font-size: clamp(0.88rem, 1.1vw, 0.98rem);
		line-height: 1.8;
		font-weight: 400;
		color: var(--theme-text-secondary);
		max-width: 380px;
	}

	.menu__cta {
		text-align: center;
		margin-top: 5rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
```

- [ ] **Step 3: Update mobile breakpoints for menu**

In the `@media (max-width: 968px)` block, find:

```css
		.menu__item,
		.menu__item--reverse {
			grid-template-columns: 1fr;
			gap: 0.5rem;
			margin-bottom: 1.5rem;
			direction: ltr;
			justify-items: center;
		}

		.menu__info,
		.menu__item--reverse .menu__info {
			justify-self: center;
			text-align: center;
		}

		.menu__image {
			width: 220px;
			height: 220px;
		}
```

Replace with:

```css
		.menu__item,
		.menu__item--reverse {
			grid-template-columns: 1fr;
			gap: 1.5rem;
			margin-bottom: 3rem;
			direction: ltr;
		}

		.menu__info {
			text-align: left;
		}

		.menu__image {
			width: 100%;
			max-width: 420px;
			margin: 0 auto;
			aspect-ratio: 4/5;
			height: auto;
		}
```

In the `@media (max-width: 640px)` block, find:

```css
		.menu__image {
			width: 180px;
			height: 180px;
		}
```

Replace with:

```css
		.menu__image {
			max-width: 100%;
			aspect-ratio: 4/5;
		}
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Open: `http://localhost:4321/` → scroll to menu → confirm:
- 5 dishes alternate left/right
- Images are rectangular (4:5), no rounded corners, full-color (no darkening filter)
- Italic gold "No. 01"…"No. 05" labels
- Large serif names
- Hover scales image slightly
- Bottom CTAs render as black solid + black ghost outline
- Mobile (≤640px): items stack, image fills width with 4:5 ratio

Visit `/ko/`, `/vi/`, `/ru/` → menu names translate.

Stop dev.

- [ ] **Step 6: Commit**

```bash
git add src/pages/[...lang]/index.astro
git commit -m "Convert menu items to rectangular editorial cards"
```

---

## Task 13: Restyle Location section with vertical hairlines

**Files:**
- Modify: `src/pages/[...lang]/index.astro` — location markup and CSS

- [ ] **Step 1: Replace the location markup**

Find `<!-- Location -->` through `</section>`. Replace with:

```astro
	<!-- Location -->
	<section id="contact" class="location">
		<Container>
			<div class="location__details scroll-animate">
				<div class="detail">
					<div class="detail__label">{t('location.address')}</div>
					<p class="detail__value">{t('location.address.value')}</p>
				</div>

				<div class="detail">
					<div class="detail__label">{t('location.hours')}</div>
					<p class="detail__value">{t('location.hours.weekdays')}</p>
					<p class="detail__value">{t('location.hours.closed')}</p>
				</div>

				<div class="detail">
					<div class="detail__label">{t('location.contact')}</div>
					<p class="detail__value"><a href={`tel:${t('location.contact.value')}`}>{t('location.contact.value')}</a></p>
				</div>
			</div>
		</Container>
	</section>
```

- [ ] **Step 2: Replace location CSS**

In the `<style>` block, replace `/* Location Section */`, `.location`, `.location__details`, `.detail`, `.detail__label`, `.detail__value`, `.detail__value a`, `.detail__value a:hover` with:

```css
	/* Location — Editorial */
	.location {
		padding: 5.5rem 0;
		background: var(--theme-bg);
	}

	.location__details {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		max-width: 920px;
		margin: 0 auto;
	}

	.detail {
		text-align: center;
		padding: 0 1.5rem;
		border-right: 1px solid var(--theme-border-warm);
	}
	.detail:last-child {
		border-right: 0;
	}

	.detail__label {
		font-family: var(--theme-font-family-sans);
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.45em;
		text-transform: uppercase;
		color: var(--theme-accent-gold);
		margin-bottom: 1.2rem;
	}

	.detail__value {
		font-size: clamp(0.88rem, 1.1vw, 0.98rem);
		line-height: 1.7;
		font-weight: 400;
		color: var(--theme-on-bg);
		margin-bottom: 0.4rem;
	}

	.detail__value a {
		color: var(--theme-on-bg);
		text-decoration: none;
		transition: color 0.2s ease, border-color 0.2s ease;
		border-bottom: 1px solid transparent;
	}

	.detail__value a:hover {
		color: var(--theme-accent-gold);
		border-bottom-color: var(--theme-accent-gold);
	}
```

- [ ] **Step 3: Update mobile breakpoints**

In the `@media (max-width: 968px)` block, replace any location-related rules with:

```css
		.location__details {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.detail {
			border-right: 0;
			border-bottom: 1px solid var(--theme-border-warm);
			padding: 2rem 1rem;
		}
		.detail:last-child {
			border-bottom: 0;
		}
```

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Open: `http://localhost:4321/#contact` → confirm:
- 3 columns with gold uppercase labels
- Vertical warm hairlines between columns
- Phone number underlines in gold on hover
- Mobile: stacks with horizontal hairlines

Stop dev.

- [ ] **Step 6: Commit**

```bash
git add src/pages/[...lang]/index.astro
git commit -m "Location section uses warm hairlines and gold accent labels"
```

---

## Task 14: Final cleanup — Lightbox bg + global verification

**Files:**
- Modify: `src/pages/[...lang]/index.astro` — lightbox CSS only

- [ ] **Step 1: Soften lightbox background**

In the `<style>` block, find:

```css
	.lightbox {
		/* … */
		background: rgba(0, 0, 0, 0.95);
```

Change to:

```css
	.lightbox {
		/* … */
		background: rgba(15, 15, 15, 0.96);
```

(Lightbox stays dark intentionally — photos read better on dark background. The slight charcoal tint matches the announcement-strip black.)

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Full visual sweep — desktop**

Run: `npm run dev`
For each URL: `http://localhost:4321/`, `http://localhost:4321/ko/`, `http://localhost:4321/vi/`, `http://localhost:4321/ru/`:
- Page loads, no console errors (DevTools → Console)
- Top dark announcement strip shows translated event copy
- Header is sticky, transparent over hero photo, white-blur after scroll
- Hero shows photo + white plate + Kakao button (text translated) + ghost button
- Gallery shows sharp 4-col tiles, auto-rotates, lightbox opens on click
- About: gold eyebrow + serif title + features
- Menu: 5 alternating dishes, rectangular images, italic numbering
- Location: 3-col with vertical hairlines
- Footer at bottom, white bg, hairline border on top
- Floating yellow Kakao bubble bottom-right (intentionally yellow as global widget)
- Click Kakao buttons → KakaoTalk popup window opens

- [ ] **Step 4: Mobile sweep**

Resize browser to ≤640px (or use DevTools device toolbar):
- Announcement strip stacks/compresses
- Hero photo shrinks to 240px, plate compresses
- Gallery 2-col
- Menu items stack vertically with 4:5 image
- Location stacks with horizontal hairlines

- [ ] **Step 5: Tablet sweep**

Resize to ≤968px:
- Gallery 2-col (already)
- Menu items stack
- Location 1-col with horizontal hairlines

Stop dev.

- [ ] **Step 6: Commit final touches**

```bash
git add src/pages/[...lang]/index.astro
git commit -m "Soften lightbox tint to match charcoal palette"
```

---

## Task 15: Lighthouse smoke check

**Files:**
- None — verification only

- [ ] **Step 1: Build and preview**

Run: `npm run build && npm run preview`
Open: `http://localhost:4321/`

- [ ] **Step 2: Lighthouse audit**

In Chrome DevTools → Lighthouse → run audit on the homepage (Performance, Accessibility, Best Practices, SEO categories, mobile + desktop).

Expected: scores remain ≥ those of the prior dark version (the README claims a perfect score). Mobile Performance may dip slightly due to two new font families — acceptable but flag if drops below 90.

If Performance < 90 mobile, file a follow-up task to self-host Playfair Display + Inter (download `.woff2` from `gwfh.mranftl.com`, place in `public/assets/fonts/`, add `@font-face` rules in `typography.css`, drop the Google Fonts CDN link). Do NOT block this PR on it.

- [ ] **Step 3: Stop preview server**

- [ ] **Step 4: Final tag commit (no code change)**

```bash
git log --oneline -20
```

Expected: ~14 commits forming the redesign, all on `main` (or feature branch if executed in worktree).

---

## Done criteria

- All 4 language routes render without console errors
- Hero has photo + white plate + dark CTA
- Top dark announcement strip replaces in-hero event banner
- Gallery sharp corners, rotation + lightbox still work
- Menu uses 4:5 rectangles with italic numbering
- Location uses warm hairlines
- Floating Kakao yellow bubble preserved (global contact widget)
- Lighthouse mobile Performance ≥ 90
- `npm run build` succeeds with no warnings beyond pre-existing
