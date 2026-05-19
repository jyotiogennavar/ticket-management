"use server";

import { prisma } from "@/lib/prisma";

const deleteTicket = async (id: string): Promise<void> => {
  await prisma.ticket.delete({
    where: {
      id: id,
    },
  });
};

export { deleteTicket };
