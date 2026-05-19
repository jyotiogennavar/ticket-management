import { prisma } from "@/lib/prisma";
import { Ticket } from "@/generated/prisma/client";

export const getTickets = async () : Promise<Ticket[] | undefined> => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

