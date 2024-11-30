import React from 'react';
import { format } from 'date-fns';
import type { CalendarEvent } from '../../types/calendar';
import { cn } from '../../lib/utils';

interface EventCardProps {
  event: CalendarEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className={cn(
      'flex items-center justify-between p-4 rounded-lg',
      event.status === 'scheduled' ? 'bg-blue-50' :
      event.status === 'completed' ? 'bg-green-50' :
      'bg-red-50'
    )}>
      <div>
        <h3 className="font-medium">{event.title}</h3>
        <p className="text-sm text-gray-500">
          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className={cn(
          'px-2 py-1 text-xs font-medium rounded-full',
          event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
          event.status === 'completed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        )}>
          {event.status}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          {event.type}
        </span>
      </div>
    </div>
  );
}