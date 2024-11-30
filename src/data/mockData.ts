import { addHours, setHours, setMinutes } from 'date-fns';
import type { Patient } from '../types/patient';
import type { CalendarEvent } from '../types/calendar';

export const mockPatients: Patient[] = [
  {
    id: 'P12345678',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      },
    },
    insurance: {
      provider: 'Blue Cross',
      policyNumber: 'BC123456789',
      groupNumber: 'G987654',
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '(555) 987-6543',
    },
    caseStatus: 'active',
    visitCount: 5,
    lastVisit: '2024-03-10T14:30:00Z',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
  },
  {
    id: 'P23456789',
    firstName: 'Sarah',
    lastName: 'Smith',
    dateOfBirth: '1990-08-22',
    gender: 'female',
    contactInfo: {
      email: 'sarah.smith@example.com',
      phone: '(555) 234-5678',
      address: {
        street: '456 Oak Ave',
        city: 'Somewhere',
        state: 'NY',
        zipCode: '67890',
      },
    },
    insurance: {
      provider: 'Aetna',
      policyNumber: 'AE987654321',
      groupNumber: 'G123456',
    },
    emergencyContact: {
      name: 'Mike Smith',
      relationship: 'Brother',
      phone: '(555) 876-5432',
    },
    caseStatus: 'active',
    visitCount: 3,
    lastVisit: '2024-03-08T10:00:00Z',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-08T10:00:00Z',
  },
  {
    id: 'P34567890',
    firstName: 'Michael',
    lastName: 'Johnson',
    dateOfBirth: '1978-11-30',
    gender: 'male',
    contactInfo: {
      email: 'michael.j@example.com',
      phone: '(555) 345-6789',
      address: {
        street: '789 Pine St',
        city: 'Elsewhere',
        state: 'TX',
        zipCode: '45678',
      },
    },
    insurance: {
      provider: 'United Healthcare',
      policyNumber: 'UH456789012',
      groupNumber: 'G345678',
    },
    emergencyContact: {
      name: 'Lisa Johnson',
      relationship: 'Wife',
      phone: '(555) 765-4321',
    },
    caseStatus: 'pending',
    visitCount: 0,
    createdAt: '2024-03-11T15:00:00Z',
    updatedAt: '2024-03-11T15:00:00Z',
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Initial Examination',
    start: setHours(setMinutes(new Date(), 0), 9), // 9:00 AM
    end: setHours(setMinutes(new Date(), 0), 10), // 10:00 AM (1 hour)
    type: 'initial-intake',
    status: 'scheduled',
    patientId: 'P34567890',
  },
  {
    id: '2',
    title: 'Follow-up Treatment',
    start: setHours(setMinutes(addHours(new Date(), 24), 0), 14), // Tomorrow 2:00 PM
    end: setHours(setMinutes(addHours(new Date(), 24), 30), 14), // Tomorrow 2:30 PM (30 min)
    type: 'adjustment',
    status: 'scheduled',
    patientId: 'P12345678',
  },
  {
    id: '3',
    title: 'Re-examination',
    start: setHours(setMinutes(addHours(new Date(), 48), 0), 11), // Day after tomorrow 11:00 AM
    end: setHours(setMinutes(addHours(new Date(), 48), 30), 11), // Day after tomorrow 11:30 AM (30 min)
    type: 're-exam',
    status: 'scheduled',
    patientId: 'P23456789',
  },
];