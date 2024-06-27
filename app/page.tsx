import Link from 'next/link';
import Toolbar from '../components/Toolbar';
import { FaUsers, FaSpa, FaCalendarAlt, FaRegCalendar, FaBookOpen } from 'react-icons/fa';

export default function Home() {
  return (

    <main className="bg-white text-center p-4 min-h-screen">
      <Toolbar pageTitle='Home' showPlusButton={false} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card per gli Appuntamenti */}
        <Link href="/appointments">
          <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-green-500 to-blue-600 shadow-lg transform transition-transform hover:scale-105 neon-green">
            <FaCalendarAlt className="absolute left-0 top-0 -translate-x-1/3 text-9xl text-white opacity-20" />
            <h2 className="text-xl font-semibold mb-2 text-white">Appuntamenti</h2>
            <p className="text-gray-200 mb-4">Gestisci gli appuntamenti.</p>
          </div>

        </Link>
        {/* Card per i Servizi */}
        <Link href="/services">
          <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-pink-500 to-red-600 shadow-lg transform transition-transform hover:scale-105 neon-pink">
            <FaSpa className="absolute left-0 top-0 -translate-x-1/3 text-9xl text-white opacity-20" />
            <h2 className="text-xl font-semibold mb-2 text-white">Servizi</h2>
            <p className="text-gray-200 mb-4">Gestisci i servizi offerti.</p>
          </div>
        </Link>
        {/* Card per i Clienti */}
        <Link href="/clientsList">
          <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg transform transition-transform hover:scale-105 neon-purple">
            <FaUsers className="absolute left-0 top-0 -translate-x-1/3 text-9xl text-white opacity-20" />
            <h2 className="text-xl font-semibold mb-2 text-white">Clienti</h2>
            <p className="text-gray-200 mb-4">Gestisci i tuoi clienti.</p>
          </div>
        </Link>

        <Link href="/agenda">
          <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg transform transition-transform hover:scale-105 neon-yellow">
            <FaBookOpen className="absolute left-0 top-0 -translate-x-1/3 text-9xl text-white opacity-20" />
            <h2 className="text-xl font-semibold mb-2 text-white">Agenda</h2>
            <p className="text-gray-200 mb-4">Controlla l'agenda.</p>
          </div>
        </Link>
      </div>

    </main >
  );
}
