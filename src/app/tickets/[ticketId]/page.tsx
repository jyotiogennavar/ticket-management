import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { RedirectToast } from "@/components/redirect-toast";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { fetchTicket } from "@/features/ticket/queries/fetch-ticket";
import { homePath } from "@/paths";

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
    <div className="flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />
      <div className="flex justify-center animate-fade-from-top duration-300">
        <TicketItem ticket={ticket} isDetail={true} />
      </div>
      <RedirectToast />
    </div>
  );
};

export default TicketPage;
