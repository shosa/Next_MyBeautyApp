// components/Toolbar.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Import delle icone

interface CustomButtonProps {
  icon: React.ReactNode;
  text: string;
}

interface ToolbarProps {
  pageTitle: string;
  toolbarHeight?: string; // Prop opzionale per determinare l'altezza della toolbar
  showPlusButton?: boolean; // Prop opzionale per mostrare o nascondere il pulsante +
  buttons?: CustomButtonProps[]; // Array di pulsanti personalizzati
}

const Toolbar: React.FC<ToolbarProps> = ({
  pageTitle,
  toolbarHeight = '64px',
  showPlusButton = true,
  buttons = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);

  const toggleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-70 shadow-md flex items-center justify-between backdrop-blur-md"
        style={{ height: toolbarHeight, padding: '0 1rem' }} // Usa padding per contenere i contenuti
      >
        <h1 className="pageTitle">{pageTitle}</h1>
        <div className="flex items-center space-x-4 relative">
          {showPlusButton && (
            <button
              className="flex items-center justify-center w-12 h-12 bg-white border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white focus:outline-none transition-transform duration-300 transform hover:scale-110"
              onClick={toggleExpand}
            >
              <FaPlus className="text-xl" />
            </button>
          )}
        </div>
      </header>
      {expanded && (
        <>
          <div
            ref={menuRef}
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setExpanded(false)}
          >
            <div className="absolute inset-0 bg-opacity-5 bg-grey backdrop-filter backdrop-blur" />
          </div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="p-2 space-y-4">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="flex items-center shadow-lg justify-center w-full py-5 px-12 bg-indigo-500 text-white rounded-md hover:bg-white hover:text-indigo-500 focus:outline-none transition-transform duration-300 transform hover:scale-105"
                  onClick={() => {
                    setExpanded(false);
                    // Aggiungere azioni personalizzate qui se necessario
                  }}
                >
                  <span className="mr-2">{button.icon}</span>
                  <span>{button.text}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Toolbar;