export const TIMELINE_GATES = {
  // Pre-intake gates (Week 0)
  A: 'A', // Attorney referral
  B: 'B', // Intake & Lien Form Pending
  C: 'C', // Intake Received
  
  // Treatment gates (Weeks 1-13)
  G1: '1', // Initial Patient Assessment
  G2: '2', // Initial Documentation
  G3: '3', // Initial Check-ins
  G4: '4', // First Progress Review
  G5: '5', // Second Progress Review
  G6: '6', // Active Care Review
  G7: '7', // External Provider Review
  G8: '8', // Second Re-exam
  G9: '9', // Third Progress Review
  G10: '10', // Attorney Check-in
  G11: '11', // External Provider Check-in
  G12: '12', // Final Re-exam
  G13: '13', // Case Review
  
  // Extension gates (Weeks 14-18)
  G14: '14', // Extension Week 14
  G15: '15', // Extension Week 15
  G16: '16', // Extension Week 16
  G17: '17', // Extension Week 17
  G18: '18', // Extension Week 18
  
  // Case closure (Week 20+)
  G86: '86', // Case Closure
} as const;

export type TimelineGate = typeof TIMELINE_GATES[keyof typeof TIMELINE_GATES];

export const GATE_DESCRIPTIONS: Record<TimelineGate, string> = {
  'A': 'Attorney referral and case setup',
  'B': 'Patient intake forms and lien documentation',
  'C': 'Initial documentation received and processed',
  '1': 'Initial patient assessment and examination',
  '2': 'X-ray, consultation, and initial report',
  '3': 'Provider and attorney/insurance check-ins',
  '4': 'Second questionnaire and first re-examination',
  '5': 'Patient consultation and progress report',
  '6': 'Active care modalities and attorney check-in',
  '7': 'External provider check-in and consultation',
  '8': 'Third questionnaire and referrals',
  '9': 'Patient consultation and progress report',
  '10': 'Third attorney/insurance check-in',
  '11': 'Third external provider check-in',
  '12': 'Third re-examination and optional MRI',
  '13': 'Final review and MMI assessment',
  '14': 'Extension for gates 4-5',
  '15': 'Extension for gates 6-7',
  '16': 'Extension for gates 8-9',
  '17': 'Extension for gates 10-11',
  '18': 'Extension for gates 12-13',
  '86': 'Final case closure and lien resolution',
};