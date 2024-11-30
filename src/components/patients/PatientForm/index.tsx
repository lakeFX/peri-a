import React, { useState } from 'react';
import { usePatientStore } from '../../../store/patientStore';
import { useTimelineStore } from '../../../store/timelineStore';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { patientSchema } from '../../../lib/validation/schemas';
import BasicInfoSection from './sections/BasicInfoSection';
import ContactInfoSection from './sections/ContactInfoSection';
import InsuranceSection from './sections/InsuranceSection';
import EmergencyContactSection from './sections/EmergencyContactSection';
import FormActions from './sections/FormActions';
import type { Patient } from '../../../types/patient';
import type { PatientFormData } from '../../../lib/validation/schemas';

const initialFormData: PatientFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'other',
  contactInfo: {
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  insurance: {
    provider: '',
    policyNumber: '',
    groupNumber: '',
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
};

export default function PatientForm() {
  const { addPatient } = usePatientStore();
  const { generateTimeline } = useTimelineStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const { validate, getFieldError } = useFormValidation(patientSchema);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate(formData)) {
      setError('Please fix the validation errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const patientId = await addPatient({
        ...formData,
        caseStatus: 'pending',
      } as Patient);
      await generateTimeline(patientId, 'default');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create patient record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <BasicInfoSection 
          data={formData} 
          onChange={setFormData}
          errors={{
            firstName: getFieldError('firstName'),
            lastName: getFieldError('lastName'),
            dateOfBirth: getFieldError('dateOfBirth'),
            gender: getFieldError('gender'),
          }}
        />
        <ContactInfoSection 
          data={formData} 
          onChange={setFormData}
          errors={{
            email: getFieldError('contactInfo.email'),
            phone: getFieldError('contactInfo.phone'),
            street: getFieldError('contactInfo.address.street'),
            city: getFieldError('contactInfo.address.city'),
            state: getFieldError('contactInfo.address.state'),
            zipCode: getFieldError('contactInfo.address.zipCode'),
          }}
        />
        <InsuranceSection 
          data={formData} 
          onChange={setFormData}
          errors={{
            provider: getFieldError('insurance.provider'),
            policyNumber: getFieldError('insurance.policyNumber'),
          }}
        />
        <EmergencyContactSection 
          data={formData} 
          onChange={setFormData}
          errors={{
            name: getFieldError('emergencyContact.name'),
            relationship: getFieldError('emergencyContact.relationship'),
            phone: getFieldError('emergencyContact.phone'),
          }}
        />
        <FormActions 
          onClear={handleClear}
          isSubmitting={isSubmitting}
          error={error}
        />
      </form>
    </div>
  );
}