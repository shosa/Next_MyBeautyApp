import { useEffect, useState } from 'react';
import { format, addDays, startOfToday } from 'date-fns';
import { it } from 'date-fns/locale';
import { FaEllipsisV, FaWhatsapp, FaEdit, FaTrash } from 'react-icons/fa'; // Import delle icone
import EditAppointmentModal from './EditAppointmentModal';


interface Appointment {
  id: number;
  client: { name: string } | null;
  service: { name: string } | null;
  appointment_datetime: string;
  notes: string | null;
}

interface ThreeDaysViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const ThreeDaysView = ({ currentDate, onDateChange }: ThreeDaysViewProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<number | null>(null); // Stato per tracciare quale menu è aperto

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

  const handleEditClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
    setMenuOpen(null); // Chiudi il menu quando si apre il modale
  };

  const handleDeleteClick = async (appointmentId: number) => {
    try {
      const response = await fetch(`/api/appointments?id=${appointmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments(prevAppointments => 
          prevAppointments.filter(app => app.id !== appointmentId)
        );
        setMenuOpen(null); // Chiudi il menu dopo l'eliminazione
      } else {
        console.error('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
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

  const handleMenuToggle = (appointmentId: number) => {
    setMenuOpen(prev => (prev === appointmentId ? null : appointmentId));
  };

  const handleWhatsAppClick = (clientName: string | null) => {
    const message = `Ciao ${clientName || 'cliente'}, ti ricordiamo che hai un appuntamento nei prossimi giorni.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setMenuOpen(null); // Chiudi il menu dopo aver cliccato
  };

  return (
    <div>
      <h2 className="text-xl text-white bg-emerald-600 p-1.5 rounded-lg font-semibold mb-4">Prossimi 3 giorni</h2>
      <ul className="space-y-2">
        {filteredAppointments.map(appointment => (
          <li key={appointment.id} className="p-4 bg-white shadow rounded-md mb-2 shadow-emerald-500 relative">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{appointment.client ? appointment.client.name : 'Cliente non trovato'}</h3>
                <p>{appointment.service ? appointment.service.name : 'Servizio non trovato'}</p>
                <p>{format(new Date(appointment.appointment_datetime), 'PPpp', { locale: it })}</p>
                <p>{appointment.notes || 'Nessuna nota'}</p>
              </div>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => handleMenuToggle(appointment.id)}
              >
                <FaEllipsisV />
              </button>
            </div>
            {menuOpen === appointment.id && (
              <div className="absolute top-10 right-2 bg-white border rounded shadow-lg z-50 p-2 w-40 flex flex-col space-y-1 backdrop-filter backdrop-blur-lg">
                <button
                  onClick={() => handleWhatsAppClick(appointment.client?.name || null)}
                  className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100"
                >
                  <FaWhatsapp className="text-green-500" />
                  <span>Ricorda</span>
                </button>
                <button
                  onClick={() => handleEditClick(appointment)}
                  className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100"
                >
                  <FaEdit className="text-indigo-500" />
                  <span>Modifica</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(appointment.id)}
                  className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100"
                >
                  <FaTrash className="text-red-500" />
                  <span>Elimina</span>
                </button>
              </div>
            )}
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

export default ThreeDaysView;
