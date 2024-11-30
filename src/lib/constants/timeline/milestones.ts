import { TIMELINE_GATES } from './gates';
import type { CaseMilestone } from '../../../types/timeline';

export const TIMELINE_MILESTONES: CaseMilestone[] = [
  // Pre-intake gates (Week 0)
  {
    gate: TIMELINE_GATES.A,
    week: 0,
    title: 'Attorney Referral',
    description: 'Initial attorney referral and case setup',
    status: 'pending',
    requiredItems: [
      {
        id: 'ATT-REF',
        title: 'Attorney Referral Documentation',
        type: 'document',
        status: 'pending'
      }
    ]
  },
  {
    gate: TIMELINE_GATES.B,
    week: 0,
    title: 'Intake & Lien Form Pending',
    description: 'Patient intake forms and lien documentation',
    status: 'pending',
    requiredItems: [
      {
        id: 'INT-1',
        title: 'Patient Intake Form',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'LIEN-1',
        title: 'Medical Lien Form',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.A]
  },
  {
    gate: TIMELINE_GATES.C,
    week: 0,
    title: 'Intake Received',
    description: 'Initial documentation received and processed',
    status: 'pending',
    requiredItems: [
      {
        id: 'INT-REV',
        title: 'Intake Review',
        type: 'task',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.B]
  },
  // Treatment gates (Weeks 1-13)
  {
    gate: TIMELINE_GATES.G1,
    week: 1,
    title: 'Initial Patient Assessment',
    description: 'Initial questionnaires, examination, and encounter',
    status: 'pending',
    requiredItems: [
      {
        id: 'PQ-1',
        title: 'Patient Questionnaires-1',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'ENC-1',
        title: 'Encounter-1',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'EX-1',
        title: 'Examination-1',
        type: 'appointment',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.C]
  },
  {
    gate: TIMELINE_GATES.G2,
    week: 2,
    title: 'Initial Documentation',
    description: 'X-ray, patient consultation, and initial report',
    status: 'pending',
    requiredItems: [
      {
        id: 'XR-1',
        title: 'X-Ray-1',
        type: 'imaging',
        status: 'pending'
      },
      {
        id: 'PC-1',
        title: 'Patient Consult-1',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-1',
        title: 'Report-1',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-1',
        title: 'Invoice-1',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G1]
  },
  {
    gate: TIMELINE_GATES.G3,
    week: 3,
    title: 'Initial Check-ins',
    description: 'Provider and attorney/insurance check-ins',
    status: 'pending',
    requiredItems: [
      {
        id: 'PC-2',
        title: 'Patient Consult-2',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'EXPCK-1',
        title: 'External Providers Check-in-1',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'ATINCK-1',
        title: 'Attorney/Insurance Check-in-1',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G2]
  },
  {
    gate: TIMELINE_GATES.G4,
    week: 4,
    title: 'First Progress Review',
    description: 'Second questionnaire and first re-examination',
    status: 'pending',
    requiredItems: [
      {
        id: 'PQ-2',
        title: 'Patient Questionnaires-2',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'MRI-1',
        title: 'MRI-1',
        type: 'imaging',
        status: 'pending',
        optional: true
      },
      {
        id: 'REEX-1',
        title: 'Reexamination-1',
        type: 'appointment',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G3]
  },
  {
    gate: TIMELINE_GATES.G5,
    week: 5,
    title: 'Second Progress Review',
    description: 'Patient consultation and progress report',
    status: 'pending',
    requiredItems: [
      {
        id: 'PC-3',
        title: 'Patient Consult-3',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-2',
        title: 'Report-2',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-2',
        title: 'Invoice-2',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G4]
  },
  {
    gate: TIMELINE_GATES.G6,
    week: 6,
    title: 'Active Care Review',
    description: 'Active care modalities and attorney check-in',
    status: 'pending',
    requiredItems: [
      {
        id: 'ACMI-1',
        title: 'Active Care Modalities Initiated-1',
        type: 'task',
        status: 'pending',
        optional: true
      },
      {
        id: 'ATINCK-2',
        title: 'Attorney/Insurance Check-in-2',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G5]
  },
  {
    gate: TIMELINE_GATES.G7,
    week: 7,
    title: 'External Provider Review',
    description: 'External provider check-in and patient consultation',
    status: 'pending',
    requiredItems: [
      {
        id: 'EXPCK-2',
        title: 'External Providers Check-in-2',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'PC-4',
        title: 'Patient Consult-4',
        type: 'appointment',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G6]
  },
  {
    gate: TIMELINE_GATES.G8,
    week: 8,
    title: 'Second Re-exam',
    description: 'Third questionnaire and referrals',
    status: 'pending',
    requiredItems: [
      {
        id: 'REEX-2',
        title: 'Reexamination-2',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'PQ-3',
        title: 'Patient Questionnaires-3',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'PT-REF',
        title: 'Physical Therapy Referral',
        type: 'document',
        status: 'pending',
        optional: true
      },
      {
        id: 'PM-REF',
        title: 'Pain Management Referral',
        type: 'document',
        status: 'pending',
        optional: true
      }
    ],
    dependencies: [TIMELINE_GATES.G7]
  },
  {
    gate: TIMELINE_GATES.G9,
    week: 9,
    title: 'Third Progress Review',
    description: 'Patient consultation and progress report',
    status: 'pending',
    requiredItems: [
      {
        id: 'PC-5',
        title: 'Patient Consult-5',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-3',
        title: 'Report-3',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-3',
        title: 'Invoice-3',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G8]
  },
  {
    gate: TIMELINE_GATES.G10,
    week: 10,
    title: 'Attorney Check-in',
    description: 'Third attorney/insurance check-in',
    status: 'pending',
    requiredItems: [
      {
        id: 'ATINCK-3',
        title: 'Attorney/Insurance Check-in-3',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G9]
  },
  {
    gate: TIMELINE_GATES.G11,
    week: 11,
    title: 'External Provider Check-in',
    description: 'Third external provider check-in',
    status: 'pending',
    requiredItems: [
      {
        id: 'EXPCK-3',
        title: 'External Providers Check-in-3',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G10]
  },
  {
    gate: TIMELINE_GATES.G12,
    week: 12,
    title: 'Final Re-exam',
    description: 'Third re-examination and optional MRI',
    status: 'pending',
    requiredItems: [
      {
        id: 'REEX-3',
        title: 'Reexamination-3',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'MRI-2',
        title: 'MRI-2',
        type: 'imaging',
        status: 'pending',
        optional: true
      }
    ],
    dependencies: [TIMELINE_GATES.G11]
  },
  {
    gate: TIMELINE_GATES.G13,
    week: 13,
    title: 'Case Review',
    description: 'Final review and MMI assessment',
    status: 'pending',
    requiredItems: [
      {
        id: 'EXPCK-4',
        title: 'External Providers Check-in-4',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'PC-6',
        title: 'Patient Consult-6',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'MMI-ETA',
        title: 'MMI or Extend Treatment Assessment',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'RPT-4',
        title: 'Report-4',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-4',
        title: 'Invoice-4',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'ATINCK-4',
        title: 'Attorney/Insurance Check-in-4',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G12],
    isExtensionPoint: true
  },
  // Extension gates (Weeks 14-18)
  {
    gate: TIMELINE_GATES.G14,
    week: 14,
    title: 'Extension Week 14',
    description: 'Extended treatment period for gates 4-5',
    status: 'pending',
    requiredItems: [
      {
        id: 'PQ-4',
        title: 'Patient Questionnaires-4',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'REEX-4',
        title: 'Reexamination-4',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'PC-7',
        title: 'Patient Consult-7',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-5',
        title: 'Report-5',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-5',
        title: 'Invoice-5',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G13]
  },
  {
    gate: TIMELINE_GATES.G15,
    week: 15,
    title: 'Extension Week 15',
    description: 'Extended treatment period for gates 6-7',
    status: 'pending',
    requiredItems: [
      {
        id: 'ACMI-2',
        title: 'Active Care Modalities Review-2',
        type: 'task',
        status: 'pending'
      },
      {
        id: 'ATINCK-5',
        title: 'Attorney/Insurance Check-in-5',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'EXPCK-5',
        title: 'External Providers Check-in-5',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'PC-8',
        title: 'Patient Consult-8',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-6',
        title: 'Report-6',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-6',
        title: 'Invoice-6',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G14]
  },
  {
    gate: TIMELINE_GATES.G16,
    week: 16,
    title: 'Extension Week 16',
    description: 'Extended treatment period for gates 8-9',
    status: 'pending',
    requiredItems: [
      {
        id: 'REEX-5',
        title: 'Reexamination-5',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'PQ-5',
        title: 'Patient Questionnaires-5',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'PC-9',
        title: 'Patient Consult-9',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-7',
        title: 'Report-7',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-7',
        title: 'Invoice-7',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G15]
  },
  {
    gate: TIMELINE_GATES.G17,
    week: 17,
    title: 'Extension Week 17',
    description: 'Extended treatment period for gates 10-11',
    status: 'pending',
    requiredItems: [
      {
        id: 'ATINCK-6',
        title: 'Attorney/Insurance Check-in-6',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'EXPCK-6',
        title: 'External Providers Check-in-6',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'PC-10',
        title: 'Patient Consult-10',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'RPT-8',
        title: 'Report-8',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-8',
        title: 'Invoice-8',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G16]
  },
  {
    gate: TIMELINE_GATES.G18,
    week: 18,
    title: 'Extension Week 18',
    description: 'Extended treatment period for gates 12-13',
    status: 'pending',
    requiredItems: [
      {
        id: 'REEX-6',
        title: 'Reexamination-6',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'MMI-ETA-2',
        title: 'MMI or Further Extension Assessment',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'RPT-9',
        title: 'Report-9',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'INV-9',
        title: 'Invoice-9',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G17]
  },
  {
    gate: TIMELINE_GATES.G86,
    week: 20,
    title: 'Case Closure',
    description: 'Final case closure and lien resolution',
    status: 'pending',
    requiredItems: [
      {
        id: 'LPR-1',
        title: 'Lien Payment Received',
        type: 'payment',
        status: 'pending'
      },
      {
        id: 'LRNG-1',
        title: 'Lien Renegotiation Agreement',
        type: 'document',
        status: 'pending',
        optional: true
      },
      {
        id: 'LDND-1',
        title: 'Lien Denied Documentation',
        type: 'document',
        status: 'pending',
        optional: true
      },
      {
        id: 'CC-DOC',
        title: 'Case Closure Documentation',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G18],
    isFinalGate: true
  }
];