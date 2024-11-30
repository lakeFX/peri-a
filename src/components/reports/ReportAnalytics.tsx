import React from 'react';
import { useBillingStore } from '../../store/billingStore';
import { usePatientStore } from '../../store/patientStore';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

export function ReportAnalytics() {
  const { items: billingItems } = useBillingStore();
  const { patients } = usePatientStore();

  const analytics = {
    totalBilled: billingItems.reduce((sum, item) => sum + item.amount, 0),
    totalCollected: billingItems.reduce((sum, item) => sum + item.paid, 0),
    activePatients: patients.filter(p => p.caseStatus === 'active').length,
    collectionRate: (billingItems.reduce((sum, item) => sum + item.paid, 0) / 
                    billingItems.reduce((sum, item) => sum + item.amount, 0)) * 100,
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Billed</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${analytics.totalBilled.toLocaleString()}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Collected</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${analytics.totalCollected.toLocaleString()}
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Patients</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {analytics.activePatients}
            </p>
          </div>
          <Users className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Collection Rate</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {analytics.collectionRate.toFixed(1)}%
            </p>
          </div>
          {analytics.collectionRate >= 80 ? (
            <TrendingUp className="h-8 w-8 text-green-500" />
          ) : (
            <TrendingDown className="h-8 w-8 text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}