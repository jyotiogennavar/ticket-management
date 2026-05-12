import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";
import Link from "next/link";

const TicketPage = () => {  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Ticket Page</h1>

      {initialTickets.map((ticket) => (
        <div key={ticket.id} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-md p-4 m-4">
          <h2>{ticket.title}</h2>
          <p>{ticket.description}</p>
          <p>{ticket.status}</p>
          <Link href={ticketPath(ticket.id.toString())}>View</Link>
        </div>
      ))}
    </div>
  );

};

export default TicketPage;