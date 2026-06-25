import { Book, Library, User} from "lucide-react";

import { accountProfilePath, homePath, ticketsPath } from "@/paths";

import { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "All tickets",
    icon:  <Library />,
    href: homePath(),
    
  },
  {
    title: "My tickets",
    icon: <Book />,
    href: ticketsPath(),
  },
  {
    separator: true,
    title: "Account",
    icon: <User />,
    href: accountProfilePath(),
  },
];


export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hove\
r:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opa\
city-100";