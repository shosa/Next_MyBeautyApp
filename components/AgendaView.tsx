// components/AgendaView.tsx
import { useEffect, useState } from 'react';
import { format, addDays, isSameDay, startOfToday } from 'date-fns';
import { it } from 'date-fns/locale';

interface Appointment {
  id: number;
  client: { name: string } | null;
  service: { name: string } | null;
  appointment_datetime: string;
  notes: string | null;
}

interface AgendaViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const AgendaView = ({ currentDate, onDateChange }: AgendaViewProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_datetime);
    const today = startOfToday();
    return appointmentDate >= today && appointmentDate <= addDays(today, 3);
  });

  return (
    <div>
      <h2 className="text-xl text-white bg-emerald-600 p-1.5 rounded-lg font-semibold mb-4">Prossimi 3 giorni</h2>
      <ul className="space-y-2">
        {filteredAppointments.map(appointment => (
          <li key={appointment.id} className="p-4 bg-white shadow rounded-md mb-2  shadow-emerald-500">
            <h3 className="text-lg font-semibold">{appointment.client ? appointment.client.name : 'Cliente non trovato'}</h3>
            <p>{appointment.service ? appointment.service.name : 'Servizio non trovato'}</p>
            <p>{format(new Date(appointment.appointment_datetime), 'PPpp')}</p>
            <p>{appointment.notes || 'Nessuna nota'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgendaView;
