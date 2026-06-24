
import { notFound } from "next/navigation";

import { CardCompact } from "@/components/CardCompact";
import { getAuth } from "@/features/ticket/auth/queries/get-auth";
import { isOwner } from "@/features/ticket/auth/utils/isowner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { fetchTicket } from "@/features/ticket/queries/fetch-ticket";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params;
  const ticket = await fetchTicket(ticketId);

  const { user } = await getAuth();

  const isTicketOwner = isOwner(user, ticket);

  if (!ticket || !isTicketOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center animate-fade-from-top duration-300">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  )
}

export default TicketEditPage;