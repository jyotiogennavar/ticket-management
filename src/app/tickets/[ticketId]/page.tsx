import { initialTickets } from "@/data";
import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ticketsPath } from "@/paths";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { Ticket } from "@/features/ticket/types";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === Number(ticketId));

  if (!ticket) {
      return <Placeholder 
      label="Ticket not found" 
      button={<Button asChild variant="outline">
        <Link href={ticketsPath()}>
          Back to Tickets
        </Link>
      </Button>}
      />
  }

  return (
    <div className="flex justify-center animate-fade-from-top duration-300">
      <TicketItem ticket={ticket as unknown as Ticket} isDetail={true} />
    </div>
  );
};

export default TicketPage;