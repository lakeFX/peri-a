// Core application constants
export const APP_NAME = 'PERI';
export const APP_VERSION = '1.0.0';

export const BUSINESS_HOURS = {
  start: 8,  // 8 AM
  end: 20,   // 8 PM
  total: 12  // Total hours
} as const;

export const FILE_LIMITS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10,
  allowedTypes: {
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    images: ['image/jpeg', 'image/png', 'image/gif'],
    spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  } as const,
} as const;