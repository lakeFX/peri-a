import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PatientList } from '../components/patients/PatientList';
import { PatientIntake } from '../components/patients/PatientIntake';

export default function Patients() {
  const [showIntake, setShowIntake] = useState(false);
  const location = useLocation();
  const [filter, setFilter] = useState(location.state?.filter || 'all');

  // Update filter when navigating from dashboard
  useEffect(() => {
    if (location.state?.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Patient Records</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Patients
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'active'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Patients
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowIntake(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Patient
        </button>
      </div>

      {showIntake ? (
        <PatientIntake />
      ) : (
        <PatientList filter={filter} />
      )}
    </div>
  );
}