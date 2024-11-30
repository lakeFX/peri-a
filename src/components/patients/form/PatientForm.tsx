import React, { useState } from 'react';
import { usePatientStore } from '../../../store/patientStore';
import { useTimelineStore } from '../../../store/timelineStore';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { ContactInfoSection } from './sections/ContactInfoSection';
import { InsuranceSection } from './sections/InsuranceSection';
import { EmergencyContactSection } from './sections/EmergencyContactSection';
import { FormActions } from './sections/FormActions';
import type { Patient } from '../../../types/patient';

const initialFormData: Partial<Patient> = {
  gender: 'other',
  caseStatus: 'pending',
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

export function PatientForm() {
  const { addPatient } = usePatientStore();
  const { generateTimeline } = useTimelineStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Patient>>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const patientId = await addPatient(formData as Patient);
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
        <BasicInfoSection data={formData} onChange={setFormData} />
        <ContactInfoSection data={formData} onChange={setFormData} />
        <InsuranceSection data={formData} onChange={setFormData} />
        <EmergencyContactSection data={formData} onChange={setFormData} />
        <FormActions 
          onClear={handleClear}
          isSubmitting={isSubmitting}
          error={error}
        />
      </form>
    </div>
  );
}