import { getTickets } from "@/actions/ticket.actions";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import TicketItem from "@/components/TicketItem";

const TicketsPage = async () => {
  const tickets = await getTickets();
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }
  
  return ( <section className="min-h-screen bg-blue p-8">
    <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Support Tickets</h1>
    {tickets.length === 0 ? (<p className="text-center text-gray-600">No Tickets Yet</p>) : (
      <ul className="space-y-4 max-w-xl mx-auto">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>
    )}
    
  </section>
  );
};
 
export default TicketsPage;