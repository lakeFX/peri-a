import React from 'react';
import type { Patient } from '../../../../types/patient';

interface EmergencyContactSectionProps {
  data: Partial<Patient>;
  onChange: (data: Partial<Patient>) => void;
}

export function EmergencyContactSection({ data, onChange }: EmergencyContactSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={data.emergencyContact?.name || ''}
            onChange={(e) =>
              onChange({
                ...data,
                emergencyContact: {
                  ...data.emergencyContact!,
                  name: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Relationship
          </label>
          <input
            type="text"
            value={data.emergencyContact?.relationship || ''}
            onChange={(e) =>
              onChange({
                ...data,
                emergencyContact: {
                  ...data.emergencyContact!,
                  relationship: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={data.emergencyContact?.phone || ''}
            onChange={(e) =>
              onChange({
                ...data,
                emergencyContact: {
                  ...data.emergencyContact!,
                  phone: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>
    </div>
  );
}