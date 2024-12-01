import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useBillingStore } from '../../store/billingStore';
import { BillingModal } from './BillingModal';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import type { BillingItem, BillingStatus } from '../../types/billing';
import { BillingAnalytics } from './BillingAnalytics'; // Named import
export default function BillingList() {
  const { items, updateStatus, addPayment } = useBillingStore();
  const [selectedItem, setSelectedItem] = useState<BillingItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStatusColor = (status: BillingStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'billed':
        return 'bg-blue-100 text-blue-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'appealed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Billing Items</h3>
      </div>
      
      {/* Render the BillingAnalytics component */}
      <BillingAnalytics />

      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.serviceType}
                  </p>
                  <p className="text-sm text-gray-500">
                    Service Date: {format(new Date(item.serviceDate), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusColor(item.status)
                  )}
                >
                  {item.status}
                </span>
                <span className="text-lg font-medium text-gray-900">
                  ${item.amount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-1 flex items-center space-x-2">
                {item.icdCodes.map((code) => (
                  <span
                    key={code.code}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {code.code}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setIsEditModalOpen(true);
                }}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Edit
              </button>
              {item.status === 'billed' && (
                <button
                  onClick={() => addPayment(item.id, item.balance)}
                  className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Record Payment
                </button>
              )}
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="px-4 py-8 text-center text-gray-500">
            No billing items found
          </li>
        )}
      </ul>

      {selectedItem && (
        <BillingModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          mode="edit"
          billingItem={selectedItem}
        />
      )}
    </div>
  );
}