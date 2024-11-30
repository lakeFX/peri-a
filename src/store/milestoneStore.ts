import { create } from 'zustand';
import { generateId } from '../lib/generateId';
import { TIMELINE_GATES, TIMELINE_MILESTONES } from '../lib/constants';
import type { CaseMilestone, MilestoneStatus } from '../types/timeline';

interface MilestoneState {
  milestones: CaseMilestone[];
  selectedMilestone: CaseMilestone | null;
  isLoading: boolean;
  error: string | null;
}

interface MilestoneStore extends MilestoneState {
  setSelectedMilestone: (milestone: CaseMilestone | null) => void;
  initializeMilestones: (caseId: string) => void;
  updateMilestoneStatus: (id: string, status: MilestoneStatus) => void;
  completeRequiredItem: (milestoneId: string, itemId: string) => void;
  extendTimeline: (caseId: string, currentGate: number) => void;
  initiateClosure: (caseId: string, paymentStatus: 'paid' | 'renegotiated' | 'denied') => void;
}

export const useMilestoneStore = create<MilestoneStore>((set, get) => ({
  milestones: [],
  selectedMilestone: null,
  isLoading: false,
  error: null,

  setSelectedMilestone: (milestone) => set({ selectedMilestone: milestone }),

  initializeMilestones: (caseId) => {
    // First, check if milestones already exist for this case
    const existingMilestones = get().milestones.some(m => m.caseId === caseId);
    if (existingMilestones) return;

    const newMilestones = TIMELINE_MILESTONES.map(template => ({
      ...template,
      id: generateId('M'),
      caseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    set((state) => ({
      milestones: [...state.milestones, ...newMilestones],
      error: null,
    }));
  },

  updateMilestoneStatus: (id, status) =>
    set((state) => ({
      milestones: state.milestones.map((milestone) =>
        milestone.id === id
          ? {
              ...milestone,
              status,
              updatedAt: new Date().toISOString(),
            }
          : milestone
      ),
    })),

  completeRequiredItem: (milestoneId, itemId) =>
    set((state) => ({
      milestones: state.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              requiredItems: milestone.requiredItems.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status: 'completed',
                      completedDate: new Date().toISOString(),
                    }
                  : item
              ),
              updatedAt: new Date().toISOString(),
            }
          : milestone
      ),
    })),

  extendTimeline: (caseId, currentGate) => {
    // Implementation for timeline extension
    // This would create new milestones based on the extension rules
    const extensionMilestones = TIMELINE_MILESTONES
      .filter(m => typeof m.gate === 'number' && m.gate > currentGate)
      .map(template => ({
        ...template,
        id: generateId('M'),
        caseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

    set((state) => ({
      milestones: [...state.milestones, ...extensionMilestones],
      error: null,
    }));
  },

  initiateClosure: (caseId, paymentStatus) => {
    const closureMilestone = {
      id: generateId('M'),
      caseId,
      gate: TIMELINE_GATES.G86,
      week: 20,
      title: 'Case Closure',
      description: 'Final case closure and lien resolution',
      status: 'pending',
      requiredItems: [
        {
          id: generateId('I'),
          title: 'Case Closure Documentation (CC-DOC)',
          type: 'document',
          status: 'pending'
        }
      ],
      isFinalGate: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add payment-specific required items
    switch (paymentStatus) {
      case 'paid':
        closureMilestone.requiredItems.unshift({
          id: generateId('I'),
          title: 'Lien Payment Received (LPR-1)',
          type: 'payment',
          status: 'pending'
        });
        break;
      case 'renegotiated':
        closureMilestone.requiredItems.unshift(
          {
            id: generateId('I'),
            title: 'Lien Renegotiation Agreement (LRNG-1)',
            type: 'document',
            status: 'pending'
          },
          {
            id: generateId('I'),
            title: 'Renegotiated Payment Received',
            type: 'payment',
            status: 'pending'
          }
        );
        break;
      case 'denied':
        closureMilestone.requiredItems.unshift(
          {
            id: generateId('I'),
            title: 'Payment Denial Documentation (LDND-1)',
            type: 'document',
            status: 'pending'
          },
          {
            id: generateId('I'),
            title: 'Legal Remedy Documentation',
            type: 'document',
            status: 'pending'
          }
        );
        break;
    }

    set((state) => ({
      milestones: [...state.milestones, closureMilestone],
      error: null,
    }));
  },
}));