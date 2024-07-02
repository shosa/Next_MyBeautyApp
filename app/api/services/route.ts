import { NextRequest, NextResponse } from 'next/server';
import Service from '@/models/service';

// GET /api/services - Get all services
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (id) {
      const service = await Service.findByPk(id);
      if (service) {
        return NextResponse.json(service);
      } else {
        return NextResponse.json({ error: 'Servizio non trovato' }, { status: 404 });
      }
    } else {
      const services = await Service.findAll();
      return NextResponse.json(services);
    }
  } catch (error) {
    console.error('Errore nel recupero dei servizi:', error);
    return NextResponse.json({ error: 'Errore nel recupero dei servizi' }, { status: 500 });
  }
}

// POST /api/services - Create a new service
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const service = await Service.create(data);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Errore nella creazione del servizio:', error);
    return NextResponse.json({ error: 'Errore nella creazione del servizio' }, { status: 500 });
  }
}

// PUT /api/services/:id - Update an existing service
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID è richiesto' }, { status: 400 });
  }
  try {
    const data = await req.json();
    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json({ error: 'Servizio non trovato' }, { status: 404 });
    }
    await service.update(data);
    return NextResponse.json(service);
  } catch (error) {
    console.error('Errore nell\'aggiornamento del servizio:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento del servizio' }, { status: 500 });
  }
}

// DELETE /api/services/:id - Delete a service
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID è richiesto' }, { status: 400 });
  }
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json({ error: 'Servizio non trovato' }, { status: 404 });
    }
    await service.destroy();
    return NextResponse.json({ message: 'Servizio cancellato' });
  } catch (error) {
    console.error('Errore nella cancellazione del servizio:', error);
    return NextResponse.json({ error: 'Errore nella cancellazione del servizio' }, { status: 500 });
  }
}
