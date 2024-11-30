import React from 'react';
import { useTimelineStore } from '../../store/timelineStore';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function TimelineTasks() {
  const { events } = useTimelineStore();

  const pendingEvents = events
    .filter(event => ['pending', 'scheduled'].includes(event.status))
    .sort((a, b) => new Date(a.suggestedDate).getTime() - new Date(b.suggestedDate).getTime());

  const getEventPriority = (event: typeof events[0]) => {
    const date = new Date(event.suggestedDate);
    if (isPast(date)) return 'overdue';
    if (isToday(date)) return 'today';
    if (isTomorrow(date)) return 'tomorrow';
    return 'upcoming';
  };

  const getEventIcon = (priority: string) => {
    switch (priority) {
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'today':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'tomorrow':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Timeline Tasks</h2>
      <div className="space-y-4">
        {pendingEvents.length > 0 ? (
          pendingEvents.map((event) => {
            const priority = getEventPriority(event);
            return (
              <div
                key={event.id}
                className={`flex items-start space-x-3 p-3 rounded-lg ${
                  priority === 'overdue'
                    ? 'bg-red-50'
                    : priority === 'today'
                    ? 'bg-amber-50'
                    : priority === 'tomorrow'
                    ? 'bg-blue-50'
                    : 'bg-gray-50'
                }`}
              >
                {getEventIcon(priority)}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </p>
                    <span className="text-sm text-gray-500">
                      {format(new Date(event.suggestedDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  {event.notes && (
                    <p className="text-sm text-gray-600 mt-1">{event.notes}</p>
                  )}
                  {priority === 'overdue' && (
                    <p className="text-sm text-red-600 mt-1">Overdue</p>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-500">No pending tasks</p>
        )}
      </div>
    </div>
  );
}