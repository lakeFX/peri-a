import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../../store/patientStore';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface PatientListProps {
  filter?: 'all' | 'active';
}

export function PatientList({ filter = 'all' }: PatientListProps) {
  const { patients, setSelectedPatient } = usePatientStore();
  const navigate = useNavigate();

  const filteredPatients = filter === 'active' 
    ? patients.filter(p => p.caseStatus === 'active')
    : patients;

  const handlePatientClick = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      navigate(`/patients/${patientId}/details`);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {filter === 'active' ? 'Active Patients' : 'All Patients'}
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredPatients.map((patient) => (
          <li
            key={patient.id}
            onClick={() => handlePatientClick(patient.id)}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-primary-600">
                      {patient.firstName[0]}
                      {patient.lastName[0]}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    DOB: {format(new Date(patient.dateOfBirth), 'MM/dd/yyyy')}
                    {patient.visitCount !== undefined && (
                      <span className="ml-2">• Visits: {patient.visitCount}</span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <span
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    patient.caseStatus === 'active'
                      ? 'bg-green-100 text-green-800'
                      : patient.caseStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  )}
                >
                  {patient.caseStatus}
                </span>
              </div>
            </div>
          </li>
        ))}
        {filteredPatients.length === 0 && (
          <li className="px-4 py-8 text-center text-gray-500">
            No patients found
          </li>
        )}
      </ul>
    </div>
  );
}