import { create } from 'zustand';
import { generateId } from '../lib/generateId';
import type { BillingItem, BillingStatus, ICDCode } from '../types/billing';

interface BillingState {
  items: BillingItem[];
  selectedItem: BillingItem | null;
  isLoading: boolean;
  error: string | null;
}

interface BillingStore extends BillingState {
  setSelectedItem: (item: BillingItem | null) => void;
  addBillingItem: (item: Omit<BillingItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBillingItem: (id: string, item: Partial<BillingItem>) => void;
  deleteBillingItem: (id: string) => void;
  updateStatus: (id: string, status: BillingStatus) => void;
  addPayment: (id: string, amount: number) => void;
  addAdjustment: (id: string, amount: number) => void;
  updateICDCodes: (id: string, codes: ICDCode[]) => void;
  generateAISuggestions: (id: string) => Promise<void>;
}

export const useBillingStore = create<BillingStore>((set, get) => ({
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,

  setSelectedItem: (item) => set({ selectedItem: item }),

  addBillingItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...item,
          id: generateId('B'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateBillingItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedItem,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  deleteBillingItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  addPayment: (id, amount) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              paid: item.paid + amount,
              balance: item.balance - amount,
              status: item.balance - amount <= 0 ? 'paid' : 'partial',
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  addAdjustment: (id, amount) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              adjustments: item.adjustments + amount,
              balance: item.balance - amount,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  updateICDCodes: (id, codes) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              icdCodes: codes,
              updatedAt: new Date().toISOString(),
            }
          : item
      ),
    })),

  generateAISuggestions: async (id) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;

    try {
      set({ isLoading: true });
      // AI suggestion generation will be implemented here
      // This will use OpenAI to analyze SOAP notes and other documents
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate suggestions',
        isLoading: false,
      });
    }
  },
}));