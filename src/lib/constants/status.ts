export const STATUS = {
  case: {
    ACTIVE: 'active',
    PENDING: 'pending',
    CLOSED: 'closed',
  },
  patient: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  payment: {
    PENDING: 'pending',
    PARTIAL: 'partial',
    PAID: 'paid',
    DENIED: 'denied',
  },
  document: {
    PENDING: 'pending',
    PROCESSED: 'processed',
    ERROR: 'error',
  },
} as const;

export type CaseStatus = typeof STATUS.case[keyof typeof STATUS.case];
export type PatientStatus = typeof STATUS.patient[keyof typeof STATUS.patient];
export type PaymentStatus = typeof STATUS.payment[keyof typeof STATUS.payment];
export type DocumentStatus = typeof STATUS.document[keyof typeof STATUS.document];