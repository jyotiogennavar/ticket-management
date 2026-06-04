"use client";
import { useActionState } from "react";

import { DatePicker } from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { Ticket } from "@/generated/prisma/client";
import { fromCent, toCent } from "@/utils/currency";
type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState<ActionState, FormData>(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
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
      <div className="flex gap-x-2 mt-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>

          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.deadline as unknown as string) ??
              ticket?.deadline
            }
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.bounty as unknown as number)
                ? fromCent(actionState.payload?.bounty as unknown as number)
                : ticket?.bounty
                  ? fromCent(ticket?.bounty)
                  : ""
            }
            className="mt-2"
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
