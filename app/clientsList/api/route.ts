// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Client from '@/models/client';

export async function GET() {
  try {
    const clients = await Client.findAll();
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.error(new Error('Errore nel recupero dei clienti'));
  }
}
