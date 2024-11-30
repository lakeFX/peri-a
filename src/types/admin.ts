import type { User } from './index';

export type UserRole = 'admin' | 'staff' | 'provider' | 'billing';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface AdminUser extends User {
  role: UserRole;
  status: UserStatus;
  permissions: string[];
  lastLogin?: string;
  mfaEnabled: boolean;
  azureAdId?: string;
  metadata: {
    createdBy?: string;
    lastPasswordReset?: string;
    loginAttempts?: number;
    lockedUntil?: string;
  };
}

export interface SystemSettings {
  id: string;
  category: 'security' | 'billing' | 'notifications' | 'integration';
  key: string;
  value: any;
  description: string;
  updatedBy: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
}