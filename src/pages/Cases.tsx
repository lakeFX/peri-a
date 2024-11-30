import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { CaseList } from '../components/cases/CaseList';
import { CaseTimeline } from '../components/cases/CaseTimeline';
import { useCaseStore } from '../store/caseStore';
import { useMilestoneStore } from '../store/milestoneStore';

export default function Cases() {
  const location = useLocation();
  const [filter, setFilter] = useState(location.state?.filter || 'all');
  const [showTimeline, setShowTimeline] = useState(false);
  const { selectedCase } = useCaseStore();
  const { initializeMilestones } = useMilestoneStore();

  useEffect(() => {
    if (location.state?.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedCase) {
      initializeMilestones(selectedCase.id);
      setShowTimeline(true);
    } else {
      setShowTimeline(false);
    }
  }, [selectedCase, initializeMilestones]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Personal Injury Cases</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Cases
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'active'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Cases
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filter Cases
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
            <Plus className="h-5 w-5 mr-2" />
            New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={showTimeline ? 'lg:col-span-1' : 'lg:col-span-2'}>
          <CaseList filter={filter} />
        </div>
        {showTimeline && selectedCase && (
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Case Timeline - {selectedCase.caseNumber}
              </h2>
              <CaseTimeline caseId={selectedCase.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}