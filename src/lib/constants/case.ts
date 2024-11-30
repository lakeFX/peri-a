export const CASE_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  CLOSED: 'closed'
} as const;

export const PATIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;

export const ACCIDENT_TYPE = {
  AUTO: 'auto',
  WORK: 'work',
  SLIP_AND_FALL: 'slip-and-fall',
  OTHER: 'other'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PARTIAL: 'partial',
  PAID: 'paid',
  WRITTEN_OFF: 'written-off'
} as const;