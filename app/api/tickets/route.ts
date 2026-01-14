
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🚀 Proxy received POST request:", body);

    
    const res = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("❌ Spring Boot Error:", res.status);
      return NextResponse.json({ error: 'Backend Failed' }, { status: res.status });
    }

    const newTicket = await res.json();
    return NextResponse.json(newTicket);
    
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}