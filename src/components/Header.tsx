"use client";

import { LogOut, SquareKanban } from "lucide-react";
import Link from "next/link";

import { signOut } from "@/features/ticket/auth/actions/sign-out";
import { useAuth } from "@/features/ticket/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";

import { SubmitButton } from "./form/submit-button";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button } from "./ui/button";

const Header = () => {
  const { user, isFetched } = useAuth();
  const navItems = !isFetched ? null : user ? (
    <>
      <Button asChild variant="default">
        <Link href={ticketsPath()}>Tickets</Link>
      </Button>

      <form action={signOut}>
        <SubmitButton
          label="Sign Out"
          icon={<LogOut className="h-4 w-4" />}
          variant="outline"
        />
      </form>
    </>
  ) : (
    <>
      <Button asChild variant="ghost">
        <Link href={signUpPath()}>Sign Up</Link>
      </Button>

      <Button asChild variant="default">
        <Link href={signInPath()}>Sign In</Link>
      </Button>
    </>
  );

  return (
    <nav
      className="
      animate-header-from-top
      supports-backdrop-blur:bg-background/60
      fixed left-0 right-0 top-0 z-20
      border-b bg-background/95 backdrop-blur
      w-full flex py-2.5 px-5 justify-between
    "
    >
      <div>
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <SquareKanban />
            <h1>TicketBounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
