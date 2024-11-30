import React from 'react';
import FormField from '../../../ui/FormField';
import type { PatientFormData } from '../../../../lib/validation/schemas';

interface ContactInfoSectionProps {
  data: PatientFormData;
  onChange: (data: PatientFormData) => void;
  errors: {
    email?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
}

export default function ContactInfoSection({ data, onChange, errors }: ContactInfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Email"
          type="email"
          value={data.contactInfo.email}
          onChange={(e) =>
            onChange({
              ...data,
              contactInfo: {
                ...data.contactInfo,
                email: e.target.value,
              },
            })
          }
          error={errors.email}
          required
        />

        <FormField
          label="Phone"
          type="tel"
          value={data.contactInfo.phone}
          onChange={(e) =>
            onChange({
              ...data,
              contactInfo: {
                ...data.contactInfo,
                phone: e.target.value,
              },
            })
          }
          error={errors.phone}
          required
        />
      </div>

      <div className="mt-4 space-y-2">
        <FormField
          label="Street Address"
          type="text"
          value={data.contactInfo.address.street}
          onChange={(e) =>
            onChange({
              ...data,
              contactInfo: {
                ...data.contactInfo,
                address: {
                  ...data.contactInfo.address,
                  street: e.target.value,
                },
              },
            })
          }
          error={errors.street}
          required
        />

        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-3">
            <FormField
              label="City"
              type="text"
              value={data.contactInfo.address.city}
              onChange={(e) =>
                onChange({
                  ...data,
                  contactInfo: {
                    ...data.contactInfo,
                    address: {
                      ...data.contactInfo.address,
                      city: e.target.value,
                    },
                  },
                })
              }
              error={errors.city}
              required
            />
          </div>

          <div className="col-span-1">
            <FormField
              label="State"
              type="text"
              value={data.contactInfo.address.state}
              onChange={(e) =>
                onChange({
                  ...data,
                  contactInfo: {
                    ...data.contactInfo,
                    address: {
                      ...data.contactInfo.address,
                      state: e.target.value.toUpperCase(),
                    },
                  },
                })
              }
              error={errors.state}
              maxLength={2}
              required
            />
          </div>

          <div className="col-span-2">
            <FormField
              label="ZIP"
              type="text"
              value={data.contactInfo.address.zipCode}
              onChange={(e) =>
                onChange({
                  ...data,
                  contactInfo: {
                    ...data.contactInfo,
                    address: {
                      ...data.contactInfo.address,
                      zipCode: e.target.value,
                    },
                  },
                })
              }
              error={errors.zipCode}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}