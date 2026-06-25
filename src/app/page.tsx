
import { Suspense } from "react";

import { Heading } from "@/components/Heading";
import { RedirectToast } from "@/components/redirect-toast";
import { TicketListSkeleton } from "@/components/TicketSkeleton";
import { TicketList } from "@/features/ticket/components/ticket-list";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All Tickets" description="Tickets from all users" />

      <Suspense fallback={<TicketListSkeleton />}>
        <TicketList userId={""} />
      </Suspense>
      <RedirectToast />
    </div>
  );
};

export default HomePage;