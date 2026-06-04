"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "./ui/input";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";
  return (
    <Popover>
      <PopoverTrigger id={id} name={name} className="w-full" asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal mt-2"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {formattedStringDate}
          <Input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
