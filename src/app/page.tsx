import Link from "next/link";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />

      <div className="flex-1 flex flex-col items-center">
        <Button asChild >
          <Link href={ticketsPath()}>
            Go to Tickets
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;