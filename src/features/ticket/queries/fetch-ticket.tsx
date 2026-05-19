import { prisma } from "@/lib/prisma";
import { Ticket } from "@/generated/prisma/client";

export const fetchTicket = async (id: string) : Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id: id,
    },
  });
};

