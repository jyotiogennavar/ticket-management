import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { user: { select: { username: true } } };
}>;

export const fetchTicket = async (id: string): Promise<TicketWithUser | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

