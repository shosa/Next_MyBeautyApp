// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Client from '@/models/client';

// GET /api/clients - Recupera tutti i clienti o un singolo cliente
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      // Recupera un singolo cliente
      const client = await Client.findByPk(id);
      if (client) {
        return NextResponse.json(client);
      } else {
        return NextResponse.json({ error: 'Cliente non trovato' }, { status: 404 });
      }
    } else {
      // Recupera tutti i clienti
      const clients = await Client.findAll();
      return NextResponse.json(clients);
    }
  } catch (error) {
    console.error('Errore nel recupero dei clienti:', error);
    return NextResponse.json({ error: 'Errore nel recupero dei clienti' }, { status: 500 });
  }
}

// POST /api/clients - Crea un nuovo cliente
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newClient = await Client.create(data);
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Errore nella creazione del cliente:', error);
    return NextResponse.json({ error: 'Errore nella creazione del cliente' }, { status: 500 });
  }
}

// PUT /api/clients/:id - Aggiorna un cliente esistente
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    const data = await req.json();
    const client = await Client.findByPk(id);
    if (!client) {
      return NextResponse.json({ error: 'Cliente non trovato' }, { status: 404 });
    }
    await client.update(data);
    return NextResponse.json(client);
  } catch (error) {
    console.error('Errore nell\'aggiornamento del cliente:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento del cliente' }, { status: 500 });
  }
}

// DELETE /api/clients/:id - Elimina un cliente
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return NextResponse.json({ error: 'Cliente non trovato' }, { status: 404 });
    }
    await client.destroy();
    return NextResponse.json({ message: 'Cliente eliminato' });
  } catch (error) {
    console.error('Errore nell\'eliminazione del cliente:', error);
    return NextResponse.json({ error: 'Errore nell\'eliminazione del cliente' }, { status: 500 });
  }
}
