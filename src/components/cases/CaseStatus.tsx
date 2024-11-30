import React from 'react';
import { useCaseStore } from '../../store/caseStore';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '../../lib/utils';
import type { CaseStatus } from '../../types/case';

interface CaseStatusProps {
  caseId: string;
}

export default function CaseStatus({ caseId }: CaseStatusProps) {
  const { cases, updateCase } = useCaseStore();
  const caseItem = cases.find(c => c.id === caseId);

  if (!caseItem) return null;

  const daysUntilSOL = differenceInDays(
    new Date(caseItem.statuteOfLimitationsDate),
    new Date()
  );

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'settled':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Case Status</h3>
          <select
            value={caseItem.status}
            onChange={(e) => updateCase(caseId, { status: e.target.value as CaseStatus })}
            className={cn(
              'mt-1 block w-full rounded-full px-3 py-1 text-sm font-medium',
              getStatusColor(caseItem.status)
            )}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="settled">Settled</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Statute of Limitations</h3>
          <div className="mt-1 flex items-center">
            {daysUntilSOL <= 180 ? (
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            ) : (
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
            )}
            <span className="text-sm">
              {format(new Date(caseItem.statuteOfLimitationsDate), 'MMM d, yyyy')}
              {daysUntilSOL <= 180 && (
                <span className="ml-2 text-red-600">
                  ({daysUntilSOL} days remaining)
                </span>
              )}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Lien Amount</h3>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            ${caseItem.lienAmount.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}