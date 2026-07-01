
import { prisma } from "@/lib/prisma";

import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  const orderBy =
    searchParams.sortKey === "bounty"
      ? { bounty: searchParams.sortValue }
      : { createdAt: searchParams.sortValue };

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    orderBy,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};