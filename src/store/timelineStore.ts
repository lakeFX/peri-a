import { create } from 'zustand';
import { generateId } from '../lib/generateId';
import type { TimelineEvent, TimelineTemplate, TimelineStatus } from '../types/timeline';

interface TimelineState {
  events: TimelineEvent[];
  templates: TimelineTemplate[];
  selectedEvent: TimelineEvent | null;
  selectedTemplate: TimelineTemplate | null;
  isLoading: boolean;
  error: string | null;
}

interface TimelineStore extends TimelineState {
  setSelectedEvent: (event: TimelineEvent | null) => void;
  setSelectedTemplate: (template: TimelineTemplate | null) => void;
  addEvent: (event: Omit<TimelineEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvent: (id: string, event: Partial<TimelineEvent>) => void;
  deleteEvent: (id: string) => void;
  updateStatus: (id: string, status: TimelineStatus) => void;
  addTemplate: (template: Omit<TimelineTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, template: Partial<TimelineTemplate>) => void;
  deleteTemplate: (id: string) => void;
  generateTimeline: (patientId: string, templateId: string) => Promise<void>;
}

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  events: [],
  templates: [
    {
      id: 'default',
      name: 'Standard Personal Injury Timeline',
      description: 'Default timeline for personal injury cases',
      events: [
        { type: 'intake', offsetDays: 0, priority: 'high' },
        { type: 'imaging', offsetDays: 10, priority: 'high' },
        { type: 'exam', offsetDays: 14, priority: 'medium' },
        { type: 'treatment', offsetDays: 21, priority: 'medium' },
        { type: 'active-care', offsetDays: 84, priority: 'medium' },
        { type: 'follow-up', offsetDays: 120, priority: 'low' },
      ],
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  selectedEvent: null,
  selectedTemplate: null,
  isLoading: false,
  error: null,

  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  addEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...event,
          id: generateId('E'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id
          ? {
              ...event,
              ...updatedEvent,
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id
          ? {
              ...event,
              status,
              actualDate: status === 'completed' ? new Date().toISOString() : event.actualDate,
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),

  addTemplate: (template) =>
    set((state) => ({
      templates: [
        ...state.templates,
        {
          ...template,
          id: generateId('T'),
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

  generateTimeline: async (patientId: string, templateId: string) => {
    const template = get().templates.find((t) => t.id === templateId);
    if (!template) return;

    try {
      set({ isLoading: true });
      const startDate = new Date();

      // Generate events based on template
      template.events.forEach((eventTemplate) => {
        const suggestedDate = new Date(startDate);
        suggestedDate.setDate(suggestedDate.getDate() + eventTemplate.offsetDays);

        get().addEvent({
          patientId,
          type: eventTemplate.type,
          status: 'pending',
          suggestedDate: suggestedDate.toISOString(),
          priority: eventTemplate.priority,
          metadata: {},
        });
      });

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate timeline',
        isLoading: false,
      });
    }
  },
}));