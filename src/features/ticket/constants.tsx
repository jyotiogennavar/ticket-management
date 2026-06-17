import { CircleCheck, FileText, Pencil } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <FileText className="size-5" />,
  IN_PROGRESS: <Pencil className="size-5" />,
  DONE: <CircleCheck className="size-5" />,
};

export const TICKET_STATUSES = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
