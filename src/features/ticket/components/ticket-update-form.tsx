import { Ticket } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateTicket } from "../actions/update-ticket";

type TicketUpdateFormProps = {
  ticket: Ticket;
};

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  return (
    <form action={updateTicket.bind(null, ticket.id)}>
      <Label className="mt-4" htmlFor="title">Title</Label>
      <Input className="w-full mt-2" id="title" name="title" type="text" defaultValue={ticket.title}  />

      <Label className="mt-4" htmlFor="content">Content</Label>
      <Textarea className="w-full mt-2" id="content" name="content" defaultValue={ticket.content} />

      <Button className="mt-4" type="submit">Update</Button>
    </form>
  );
};

export { TicketUpdateForm };