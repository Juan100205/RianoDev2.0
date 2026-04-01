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

## Environment variables

Required in `.env.local` for auth/db features to work:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```
Without these, the app still loads but auth, Portal, and client-document features are disabled. The Supabase client (`src/lib/supabase.ts`) uses placeholder strings as fallback to avoid module-load errors.

## Architecture

Personal portfolio SPA (Juan Jose Riaño) built with React 19 + TypeScript + Vite + Tailwind CSS v4. Deployed to GitHub Pages at `/RianoDev2.0/` (base in `vite.config.ts`).

Routing uses `BrowserRouter`. Route transitions use `AnimatePresence` + a `<Fade>` wrapper (`framer-motion`).

### Routes

| Path | Page |
|---|---|
| `/` | `LandingPage` (portfolio sections) |
| `/servicios` | Services detail page |
| `/portal` | Client/admin portal (auth-gated) |
| `/clientes` | Client-facing view |
| `/sobre` | About page |
| `/blog` | Blog index |
| `/blog/:slug` | Blog post |
| `/faq` | FAQ |
| `/schedule` | Booking/schedule |
| `/quote` | Quote request |
| `/metodo-levantate` | Standalone landing page |
| `/proyecto/:repoName` | GitHub repo detail |
| `/privacy`, `/terms` | Legal pages |

### Global state (App.tsx)

Prop-drilled down from `App.tsx` to all routes:
- `isEnglish: boolean` — EN/ES language toggle
- `isDark: boolean` — dark mode; `useEffect` adds/removes `"dark"` class on `document.documentElement`
- `scrollContainerRef` — passed to `Header` and `LandingPage`

Wrapped in `<AuthProvider>` (Supabase auth context).

### Auth layer

`src/context/AuthContext.tsx` exposes `{ user, session, loading, isAdmin, signOut }` via `useAuth()`. `isAdmin` is read from the `profiles.is_admin` column in Supabase. The `<Auth>` component handles login UI.

### Portal (`src/pages/Portal.tsx`)

Tab-based dashboard with tabs: `automatizaciones` | `documentos` | `proyectos` | `profile` | `settings` | `admin` | `blog-admin`. Composed of:
- `WorkflowDashboard` — AI workflow management via `useWorkflows` / `useUserWorkflows`
- `ClientDocPanel` — admin creates/sends documents; `useClientDocuments`
- `ClientDocViewer` — client reads documents sent to them
- `useAdminPanel` — admin-only operations
- `useGitHubRepos` / `useUserRepos` — fetches GitHub repos; `LIVE_URL_OVERRIDES` in `useGitHubRepos.ts` maps repo names to live URLs

### Scroll architecture

`LandingPage` owns the scroll container (`div.scroll_snap`, `height: 100vh; overflow-y: scroll`). `Header` listens to scroll events on `scrollContainerRef` to switch between two states (name/title ↔ nav menu). Scroll-to-section imperatively computes `offsetTop` on `div[id]` elements.

### LandingPage section order

`home` → `tech` (Consulting/carousel) → `about_me` → `resume` → `projects` → `services` → footer

### Dark mode

Tailwind v4 class-based dark mode via `@custom-variant dark (&:where(.dark, .dark *))` in `src/index.css`. The `dark` class must be on `document.documentElement`.

### Tailwind setup

Tailwind v4 via `@tailwindcss/vite` — no `tailwind.config.js`. All config in `src/index.css`. Custom utilities (`scroll_snap`, `scroll_snap_per_comp`, `scrollbar_exp`) defined under `@layer utilities`. Brand color `#10dffd` is hardcoded throughout (intentional, same in both themes).

### Logos

`src/Components/Logos_comp/` — inline SVG React components. Each logo has two variants: regular and `* copy.tsx` (nav-sized/colored for the Header).

### Sub-projects

- `src/MetodoLevantate/` — standalone Vite project with its own `package.json` and `vite.config.ts`. Run separately.
- `src/_MetodoLevantate_bak/` — archived backup of the above, not built by the root Vite config.

### Document system

`src/lib/docTemplates.ts` — document type definitions and templates. `src/lib/printDoc.ts` — print/PDF export logic. Documents are stored in Supabase and flow from admin (`ClientDocPanel`) to client (`ClientDocViewer`) via a save-draft / deploy workflow.
