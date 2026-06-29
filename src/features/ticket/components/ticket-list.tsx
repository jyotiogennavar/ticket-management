import { Placeholder } from "@/components/Placeholder";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";

import { getTickets } from "../queries/get-tickets";
import { SearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};
const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const resolvedSearchParams = await searchParams;
  const searchValue = Array.isArray(resolvedSearchParams.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams.search;
  const sortValue = Array.isArray(resolvedSearchParams.sort)
    ? resolvedSearchParams.sort[0]
    : resolvedSearchParams.sort;

  const tickets = await getTickets(
    userId,
    searchValue || sortValue
      ? { search: searchValue, sort: sortValue }
      : undefined,
  );
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2 justify-between">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect 
        defaultValue="newest"
        options={[
          { label: "Newest", value: "newest" },
          { label: "Bounty", value: "bounty" },
        ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
        ))
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};

export { TicketList };
