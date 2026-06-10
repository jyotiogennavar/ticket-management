"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useImperativeHandle, useState } from "react";

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
  imperitiveHandleRef?: React.RefObject<{
    reset: () => void;
  }>;
};

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperitiveHandleRef,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  useImperativeHandle(imperitiveHandleRef, () => ({
    reset: () => {
      setDate(new Date());
    },
  }));

  const [open, setOpen] = useState(false);

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          onSelect={handleSelect}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
