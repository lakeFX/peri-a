import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useCalendarStore } from '../../store/calendarStore';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import type { CalendarView } from '../../types/calendar';

interface CalendarHeaderProps {
  onNewEvent: () => void;
}

export default function CalendarHeader({ onNewEvent }: CalendarHeaderProps) {
  const { view, selectedDate, setView, setSelectedDate } = useCalendarStore();

  const viewOptions: Array<{ value: CalendarView; label: string }> = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
    { value: 'agenda', label: 'Agenda' }
  ];

  const handlePrevious = () => {
    const newDate = new Date(selectedDate);
    switch (view) {
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
    }
    setSelectedDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(selectedDate);
    switch (view) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }
    setSelectedDate(newDate);
  };

  const getHeaderText = () => {
    switch (view) {
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      case 'week':
        return `Week of ${format(selectedDate, 'MMM d, yyyy')}`;
      case 'day':
        return format(selectedDate, 'EEEE, MMMM d, yyyy');
      case 'agenda':
        return 'Agenda View';
    }
  };

  return (
    <div className={cn(
      'bg-white z-10 border-b border-gray-200',
      'sticky top-16 md:top-0'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedDate(new Date())}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Today
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 w-48 text-center">
                  {getHeaderText()}
                </h2>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex rounded-md shadow-sm">
                {viewOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setView(option.value)}
                    className={`
                      px-4 py-2 text-sm font-medium
                      ${view === option.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                      }
                      ${option.value === 'month' && 'rounded-l-md'}
                      ${option.value === 'agenda' && 'rounded-r-md'}
                      border border-gray-300
                      -ml-px first:ml-0
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                onClick={onNewEvent}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}