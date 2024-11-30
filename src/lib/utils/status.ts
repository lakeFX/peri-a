import type { BillingStatus, CaseStatus, TimelineStatus } from '../../types';

interface StatusConfig {
  color: string;
  bgColor: string;
  icon: string;
}

export function getBillingStatusConfig(status: BillingStatus): StatusConfig {
  switch (status) {
    case 'paid':
      return { color: 'text-green-800', bgColor: 'bg-green-100', icon: 'check-circle' };
    case 'pending':
      return { color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: 'clock' };
    case 'denied':
      return { color: 'text-red-800', bgColor: 'bg-red-100', icon: 'x-circle' };
    default:
      return { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: 'circle' };
  }
}

export function getCaseStatusConfig(status: CaseStatus): StatusConfig {
  switch (status) {
    case 'active':
      return { color: 'text-green-800', bgColor: 'bg-green-100', icon: 'activity' };
    case 'pending':
      return { color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: 'clock' };
    case 'closed':
      return { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: 'archive' };
    default:
      return { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: 'circle' };
  }
}

export function getTimelineStatusConfig(status: TimelineStatus): StatusConfig {
  switch (status) {
    case 'completed':
      return { color: 'text-green-800', bgColor: 'bg-green-100', icon: 'check-circle' };
    case 'in-progress':
      return { color: 'text-blue-800', bgColor: 'bg-blue-100', icon: 'loader' };
    case 'blocked':
      return { color: 'text-red-800', bgColor: 'bg-red-100', icon: 'x-circle' };
    default:
      return { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: 'circle' };
  }
}