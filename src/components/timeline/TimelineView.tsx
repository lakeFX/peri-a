import React from 'react';
import { format, differenceInDays } from 'date-fns';
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { useTimelineStore } from '../../store/timelineStore';
import type { TimelineEvent, TimelineStatus } from '../../types/timeline';

interface TimelineViewProps {
  patientId: string;
}

export function TimelineView({ patientId }: TimelineViewProps) {
  const { events } = useTimelineStore();

  const patientEvents = events
    .filter((event) => event.patientId === patientId)
    .sort((a, b) => new Date(a.suggestedDate).getTime() - new Date(b.suggestedDate).getTime());

  const getStatusIcon = (status: TimelineStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'scheduled':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'missed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEventColor = (event: TimelineEvent) => {
    const daysUntil = differenceInDays(
      new Date(event.suggestedDate),
      new Date()
    );

    if (event.status === 'completed') return 'border-green-500';
    if (event.status === 'missed') return 'border-red-500';
    if (daysUntil < 0) return 'border-yellow-500';
    return 'border-blue-500';
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div
          className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200"
          aria-hidden="true"
        />

        <ul className="space-y-6">
          {patientEvents.map((event) => (
            <li key={event.id} className="relative">
              <div className="flex items-start">
                <span
                  className={`h-4 w-4 rounded-full border-2 ${getEventColor(
                    event
                  )} ring-8 ring-white absolute left-6 top-3 -ml-px`}
                />
                <div className="ml-16">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(event.status)}
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </h3>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">
                      Suggested Date:{' '}
                      {format(new Date(event.suggestedDate), 'MMM d, yyyy')}
                    </p>
                    {event.actualDate && (
                      <p className="text-sm text-gray-600">
                        Actual Date:{' '}
                        {format(new Date(event.actualDate), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                  {event.aiRecommendation && (
                    <div className="mt-2 flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">AI Recommendation:</p>
                        <p>{event.aiRecommendation.reasoning}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}