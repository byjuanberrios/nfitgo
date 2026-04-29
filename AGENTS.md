<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Agent Guidelines for NFITGO Project

## Essential Commands

```bash
pnpm dev        # start dev server (also accessible on LAN via allowedDevOrigins)
pnpm build      # production build
pnpm lint       # eslint (Next.js core-web-vitals + typescript rules)
```

No test suite is configured.

## Technology Stack

- **Next.js 16** / React 19 / TypeScript — App Router only, no Pages Router
- **Tailwind CSS v4** — configured entirely via `@theme inline` in `globals.css`, no `tailwind.config.*`
- **lucide-react** for icons; custom SVG category icons live in `src/components/icons/`
- **pnpm** as package manager
- **Path aliases**: `@/*` maps to `./src/*`

## Critical Next.js 16 API Change

**Dynamic route `params` is a `Promise` — always `await params` before destructuring:**

```ts
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}
```

## Route & Layout Structure

```
src/app/
  layout.tsx                     ← root: loads Saira font, sets html/body shell, AuthProvider
  (auth)/                        ← authentication routes (login, registro)
    layout.tsx                   ← centered layout with gradient background
    login/page.tsx
    registro/page.tsx
  (main)/                        ← main application routes
    layout.tsx                   ← transparent Header + Footer
    page.tsx                     ← home: FeaturedClassSlider, LatestClassesSlider, SCBanner
    clase/[id]/                  ← class detail pages
      layout.tsx                 ← inherits (main) layout
      page.tsx                   ← uses generateStaticParams for SSG
    centro/[id]/                 ← sport center detail pages
      layout.tsx
      page.tsx
  explore/                       ← explore classes with filters
    layout.tsx                   ← solid Header + Footer
    page.tsx                     ← "use client"; category filter + paginated class grid
  onboarding/                    ← multi-step onboarding flow
    layout.tsx                   ← solid Header + Footer
    page.tsx
  perfil/                        ← user profile section
    layout.tsx                   ← solid Header + Footer + ProfileSidebar
    page.tsx                     ← profile dashboard
    cuenta/page.tsx              ← account settings
    reservas/page.tsx            ← booking history
    wallet/page.tsx              ← wallet/transactions
  reserva/[classId]/             ← booking flow
    layout.tsx                   ← solid Header + Footer
    page.tsx                     ← main booking page
    exito/page.tsx               ← booking success page
```

**Layout variants:**

- **transparent**: Used in `(main)` route group for homepage
- **solid**: Used in explore, onboarding, perfil, reserva routes (fixed header with `bg-surface-dark`)

## Authentication System

**Context**: `src/context/AuthContext.tsx`

- Uses React Context API with localStorage persistence
- Key functions: `login(user)`, `logout()`, `useAuth()` hook
- User data stored in localStorage key `nfitgo_user`
- Provides `user` object and `isLoading` state throughout app

**Auth flows:**

- Protected routes should check `user` from `useAuth()`
- Login/Register pages use `(auth)` layout
- Profile section (`/perfil/*`) requires authentication

## Data Layer

All data is static mock arrays — no database, no API calls, no server actions yet.

**Data files:**

- `src/lib/classes.ts` — exports `classes: ClassItem[]`
- `src/lib/categories.ts` — exports `categories: CategoryItem[]`
- `src/lib/sportcenters.ts` — exports `sportCenters: SportCenterItem[]`
- `src/lib/bookings.ts` — exports `bookings: Booking[]` (user booking history)

**Category matching**: Between `ClassItem.category` string and `CategoryItem.name` is always case-insensitive (`.toLowerCase()` on both sides).

## Design System

**Tailwind v4 custom tokens** (defined in `globals.css`, referenced as Tailwind utilities):

| Token             | Value     | Usage                           |
| ----------------- | --------- | ------------------------------- |
| `brand-primary`   | `#01FFC2` | CTAs, active states, prices     |
| `brand-secondary` | `#D8FA27` | Icon accents, section headings  |
| `brand-tertiary`  | `#92FF53` | Date badge in ClassCard         |
| `surface-dark`    | `#1C1E22` | Cards, sidebars, header (solid) |
| `surface-soft`    | `#22262E` | Page background                 |
| `tag-gray`        | `#333740` | Default Tag background          |
| `gray-muted`      | `#899A96` | Secondary text                  |
| `dark-muted`      | `#4E5158` | Borders, dividers               |

**Spacing pattern**: Horizontal padding is consistent across all full-width sections:

```
px-4 md:px-10 lg:px-12 xl:px-22 2xl:px-[12vw]
```

**Utilities**:

- `scrollbar-hide` - Used on all horizontal scroll containers to hide scrollbars

## Component Conventions

### Layout Components (`src/parts/`)

- **Header** - Accepts `variant?: "transparent" | "solid"` and optional `user` prop
- **Footer** - Standard footer component

### Shared Components (`src/components/shared/`)

- **ClassCard** - Accepts `cls: ClassItem` + optional `href`. Wraps in `<Link>` when `href` provided, plain `<div>` otherwise
- **CategoryButton** - Icon + label button; `size="sm"` for filters, `size="md"` (default) for sliders
- **Tag** - Pill label. Default `tag-gray`. Accepts `color="brand-primary"` or `color="brand-secondary"`
- **Button** - Simple `<a>` CTA with brand-primary background
- **BookingCard** - Displays booking information in profile sections

### Icons (`src/components/icons/`)

- Each icon accepts `IconProps` (`width`, `height`, `className`)
- Icons: Boxing, Crossfit, Dance, Functional, Musculation, Pilates, Run, Yoga
- Referenced via `CategoryItem.icon` (type: `React.ComponentType<IconProps>`)

### Utility Functions (`src/lib/dateUtils.ts`)

- `formatDate(isoString)` → `{ day: number, month: string }` (e.g. `{ day: 21, month: "ABR" }`) - used in ClassCard
- `formatScheduleDate("YYYY-MM-DD")` → Spanish long form (e.g. `"Martes 22 de Abril"`) - used in SchedulePicker
- `formatScheduleDateLong("YYYY-MM-DD")` → Full Spanish date with year

**Note**: `formatScheduleDate` parses `YYYY-MM-DD` directly (not ISO timestamp) to avoid timezone offset issues.

## Type Definitions

**Core types** (`src/types/index.ts`):

- `IconProps` - Base icon interface
- `SportCenterItem` - Sport center data structure
- `CategoryItem` - Category with icon component
- `ClassSchedule` - Individual class schedule slot
- `ClassItem` - Complete class information
- `Booking` - User booking history entry
- `WalletTransaction` - Wallet transaction record
- `HeaderUser` - Minimal user info for header

## Key Implementation Notes

- **No Pages Router** - App Router only, all routes use new file conventions
- **Client Components** - Marked with `"use client"` when needed (interactive components, event handlers)
- **Server Components** - Default for pages and layouts, use for data fetching when needed
- **Static Generation** - Class detail pages use `generateStaticParams()` for SSG
- **Image Optimization** - Uses Next.js `Image` component with proper sizing
- **Font Loading** - Uses `next/font/google` for Saira font with CSS variables
- **State Management** - Currently uses React Context (AuthContext) and localStorage
- **No API Routes** - All data is static mocks, no `src/app/api` directory
