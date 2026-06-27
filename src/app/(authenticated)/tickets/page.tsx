import { Suspense } from "react";

import { CardCompact } from "@/components/CardCompact";
import { Heading } from "@/components/Heading";
import { RedirectToast } from "@/components/redirect-toast";
import { TicketListSkeleton } from "@/components/TicketSkeleton";
import { getAuth } from "@/features/ticket/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketsPage = async () => {
  const user = await getAuth();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="Your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<TicketListSkeleton />}>
        <TicketList userId={user.user?.id ?? ""} />
      </Suspense>
      <RedirectToast />
    </div>
  );
};

export default TicketsPage;
