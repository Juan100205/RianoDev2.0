# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build locally
npm run deploy     # Build + publish to GitHub Pages (gh-pages -d dist)
```

No test suite is configured.

## Architecture

This is a personal portfolio SPA (Juan Jose Riaño) built with React 19 + TypeScript + Vite + Tailwind CSS v4, deployed to GitHub Pages at `/RianoDev2.0/` (configured in `vite.config.ts` `base`).

Routing uses `HashRouter` (required for GitHub Pages static hosting).

### State management

All global state lives in `App.tsx` and is prop-drilled down:
- `isEnglish: boolean` — controls EN/ES language across all components
- `isDark: boolean` — controls dark mode; toggled via `setIsDark`, applied by a `useEffect` that adds/removes `"dark"` class on `document.documentElement`

### Scroll architecture

`LandingPage` owns the scroll container (`div.scroll_snap`, `height: 100vh; overflow-y: scroll`) and holds a `ref` passed up from `App` as `scrollContainerRef`. The `Header` listens to scroll events on this ref to switch between two header states (name/title visible ↔ nav menu visible). Scroll-to-section in `Header` imperatively computes `offsetTop` on section `div[id]` elements and calls `container.scrollTo()`.

### Dark mode

Tailwind v4 class-based dark mode via `@custom-variant dark (&:where(.dark, .dark *))` in `src/index.css`. The `dark` class must be on `document.documentElement` (not an inner div) — managed by `useEffect` in `App.tsx`.

### Component layout

`LandingPage` renders all sections in order with `id` attributes used as scroll targets:
`home` → `tech` (Consulting/carousel) → `about_me` → `resume` → `projects` → `services` → footer

`src/Components/Logos_comp/` contains inline SVG React components for all tech/social logos. Each logo exists in two variants: a regular version and a `* copy.tsx` nav version (sized/colored for the header).

### Tailwind setup

Tailwind v4 via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed. Configuration is entirely in `src/index.css`. Custom utilities (`scroll_snap`, `scroll_snap_per_comp`, `scrollbar_exp`) are defined there under `@layer utilities`. Brand color `#10dffd` is used throughout as a hardcoded accent (intentional, same in both themes).
