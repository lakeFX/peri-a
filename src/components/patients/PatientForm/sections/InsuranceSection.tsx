import React from 'react';
import FormField from '../../../ui/FormField';
import type { PatientFormData } from '../../../../lib/validation/schemas';

interface InsuranceSectionProps {
  data: PatientFormData;
  onChange: (data: PatientFormData) => void;
  errors: {
    provider?: string;
    policyNumber?: string;
  };
}

export default function InsuranceSection({ data, onChange, errors }: InsuranceSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Insurance Provider"
          type="text"
          value={data.insurance.provider}
          onChange={(e) =>
            onChange({
              ...data,
              insurance: {
                ...data.insurance,
                provider: e.target.value,
              },
            })
          }
          error={errors.provider}
          required
        />

        <FormField
          label="Policy Number"
          type="text"
          value={data.insurance.policyNumber}
          onChange={(e) =>
            onChange({
              ...data,
              insurance: {
                ...data.insurance,
                policyNumber: e.target.value,
              },
            })
          }
          error={errors.policyNumber}
          required
        />

        <FormField
          label="Group Number"
          type="text"
          value={data.insurance.groupNumber || ''}
          onChange={(e) =>
            onChange({
              ...data,
              insurance: {
                ...data.insurance,
                groupNumber: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
}