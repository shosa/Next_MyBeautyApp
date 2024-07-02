// app/agenda/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Toolbar from '@/../components/Toolbar';
import TodayView from '@/../components/TodayView';
import ThreeDaysView from '@/../components/ThreeDaysView';
import WeeklyView from '@/../components/WeeklyView';
import MonthlyView from '@/../components/MonthlyView';
import { FaPlus } from 'react-icons/fa';

export default function AgendaPage() {
  const [currentView, setCurrentView] = useState<'today' | 'agenda' | 'weekly' | 'monthly'>('today');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleViewChange = (view: 'today' | 'agenda' | 'weekly' | 'monthly') => {
    setCurrentView(view);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <main className="p-1">
      <Toolbar pageTitle="Agenda Appuntamenti" showPlusButton={true} buttons={[
        {
          icon: <FaPlus />,
          text: 'AGGIUNGI NUOVO',
        },]} />
      <div className="flex justify-center items-center mt-1 mb-3">
        <button
          className={`px-4 py-2 ${currentView === 'today' ? 'bg-indigo-500 text-white font-bold border-2 border-indigo-500 rounded-lg rounded-r-none shadow-xl' : ' bg-white text-indigo-500 border-indigo-500 border-r-0 border-2 rounded-lg rounded-r-none'}`}
          onClick={() => handleViewChange('today')}
        >
          Oggi
        </button>
        <button
          className={`px-4 py-2 ${currentView === 'agenda' ? 'bg-indigo-500 text-white font-bold border-2 border-indigo-500 shadow-xl' : 'bg-white text-indigo-500 border-indigo-500 border-r-0 border-2'}`}
          onClick={() => handleViewChange('agenda')}
        >
          3 GG
        </button>
        <button
          className={`px-4 py-2 ${currentView === 'weekly' ? 'bg-indigo-500 text-white font-bold  border-2 border-indigo-500 shadow-xl' : 'bg-white text-indigo-500 border-indigo-500 border-r-0 border-2'}`}
          onClick={() => handleViewChange('weekly')}
        >
          Settimana
        </button>
        <button
          className={`px-4 py-2 ${currentView === 'monthly' ? 'bg-indigo-500 text-white font-bold border-2 border-indigo-500 rounded-lg rounded-l-none shadow-xl' : 'bg-white text-indigo-500 border-indigo-500 border-2 rounded-lg rounded-l-none'}`}
          onClick={() => handleViewChange('monthly')}
        >
          Mese
        </button>
      </div>
      {currentView === 'today' && <TodayView currentDate={currentDate} onDateChange={handleDateChange} />}
      {currentView === 'agenda' && <ThreeDaysView currentDate={currentDate} onDateChange={handleDateChange} />}
      {currentView === 'weekly' && <WeeklyView currentDate={currentDate} onDateChange={handleDateChange} />}
      {currentView === 'monthly' && <MonthlyView currentDate={currentDate} onDateChange={handleDateChange} />}
    </main>
  );

}
