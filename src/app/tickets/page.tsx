import { Heading } from "@/components/Heading";
import { Suspense } from "react";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketListSkeleton } from "@/components/TIcketSkeleton";

import { CardCompact } from "@/components/CardCompact";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketCreateForm />}
      />

      <Suspense fallback={<TicketListSkeleton />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
