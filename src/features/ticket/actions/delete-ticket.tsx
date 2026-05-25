"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

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
