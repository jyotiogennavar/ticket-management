import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { user: { select: { username: true } } };
}>;

export const getTickets = async (
  userId: string,
): Promise<TicketWithUser[]> => {
  return await prisma.ticket.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
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
