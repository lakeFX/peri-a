import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { useCalendarStore } from '../../../store/calendarStore';
import EventIndicator from '../EventIndicator';
import { cn } from '../../../lib/utils';
import type { CalendarEvent } from '../../../types/calendar';

interface MonthViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export default function MonthView({ events, onEventClick }: MonthViewProps) {
  const { selectedDate, selectDay } = useCalendarStore();
  
  // Get the first day of the month
  const monthStart = startOfMonth(selectedDate);
  // Get the start of the week containing the first day
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  // Get the end of the month
  const monthEnd = endOfMonth(selectedDate);
  // Get the end of the week containing the last day
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  // Get all days to display
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
          {day}
        </div>
      ))}
      {days.map((day) => {
        const dayEvents = events.filter(event => 
          isSameDay(event.start, day)
        );

        return (
          <div
            key={day.toString()}
            onClick={() => selectDay(day)}
            className={cn(
              'min-h-[100px] bg-white p-2 cursor-pointer transition-colors',
              !isSameMonth(day, selectedDate) && 'bg-gray-50 text-gray-400',
              isToday(day) && 'bg-blue-50',
              'hover:bg-gray-50'
            )}
          >
            <div className="font-medium">{format(day, 'd')}</div>
            <div className="mt-1 space-y-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <EventIndicator event={event} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}