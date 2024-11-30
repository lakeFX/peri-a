import { create } from 'zustand';
import { addDays, startOfDay } from 'date-fns';
import { mockCalendarEvents } from '../data/mockData';
import type { CalendarState, CalendarEvent, CalendarView } from '../types/calendar';

interface CalendarStore extends CalendarState {
  setView: (view: CalendarView) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  selectDay: (date: Date) => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: mockCalendarEvents,
  view: 'week',
  selectedDate: new Date(),
  selectedEvent: null,

  setView: (view) => set({ view }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: crypto.randomUUID() }],
    })),
    
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),
    
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),

  selectDay: (date) => set({ selectedDate: date, view: 'day' }),
}));