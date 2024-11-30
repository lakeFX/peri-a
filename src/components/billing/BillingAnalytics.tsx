import React from 'react';
import { useBillingStore } from '../../store/billingStore';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

export function BillingAnalytics() {
  const { items } = useBillingStore();

  // Calculate analytics
  const analytics = {
    totalBilled: items.reduce((sum, item) => sum + item.amount, 0),
    totalPaid: items.reduce((sum, item) => sum + item.paid, 0),
    totalPending: items.filter((item) => item.status === 'pending').length,
    collectionRate:
      (items.reduce((sum, item) => sum + item.paid, 0) /
        items.reduce((sum, item) => sum + item.amount, 0)) *
      100,
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Billed</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${analytics.totalBilled.toFixed(2)}
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
              ${analytics.totalPaid.toFixed(2)}
            </p>
          </div>
          <CheckCircle className="h-8 w-8 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Claims</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {analytics.totalPending}
            </p>
          </div>
          <Clock className="h-8 w-8 text-gray-400" />
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