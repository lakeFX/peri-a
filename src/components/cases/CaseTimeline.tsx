import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { useMilestoneStore } from '../../store/milestoneStore';
import { cn } from '../../lib/utils';
import type { CaseMilestone, MilestoneStatus } from '../../types/timeline';

interface CaseTimelineProps {
  caseId: string;
}

export function CaseTimeline({ caseId }: CaseTimelineProps) {
  const { milestones, completeRequiredItem, extendTimeline, initializeMilestones } = useMilestoneStore();

  // Initialize milestones if not already done
  useEffect(() => {
    initializeMilestones(caseId);
  }, [caseId, initializeMilestones]);

  const caseMilestones = milestones.filter(m => m.caseId === caseId)
    .sort((a, b) => {
      // Sort by week first
      if (a.week !== b.week) return a.week - b.week;
      // Then sort by gate (A, B, C come before numbers)
      if (typeof a.gate === 'string' && typeof b.gate === 'number') return -1;
      if (typeof a.gate === 'number' && typeof b.gate === 'string') return 1;
      return 0;
    });

  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'blocked':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200';
      case 'blocked':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

      {/* Milestones */}
      <div className="space-y-8">
        {caseMilestones.map((milestone) => (
          <div key={milestone.id} className="relative">
            {/* Timeline dot */}
            <div className={cn(
              'absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white',
              milestone.status === 'completed' ? 'bg-green-500' :
              milestone.status === 'in-progress' ? 'bg-blue-500' :
              milestone.status === 'blocked' ? 'bg-red-500' :
              'bg-gray-300'
            )} />

            {/* Milestone content */}
            <div className="ml-16">
              <div className={cn(
                'p-4 rounded-lg border',
                getStatusColor(milestone.status)
              )}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Gate {milestone.gate}: {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">Week {milestone.week}</p>
                    {milestone.description && (
                      <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(milestone.status)}
                    {milestone.isExtensionPoint && milestone.status === 'completed' && (
                      <button
                        onClick={() => extendTimeline(caseId, 
                          typeof milestone.gate === 'number' ? milestone.gate : 0
                        )}
                        className="px-3 py-1 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 rounded-md"
                      >
                        Extend Timeline
                      </button>
                    )}
                  </div>
                </div>

                {/* Required items */}
                <div className="mt-4 space-y-2">
                  {milestone.requiredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.status === 'completed'}
                          onChange={() => completeRequiredItem(milestone.id, item.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span>{item.title}</span>
                        {item.optional && (
                          <span className="text-xs text-gray-500">(Optional)</span>
                        )}
                      </div>
                      {item.completedDate && (
                        <span className="text-xs text-gray-500">
                          {format(new Date(item.completedDate), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}