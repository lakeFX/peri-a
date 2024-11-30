import { addDays } from 'date-fns';
import type { LienCase } from '../types/case';

export const mockCases: LienCase[] = [
  {
    id: 'C12345678',
    patientId: 'P12345678', // John Doe
    caseNumber: 'PI-2024-001',
    status: 'active',
    patientStatus: 'active',
    accidentDate: '2024-01-10T00:00:00Z',
    accidentType: 'auto',
    accidentDescription: 'Rear-end collision at intersection',
    
    attorneyId: 'C12345678', // Robert Wilson
    lawFirm: {
      name: 'Wilson & Associates Law Firm',
      address: '100 Legal Plaza, Suite 500, Metropolis, CA 90210',
      phone: '(555) 111-2233',
      email: 'rwilson@wilsonlaw.example.com',
    },
    insuranceInfo: {
      company: 'State Farm',
      policyNumber: 'SF98765432',
      adjuster: {
        name: 'Tom Brown',
        phone: '(555) 999-8888',
        email: 'tbrown@statefarm.example.com',
      },
      claimNumber: 'CLM123456789',
    },
    
    initialVisitDate: '2024-01-15T09:00:00Z',
    lastVisitDate: '2024-03-10T14:30:00Z',
    visitCount: 5,
    dischargePlan: {
      expectedDate: '2024-04-15T00:00:00Z',
      treatmentGoals: [
        'Reduce cervical pain',
        'Improve range of motion',
        'Return to normal activities',
      ],
    },
    
    lienAmount: 3500,
    paymentStatus: 'pending',
    
    statuteOfLimitationsDate: addDays(new Date('2024-01-10'), 730).toISOString(), // 2 years from accident
    
    documents: [
      {
        id: 'D12345678',
        type: 'medical-records',
        title: 'Initial Examination Report',
        fileUrl: '/documents/D12345678.pdf',
        uploadDate: '2024-01-15T10:30:00Z',
      },
      {
        id: 'D12345679',
        type: 'lien',
        title: 'Medical Lien Agreement',
        fileUrl: '/documents/D12345679.pdf',
        uploadDate: '2024-01-15T11:00:00Z',
      },
    ],
    
    notes: [
      {
        id: 'N12345678',
        date: '2024-01-15T09:30:00Z',
        content: 'Initial consultation completed. Patient reports neck and back pain.',
        author: 'Dr. Smith',
      },
    ],
    
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
  },
  {
    id: 'C23456789',
    patientId: 'P23456789', // Sarah Smith
    caseNumber: 'PI-2024-002',
    status: 'active',
    patientStatus: 'active',
    accidentDate: '2024-02-01T00:00:00Z',
    accidentType: 'slip-and-fall',
    accidentDescription: 'Slip and fall at grocery store due to wet floor',
    
    attorneyId: 'C12345678', // Robert Wilson
    lawFirm: {
      name: 'Wilson & Associates Law Firm',
      address: '100 Legal Plaza, Suite 500, Metropolis, CA 90210',
      phone: '(555) 111-2233',
      email: 'rwilson@wilsonlaw.example.com',
    },
    insuranceInfo: {
      company: 'Safeway Insurance',
      policyNumber: 'SW123456789',
      adjuster: {
        name: 'Mary Johnson',
        phone: '(555) 777-6666',
        email: 'mjohnson@safeway.example.com',
      },
      claimNumber: 'CLM987654321',
    },
    
    initialVisitDate: '2024-02-01T14:00:00Z',
    lastVisitDate: '2024-03-08T10:00:00Z',
    visitCount: 3,
    dischargePlan: {
      expectedDate: '2024-05-01T00:00:00Z',
      treatmentGoals: [
        'Reduce lower back pain',
        'Strengthen core muscles',
        'Improve balance',
      ],
    },
    
    lienAmount: 2800,
    paymentStatus: 'pending',
    
    statuteOfLimitationsDate: addDays(new Date('2024-02-01'), 730).toISOString(),
    
    documents: [
      {
        id: 'D23456789',
        type: 'medical-records',
        title: 'Initial Examination Report',
        fileUrl: '/documents/D23456789.pdf',
        uploadDate: '2024-02-01T15:30:00Z',
      },
    ],
    
    notes: [
      {
        id: 'N23456789',
        date: '2024-02-01T14:30:00Z',
        content: 'Initial evaluation completed. Patient reports lower back pain and difficulty walking.',
        author: 'Dr. Smith',
      },
    ],
    
    createdAt: '2024-02-01T14:00:00Z',
    updatedAt: '2024-03-08T10:00:00Z',
  },
  {
    id: 'C34567890',
    patientId: 'P34567890', // Michael Johnson
    caseNumber: 'PI-2024-003',
    status: 'pending',
    patientStatus: 'active',
    accidentDate: '2024-03-10T00:00:00Z',
    accidentType: 'work',
    accidentDescription: 'Lifting injury at construction site',
    
    attorneyId: 'C12345678', // Robert Wilson
    lawFirm: {
      name: 'Wilson & Associates Law Firm',
      address: '100 Legal Plaza, Suite 500, Metropolis, CA 90210',
      phone: '(555) 111-2233',
      email: 'rwilson@wilsonlaw.example.com',
    },
    insuranceInfo: {
      company: 'Workers Comp Insurance Co',
      policyNumber: 'WC456789012',
      adjuster: {
        name: 'James Wilson',
        phone: '(555) 444-3333',
        email: 'jwilson@wcic.example.com',
      },
      claimNumber: 'CLM456789012',
    },
    
    initialVisitDate: '2024-03-11T15:00:00Z',
    visitCount: 0,
    
    lienAmount: 0,
    paymentStatus: 'pending',
    
    statuteOfLimitationsDate: addDays(new Date('2024-03-10'), 730).toISOString(),
    
    documents: [],
    notes: [
      {
        id: 'N34567890',
        date: '2024-03-11T15:00:00Z',
        content: 'Initial consultation scheduled. Waiting for workers comp authorization.',
        author: 'Front Desk',
      },
    ],
    
    createdAt: '2024-03-11T15:00:00Z',
    updatedAt: '2024-03-11T15:00:00Z',
  },
];