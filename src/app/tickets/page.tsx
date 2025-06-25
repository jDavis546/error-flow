import { getTickets } from "@/actions/ticket.actions";
import { LoggingConfig } from "next/dist/server/config-shared";
import Link from "next/link";
import { getPriorityClass } from "@/utils/ui";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";


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
          <li key={ticket.id} className="flex justify-between items-center bg-white p-4 rounded shadow border border-gray-200 p6">
            {/*Left Side */}
            <div>
            <h2 className="text-xl font-semibold text-blue-600">{ticket.subject}</h2>
            </div>

            {/*Right Side */}
            <div className="text-right space-y-2">
            <p className="text-sm text-gray-500">
              Priority: <span className={getPriorityClass(ticket.priority)}> {ticket.priority} </span>
            </p>

            <Link href={`/tickets/${ticket.id}`} className="inline-block mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition text-center"> 
            View Ticket </Link>
            </div>
          </li>
        ))}
      </ul>
    )}
    
  </section>
  );
};
 
export default TicketsPage;