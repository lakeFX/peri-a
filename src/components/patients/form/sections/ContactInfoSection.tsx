import React from 'react';
import type { Patient } from '../../../../types/patient';

interface ContactInfoSectionProps {
  data: Partial<Patient>;
  onChange: (data: Partial<Patient>) => void;
}

export function ContactInfoSection({ data, onChange }: ContactInfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={data.contactInfo?.email || ''}
            onChange={(e) =>
              onChange({
                ...data,
                contactInfo: {
                  ...data.contactInfo!,
                  email: e.target.value,
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
            value={data.contactInfo?.phone || ''}
            onChange={(e) =>
              onChange({
                ...data,
                contactInfo: {
                  ...data.contactInfo!,
                  phone: e.target.value,
                },
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          placeholder="Street Address"
          value={data.contactInfo?.address?.street || ''}
          onChange={(e) =>
            onChange({
              ...data,
              contactInfo: {
                ...data.contactInfo!,
                address: {
                  ...data.contactInfo!.address,
                  street: e.target.value,
                },
              },
            })
          }
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
        <div className="grid grid-cols-6 gap-2">
          <input
            type="text"
            placeholder="City"
            value={data.contactInfo?.address?.city || ''}
            onChange={(e) =>
              onChange({
                ...data,
                contactInfo: {
                  ...data.contactInfo!,
                  address: {
                    ...data.contactInfo!.address,
                    city: e.target.value,
                  },
                },
              })
            }
            className="col-span-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
          <input
            type="text"
            placeholder="State"
            value={data.contactInfo?.address?.state || ''}
            onChange={(e) =>
              onChange({
                ...data,
                contactInfo: {
                  ...data.contactInfo!,
                  address: {
                    ...data.contactInfo!.address,
                    state: e.target.value.toUpperCase(),
                  },
                },
              })
            }
            className="col-span-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            maxLength={2}
            required
          />
          <input
            type="text"
            placeholder="ZIP"
            value={data.contactInfo?.address?.zipCode || ''}
            onChange={(e) =>
              onChange({
                ...data,
                contactInfo: {
                  ...data.contactInfo!,
                  address: {
                    ...data.contactInfo!.address,
                    zipCode: e.target.value,
                  },
                },
              })
            }
            className="col-span-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>
      </div>
    </div>
  );
}