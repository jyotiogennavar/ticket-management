"use client";
import { useQueryStates } from "nuqs";

import { SortSelect, SortSelectOption } from "@/components/sort-select";

import { sortParser } from "../search-params";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser);
  return <SortSelect options={options} value={sort} OnChange={setSort} />;
};

export { TicketSortSelect };
