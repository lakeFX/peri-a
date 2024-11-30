export const APPOINTMENT_TYPES = {
  INITIAL_INTAKE: 'initial-intake',
  EXAM: 'exam',
  RE_EXAM: 're-exam',
  ADJUSTMENT: 'adjustment',
  PHYSIOTHERAPY: 'physiotherapy',
  MASSAGE: 'massage',
  CONSULTATION: 'consultation',
} as const;

export const APPOINTMENT_DURATIONS = {
  [APPOINTMENT_TYPES.INITIAL_INTAKE]: 60,
  [APPOINTMENT_TYPES.EXAM]: 30,
  [APPOINTMENT_TYPES.RE_EXAM]: 30,
  [APPOINTMENT_TYPES.ADJUSTMENT]: 30,
  [APPOINTMENT_TYPES.PHYSIOTHERAPY]: 30,
  [APPOINTMENT_TYPES.MASSAGE]: 30,
  [APPOINTMENT_TYPES.CONSULTATION]: 15,
} as const;

export type AppointmentType = keyof typeof APPOINTMENT_TYPES;
export type AppointmentDuration = typeof APPOINTMENT_DURATIONS[AppointmentType];