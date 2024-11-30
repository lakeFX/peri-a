import React, { useState } from 'react';
import { User2, Phone, Mail, MapPin, Link, Unlink } from 'lucide-react';
import { useContactStore } from '../../store/contactStore';
import { ContactModal } from './ContactModal';
import { LinkPatientModal } from './LinkPatientModal';
import type { Contact, ContactType } from '../../types/contact';

interface ContactListProps {
  selectedType: ContactType | 'all';
}

export function ContactList({ selectedType }: ContactListProps) {
  const { contacts } = useContactStore();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const filteredContacts = contacts.filter(
    (contact) => selectedType === 'all' || contact.type === selectedType
  );

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className="px-6 py-5 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <User2 className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {contact.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {contact.organization} • {contact.type}
                  </p>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {contact.contactInfo.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {contact.contactInfo.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {`${contact.contactInfo.address.street}, ${contact.contactInfo.address.city}, ${contact.contactInfo.address.state} ${contact.contactInfo.address.zipCode}`}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setIsLinkModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-primary-500"
                    title="Link to patient"
                  >
                    <Link className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setIsEditModalOpen(true);
                    }}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {contact.linkedPatients.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {contact.linkedPatients.map((patientId) => (
                    <span
                      key={patientId}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      Patient #{patientId}
                      <button
                        onClick={() => {
                          // Handle unlinking patient
                        }}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <Unlink className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {selectedContact && (
        <>
          <ContactModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedContact(null);
            }}
            mode="edit"
            contact={selectedContact}
          />
          <LinkPatientModal
            isOpen={isLinkModalOpen}
            onClose={() => {
              setIsLinkModalOpen(false);
              setSelectedContact(null);
            }}
            contact={selectedContact}
          />
        </>
      )}
    </>
  );
}