import { prisma } from "@/lib/prisma";


const upsertTicket = async (id: string, formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  }

  if (id) {
    await prisma.ticket.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  } else {
    await prisma.ticket.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }
};

export { upsertTicket };
