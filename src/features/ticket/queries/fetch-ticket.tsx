import { Ticket } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const fetchTicket = async (id: string) : Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id: id,
    },
  });
  
};

