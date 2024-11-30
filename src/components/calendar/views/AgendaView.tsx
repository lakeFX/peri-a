import React from 'react';
import { format, isSameDay } from 'date-fns';
import { useCalendarStore } from '../../../store/calendarStore';
import EventCard from '../EventCard';

export default function AgendaView() {
  const { selectedDate, events } = useCalendarStore();
  const dayEvents = events.filter(event => 
    isSameDay(event.start, selectedDate)
  ).sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
      </h2>

      <div className="space-y-4">
        {dayEvents.length > 0 ? (
          dayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No appointments scheduled for today
          </p>
        )}
      </div>
    </div>
  );
}