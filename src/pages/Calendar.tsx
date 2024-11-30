import React, { useState } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarView from '../components/calendar/CalendarView';
import { EventModal } from '../components/calendar/EventModal';

export default function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <CalendarHeader onNewEvent={() => setIsModalOpen(true)} />
      <div className="bg-white rounded-lg shadow">
        <CalendarView />
      </div>
      
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  );
}