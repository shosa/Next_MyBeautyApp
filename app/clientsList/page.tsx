// app/clientsList/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa'; // Import delle icone di telefono e WhatsApp

interface Client {
  id: number;
  name: string;
  phone: string | null;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/clientsList/api');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleCall = (phone: string | null) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWhatsApp = (phone: string | null) => {
    if (phone) {
      // Assuming WhatsApp API can be opened with a link like this (check WhatsApp API documentation)
      window.open(`https://api.whatsapp.com/send?phone=${phone}`);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rubrica Clienti</h1>
      <ul className="space-y-4">
        {clients.map(client => (
          <li key={client.id} className="p-4 bg-white shadow rounded-md flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{client.name}</h2>
              <p className="text-gray-600">{client.phone || 'Nessun numero di telefono'}</p>
            </div>
            <div className="flex items-center space-x-4">
              {client.phone && (
                <button
                  className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
                  onClick={() => handleCall(client.phone)}
                >
                  <FaPhone className="text-white text-xl" />
                </button>
              )}
              {client.phone && (
                <button
                  className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none"
                  onClick={() => handleWhatsApp(client.phone)}
                >
                  <FaWhatsapp className="text-white text-xl" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
