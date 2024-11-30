import { create } from 'zustand';
import { generateId } from '../lib/generateId';
import { mockContacts } from '../data/mockContacts';
import type { Contact, ContactLink } from '../types/contact';

interface ContactState {
  contacts: Contact[];
  contactLinks: ContactLink[];
  selectedContact: Contact | null;
  isLoading: boolean;
  error: string | null;
}

interface ContactStore extends ContactState {
  setSelectedContact: (contact: Contact | null) => void;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  linkPatient: (contactId: string, patientId: string, relationship: string) => void;
  unlinkPatient: (contactId: string, patientId: string) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: mockContacts,
  contactLinks: [],
  selectedContact: null,
  isLoading: false,
  error: null,

  setSelectedContact: (contact) => set({ selectedContact: contact }),

  addContact: (contact) =>
    set((state) => ({
      contacts: [
        ...state.contacts,
        {
          ...contact,
          id: generateId('C'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateContact: (id, updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              ...updatedContact,
              updatedAt: new Date().toISOString(),
            }
          : contact
      ),
    })),

  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
      contactLinks: state.contactLinks.filter((link) => link.contactId !== id),
    })),

  linkPatient: (contactId, patientId, relationship) =>
    set((state) => ({
      contactLinks: [
        ...state.contactLinks,
        {
          id: crypto.randomUUID(),
          contactId,
          patientId,
          relationship,
          startDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      contacts: state.contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              linkedPatients: [...contact.linkedPatients, patientId],
              updatedAt: new Date().toISOString(),
            }
          : contact
      ),
    })),

  unlinkPatient: (contactId, patientId) =>
    set((state) => ({
      contactLinks: state.contactLinks.filter(
        (link) => !(link.contactId === contactId && link.patientId === patientId)
      ),
      contacts: state.contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              linkedPatients: contact.linkedPatients.filter((id) => id !== patientId),
              updatedAt: new Date().toISOString(),
            }
          : contact
      ),
    })),
}));