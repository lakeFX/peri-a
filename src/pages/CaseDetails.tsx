import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, DollarSign, AlertTriangle } from 'lucide-react';
import { useCaseStore } from '../store/caseStore';
import { usePatientStore } from '../store/patientStore';
import { useContactStore } from '../store/contactStore';
import { CaseTimeline } from '../components/cases/CaseTimeline';
import { format, differenceInDays } from 'date-fns';
import { cn } from '../lib/utils';

export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases } = useCaseStore();
  const { patients } = usePatientStore();
  const { contacts } = useContactStore();

  const caseItem = cases.find(c => c.id === id);
  const patient = caseItem ? patients.find(p => p.id === caseItem.patientId) : null;
  const attorney = caseItem ? contacts.find(c => c.id === caseItem.attorneyId) : null;

  if (!caseItem || !patient) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Case not found</p>
      </div>
    );
  }

  const daysUntilSOL = differenceInDays(
    new Date(caseItem.statuteOfLimitationsDate),
    new Date()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/cases')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Case #{caseItem.caseNumber}
            </h1>
            <p className="text-sm text-gray-500">
              Patient: {patient.firstName} {patient.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {daysUntilSOL <= 180 && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-1" />
              <span className="text-sm">{daysUntilSOL} days until SOL</span>
            </div>
          )}
          <span className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            caseItem.status === 'active'
              ? 'bg-green-100 text-green-800'
              : caseItem.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          )}>
            {caseItem.status}
          </span>
        </div>
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Accident Date</span>
          </div>
          <p className="text-lg font-semibold">
            {format(new Date(caseItem.accidentDate), 'MM/dd/yyyy')}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Initial Visit</span>
          </div>
          <p className="text-lg font-semibold">
            {format(new Date(caseItem.initialVisitDate), 'MM/dd/yyyy')}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-medium">Lien Amount</span>
          </div>
          <p className="text-lg font-semibold">
            ${caseItem.lienAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-gray-500 mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">SOL Date</span>
          </div>
          <p className="text-lg font-semibold">
            {format(new Date(caseItem.statuteOfLimitationsDate), 'MM/dd/yyyy')}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Case Timeline</h2>
        <CaseTimeline caseId={caseItem.id} />
      </div>
    </div>
  );
}