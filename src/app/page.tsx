import Link from "next/link";
import { ticketsPath } from "@/paths";

const HomePage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
     
      <Link href={ticketsPath()}>Go to Tickets</Link>
    </div>
  );
};

export default HomePage;