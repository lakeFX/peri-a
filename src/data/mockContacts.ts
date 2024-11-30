import type { Contact } from '../types/contact';

export const mockContacts: Contact[] = [
  {
    id: 'C12345678',
    type: 'attorney',
    status: 'active',
    name: 'Robert Wilson',
    organization: 'Wilson & Associates Law Firm',
    title: 'Senior Partner',
    specialty: 'Personal Injury',
    contactInfo: {
      email: 'rwilson@wilsonlaw.example.com',
      phone: '(555) 111-2233',
      fax: '(555) 111-2234',
      address: {
        street: '100 Legal Plaza, Suite 500',
        city: 'Metropolis',
        state: 'CA',
        zipCode: '90210',
      },
    },
    billing: {
      taxId: '12-3456789',
    },
    notes: 'Preferred attorney for auto accident cases',
    linkedPatients: ['P12345678', 'P23456789'],
    metadata: {
      sharePointId: 'SP123456',
      outlookId: 'O123456',
    },
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2024-03-01T14:30:00Z',
  },
  {
    id: 'C23456789',
    type: 'doctor',
    status: 'active',
    name: 'Dr. Sarah Chen',
    organization: 'Advanced Medical Imaging',
    title: 'Medical Director',
    specialty: 'Radiology',
    contactInfo: {
      email: 'dr.chen@advancedimaging.example.com',
      phone: '(555) 444-5566',
      fax: '(555) 444-5567',
      address: {
        street: '200 Medical Center Drive',
        city: 'Metropolis',
        state: 'CA',
        zipCode: '90211',
      },
    },
    billing: {
      taxId: '98-7654321',
      npi: '1234567890',
      acceptedInsurance: ['Blue Cross', 'Aetna', 'United Healthcare'],
    },
    notes: 'Preferred imaging center for MRI and X-ray referrals',
    linkedPatients: ['P34567890'],
    metadata: {
      sharePointId: 'SP234567',
      outlookId: 'O234567',
    },
    createdAt: '2023-02-01T09:00:00Z',
    updatedAt: '2024-03-05T16:45:00Z',
  },
];