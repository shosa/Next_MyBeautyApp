// app/api/appointments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Appointment from '@/models/appointment';
import Client from '@/models/client';
import Service from '@/models/service';
// GET /api/appointments - Get all appointments
export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        if (id) {
            const appointment = await Appointment.findByPk(id, {
                include: [
                    { model: Client, as: 'client', attributes: ['name'] },
                    { model: Service, as: 'service', attributes: ['name'] },
                ],
            });
            if (appointment) {
                return NextResponse.json(appointment);
            } else {
                return NextResponse.json({ error: 'Appuntamento non trovato' }, { status: 404 });
            }
        } else {
            const appointments = await Appointment.findAll({
                include: [
                    { model: Client, as: 'client', attributes: ['name'] },
                    { model: Service, as: 'service', attributes: ['name'] },
                ],
            });
            return NextResponse.json(appointments);
        }
    } catch (error) {
        console.error('Errore nel recupero degli appuntamenti:', error);
        return NextResponse.json({ error: 'Errore nel recupero degli appuntamenti' }, { status: 500 });
    }
}

// POST /api/appointments - Create a new appointment
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const appointment = await Appointment.create(data);
        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
    }
}

// PUT /api/appointments/:id - Update an existing appointment
export async function PUT(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    try {
        const data = await req.json();
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }
        await appointment.update(data);
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
    }
}

// DELETE /api/appointments/:id - Delete an appointment
export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }
        await appointment.destroy();
        return NextResponse.json({ message: 'Appointment deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
    }
}
