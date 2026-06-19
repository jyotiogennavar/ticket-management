"use server";

import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

import {
  deleteSessionCookie,
  SESSION_COOKIE_NAME,
  setSessionCookie,
} from "@/auth/cookie";
import { validateSession } from "@/auth/session";

const getCachedValidatedSession = unstable_cache(
  async (sessionToken: string) => validateSession(sessionToken),
  ["ticket-auth-validate-session"],
  { revalidate: 60 },
);

const normalizeResult = (result: Awaited<ReturnType<typeof validateSession>>) => {
  if (!result.session) {
    return result;
  }

  return {
    ...result,
    session: {
      ...result.session,
      expiresAt: new Date(result.session.expiresAt),
    },
  };
};

export const getAuth = async () => {
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = normalizeResult(await getCachedValidatedSession(sessionId));

  try {
    if (result.session) {
      await setSessionCookie(sessionId, result.session.expiresAt);
    } else {
      await deleteSessionCookie();
    }
  } catch {
    // Do nothing when called in a Server Component where cookies are read-only.
  }

  return result;
};
