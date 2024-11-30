import React from 'react';
import { cn } from '../../lib/utils';
import type { CalendarEvent } from '../../types/calendar';

interface EventIndicatorProps {
  event: CalendarEvent;
  displayMode?: 'month' | 'week' | 'day';
}

export default function EventIndicator({ event, displayMode = 'month' }: EventIndicatorProps) {
  const getStatusColor = () => {
    switch (event.status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAppointmentType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getDisplayContent = () => {
    if (!event.patient) return 'No Patient';

    switch (displayMode) {
      case 'month':
        return `${event.patient.firstName} ${event.patient.lastName.charAt(0)}.`;
      case 'week':
        return (
          <>
            <div className="font-medium">{`${event.patient.firstName} ${event.patient.lastName.charAt(0)}.`}</div>
            <div className="text-xs truncate">{formatAppointmentType(event.type)}</div>
          </>
        );
      case 'day':
        const visitCount = event.patient.visitCount || 0;
        return (
          <>
            <div className="font-medium">{`${event.patient.firstName} ${event.patient.lastName}`}</div>
            <div className="text-xs">{`${formatAppointmentType(event.type)} (Visit #${visitCount + 1})`}</div>
            {event.notes && <div className="text-xs truncate">{event.notes}</div>}
          </>
        );
      default:
        return event.title;
    }
  };

  return (
    <div 
      className={cn(
        'px-2 py-1 rounded text-sm',
        getStatusColor(),
        displayMode === 'month' ? 'truncate' : '',
        displayMode === 'week' ? 'text-xs' : '',
        displayMode === 'day' ? 'text-sm space-y-0.5' : ''
      )}
    >
      {getDisplayContent()}
    </div>
  );
}