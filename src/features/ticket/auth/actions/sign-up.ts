"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
//import { cookies } from "next/headers";
import { z } from "zod";

import { setSessionCookie } from "@/auth/cookie";
import { createSession, generateRandomSessionToken } from "@/auth/session";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(100)
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers",
      ),
    email: z.string().email().min(1).max(100),
    password: z
      .string()
      .min(6)
      .max(100)
      .regex(
        /^.{6,}$/,
        "Password must be at least 6 characters",
      ),
    passwordConfirmation: z
      .string()
      .min(6)
      .max(100)
      .regex(
        /^.{6,}$/,
        "Password must be at least 6 characters",
      ),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export const signUp = async (
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        passwordHash: passwordHash,
      },
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);

  } catch (error) {
    return fromErrorToActionState(error, formData);
    
  }
  redirect(ticketsPath());
};
