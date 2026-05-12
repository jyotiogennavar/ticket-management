
type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Ticket Page - ({ticketId})</h1>
    </div>
  );
};

export default TicketPage;
