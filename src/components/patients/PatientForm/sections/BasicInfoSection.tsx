import React from 'react';
import FormField from '../../../ui/FormField';
import type { PatientFormData } from '../../../../lib/validation/schemas';

interface BasicInfoSectionProps {
  data: PatientFormData;
  onChange: (data: PatientFormData) => void;
  errors: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
  };
}

export default function BasicInfoSection({ data, onChange, errors }: BasicInfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          type="text"
          value={data.firstName}
          onChange={(e) => onChange({ ...data, firstName: e.target.value })}
          error={errors.firstName}
          required
        />

        <FormField
          label="Last Name"
          type="text"
          value={data.lastName}
          onChange={(e) => onChange({ ...data, lastName: e.target.value })}
          error={errors.lastName}
          required
        />

        <FormField
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => onChange({ ...data, dateOfBirth: e.target.value })}
          error={errors.dateOfBirth}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={data.gender}
            onChange={(e) => onChange({ ...data, gender: e.target.value as PatientFormData['gender'] })}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.gender
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            }`}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>
      </div>
    </div>
  );
}