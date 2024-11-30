import React from 'react';
import { format, isToday } from 'date-fns';
import { useCalendarStore } from '../../../store/calendarStore';
import EventBlock from '../EventBlock';
import { cn } from '../../../lib/utils';
import type { CalendarEvent } from '../../../types/calendar';

interface DayViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export default function DayView({ events, onEventClick }: DayViewProps) {
  const { selectedDate } = useCalendarStore();
  const dayEvents = events.filter(event => 
    format(event.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  // Create array of business hours (8am to 8pm)
  const businessHours = Array.from({ length: 13 }, (_, i) => i + 8);

  return (
    <div className="flex flex-col h-[600px]">
      <div className={cn(
        'p-4 text-center sticky top-0 bg-white z-10',
        isToday(selectedDate) && 'bg-blue-50'
      )}>
        <h2 className="text-lg font-semibold">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-[auto,1fr] overflow-y-auto">
        <div className="border-r bg-white sticky left-0">
          {businessHours.map((hour) => (
            <div key={hour} className="h-10 text-xs text-gray-500 text-right pr-2">
              {format(new Date().setHours(hour, 0), 'h a')}
            </div>
          ))}
        </div>

        <div className="relative">
          {dayEvents.map((event) => (
            <EventBlock 
              key={event.id} 
              event={event}
              onClick={() => onEventClick(event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}