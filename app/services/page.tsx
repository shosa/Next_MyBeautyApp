// app/services/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Toolbar from '../../components/Toolbar';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

interface Service {
  id: number;
  name: string;
  description: string | null;
  duration: number;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          console.error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const deleteService = async (id: number) => {
    if (confirm('Sei sicuro di voler eliminare questo servizio?')) {
      try {
        const response = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          setServices(services.filter(service => service.id !== id));
        } else {
          console.error('Failed to delete service');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <main className="p-1">
      <Toolbar pageTitle="Elenco Servizi" showPlusButton={true} buttons={[
        {
          icon: <FaPlus />,
          text: 'AGGIUNGI NUOVO',
        },]} />
      {isLoading ? (
        <p>Caricamento...</p>
      ) : (
        <ul className="space-y-2" style={{ paddingBottom: '100px' }}>
          {services.map(service => (
            <li key={service.id} className="p-4 bg-white shadow rounded-md flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <p className="text-gray-600">{service.description || 'Nessuna descrizione'}</p>
                <p className="text-gray-600">Durata: {service.duration} minuti</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center justify-center w-10 h-10 bg-red-100 border border-red-500 rounded-full hover:bg-red-500 hover:text-white focus:outline-none"
                  onClick={() => deleteService(service.id)}
                >
                  <FaTrash className="text-red-500" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white focus:outline-none"
                >
                  <FaEdit className="text-yellow-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
