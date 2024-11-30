import React from 'react';
import type { Patient } from '../../../types/patient';

interface BasicInfoSectionProps {
  data: Partial<Patient>;
  onChange: (data: Partial<Patient>) => void;
}

export function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={data.firstName || ''}
            onChange={(e) =>
              onChange({ ...data, firstName: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) =>
              onChange({ ...data, lastName: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.dateOfBirth?.split('T')[0] || ''}
            onChange={(e) =>
              onChange({ ...data, dateOfBirth: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={data.gender || 'other'}
            onChange={(e) =>
              onChange({
                ...data,
                gender: e.target.value as Patient['gender'],
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}