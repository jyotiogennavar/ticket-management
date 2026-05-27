"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";


const upsertTicketSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  let data: z.infer<typeof upsertTicketSchema>;

  try {
    const validatedFields = upsertTicketSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    if (!validatedFields.success) {
      return fromErrorToActionState(validatedFields.error, formData);
    }

    data = validatedFields.data;

    await prisma.ticket.upsert({
      where: { id: id ?? "" },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));

  }

  return toActionState(
    "SUCCESS",
    id ? "Ticket updated successfully" : "Ticket created successfully",
  );
};
