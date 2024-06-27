// components/Toolbar.tsx
'use client';
import { useState } from 'react';
import { FaPlus, FaCog, FaBell, FaUser } from 'react-icons/fa'; // Import delle icone

interface ToolbarProps {
  pageTitle: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ pageTitle }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="pageTitle font-bold">{pageTitle}</h1>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
          onClick={toggleExpand}
        >
          <FaPlus className="text-gray-600 text-lg" />
        </button>
        {expanded && (
          <>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
              <FaCog className="text-gray-600 text-lg" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
              <FaBell className="text-gray-600 text-lg" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
              <FaUser className="text-gray-600 text-lg" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Toolbar;
