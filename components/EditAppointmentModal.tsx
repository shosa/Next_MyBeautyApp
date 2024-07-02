// components/EditAppointmentModal.tsx
import React, { useState } from 'react';

interface Appointment {
  id: number;
  client: { name: string } | null;
  service: { name: string } | null;
  appointment_datetime: string;
  notes: string | null;
}

interface EditAppointmentModalProps {
  appointment: Appointment;
  onClose: () => void;
  onUpdate: (updatedAppointment: Appointment) => void;
}

const EditAppointmentModal = ({ appointment, onClose, onUpdate }: EditAppointmentModalProps) => {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedAppointment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/appointments?id=${updatedAppointment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      });

      if (response.ok) {
        const updatedData = await response.json();
        onUpdate(updatedData);
      } else {
        console.error('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-80">
        <h2 className="text-xl mb-4">Modifica Appuntamento</h2>
        <input
          type="text"
          name="clientName"
          value={updatedAppointment.client?.name || ''}
          onChange={handleChange}
          placeholder="Nome Cliente"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="serviceName"
          value={updatedAppointment.service?.name || ''}
          onChange={handleChange}
          placeholder="Servizio"
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="notes"
          value={updatedAppointment.notes || ''}
          onChange={handleChange}
          placeholder="Note"
          className="w-full mb-2 p-2 border rounded"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 text-white p-2 rounded-md"
        >
          Salva
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 p-2 border rounded-md"
        >
          Annulla
        </button>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
