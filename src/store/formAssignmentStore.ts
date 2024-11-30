import { create } from 'zustand';
import type { FormAssignment, AssignmentStatus } from '../types/formAssignment';

interface FormAssignmentState {
  assignments: FormAssignment[];
  selectedAssignment: FormAssignment | null;
  isLoading: boolean;
  error: string | null;
}

interface FormAssignmentStore extends FormAssignmentState {
  setSelectedAssignment: (assignment: FormAssignment | null) => void;
  assignForm: (assignment: Omit<FormAssignment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAssignment: (id: string, assignment: Partial<FormAssignment>) => void;
  deleteAssignment: (id: string) => void;
  updateStatus: (id: string, status: AssignmentStatus) => void;
}

export const useFormAssignmentStore = create<FormAssignmentStore>((set) => ({
  assignments: [],
  selectedAssignment: null,
  isLoading: false,
  error: null,

  setSelectedAssignment: (assignment) => set({ selectedAssignment: assignment }),

  assignForm: (assignment) =>
    set((state) => ({
      assignments: [
        ...state.assignments,
        {
          ...assignment,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateAssignment: (id, updatedAssignment) =>
    set((state) => ({
      assignments: state.assignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              ...updatedAssignment,
              updatedAt: new Date().toISOString(),
            }
          : assignment
      ),
    })),

  deleteAssignment: (id) =>
    set((state) => ({
      assignments: state.assignments.filter((assignment) => assignment.id !== id),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      assignments: state.assignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              status,
              completedDate: status === 'completed' ? new Date().toISOString() : undefined,
              updatedAt: new Date().toISOString(),
            }
          : assignment
      ),
    })),
}));