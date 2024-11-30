// Import the TIMELINE_GATES constant
import { TIMELINE_GATES } from './timeline';
import type { CaseMilestone } from '../../types/timeline';

export const TIMELINE_MILESTONES: Omit<CaseMilestone, 'id' | 'caseId' | 'createdAt' | 'updatedAt'>[] = [
  // Pre-intake gates (Week 0)
  {
    gate: TIMELINE_GATES.A,
    week: 0,
    title: 'Attorney Referral',
    description: 'Initial attorney referral and case setup',
    status: 'pending',
    requiredItems: [
      {
        id: 'attorney-ref',
        title: 'Attorney Referral (ATT-REF)',
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
        id: 'intake-form',
        title: 'Patient Intake Form (INT-1)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'lien-form',
        title: 'Medical Lien Form (LIEN-1)',
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
        id: 'intake-review',
        title: 'Intake Review (INT-REV)',
        type: 'task',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.B]
  },
  // Week 1
  {
    gate: TIMELINE_GATES.G1,
    week: 1,
    title: 'Initial Patient Assessment',
    description: 'Initial questionnaires, examination, and encounter',
    status: 'pending',
    requiredItems: [
      {
        id: 'pq-1',
        title: 'Patient Questionnaires-1 (PQ-1)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'enc-1',
        title: 'Encounter-1 (ENC-1)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'ex-1',
        title: 'Examination-1 (EX-1)',
        type: 'appointment',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.C]
  },
  // Week 2
  {
    gate: TIMELINE_GATES.G2,
    week: 2,
    title: 'Initial Documentation',
    description: 'X-ray, patient consultation, and initial report',
    status: 'pending',
    requiredItems: [
      {
        id: 'xray-1',
        title: 'X-Ray-1 (XR-1)',
        type: 'imaging',
        status: 'pending'
      },
      {
        id: 'pc-1',
        title: 'Patient Consult-1 (PC-1)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'rpt-1',
        title: 'Report-1 (RPT-1)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'inv-1',
        title: 'Invoice-1 (INV-1)',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G1]
  },
  // Week 3
  {
    gate: TIMELINE_GATES.G3,
    week: 3,
    title: 'Initial Check-ins',
    description: 'Provider and attorney/insurance check-ins',
    status: 'pending',
    requiredItems: [
      {
        id: 'pc-2',
        title: 'Patient Consult-2 (PC-2)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'expck-1',
        title: 'External Providers Check-in-1 (EXPCK-1)',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'atinck-1',
        title: 'Attorney/Insurance Check-in-1 (ATINCK-1)',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G2]
  },
  // Week 4
  {
    gate: TIMELINE_GATES.G4,
    week: 4,
    title: 'First Progress Review',
    description: 'Second questionnaire and first re-examination',
    status: 'pending',
    requiredItems: [
      {
        id: 'pq-2',
        title: 'Patient Questionnaires-2 (PQ-2)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'mri-1',
        title: 'MRI-1',
        type: 'imaging',
        status: 'pending',
        optional: true
      },
      {
        id: 'reex-1',
        title: 'Reexamination-1 (REEX-1)',
        type: 'appointment',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G3]
  },
  // Week 5
  {
    gate: TIMELINE_GATES.G5,
    week: 5,
    title: 'Second Progress Review',
    description: 'Patient consultation and progress report',
    status: 'pending',
    requiredItems: [
      {
        id: 'pc-3',
        title: 'Patient Consult-3 (PC-3)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'rpt-2',
        title: 'Report-2 (RPT-2)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'inv-2',
        title: 'Invoice-2 (INV-2)',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G4]
  },
  // Week 6
  {
    gate: TIMELINE_GATES.G6,
    week: 6,
    title: 'Active Care Review',
    description: 'Active care modalities and attorney check-in',
    status: 'pending',
    requiredItems: [
      {
        id: 'acmi-1',
        title: 'Active Care Modalities Initiated-1 (ACMI-1)',
        type: 'task',
        status: 'pending',
        optional: true
      },
      {
        id: 'atinck-2',
        title: 'Attorney/Insurance Check-in-2 (ATINCK-2)',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G5]
  },
  // Week 7
  {
    gate: TIMELINE_GATES.G7,
    week: 7,
    title: 'External Provider Review',
    description: 'External provider check-in and patient consultation',
    status: 'pending',
    requiredItems: [
      {
        id: 'expck-2',
        title: 'External Providers Check-in-2 (EXPCK-2)',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'pc-4',
        title: 'Patient Consult-4 (PC-4)',
        type: 'appointment',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G6]
  },
  // Week 8
  {
    gate: TIMELINE_GATES.G8,
    week: 8,
    title: 'Second Re-exam',
    description: 'Third questionnaire and referrals',
    status: 'pending',
    requiredItems: [
      {
        id: 'reex-2',
        title: 'Reexamination-2 (REEX-2)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'pq-3',
        title: 'Patient Questionnaires-3 (PQ-3)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'pt-ref',
        title: 'Physical Therapy Referral (PT-REF)',
        type: 'document',
        status: 'pending',
        optional: true
      },
      {
        id: 'pm-ref',
        title: 'Pain Management Referral (PM-REF)',
        type: 'document',
        status: 'pending',
        optional: true
      }
    ],
    dependencies: [TIMELINE_GATES.G7]
  },
  // Week 9
  {
    gate: TIMELINE_GATES.G9,
    week: 9,
    title: 'Third Progress Review',
    description: 'Patient consultation and progress report',
    status: 'pending',
    requiredItems: [
      {
        id: 'pc-5',
        title: 'Patient Consult-5 (PC-5)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'rpt-3',
        title: 'Report-3 (RPT-3)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'inv-3',
        title: 'Invoice-3 (INV-3)',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G8]
  },
  // Week 10
  {
    gate: TIMELINE_GATES.G10,
    week: 10,
    title: 'Attorney Check-in',
    description: 'Third attorney/insurance check-in',
    status: 'pending',
    requiredItems: [
      {
        id: 'atinck-3',
        title: 'Attorney/Insurance Check-in-3 (ATINCK-3)',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G9]
  },
  // Week 11
  {
    gate: TIMELINE_GATES.G11,
    week: 11,
    title: 'External Provider Check-in',
    description: 'Third external provider check-in',
    status: 'pending',
    requiredItems: [
      {
        id: 'expck-3',
        title: 'External Providers Check-in-3 (EXPCK-3)',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G10]
  },
  // Week 12
  {
    gate: TIMELINE_GATES.G12,
    week: 12,
    title: 'Final Re-exam',
    description: 'Third re-examination and optional MRI',
    status: 'pending',
    requiredItems: [
      {
        id: 'reex-3',
        title: 'Reexamination-3 (REEX-3)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'mri-2',
        title: 'MRI-2',
        type: 'imaging',
        status: 'pending',
        optional: true
      }
    ],
    dependencies: [TIMELINE_GATES.G11]
  },
  // Week 13
  {
    gate: TIMELINE_GATES.G13,
    week: 13,
    title: 'Case Review',
    description: 'Final review and MMI assessment',
    status: 'pending',
    requiredItems: [
      {
        id: 'expck-4',
        title: 'External Providers Check-in-4 (EXPCK-4)',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'pc-6',
        title: 'Patient Consult-6 (PC-6)',
        type: 'appointment',
        status: 'pending'
      },
      {
        id: 'mmi-eta',
        title: 'MMI or Extend Treatment Assessment (MMI-ETA)',
        type: 'check-in',
        status: 'pending'
      },
      {
        id: 'rpt-4',
        title: 'Report-4 (RPT-4)',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'atinck-4',
        title: 'Attorney/Insurance Check-in-4 (ATINCK-4)',
        type: 'check-in',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G12],
    isExtensionPoint: true
  },
  // Case Closure (Week 20+)
  {
    gate: TIMELINE_GATES.G86,
    week: 20,
    title: 'Case Closure',
    description: 'Final case closure and lien resolution',
    status: 'pending',
    requiredItems: [
      {
        id: 'lpr-1',
        title: 'Lien Payment Received (LPR-1)',
        type: 'payment',
        status: 'pending'
      },
      {
        id: 'lrng-1',
        title: 'Lien Renegotiated (LRNG-1)',
        type: 'document',
        status: 'pending',
        optional: true
      },
      {
        id: 'ldnd-1',
        title: 'Lien Denied (LDND-1)',
        type: 'document',
        status: 'pending',
        optional: true
      },
      {
        id: 'cc-doc',
        title: 'Case Closure Documentation (CC-DOC)',
        type: 'document',
        status: 'pending'
      }
    ],
    dependencies: [TIMELINE_GATES.G13],
    isFinalGate: true
  }
];