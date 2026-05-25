"use client";
import { Ticket } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ActionState, EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { SubmitButton } from "@/components/form/submit-button";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};


const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState<ActionState, FormData>(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <form
      action={action}
      className="flex flex-col gap-y-2"
      key={
        actionState.payload
          ? JSON.stringify(actionState.payload)
          : (ticket?.id ?? "new")
      }
    >
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={actionState.payload?.title ?? ticket?.title}
      />
      <FieldError actionState={actionState} name="title" />

      <Label className="mt-2" htmlFor="content">
        Content
      </Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={actionState.payload?.content ?? ticket?.content}
      />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </form>
  );
};

export { TicketUpsertForm };
