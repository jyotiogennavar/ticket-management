"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

import { getAuthOrRedirect } from "../auth/queries/get-auth-or-redirect";
import { isOwner } from "../auth/utils/isowner";

const deleteTicket = async (id: string) => {
  const user = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Unauthorized");
      }
    }
    await prisma.ticket.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};

export { deleteTicket };
