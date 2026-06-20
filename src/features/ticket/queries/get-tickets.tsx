import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { user: { select: { username: true } } };
}>;

export const getTickets = async (): Promise<TicketWithUser[]> => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
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
