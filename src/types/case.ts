import { 
  CASE_STATUS, 
  PATIENT_STATUS, 
  ACCIDENT_TYPE, 
  PAYMENT_STATUS 
} from '../lib/constants';

export type CaseStatus = typeof CASE_STATUS[keyof typeof CASE_STATUS];
export type PatientStatus = typeof PATIENT_STATUS[keyof typeof PATIENT_STATUS];
export type AccidentType = typeof ACCIDENT_TYPE[keyof typeof ACCIDENT_TYPE];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

export interface LienCase {
  id: string;
  patientId: string;
  caseNumber: string;
  status: CaseStatus;
  patientStatus: PatientStatus;
  accidentDate: string;
  accidentType: AccidentType;
  accidentDescription: string;
  
  attorneyId: string;
  lawFirm: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  insuranceInfo: {
    company: string;
    policyNumber: string;
    adjuster: {
      name: string;
      phone: string;
      email: string;
    };
    claimNumber: string;
  };
  
  initialVisitDate: string;
  lastVisitDate?: string;
  visitCount: number;
  dischargePlan?: {
    expectedDate: string;
    treatmentGoals: string[];
  };
  
  lienAmount: number;
  paymentStatus: PaymentStatus;
  
  statuteOfLimitationsDate: string;
  demandLetterDate?: string;
  settlementDate?: string;
  
  documents: Array<{
    id: string;
    type: 'lien' | 'medical-records' | 'bills' | 'correspondence' | 'settlement';
    title: string;
    fileUrl: string;
    uploadDate: string;
  }>;
  
  notes: Array<{
    id: string;
    date: string;
    content: string;
    author: string;
  }>;
  
  createdAt: string;
  updatedAt: string;
}

export { caseStatusRules } from '../lib/rules/caseStatus';