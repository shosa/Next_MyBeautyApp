// components/Toolbar.tsx
'use client';
import { useState } from 'react';
import { FaPlus, FaCog, FaBell, FaUser } from 'react-icons/fa'; // Import delle icone

interface ToolbarProps {
  pageTitle: string;
  toolbarHeight?: string; // Prop opzionale per determinare l'altezza della toolbar
  showPlusButton?: boolean; // Prop opzionale per mostrare o nascondere il pulsante +
}

const Toolbar: React.FC<ToolbarProps> = ({ pageTitle, toolbarHeight = '64px', showPlusButton = true }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between"
        style={{ height: toolbarHeight, padding: '0 1rem' }} // Usa padding per contenere i contenuti
      >
        <h1 className="pageTitle">{pageTitle}</h1>
        <div className="flex items-center space-x-4 relative">
          {showPlusButton && (
            <button
              className="flex items-center justify-center w-10 h-10 bg-white border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none"
              onClick={toggleExpand}
            >
              <FaPlus className="text-lg" />
            </button>
          )}
          {/* Questo div contiene i pulsanti espansi */}
          <div
            className={`absolute left-0 right-10 mt-2 flex flex-col items-center space-y-2 p-2 rounded-md transform transition-transform duration-300 ease-in-out ${expanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            style={{ top: 'calc(100% + 10px)', zIndex: 50 }}
          >
            {/* Pulsante con etichetta */}
            <div className="relative flex items-center group">
              <span className="absolute left-[-100px] ml-2 px-2 py-1 text-sm text-white bg-indigo-500 rounded-md transition-opacity duration-300">
                Nuovo
              </span>
              <button className="flex items-center justify-center w-10 h-10 bg-white border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none">
                <FaCog className="text-xl" />
              </button>
            </div>
            <div className="relative flex items-center group">
              <span className="absolute left-[-100px] ml-2 px-2 py-1 text-sm text-white bg-indigo-500 rounded-md transition-opacity duration-300">
                Opzioni
              </span>
              <button className="flex items-center justify-center w-10 h-10 bg-white border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none">
                <FaBell className="text-lg" />
              </button>
            </div>
            <div className="relative flex items-center group">
              <span className="absolute left-[-100px] ml-2 px-2 py-1 text-sm text-white bg-indigo-500 rounded-md transition-opacity duration-300">
                Cazzo
              </span>
              <button className="flex items-center justify-center w-10 h-10 bg-white border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none">
                <FaUser className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {expanded && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-filter backdrop-blur" onClick={toggleExpand} />
        </div>
      )}
    </>
  );
};

export default Toolbar;
