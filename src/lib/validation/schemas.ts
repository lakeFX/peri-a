import { z } from 'zod';

export const phoneRegex = /^\+?[1-9]\d{1,14}$/;
export const zipCodeRegex = /^\d{5}(-\d{4})?$/;
export const stateRegex = /^[A-Z]{2}$/;

export const addressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().regex(stateRegex, 'Invalid state format (e.g., CA)'),
  zipCode: z.string().regex(zipCodeRegex, 'Invalid ZIP code'),
});

export const contactInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  address: addressSchema,
});

export const insuranceSchema = z.object({
  provider: z.string().min(2, 'Insurance provider is required'),
  policyNumber: z.string().min(5, 'Policy number is required'),
  groupNumber: z.string().optional(),
});

export const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Emergency contact name is required'),
  relationship: z.string().min(2, 'Relationship is required'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
});

export const patientSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gender: z.enum(['male', 'female', 'other']),
  contactInfo: contactInfoSchema,
  insurance: insuranceSchema,
  emergencyContact: emergencyContactSchema,
});

export type PatientFormData = z.infer<typeof patientSchema>;