import { CalendarEvent } from './calendar';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  caseStatus: 'active' | 'pending' | 'closed';
  caseNumber?: string;
  attorneyId?: string;
  visitCount?: number;
  lastVisit?: string;
  createdAt: string;
  updatedAt: string;
}