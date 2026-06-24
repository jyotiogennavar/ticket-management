"use server";

import { revalidatePath } from "next/cache";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

import { getAuthOrRedirect } from "../auth/queries/get-auth-or-redirect";
import { isOwner } from "../auth/utils/isowner";
import { TICKET_STATUSES } from "../constants";

const updateTicketStatus = async (
  id: string,
  status: TicketStatus,
): Promise<ActionState> => {const user = await getAuthOrRedirect();
  try {
    
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Unauthorized");
      }
    }

    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState(
    "SUCCESS",
    `Ticket status updated to ${TICKET_STATUSES[status]}`,
  );
};

export { updateTicketStatus };
