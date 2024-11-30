// Core constants
export * from './core';

// Feature-specific constants
export * from './appointments';
export * from './status';
export * from './timeline';

// Type exports
export type {
  AppointmentType,
  AppointmentDuration,
} from './appointments';

export type {
  CaseStatus,
  PatientStatus,
  PaymentStatus,
  DocumentStatus,
} from './status';

export type {
  TimelineGate,
  TimelineEvent,
  TimelineTemplate,
} from './timeline';