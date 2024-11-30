// Export all constants
import { TIMELINE_GATES, type TimelineGate } from './constants/timeline/gates';
import { TIMELINE_MILESTONES } from './constants/timeline/milestones';
import { APPOINTMENT_TYPES, APPOINTMENT_DURATIONS } from './constants/appointments';
import { CASE_STATUS, PATIENT_STATUS, ACCIDENT_TYPE, PAYMENT_STATUS } from './constants/case';

// Re-export timeline constants
export { TIMELINE_GATES, type TimelineGate, TIMELINE_MILESTONES };

// Re-export appointment constants
export { APPOINTMENT_TYPES, APPOINTMENT_DURATIONS };

// Re-export case constants
export { CASE_STATUS, PATIENT_STATUS, ACCIDENT_TYPE, PAYMENT_STATUS };

// Common constants
export const FILE_UPLOAD_TYPES = {
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  images: ['image/jpeg', 'image/png', 'image/gif'],
  spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const BUSINESS_HOURS = {
  start: 8,  // 8 AM
  end: 20,   // 8 PM
  total: 12  // Total hours
} as const;