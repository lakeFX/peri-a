import { create } from 'zustand';
import type { FormTemplate, FormStatus } from '../types/form';

interface FormState {
  templates: FormTemplate[];
  selectedTemplate: FormTemplate | null;
  isLoading: boolean;
  error: string | null;
}

interface FormStore extends FormState {
  setSelectedTemplate: (template: FormTemplate | null) => void;
  addTemplate: (template: Omit<FormTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, template: Partial<FormTemplate>) => void;
  deleteTemplate: (id: string) => void;
  updateStatus: (id: string, status: FormStatus) => void;
  duplicateTemplate: (id: string) => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
  templates: [],
  selectedTemplate: null,
  isLoading: false,
  error: null,

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  addTemplate: (template) =>
    set((state) => ({
      templates: [
        ...state.templates,
        {
          ...template,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateTemplate: (id, updatedTemplate) =>
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? {
              ...template,
              ...updatedTemplate,
              updatedAt: new Date().toISOString(),
            }
          : template
      ),
    })),

  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? {
              ...template,
              status,
              updatedAt: new Date().toISOString(),
            }
          : template
      ),
    })),

  duplicateTemplate: (id) => {
    const template = get().templates.find((t) => t.id === id);
    if (template) {
      const duplicate = {
        ...template,
        title: `${template.title} (Copy)`,
        version: '1.0',
        status: 'draft' as FormStatus,
      };
      get().addTemplate(duplicate);
    }
  },
}));