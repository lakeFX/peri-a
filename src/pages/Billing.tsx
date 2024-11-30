import React, { useState } from 'react';
import { Plus, Filter, TrendingUp } from 'lucide-react';
import BillingList from '../components/billing/BillingList';
import { BillingModal } from '../components/billing/BillingModal';
import { BillingAnalytics } from '../components/billing/BillingAnalytics';

export default function Billing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Billing Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Billing Item
          </button>
        </div>
      </div>

      {showAnalytics && <BillingAnalytics />}
      <BillingList />
      
      <BillingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  );
}