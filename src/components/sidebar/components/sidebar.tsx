"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/ticket/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { signInPath, signUpPath } from "@/paths";
import { getActivePath } from "@/utils/get-active-path";

import { NAV_ITEMS } from "../constants";

const SidebarComponent = () => {
  const { user, isFetched } = useAuth();
  const pathname = usePathname();

  const { activeIndex } = getActivePath(
    pathname,
    NAV_ITEMS.map((item) => item.href),
    [signInPath(), signUpPath()],
  );

  if (pathname === signInPath()) return null;
  if (!isFetched || !user)
    return <div className="w-[78px] h-screen bg-background/20"></div>;

  return (
    <Sidebar collapsible="icon" side="left" className={cn("pt-12")}>
      <SidebarHeader className="px-2 py-2">
        <SidebarTrigger className="h-8 w-8" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((navItem, index) => (
              <Fragment key={navItem.title}>
                {navItem.separator ? <SidebarSeparator /> : null}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={activeIndex === index}
                    tooltip={navItem.title}
                  >
                    <Link href={navItem.href}>
                      {navItem.icon}
                      <span>{navItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { SidebarComponent };
