"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";

import { revalidatePath } from "next/cache";

const deleteTicket = async (id: string): Promise<void> => {
  await prisma.ticket.delete({
    where: {
      id: id,
    },
  });

  revalidatePath(ticketsPath());

  redirect(ticketsPath());
};

export { deleteTicket };
