
import { Suspense } from "react";

import { CardCompact } from "@/components/CardCompact";
import { Heading } from "@/components/Heading";
import { RedirectToast } from "@/components/redirect-toast";
import { TicketListSkeleton } from "@/components/TicketSkeleton";
import { getAuth } from "@/features/ticket/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

type TicketsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const user = await getAuth();
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

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
        <TicketList userId={user.user?.id ?? ""} searchParams={parsedSearchParams} />
      </Suspense>
      <RedirectToast />
    </div>
  );
};

export default TicketsPage;
