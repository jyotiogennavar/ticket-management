import { notFound } from "next/navigation";

import { RedirectToast } from "@/components/redirect-toast";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { fetchTicket } from "@/features/ticket/queries/fetch-ticket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await fetchTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-center animate-fade-from-top duration-300">
        <TicketItem ticket={ticket} isDetail={true} />
      </div>
      <RedirectToast />
    </>
  );
};

export default TicketPage;
