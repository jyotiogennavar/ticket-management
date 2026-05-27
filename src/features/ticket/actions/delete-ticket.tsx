"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const deleteTicket = async (id: string): Promise<void> => {
  await prisma.ticket.delete({
    where: {
      id: id,
    },
  });

  revalidatePath(ticketsPath());
await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};

export { deleteTicket };
