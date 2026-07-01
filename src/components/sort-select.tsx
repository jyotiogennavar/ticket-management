"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectOption = {
  sortKey: "createdAt" | "bounty";
  sortValue: "asc" | "desc";
  label: string;
};

type SortObject = {
  sortKey: SortSelectOption["sortKey"];
  sortValue: SortSelectOption["sortValue"];
};

type SortSelectProps = {
  options: SortSelectOption[];
  value: SortObject;
  OnChange: (value: SortObject) => void;
};

const SortSelect = ({ options, value, OnChange }: SortSelectProps) => {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");
    if (
      (sortKey !== "createdAt" && sortKey !== "bounty") ||
      (sortValue !== "asc" && sortValue !== "desc")
    ) {
      return;
    }

    OnChange({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      value={ value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
