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
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().min(0).max(1000000),
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
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
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
