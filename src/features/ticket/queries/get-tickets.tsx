import { Ticket } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const getTickets = async () : Promise<Ticket[] | undefined> => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

