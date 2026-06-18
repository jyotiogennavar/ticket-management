"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { setSessionCookie } from "@/auth/cookie";
import { createSession, generateRandomSessionToken } from "@/auth/session";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signInSchema = z.object({
  email: z.string().email().min(1).max(100),
  password: z.string().min(6).max(100),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const isValidPassword =
      user && (await bcrypt.compare(password, user.passwordHash));

    if (!isValidPassword) {
      return fromErrorToActionState(
        new Error("Invalid email or password"),
        formData,
      );
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
  redirect(ticketsPath());
};