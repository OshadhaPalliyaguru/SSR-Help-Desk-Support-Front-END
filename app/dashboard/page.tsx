import React from 'react';
import { fetchTickets } from '@/services/ticketService'; // Import the service
import { Ticket } from '@/types/ticket'; // Import the type
import CreateTicketForm from '@/components/CreateTicketForm';

export default async function DashboardPage() {
  // 1. Call the Service (Server-side execution)
  const tickets: Ticket[] = await fetchTickets();

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          🏢 Corporate IT Helpdesk (SSR)
        </h1>

        <CreateTicketForm />

        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {ticket.issueDescription}
                </h2>
                <p className="text-gray-500 text-sm">
                  Reported by: <span className="font-medium">{ticket.employeeName}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                 {/* Priority Badge Logic */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                  ${ticket.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 
                    ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'}`}>
                  {ticket.priority}
                </span>
                
                <span className="text-gray-600 text-sm font-mono border px-2 py-1 rounded">
                  {ticket.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No active tickets.</p>
        )}
      </div>
    </div>
  );
}