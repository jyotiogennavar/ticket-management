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

import { TICKET_STATUSES } from "../constants";

const updateTicketStatus = async (
  id: string,
  status: TicketStatus,
): Promise<ActionState> => {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },

    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", `Ticket status updated to ${TICKET_STATUSES[status]}`);
};

export { updateTicketStatus };
