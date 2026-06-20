# Authentication Implementation

This document describes the current authentication implementation in the app, aligned with the project structure:

- `app` for routes and pages
- `components` for shared UI
- `features` for feature-specific auth UI/actions/hooks

## Overview

Authentication is implemented with:

- **Credentials**: email + password
- **Storage**: `User` and `Session` tables in PostgreSQL via Prisma
- **Session model**: server-stored sessions with an HTTP-only cookie (`session`)
- **Password hashing**: `bcryptjs`
- **Validation**: `zod` in server actions
- **Runtime**: Next.js App Router with server actions and cookie APIs

## File Map

### Data model

- `prisma/schema.prisma`
  - `User` model: `id`, `username`, `email`, `passwordHash`
  - `Session` model: `id`, `expiresAt`, `userId`, relation to `User` with `onDelete: Cascade`

### Session and cookie primitives

- `src/auth/session.ts`
  - Generates random session tokens
  - Hashes token to session ID (`sha256` + hex)
  - Creates session rows
  - Validates and refreshes sessions
  - Invalidates session rows
- `src/auth/cookie.ts`
  - Sets/deletes `session` cookie
  - Cookie attributes: `httpOnly`, `sameSite=lax`, `secure` in production, `path=/`
  - Includes `getUser()` helper

### Auth feature logic

- `src/features/ticket/auth/actions/sign-up.ts`
- `src/features/ticket/auth/actions/sign-in.ts`
- `src/features/ticket/auth/actions/sign-out.ts`
- `src/features/ticket/auth/queries/get-auth.ts`
- `src/features/ticket/auth/hooks/use-auth.ts`
- `src/features/ticket/auth/components/sign-up-form.tsx`
- `src/features/ticket/auth/components/sign-in-form.tsx`

### Route/UI integration

- `src/app/sign-up/page.tsx`
- `src/app/sign-in/page.tsx`
- `src/components/Header.tsx`
- `src/paths.ts`

## End-to-End Flows

### 1) Sign Up

Entry points:

- Page: `src/app/sign-up/page.tsx`
- Form component: `src/features/ticket/auth/components/sign-up-form.tsx`
- Action: `src/features/ticket/auth/actions/sign-up.ts`

Flow:

1. User submits username, email, password, password confirmation.
2. `signUpSchema` validates:
   - `username`: required, max 100, alphanumeric only
   - `email`: valid email, max 100
   - `password`: min 6, max 100
   - `passwordConfirmation`: min 6, max 100
   - custom check: password must match confirmation
3. Password is hashed using `bcrypt.hash(password, 10)`.
4. User is created in Prisma `User` table.
5. Session token is generated (`generateRandomSessionToken()`).
6. Session row is created with hashed token-derived ID (`createSession()`).
7. Session cookie is set (`setSessionCookie()`).
8. User is redirected to `ticketsPath()` (`/tickets`).

Error handling:

- Any thrown error is mapped through `fromErrorToActionState()` and returned to the form for field/general feedback.

### 2) Sign In

Entry points:

- Page: `src/app/sign-in/page.tsx`
- Form component: `src/features/ticket/auth/components/sign-in-form.tsx`
- Action: `src/features/ticket/auth/actions/sign-in.ts`

Flow:

1. User submits email and password.
2. `signInSchema` validates input.
3. User is looked up by email.
4. Password is verified with `bcrypt.compare()`.
5. If invalid email/password, returns action state error (`Invalid email or password`).
6. If valid, creates session token + DB session and sets cookie.
7. Redirects to `/tickets`.

### 3) Session Read / Auth Query

Entry point:

- `src/features/ticket/auth/queries/get-auth.ts`

Flow:

1. Reads cookie named `session`.
2. If missing, returns `{ user: null, session: null }`.
3. Calls cached validator (`unstable_cache`) that wraps `validateSession(sessionToken)`.
4. Normalizes `session.expiresAt` back to `Date`.
5. Attempts cookie sync:
   - if session valid: rewrites cookie with latest expiry
   - if invalid: deletes cookie
6. Returns `{ user, session }`.

Important behavior:

- Cookie write attempts are wrapped in `try/catch` because cookie writes fail in read-only contexts (e.g., some Server Component execution paths).
- Cache key currently uses a static key array with the token as an argument to the cached function.

### 4) Session Validation and Refresh

Entry point:

- `src/auth/session.ts` (`validateSession`)

Flow:

1. Converts cookie token to deterministic session ID via SHA-256 hash.
2. Loads session + user from DB.
3. If not found: returns `null` auth payload.
4. If expired: deletes session row and returns `null` auth payload.
5. If near expiry (within 15 days), extends expiry to 30 days from now and updates DB.
6. Returns session + user.

Durations:

- Refresh interval: 15 days
- Max duration: 30 days

### 5) Sign Out

Entry point:

- `src/features/ticket/auth/actions/sign-out.ts`

Flow:

1. Calls `getAuth()` to read current session.
2. If no session: returns early.
3. Deletes session cookie.
4. Invalidates DB session by ID.
5. Redirects to `/sign-in`.

## Client-Side Auth Consumption

`src/features/ticket/auth/hooks/use-auth.ts`:

- Uses `useEffect` + route pathname dependency to fetch auth via `getAuth()`.
- Exposes:
  - `user`: current authenticated user or `null`
  - `isFetched`: whether initial auth check completed

`src/components/Header.tsx`:

- While loading (`isFetched=false`): no auth nav actions rendered.
- Authenticated state: shows `Tickets` and `Sign Out` button/form.
- Unauthenticated state: shows `Sign Up` and `Sign In`.

## Security Characteristics

- Passwords are never stored in plaintext (bcrypt hash only).
- Session cookie is `httpOnly` to reduce XSS token theft risk.
- `secure` cookie flag is enabled in production.
- Server persists only hashed session IDs derived from token.
- Session cleanup is performed on validation for expired rows.

## Current Limitations / Gaps

- There is no route-level guard/middleware enforcing auth for `/tickets` routes; navigation/UI adapts, but hard protection is not yet centralized.
- `password-forgot` route exists, but recovery flow is not implemented in current auth actions.
- `getUser()` in `src/auth/cookie.ts` exists but is not the primary auth query path in current feature flow.

## Quick Reference

- Session cookie name: `session`
- Success redirects:
  - Sign up -> `/tickets`
  - Sign in -> `/tickets`
  - Sign out -> `/sign-in`

