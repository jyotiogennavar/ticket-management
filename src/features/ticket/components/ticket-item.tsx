import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { ticketPath } from "@/paths";
import clsx from "clsx";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type TicketItemProps = {
  ticket: Ticket;
  isDetail: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id.toString())}>
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx("w-full flex gap-x-2", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2 text-base">
            <span className="size-5">
              {TICKET_ICONS[ticket.status as keyof typeof TICKET_ICONS]}
            </span>
            <span className="line-clamp-1">{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      {/* View button */}
      {isDetail ? null : (
        <div className="flex flex-col gap-y-2">{detailButton}</div>
      )}
    </div>
  );
};

export { TicketItem };
