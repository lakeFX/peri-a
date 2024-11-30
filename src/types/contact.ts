export type ContactType = 
  | 'attorney'
  | 'doctor'
  | 'imaging'
  | 'physical-therapist'
  | 'acupuncturist'
  | 'massage-therapist'
  | 'insurance'
  | 'agent'
  | 'other';

export type ContactStatus = 'active' | 'inactive';

export interface Contact {
  id: string;
  type: ContactType;
  status: ContactStatus;
  name: string;
  organization: string;
  title?: string;
  specialty?: string;
  contactInfo: {
    email: string;
    phone: string;
    fax?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  billing?: {
    taxId?: string;
    npi?: string;
    acceptedInsurance?: string[];
  };
  notes?: string;
  linkedPatients: string[]; // Array of patient IDs
  metadata: {
    sharePointId?: string;
    outlookId?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ContactLink {
  id: string;
  contactId: string;
  patientId: string;
  relationship: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}