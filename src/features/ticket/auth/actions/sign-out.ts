"use server";

import { redirect } from "next/navigation";

import { deleteSessionCookie } from "@/auth/cookie";
import { invalidateSession } from "@/auth/session";
import { getAuth } from "@/features/ticket/auth/queries/get-auth";
import { signInPath } from "@/paths";

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    return;
  }

  await deleteSessionCookie();
  await invalidateSession(session.id);   

  redirect(signInPath());
};