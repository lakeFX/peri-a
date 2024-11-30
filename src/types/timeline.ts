import { TIMELINE_GATES } from '../lib/constants/timeline';

export type TimelineGate = typeof TIMELINE_GATES[keyof typeof TIMELINE_GATES];
export type TimelineStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';
export type MilestoneStatus = TimelineStatus;
export type RequiredItemType = 'document' | 'appointment' | 'check-in' | 'task' | 'payment' | 'imaging';

export interface RequiredItem {
  id: string;
  title: string;
  type: RequiredItemType;
  status: 'pending' | 'completed';
  optional?: boolean;
  completedDate?: string;
}

export interface CaseMilestone {
  id: string;
  caseId: string;
  gate: TimelineGate;
  week: number;
  title: string;
  description: string;
  status: TimelineStatus;
  requiredItems: RequiredItem[];
  dependencies?: string[];
  isExtensionPoint?: boolean;
  isFinalGate?: boolean;
  createdAt: string;
  updatedAt: string;
}