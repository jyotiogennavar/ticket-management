"use server";

import { prisma } from "@/lib/prisma";
import {redirect} from "next/navigation";
import { ticketsPath } from "@/paths";

const deleteTicket = async (id: string): Promise<void> => {
  await prisma.ticket.delete({
    where: {
      id: id,
    },
  });

  redirect(ticketsPath());
};

export { deleteTicket };
