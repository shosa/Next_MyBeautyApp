// app/clientsList/page.tsx
'use client';
import { useEffect, useState } from 'react';

interface Client {
  id: number;
  name: string;
  phone: string | null;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('/clientsList/api');
      const data = await response.json();
      setClients(data);
    };

    fetchClients();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rubrica Clienti</h1>
      <ul className="space-y-4">
        {clients.map(client => (
          <li key={client.id} className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold">{client.name}</h2>
            <p className="text-gray-600">{client.phone || 'Nessun numero di telefono'}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
