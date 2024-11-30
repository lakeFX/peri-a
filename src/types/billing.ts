import type { Patient } from './patient';

export type BillingStatus = 'pending' | 'billed' | 'paid' | 'partial' | 'denied' | 'appealed';
export type PaymentMethod = 'insurance' | 'lien' | 'cash' | 'credit' | 'check';

export interface ICDCode {
  code: string;
  version: 'ICD-10' | 'ICD-11';
  description: string;
  category: string;
  commonlyUsed?: boolean;
  aiConfidence?: number;
}

export interface BillingItem {
  id: string;
  patientId: string;
  caseId?: string;
  serviceDate: string;
  billingDate?: string;
  dueDate?: string;
  status: BillingStatus;
  paymentMethod: PaymentMethod;
  
  // Service Details
  serviceType: string;
  description: string;
  icdCodes: ICDCode[];
  cptCode: string;
  
  // Financial Details
  amount: number;
  adjustments: number;
  paid: number;
  balance: number;
  
  // Insurance/Lien Details
  insuranceInfo?: {
    carrier: string;
    policyNumber: string;
    claimNumber: string;
    preAuthNumber?: string;
  };
  lienInfo?: {
    attorneyId: string;
    lienAmount: number;
    settlementDate?: string;
  };
  
  // AI Generated Data
  aiSuggestions?: {
    icdCodes: ICDCode[];
    confidence: number;
    reasoning: string;
    alternativeCodes?: ICDCode[];
  };
  
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingSummary {
  totalBilled: number;
  totalPaid: number;
  totalPending: number;
  totalDenied: number;
  totalAdjustments: number;
  outstandingBalance: number;
  averageDaysToPayment: number;
  collectionRate: number;
}

export interface BillingAnalytics {
  byStatus: Record<BillingStatus, number>;
  byPaymentMethod: Record<PaymentMethod, number>;
  topIcdCodes: Array<{
    code: ICDCode;
    count: number;
    totalBilled: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    billed: number;
    collected: number;
    denied: number;
  }>;
}