"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ticketsPath } from "@/paths";

const createTicket = async (formData: FormData) => {

  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  }

  await prisma.ticket.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });

  revalidatePath(ticketsPath());
};

export { createTicket };