import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createTicket } from "@/features/ticket/actions/create-ticket";

const TicketCreateForm = () => {
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label className="mt-3" htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" />

      <Label className="mt-3" htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />

      <Button className="mt-3" type="submit">Create</Button>
    </form>
  );
};

export { TicketCreateForm };
