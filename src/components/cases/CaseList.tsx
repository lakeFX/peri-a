import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCaseStore } from '../../store/caseStore';
import { format } from 'date-fns';
import { FileText, AlertTriangle, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CaseListProps {
  filter?: 'all' | 'active';
}

export function CaseList({ filter = 'all' }: CaseListProps) {
  const { cases, setSelectedCase } = useCaseStore();
  const navigate = useNavigate();

  const filteredCases = filter === 'active' 
    ? cases.filter(c => c.status === 'active')
    : cases;

  const handleCaseClick = (caseId: string) => {
    const selectedCase = cases.find((c) => c.id === caseId);
    if (selectedCase) {
      setSelectedCase(selectedCase);
      navigate(`/cases/${caseId}/details`);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {filter === 'active' ? 'Active Cases' : 'All Cases'}
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredCases.map((caseItem) => {
          const daysUntilSOL = Math.ceil(
            (new Date(caseItem.statuteOfLimitationsDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <li
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem.id)}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Case #{caseItem.caseNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      Accident Date: {format(new Date(caseItem.accidentDate), 'MM/dd/yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {daysUntilSOL <= 180 && (
                    <div className="flex items-center text-amber-600">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span className="text-sm">{daysUntilSOL} days until SOL</span>
                    </div>
                  )}
                  {caseItem.lienAmount > 0 && (
                    <div className="flex items-center text-green-600">
                      <DollarSign className="h-5 w-5 mr-1" />
                      <span className="text-sm">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(caseItem.lienAmount)}
                      </span>
                    </div>
                  )}
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      caseItem.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : caseItem.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    )}
                  >
                    {caseItem.status}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
        {filteredCases.length === 0 && (
          <li className="px-4 py-8 text-center text-gray-500">
            No cases found
          </li>
        )}
      </ul>
    </div>
  );
}