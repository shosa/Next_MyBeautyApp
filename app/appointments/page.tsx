// app/appointments/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Toolbar from '@/../components/Toolbar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditAppointmentModal from '@/../components/EditAppointmentModal';

interface Appointment {
  id: number;
  client: { name: string } | null;
  service: { name: string } | null;
  client_id: number;
  service_id: number;
  appointment_datetime: string;
  notes: string | null;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const deleteAppointment = async (id: number) => {
    if (confirm('Sei sicuro di voler eliminare questo appuntamento?')) {
      try {
        const response = await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          setAppointments(appointments.filter(appointment => appointment.id !== id));
        } else {
          console.error('Failed to delete appointment');
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const updateAppointment = async (updatedAppointment: Appointment) => {
    try {
      const response = await fetch(`/api/appointments?id=${updatedAppointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppointment),
      });
      if (response.ok) {
        setAppointments(
          appointments.map(appointment =>
            appointment.id === updatedAppointment.id ? updatedAppointment : appointment
          )
        );
      } else {
        console.error('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <main className="p-1">
      <Toolbar pageTitle="Appuntamenti" showPlusButton={true} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2" style={{ paddingBottom: '100px' }}>
          {appointments.map(appointment => (
            <li key={appointment.id} className="p-4 bg-white shadow rounded-md flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Cliente: {appointment.client ? appointment.client.name : 'Cliente non trovato'}
                </h2>
                <p className="text-gray-600">
                  Servizio: {appointment.service ? appointment.service.name : 'Servizio non trovato'}
                </p>
                <p className="text-gray-600">
                  Data: {new Date(appointment.appointment_datetime).toLocaleString()}
                </p>
                <p className="text-gray-600">{appointment.notes || 'Nessuna nota'}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center justify-center w-10 h-10 bg-red-100 border border-red-500 rounded-full hover:bg-red-500 hover:text-white focus:outline-none"
                  onClick={() => deleteAppointment(appointment.id)}
                >
                  <FaTrash className="text-red-500" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white focus:outline-none"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setIsEditModalOpen(true);
                  }}
                >
                  <FaEdit className="text-yellow-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isEditModalOpen && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={updateAppointment}
        />
      )}
    </main>
  );
}
