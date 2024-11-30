export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  caseStatus: 'active' | 'pending' | 'closed';
  attorneyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  type: 'exam' | 're-exam' | 'treatment' | 'follow-up';
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}