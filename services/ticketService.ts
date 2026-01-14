import { Ticket } from "@/types/ticket";


const API_URL = process.env.API_BASE_URL;

export async function fetchTickets(): Promise<Ticket[]> {
  if (!API_URL) {
    throw new Error("API_BASE_URL is not defined in .env.local");
  }

  try {
   
    const res = await fetch(`${API_URL}/tickets`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    
    return await res.json();
    
  } catch (error) {
    console.error("Error in ticketService:", error);
    
    return []; 
  }
}


export async function createTicket(ticketData: { 
  employeeName: string; 
  issueDescription: string; 
  priority: string;
}) {
  
  const res = await fetch('/api/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData),
  });

  if (!res.ok) {
    throw new Error('Failed to create ticket');
  }

  return res.json();
}