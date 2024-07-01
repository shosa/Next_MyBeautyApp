// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Service from '../../models/service';

// GET /api/services - Get all services
export async function GET() {
  try {
    const services = await Service.findAll();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST /api/services - Create a new service
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const service = await Service.create(data);
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

// PUT /api/services/:id - Update an existing service
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    const data = await req.json();
    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    await service.update(data);
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE /api/services/:id - Delete a service
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    await service.destroy();
    return NextResponse.json({ message: 'Service deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
