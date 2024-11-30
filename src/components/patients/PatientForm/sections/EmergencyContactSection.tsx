import React from 'react';
import FormField from '../../../ui/FormField';
import type { PatientFormData } from '../../../../lib/validation/schemas';

interface EmergencyContactSectionProps {
  data: PatientFormData;
  onChange: (data: PatientFormData) => void;
  errors: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
}

export default function EmergencyContactSection({ data, onChange, errors }: EmergencyContactSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Name"
          type="text"
          value={data.emergencyContact.name}
          onChange={(e) =>
            onChange({
              ...data,
              emergencyContact: {
                ...data.emergencyContact,
                name: e.target.value,
              },
            })
          }
          error={errors.name}
          required
        />

        <FormField
          label="Relationship"
          type="text"
          value={data.emergencyContact.relationship}
          onChange={(e) =>
            onChange({
              ...data,
              emergencyContact: {
                ...data.emergencyContact,
                relationship: e.target.value,
              },
            })
          }
          error={errors.relationship}
          required
        />

        <FormField
          label="Phone"
          type="tel"
          value={data.emergencyContact.phone}
          onChange={(e) =>
            onChange({
              ...data,
              emergencyContact: {
                ...data.emergencyContact,
                phone: e.target.value,
              },
            })
          }
          error={errors.phone}
          required
        />
      </div>
    </div>
  );
}