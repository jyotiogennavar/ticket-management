"use client";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/generated/prisma/client";

import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUSES } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const deleteButton = (
    <DropdownMenuLabel className="flex items-center gap-x-2">
      <Trash className="h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuLabel>
  );

  const handleTicketStatusChange = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as TicketStatus);

    toast.promise(promise, {
      loading: "Updating ticket status...",
    });

    const result = await promise;
    if (result.status === "SUCCESS") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const ticketStatusItems = (
    <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleTicketStatusChange}>
      {Object.entries(TICKET_STATUSES).map(([statusKey, statusLabel]) => (
        <DropdownMenuRadioItem key={statusKey} value={statusKey}>
          {statusLabel}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {ticketStatusItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMoreMenu };
