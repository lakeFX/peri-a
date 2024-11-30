import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Link2, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import { useCaseStore } from '../store/caseStore';
import { useContactStore } from '../store/contactStore';
import { format } from 'date-fns';
import { CaseMilestones } from '../components/cases/CaseMilestones';
import { cn } from '../lib/utils';

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = usePatientStore();
  const { cases } = useCaseStore();
  const { contacts } = useContactStore();
  
  const patient = patients.find(p => p.id === id);
  const patientCase = cases.find(c => c.patientId === id);
  const attorney = contacts.find(c => c.id === patientCase?.attorneyId);

  if (!patient) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Patient not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/patients')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              Patient ID: {patient.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            patient.caseStatus === 'active'
              ? 'bg-green-100 text-green-800'
              : patient.caseStatus === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          )}>
            {patient.caseStatus}
          </span>
        </div>
      </div>

      {/* Key Dates and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">DOL (Date of Loss)</span>
          </div>
          <p className="text-lg font-semibold">
            {patientCase?.accidentDate ? format(new Date(patientCase.accidentDate), 'MM/dd/yyyy') : 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">DOI (Initial Encounter)</span>
          </div>
          <p className="text-lg font-semibold">
            {patientCase?.initialVisitDate ? format(new Date(patientCase.initialVisitDate), 'MM/dd/yyyy') : 'N/A'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Visit Count</span>
          </div>
          <p className="text-lg font-semibold">
            {patient.visitCount || 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-medium">Lien Amount</span>
          </div>
          <p className="text-lg font-semibold">
            ${patientCase?.lienAmount?.toLocaleString() || '0'}
          </p>
        </div>
      </div>

      {/* Associated Contacts */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Associated Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attorney && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Attorney</h3>
                <Link2 className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm">{attorney.name}</p>
              <p className="text-sm text-gray-500">{attorney.organization}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">{attorney.contactInfo.phone}</p>
                <p className="text-sm">{attorney.contactInfo.email}</p>
              </div>
            </div>
          )}
          {/* Add similar blocks for other associated contacts */}
        </div>
      </div>

      {/* Case Timeline */}
      {patientCase && (
        <div className="bg-white shadow rounded-lg p-6">
          <CaseMilestones caseId={patientCase.id} />
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Keep existing basic info sections */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(patient.dateOfBirth), 'MMMM d, yyyy')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">
                    {patient.gender}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Rest of the existing sections */}
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
}