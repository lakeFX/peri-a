import { create } from 'zustand';
import type { AdminUser, SystemSettings, AuditLog } from '../types/admin';

interface AdminState {
  users: AdminUser[];
  settings: SystemSettings[];
  auditLogs: AuditLog[];
  selectedUser: AdminUser | null;
  isLoading: boolean;
  error: string | null;
}

interface AdminStore extends AdminState {
  setSelectedUser: (user: AdminUser | null) => void;
  addUser: (user: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUser: (id: string, user: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  resetPassword: (id: string) => Promise<void>;
  toggleMFA: (id: string, enabled: boolean) => Promise<void>;
  updateSetting: (id: string, value: any) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  settings: [],
  auditLogs: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  setSelectedUser: (user) => set({ selectedUser: user }),

  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...user,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id
          ? {
              ...user,
              ...updatedUser,
              updatedAt: new Date().toISOString(),
            }
          : user
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  resetPassword: async (id) => {
    try {
      set({ isLoading: true });
      // Integration with Azure AD password reset will be implemented here
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to reset password',
        isLoading: false,
      });
    }
  },

  toggleMFA: async (id, enabled) => {
    try {
      set({ isLoading: true });
      // Integration with Azure AD MFA settings will be implemented here
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? {
                ...user,
                mfaEnabled: enabled,
                updatedAt: new Date().toISOString(),
              }
            : user
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to toggle MFA',
        isLoading: false,
      });
    }
  },

  updateSetting: (id, value) =>
    set((state) => ({
      settings: state.settings.map((setting) =>
        setting.id === id
          ? {
              ...setting,
              value,
              updatedAt: new Date().toISOString(),
            }
          : setting
      ),
    })),

  addAuditLog: (log) =>
    set((state) => ({
      auditLogs: [
        {
          ...log,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        ...state.auditLogs,
      ],
    })),
}));