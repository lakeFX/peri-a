import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const styleUtils = {
  cn: (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
  },

  getStatusColor: (status: string): string => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      error: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || colors.default;
  }
} as const;