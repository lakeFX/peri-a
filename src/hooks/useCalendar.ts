import { useState, useCallback } from 'react';
import { getCalendarEvents, createCalendarEvent } from '../lib/microsoft';
import type { CalendarEvent } from '../types/calendar';

export function useCalendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (start: Date, end: Date) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const events = await getCalendarEvents(start, end);
      return events.value.map((event: any): CalendarEvent => ({
        id: event.id,
        title: event.subject,
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        type: 'treatment',
        status: 'scheduled',
      }));
    } catch (err) {
      setError('Failed to fetch calendar events');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: Omit<CalendarEvent, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await createCalendarEvent({
        subject: event.title,
        start: event.start,
        end: event.end,
      });
    } catch (err) {
      setError('Failed to create calendar event');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchEvents,
    createEvent,
  };
}