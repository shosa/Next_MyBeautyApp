'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUsers, FaSpa, FaCalendarAlt, FaInfoCircle, FaHome } from 'react-icons/fa';


const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-around items-center navbar-container relative">
        {/* Link per i Clienti */}
        <Link href="/clientsList" className={`text-gray-500 hover:text-indigo-600 transform transition-transform hover:scale-105 focus:outline-none focus:text-indigo-600 text-2xl ${pathname === '/clientsList' ? 'text-indigo-600' : ''}`}>
          <FaUsers />
          <span className="sr-only">Clienti</span>
        </Link>

        {/* Link per i Servizi */}
        <Link href="/services" className={`text-gray-500 transform transition-transform hover:scale-105 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 text-2xl ${pathname === '/services' ? 'text-indigo-600' : ''}`}>
          <FaSpa />
          <span className="sr-only">Servizi</span>
        </Link>

        <Link href="#" className={`text-gray-500 transform transition-transform hover:scale-105 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 text-2xl ${pathname === '/anotherPage' ? 'text-indigo-600' : ''}`}>
          
        </Link>

        {/* Link per gli Appuntamenti */}
        <Link href="/calendar" className={`text-gray-500 transform transition-transform hover:scale-105 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 text-2xl ${pathname === '/calendar' ? 'text-indigo-600' : ''}`}>
          <FaCalendarAlt />
          <span className="sr-only">Appuntamenti</span>
        </Link>

        {/* Link per Altro */}
        <Link href="/info" className={`text-gray-500 transform transition-transform hover:scale-105 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 text-xl ${pathname === '/anotherPage' ? 'text-indigo-600' : ''}`}>
          <FaInfoCircle />
          <span className="sr-only">Altro</span>
        </Link>

        {/* Cerchio di Home fuori dalla navbar */}
        <div className="home-circle transform transition-transform hover:scale-105 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white w-16 h-16 rounded-full flex justify-center items-center shadow-lg">
          <Link href="/" className="text-3xl">
            <FaHome />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
