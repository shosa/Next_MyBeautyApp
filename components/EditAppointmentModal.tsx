// components/EditAppointmentModal.tsx
import { useState, useEffect } from 'react';

interface EditAppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAppointment: Appointment) => void;
}

interface Appointment {
  id: number;
  client_id: number;
  service_id: number;
  appointment_datetime: string;
  notes: string | null;
}

const EditAppointmentModal = ({ appointment, isOpen, onClose, onSave }: EditAppointmentModalProps) => {
  const [client, setClient] = useState<number | null>(appointment?.client_id || null);
  const [service, setService] = useState<number | null>(appointment?.service_id || null);
  const [appointmentDatetime, setAppointmentDatetime] = useState<string>(appointment?.appointment_datetime || '');
  const [notes, setNotes] = useState<string>(appointment?.notes || '');

  useEffect(() => {
    if (appointment) {
      setClient(appointment.client_id);
      setService(appointment.service_id);
      setAppointmentDatetime(appointment.appointment_datetime);
      setNotes(appointment.notes || '');
    }
  }, [appointment]);

  const handleSave = () => {
    if (client && service && appointmentDatetime) {
      onSave({
        id: appointment?.id || 0,
        client_id: client,
        service_id: service,
        appointment_datetime: appointmentDatetime,
        notes,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-grey p-10 bg-opacity-20  backdrop-filter backdrop-blur flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Modifica Appuntamento</h2>
        <div className="mb-4">
          <label className="block mb-1">Cliente</label>
          <input
            type="number"
            value={client ?? ''}
            onChange={(e) => setClient(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Servizio</label>
          <input
            type="number"
            value={service ?? ''}
            onChange={(e) => setService(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Data e Ora</label>
          <input
            type="datetime-local"
            value={appointmentDatetime}
            onChange={(e) => setAppointmentDatetime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Note</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Annulla
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
