# Project Structure Guide

This project follows a feature-driven structure inside `src`, with clear separation between routing, shared UI, and feature-specific logic.

## Top-Level Layout

- `src/`: Application source code.
- `prisma/`: Database schema and seed scripts.
- `public/`: Static assets (currently empty).
- `scripts/`: Project scripts (currently empty).
- Root config files (`package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`, etc.): Build, tooling, and framework configuration.

## `src` Folder Conventions

### `src/app` (Routing and Route UI)

Use this folder for Next.js App Router pages and route-scoped UI files.

Current examples:
- `src/app/layout.tsx`: Global application layout.
- `src/app/page.tsx`: Home route.
- `src/app/template.tsx`: Route template wrapper.
- `src/app/globals.css`: Global styles.
- `src/app/tickets/page.tsx`: Tickets list/create route.
- `src/app/tickets/error.tsx`: Tickets route error boundary.
- `src/app/tickets/[ticketId]/page.tsx`: Ticket detail route.
- `src/app/tickets/[ticketId]/edit/page.tsx`: Ticket edit route.
- `src/app/tickets/[ticketId]/loading.tsx`: Loading UI for ticket detail.
- `src/app/tickets/[ticketId]/not-found.tsx`: Not-found UI for ticket detail.

Rule of thumb: keep routing, layout, and page composition here; move domain logic to `src/features`.

### `src/components` (Shared Components)

Use this folder for reusable, cross-feature components.

Current groups:
- Base shared components:
  - `src/components/Header.tsx`
  - `src/components/Heading.tsx`
  - `src/components/CardCompact.tsx`
  - `src/components/Placeholder.tsx`
  - `src/components/Spinner.tsx`
  - `src/components/TIcketSkeleton.tsx`
  - `src/components/redirect-toast.tsx`
  - `src/components/date-picker.tsx`
- UI primitives (`src/components/ui`), mostly shadcn/radix wrappers:
  - `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`
  - `calendar.tsx`, `popover.tsx`, `separator.tsx`, `sonner.tsx`, `dropdown-menu.tsx`
- Form infrastructure (`src/components/form`):
  - `form.tsx`, `submit-button.tsx`, `field-error.tsx`
  - hooks: `hooks/use-action-feedback.ts`
  - helpers: `utils/to-action-state.ts`
- Theming:
  - `src/components/theme/theme-provider.tsx`
  - `src/components/theme/theme-switcher.tsx`

Rule of thumb: if a component can be reused by multiple features, put it here.

### `src/features` (Feature Modules)

Use this folder for feature-scoped code. Each feature owns its components, server actions, queries, types, and constants.

Current feature:
- `src/features/ticket/`
  - `components/`
    - `ticket-list.tsx`
    - `ticket-item.tsx`
    - `ticket-upsert-form.tsx`
    - `ticket-more-menu.tsx`
  - `actions/`
    - `upsert-ticket.tsx`
    - `delete-ticket.tsx`
  - `queries/`
    - `get-tickets.tsx`
    - `fetch-ticket.tsx`
  - `types.ts`
  - `constants.tsx`

Rule of thumb: when adding a new business area (for example `project`, `comment`, `user`), create a new folder under `src/features/<feature-name>` and keep related code there.

### `src/actions` (Cross-Feature Server Actions)

Use this for shared server actions that are not tied to one feature.

Current example:
- `src/actions/cookies.ts`: Generic cookie read/write/delete helpers.

### `src/lib` (Shared Technical Utilities)

Use this for shared non-domain technical helpers and clients.

Current examples:
- `src/lib/prisma.ts`: Prisma client setup.
- `src/lib/big.ts`: Big.js utilities.
- `src/lib/utils.ts`: Generic utility helpers (for example className helpers).

### `src/utils` (General App Utilities)

Use this for app-level utility helpers that are not feature-specific and not framework client setup.

Current example:
- `src/utils/currency.ts`: Currency conversion helpers.

### Other `src` Files

- `src/paths.ts`: Central route path builder functions (`homePath`, `ticketsPath`, `ticketPath`, `ticketEditPath`).
- `src/data.ts`: Local static data helper (currently ticket seed-like sample data).
- `src/generated/prisma/`: Prisma generated client output (auto-generated, do not manually edit).

## Database Layer

- `prisma/schema.prisma`: Data model and Prisma client generation config.
- `prisma/seed.ts`: Seed script for local ticket data.

## Placement Checklist (Where to Put New Code)

- New route page/layout/loading/error files -> `src/app/...`
- Shared, reusable UI/component -> `src/components/...`
- Feature-specific UI/data/action/type/constant -> `src/features/<feature>/...`
- Shared server action used by multiple features -> `src/actions/...`
- Shared technical helper/client setup -> `src/lib/...`
- Generic app utility helper -> `src/utils/...`
- New database model or migration-related schema changes -> `prisma/schema.prisma` (+ seed updates in `prisma/seed.ts` if needed)

## Suggested Pattern for New Features

When adding a new feature, follow this structure:

```txt
src/features/<feature-name>/
  components/
  actions/
  queries/
  types.ts
  constants.tsx
```

This keeps each feature self-contained and consistent with the current ticket module.
