"use client";

import { Ticket } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";

type TicketUpsertFormProps = {
  ticket: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [isPending, startTransition] = useTransition();

  const upsertTicketAction = (formData: FormData) => {
    startTransition(async () => {
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  };

  return (
    <form action={upsertTicketAction} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <Button disabled={isPending} type="submit">
        {ticket ? "Edit" : "Create"}
      </Button>
      {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
    </form>
  );
};

export { TicketUpsertForm };
