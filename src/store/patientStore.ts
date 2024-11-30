import { create } from 'zustand';
import { generateId } from '../lib/generateId';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types/patient';

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  isLoading: boolean;
  error: string | null;
}

interface PatientStore extends PatientState {
  setSelectedPatient: (patient: Patient | null) => void;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  incrementVisitCount: (id: string) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: mockPatients,
  selectedPatient: null,
  isLoading: false,
  error: null,

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),

  addPatient: (patient) => {
    const id = generateId('P');
    set((state) => ({
      patients: [
        ...state.patients,
        {
          ...patient,
          id,
          visitCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
    return id;
  },

  updatePatient: (id, updatedPatient) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              ...updatedPatient,
              updatedAt: new Date().toISOString(),
            }
          : patient
      ),
    })),

  deletePatient: (id) =>
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    })),

  incrementVisitCount: (id) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              visitCount: (patient.visitCount || 0) + 1,
              lastVisit: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : patient
      ),
    })),
}));