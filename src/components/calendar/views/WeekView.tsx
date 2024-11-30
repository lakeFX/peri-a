import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { useCalendarStore } from '../../../store/calendarStore';
import EventBlock from '../EventBlock';
import { cn } from '../../../lib/utils';
import type { CalendarEvent } from '../../../types/calendar';

interface WeekViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export default function WeekView({ events, onEventClick }: WeekViewProps) {
  const { selectedDate, selectDay } = useCalendarStore();
  
  // Get start and end of week with Sunday as first day
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Business hours (8am to 8pm)
  const businessHours = Array.from({ length: 13 }, (_, i) => i + 8);

  return (
    <div className="flex flex-col h-[600px]">
      <div className="grid grid-cols-8 border-b sticky top-0 bg-white z-10">
        <div className="w-16" /> {/* Time column */}
        {days.map((day) => (
          <div
            key={day.toString()}
            onClick={() => selectDay(day)}
            className={cn(
              'p-2 text-center cursor-pointer transition-colors',
              isToday(day) && 'bg-blue-50',
              'hover:bg-gray-50'
            )}
          >
            <div className="font-medium">{format(day, 'EEE')}</div>
            <div className="text-sm text-gray-500">{format(day, 'MMM d')}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-8 overflow-y-auto">
        <div className="border-r sticky left-0 bg-white z-10">
          {businessHours.map((hour) => (
            <div key={hour} className="h-10 text-xs text-gray-500 text-right pr-2">
              {format(new Date().setHours(hour, 0), 'h a')}
            </div>
          ))}
        </div>

        {days.map((day) => {
          const dayEvents = events.filter(event => 
            isSameDay(event.start, day)
          );

          return (
            <div key={day.toString()} className="relative border-r">
              {dayEvents.map((event) => (
                <EventBlock 
                  key={event.id} 
                  event={event}
                  onClick={() => onEventClick(event)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}