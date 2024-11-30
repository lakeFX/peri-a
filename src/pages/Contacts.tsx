import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { ContactList } from '../components/contacts/ContactList';
import { ContactModal } from '../components/contacts/ContactModal';
import type { ContactType } from '../types/contact';

export default function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ContactType | 'all'>('all');

  const contactTypes: Array<{ value: ContactType | 'all'; label: string }> = [
    { value: 'all', label: 'All Contacts' },
    { value: 'attorney', label: 'Attorneys' },
    { value: 'doctor', label: 'Doctors' },
    { value: 'imaging', label: 'Imaging Centers' },
    { value: 'physical-therapist', label: 'Physical Therapists' },
    { value: 'acupuncturist', label: 'Acupuncturists' },
    { value: 'massage-therapist', label: 'Massage Therapists' },
    { value: 'insurance', label: 'Insurance Companies' },
    { value: 'agent', label: 'Agents' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        <div className="flex space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as ContactType | 'all')}
            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {contactTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Contact
          </button>
        </div>
      </div>

      <ContactList selectedType={selectedType} />
      
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  );
}