"use client";

import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );  
};

export { SearchInput };
