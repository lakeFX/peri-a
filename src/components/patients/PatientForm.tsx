import React, { useState, useCallback } from 'react';
import { usePatientStore } from '../../store/patientStore';
import { useTimelineStore } from '../../store/timelineStore';
import {
  BasicInfoSection,
  ContactInfoSection,
  InsuranceSection,
  EmergencyContactSection,
  FormActions,
} from './form';
import type { Patient } from '../../types/patient';

export function PatientForm() {
  const { addPatient } = usePatientStore();
  const { generateTimeline } = useTimelineStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<Partial<Patient>>({
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
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      setIsSubmitting(true);

      const patientId = await addPatient(patientData as Patient);
      await generateTimeline(patientId, 'default');
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Failed to create patient record') as string); 
    } finally {
      setIsSubmitting(false);
    }
  }, [addPatient, generateTimeline, patientData]);

  const handleClear = useCallback(() => {
    setPatientData({
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
    });    
    setError(null);
  }, []);

  const handleChange = useCallback((updatedData: Partial<Patient>) => {
    setPatientData({ ...patientData, ...updatedData });
  }, [patientData]);

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <BasicInfoSection data={patientData} onChange={handleChange} />
        <ContactInfoSection data={patientData} onChange={handleChange} />
        <InsuranceSection data={patientData} onChange={handleChange} />
        <EmergencyContactSection data={patientData} onChange={handleChange} />
        <FormActions 
          onClear={handleClear}
          isSubmitting={isSubmitting}
          error={error}
        />
      </form>
    </div>
  );
}