import clsx from "clsx";
import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { CircleCheck, FileText, Pencil } from "lucide-react";
import { Heading } from "@/components/Heading";

const TICKET_ICONS = {
  OPEN: <FileText className="size-5" />,
  IN_PROGRESS: <Pencil className="size-5" />,
  DONE: <CircleCheck className="size-5" />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2 text-base">
                <span>
                  {TICKET_ICONS[ticket.status as keyof typeof TICKET_ICONS]}
                </span>
                <span className="line-clamp-1">{ticket.title}</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <span
                className={clsx("line-clamp-3 whitespace-break-spaces", {
                  "line-through": ticket.status === "DONE",
                })}
              >
                {ticket.content}
              </span>
            </CardContent>

            <CardFooter>
              <Link
                href={ticketPath(ticket.id.toString())}
                className="text-sm underline"
              >
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
