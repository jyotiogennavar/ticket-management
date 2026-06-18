import { SquareKanban } from "lucide-react";
import Link from "next/link";

import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";

import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button } from "./ui/button";

const Header = () => {
  const navItems = (
    <>
      <Button asChild variant="default">
        <Link href={ticketsPath()}>Tickets</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href={signUpPath()}>Sign Up</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href={signInPath()}>Sign In</Link>
      </Button>
    </>
  );

  return (
    <nav
      className="
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
