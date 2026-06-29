import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import { SearchParamsValue } from "../search-params";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { user: { select: { username: true } } };
}>;

export const getTickets = async (
  userId?: string,
  searchParams?: SearchParamsValue,
): Promise<TicketWithUser[]> => {
  return await prisma.ticket.findMany({
    where: {
      ...(userId
        ? {
            userId: {
              equals: userId,
            },
          }
        : {}),
      ...(searchParams?.search
        ? {
            title: {
              contains: searchParams.search,
              mode: "insensitive",
            },
          }
        : {}),
    },
    orderBy:
      searchParams?.sort === "undefined"
        ? { createdAt: "desc" }
        : searchParams?.sort === "bounty"
          ? { bounty: "desc" }
          : { createdAt: "desc" },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
