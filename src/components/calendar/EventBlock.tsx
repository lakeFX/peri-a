import React from 'react';
import { format } from 'date-fns';
import type { CalendarEvent } from '../../types/calendar';
import { cn } from '../../lib/utils';

interface EventBlockProps {
  event: CalendarEvent;
  onClick?: () => void;
}

export default function EventBlock({ event, onClick }: EventBlockProps) {
  const startHour = event.start.getHours() + event.start.getMinutes() / 60;
  const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);

  const getStatusColor = () => {
    switch (event.status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'absolute left-0 right-0 mx-1 p-1 rounded text-sm cursor-pointer transition-colors',
        getStatusColor()
      )}
      style={{
        top: `${(startHour - 8) * 40}px`, // Offset by 8 hours (business start)
        height: `${duration * 40}px`,
      }}
    >
      {event.patient ? (
        <>
          <div className="font-medium truncate">
            {`${event.patient.firstName} ${event.patient.lastName}`}
          </div>
          <div className="text-xs truncate">
            {format(event.start, 'h:mm a')}
          </div>
        </>
      ) : (
        <div className="font-medium truncate">No Patient</div>
      )}
    </div>
  );
}