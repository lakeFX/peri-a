import { format, isToday, isTomorrow, isPast, addDays, differenceInDays } from 'date-fns';

export const dateUtils = {
  formatDate: (date: Date | string, pattern: string = 'MM/dd/yyyy'): string => {
    return format(new Date(date), pattern);
  },

  getRelativeDay: (date: Date | string): 'today' | 'tomorrow' | 'past' | 'future' => {
    const dateObj = new Date(date);
    if (isToday(dateObj)) return 'today';
    if (isTomorrow(dateObj)) return 'tomorrow';
    if (isPast(dateObj)) return 'past';
    return 'future';
  },

  formatTimeRange: (start: Date, end: Date): string => {
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  },

  getDaysBetween: (start: Date | string, end: Date | string): number => {
    return differenceInDays(new Date(end), new Date(start));
  },

  addDaysToDate: (date: Date | string, days: number): Date => {
    return addDays(new Date(date), days);
  }
} as const;