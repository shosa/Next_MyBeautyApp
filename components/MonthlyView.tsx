// components/MonthlyView.tsx
import { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths } from 'date-fns';
import { it } from 'date-fns/locale';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Appointment {
  id: number;
  client: { name: string } | null;
  service: { name: string } | null;
  appointment_datetime: string;
  notes: string | null;
}

interface MonthlyViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const MonthlyView = ({ currentDate, onDateChange }: MonthlyViewProps) => {
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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const appointmentsByDay = days.map(day => ({
    day,
    appointments: appointments.filter(appointment => isSameDay(new Date(appointment.appointment_datetime), day)),
  }));

  const handlePreviousMonth = () => {
    onDateChange(addMonths(monthStart, -1));
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(monthStart, 1));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth}><FaChevronLeft className="text-2xl"/></button>
        <h2 className="text-xl font-semibold">
          {format(monthStart, 'MMMM yyyy', { locale: it })}
        </h2>
        <button onClick={handleNextMonth}><FaChevronRight className="text-2xl"/></button>
      </div>
      <ul>
        {appointmentsByDay.map(({ day, appointments }) => (
          <li key={day.toString()} className="mb-4">
            <h3 className="text-lg mb-2 font-semibold  p-1.5 bg-rose-500 text-white rounded-lg">{format(day, 'eeee, dd MMMM', { locale: it })}</h3>
            <ul className="space-y-2">
              {appointments.map(appointment => (
                <li key={appointment.id} className="p-4 bg-white shadow shadow-rose-500 rounded-md">
                  <h4 className="text-lg font-semibold">{appointment.client ? appointment.client.name : 'Cliente non trovato'}</h4>
                  <p>{appointment.service ? appointment.service.name : 'Servizio non trovato'}</p>
                  <p>{format(new Date(appointment.appointment_datetime), 'PPpp', { locale: it })}</p>
                  <p>{appointment.notes || 'Nessuna nota'}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyView;
