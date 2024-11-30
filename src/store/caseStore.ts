import { create } from 'zustand';
import { generateId } from '../lib/generateId';
import { caseStatusRules } from '../types/case';
import { mockCases } from '../data/mockCases';
import type { LienCase, CaseStatus, PatientStatus } from '../types/case';

interface CaseState {
  cases: LienCase[];
  selectedCase: LienCase | null;
  isLoading: boolean;
  error: string | null;
}

interface CaseStore extends CaseState {
  setSelectedCase: (caseItem: LienCase | null) => void;
  addCase: (caseItem: Omit<LienCase, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateCase: (id: string, caseItem: Partial<LienCase>) => void;
  deleteCase: (id: string) => void;
  updateCaseStatus: (id: string) => void;
  addVisit: (id: string) => void;
}

export const useCaseStore = create<CaseStore>((set, get) => ({
  cases: mockCases,
  selectedCase: null,
  isLoading: false,
  error: null,

  setSelectedCase: (caseItem) => set({ selectedCase: caseItem }),

  addCase: (caseItem) => {
    const id = generateId('C');
    set((state) => ({
      cases: [
        ...state.cases,
        {
          ...caseItem,
          id,
          visitCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }));
    return id;
  },

  updateCase: (id, updatedCase) =>
    set((state) => ({
      cases: state.cases.map((caseItem) =>
        caseItem.id === id
          ? {
              ...caseItem,
              ...updatedCase,
              updatedAt: new Date().toISOString(),
            }
          : caseItem
      ),
    })),

  deleteCase: (id) =>
    set((state) => ({
      cases: state.cases.filter((caseItem) => caseItem.id !== id),
    })),

  updateCaseStatus: (id) =>
    set((state) => {
      const caseItem = state.cases.find((c) => c.id === id);
      if (!caseItem) return state;

      const isPatientInactive = caseStatusRules.isPatientInactive(caseItem);
      const isCaseActive = caseStatusRules.isCaseActive(caseItem);

      const newPatientStatus: PatientStatus = isPatientInactive ? 'inactive' : 'active';
      const newCaseStatus: CaseStatus = isCaseActive ? 'active' : 'closed';

      return {
        cases: state.cases.map((c) =>
          c.id === id
            ? {
                ...c,
                status: newCaseStatus,
                patientStatus: newPatientStatus,
                updatedAt: new Date().toISOString(),
              }
            : c
        ),
      };
    }),

  addVisit: (id) =>
    set((state) => ({
      cases: state.cases.map((caseItem) =>
        caseItem.id === id
          ? {
              ...caseItem,
              visitCount: caseItem.visitCount + 1,
              lastVisitDate: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : caseItem
      ),
    })),
}));