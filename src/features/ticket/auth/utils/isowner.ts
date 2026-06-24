import { User } from "@/generated/prisma/client";

type Entity = {
  userId: string | null;
};

export const isOwner = (
  user: User | null | undefined,
  entity: Entity | null | undefined,
) => {
  if (!user || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (entity.userId !== user.id) {
    return false;
  }

  return true;
};
