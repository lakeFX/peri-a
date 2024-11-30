import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useContactStore } from '../../store/contactStore';
import { usePatientStore } from '../../store/patientStore';
import type { Contact } from '../../types/contact';

interface LinkPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
}

export function LinkPatientModal({ isOpen, onClose, contact }: LinkPatientModalProps) {
  const { linkPatient } = useContactStore();
  const { patients } = usePatientStore();
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [relationship, setRelationship] = useState('');

  const availablePatients = patients.filter(
    (patient) => !contact.linkedPatients.includes(patient.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatientId && relationship) {
      linkPatient(contact.id, selectedPatientId, relationship);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Link Patient to Contact</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Patient
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Choose a patient</option>
              {availablePatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g., Primary Care Physician, Attorney of Record"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
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
              Link Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}