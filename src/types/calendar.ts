import { APPOINTMENT_TYPES, APPOINTMENT_DURATIONS } from '../lib/constants';

export type AppointmentType = keyof typeof APPOINTMENT_TYPES;
export type CalendarView = 'month' | 'week' | 'day' | 'agenda';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  patientId?: string;
  patient?: Patient;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  isRecurring?: boolean;
  recurrenceRule?: string;
  outlookEventId?: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  view: CalendarView;
  selectedDate: Date;
  selectedEvent: CalendarEvent | null;
}