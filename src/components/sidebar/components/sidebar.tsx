"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/features/ticket/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { signInPath } from "@/paths";

import { NAV_ITEMS } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  const { user, isFetched } = useAuth();
  const pathname = usePathname();

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  if (pathname === signInPath()) return null;
  if (!isFetched || !user)
    return <div className="w-[78px] h-screen bg-background/20"></div>;

  return (
    <nav
      className={cn(
        "animate-sidebar-from-left h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {NAV_ITEMS.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
