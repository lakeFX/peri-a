import React from 'react';
import type { Patient } from '../../../types/patient';

interface InsuranceSectionProps {
  data: Partial<Patient>;
  onChange: (data: Partial<Patient>) => void;
}

export function InsuranceSection({ data, onChange }: InsuranceSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Insurance Provider
          </label>
          <input
            type="text"
            value={data.insurance?.provider || ''}
            onChange={(e) =>
              onChange({
                ...data,
                insurance: {
                  ...data.insurance!,
                  provider: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Policy Number
          </label>
          <input
            type="text"
            value={data.insurance?.policyNumber || ''}
            onChange={(e) =>
              onChange({
                ...data,
                insurance: {
                  ...data.insurance!,
                  policyNumber: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Number
          </label>
          <input
            type="text"
            value={data.insurance?.groupNumber || ''}
            onChange={(e) =>
              onChange({
                ...data,
                insurance: {
                  ...data.insurance!,
                  groupNumber: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
}