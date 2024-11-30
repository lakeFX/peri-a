import React, { useEffect } from 'react';
import { useCalendarStore } from '../../store/calendarStore';
import { usePatientStore } from '../../store/patientStore';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import AgendaView from './views/AgendaView';
import { EventModal } from './EventModal';

export default function CalendarView() {
  const { view, events, selectedEvent, setSelectedEvent } = useCalendarStore();
  const { patients } = usePatientStore();

  // Enrich events with patient data
  const enrichedEvents = events.map(event => ({
    ...event,
    patient: event.patientId ? patients.find(p => p.id === event.patientId) : undefined
  }));

  return (
    <div className="bg-white rounded-lg shadow">
      {view === 'month' && <MonthView events={enrichedEvents} onEventClick={setSelectedEvent} />}
      {view === 'week' && <WeekView events={enrichedEvents} onEventClick={setSelectedEvent} />}
      {view === 'day' && <DayView events={enrichedEvents} onEventClick={setSelectedEvent} />}
      {view === 'agenda' && <AgendaView events={enrichedEvents} onEventClick={setSelectedEvent} />}

      <EventModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        mode="edit"
      />
    </div>
  );
}