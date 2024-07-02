// components/TodayView.tsx
import { useEffect, useState } from 'react';
import { format, isSameDay, startOfToday } from 'date-fns';
import { it } from 'date-fns/locale';
import { FaEdit } from 'react-icons/fa'; // Import dell'icona di modifica
import EditAppointmentModal from './EditAppointmentModal'; // Import del modale di modifica

interface Appointment {
  id: number;
  client: { name: string } | null;
  service: { name: string } | null;
  appointment_datetime: string;
  notes: string | null;
}

interface TodayViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const TodayView = ({ currentDate, onDateChange }: TodayViewProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    return isSameDay(appointmentDate, startOfToday());
  });

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(app => app.id === updatedAppointment.id ? updatedAppointment : app)
    );
    handleModalClose();
  };

  return (
    <div>
      <h2 className="text-xl text-white bg-emerald-600 p-1.5 rounded-lg font-semibold mb-4">Appuntamenti di oggi</h2>
      <ul className="space-y-2">
        {filteredAppointments.map(appointment => (
          <li key={appointment.id} className="p-4 bg-white shadow rounded-md mb-2 shadow-emerald-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{appointment.client ? appointment.client.name : 'Cliente non trovato'}</h3>
                <p>{appointment.service ? appointment.service.name : 'Servizio non trovato'}</p>
                <p>{format(new Date(appointment.appointment_datetime), 'PPpp', { locale: it })}</p>
                <p>{appointment.notes || 'Nessuna nota'}</p>
              </div>
              <button
                className="text-indigo-600 hover:text-indigo-800"
                onClick={() => handleEditClick(appointment)}
              >
                <FaEdit />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedAppointment && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          onClose={handleModalClose}
          onUpdate={handleAppointmentUpdate}
        />
      )}
    </div>
  );
};

export default TodayView;
