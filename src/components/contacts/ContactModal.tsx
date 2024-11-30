import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useContactStore } from '../../store/contactStore';
import type { Contact, ContactType } from '../../types/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  contact?: Contact;
}

const CONTACT_TYPES: Array<{ value: ContactType; label: string }> = [
  { value: 'attorney', label: 'Attorney' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'imaging', label: 'Imaging Center' },
  { value: 'physical-therapist', label: 'Physical Therapist' },
  { value: 'acupuncturist', label: 'Acupuncturist' },
  { value: 'massage-therapist', label: 'Massage Therapist' },
  { value: 'insurance', label: 'Insurance Company' },
  { value: 'agent', label: 'Agent' },
  { value: 'other', label: 'Other' },
];

export function ContactModal({ isOpen, onClose, mode, contact }: ContactModalProps) {
  const { addContact, updateContact } = useContactStore();
  const [formData, setFormData] = useState<Partial<Contact>>(
    contact || {
      type: 'other',
      status: 'active',
      name: '',
      organization: '',
      title: '',
      specialty: '',
      contactInfo: {
        email: '',
        phone: '',
        fax: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
      },
      billing: {
        taxId: '',
        npi: '',
        acceptedInsurance: [],
      },
      notes: '',
      linkedPatients: [],
      metadata: {},
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      addContact(formData as Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>);
    } else if (mode === 'edit' && contact) {
      updateContact(contact.id, formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {mode === 'create' ? 'New Contact' : 'Edit Contact'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as ContactType })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                {CONTACT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Contact['status'],
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialty
              </label>
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contactInfo?.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo!,
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
                  value={formData.contactInfo?.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo!,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fax
              </label>
              <input
                type="tel"
                value={formData.contactInfo?.fax}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactInfo: {
                      ...formData.contactInfo!,
                      fax: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Street"
                value={formData.contactInfo?.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactInfo: {
                      ...formData.contactInfo!,
                      address: {
                        ...formData.contactInfo!.address,
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
                  value={formData.contactInfo?.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo!,
                        address: {
                          ...formData.contactInfo!.address,
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
                  value={formData.contactInfo?.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo!,
                        address: {
                          ...formData.contactInfo!.address,
                          state: e.target.value,
                        },
                      },
                    })
                  }
                  className="col-span-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={formData.contactInfo?.address.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo!,
                        address: {
                          ...formData.contactInfo!.address,
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

          {(formData.type === 'doctor' ||
            formData.type === 'physical-therapist' ||
            formData.type === 'acupuncturist') && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900">Billing Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    value={formData.billing?.taxId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billing: {
                          ...formData.billing!,
                          taxId: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NPI
                  </label>
                  <input
                    type="text"
                    value={formData.billing?.npi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        billing: {
                          ...formData.billing!,
                          npi: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              {mode === 'create' ? 'Create Contact' : 'Update Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}