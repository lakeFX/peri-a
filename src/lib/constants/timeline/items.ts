import type { RequiredItemType } from '../../../types/timeline';

export interface TimelineItem {
  id: string;
  title: string;
  type: RequiredItemType;
  optional?: boolean;
  description?: string;
}

export const TIMELINE_ITEMS: Record<string, TimelineItem> = {
  'ATT-REF': {
    id: 'ATT-REF',
    title: 'Attorney Referral',
    type: 'document',
    description: 'Initial attorney referral documentation',
  },
  'INT-1': {
    id: 'INT-1',
    title: 'Patient Intake Form',
    type: 'document',
    description: 'Initial patient intake documentation',
  },
  'LIEN-1': {
    id: 'LIEN-1',
    title: 'Medical Lien Form',
    type: 'document',
    description: 'Medical lien agreement documentation',
  },
  'INT-REV': {
    id: 'INT-REV',
    title: 'Intake Review',
    type: 'task',
    description: 'Review of patient intake documentation',
  },
  'INV-1': {
    id: 'INV-1',
    title: 'Invoice-1',
    type: 'document',
    description: 'Invoice for initial examination and report',
  },
  'INV-2': {
    id: 'INV-2',
    title: 'Invoice-2',
    type: 'document',
    description: 'Invoice for progress examination and report',
  },
  'INV-3': {
    id: 'INV-3',
    title: 'Invoice-3',
    type: 'document',
    description: 'Invoice for final examination and report',
  },
  'INV-4': {
    id: 'INV-4',
    title: 'Invoice-4',
    type: 'document',
    description: 'Invoice for case review and MMI assessment',
  }
} as const;