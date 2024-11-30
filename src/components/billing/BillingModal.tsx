import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useBillingStore } from '../../store/billingStore';
import { suggestICDCodes } from '../../services/icdService';
import type { BillingItem, ICDCode } from '../../types/billing';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  billingItem?: BillingItem;
}

export function BillingModal({
  isOpen,
  onClose,
  mode,
  billingItem,
}: BillingModalProps) {
  const { addBillingItem, updateBillingItem } = useBillingStore();
  const [formData, setFormData] = useState<Partial<BillingItem>>(
    billingItem || {
      status: 'pending',
      paymentMethod: 'insurance',
      amount: 0,
      adjustments: 0,
      paid: 0,
      balance: 0,
      icdCodes: [],
    }
  );

  useEffect(() => {
    if (billingItem) {
      setFormData(billingItem);
    }
  }, [billingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      addBillingItem(formData as Omit<BillingItem, 'id' | 'createdAt' | 'updatedAt'>);
    } else if (mode === 'edit' && billingItem) {
      updateBillingItem(billingItem.id, formData);
    }
    onClose();
  };

  const handleAmountChange = (amount: number) => {
    setFormData({
      ...formData,
      amount,
      balance: amount - (formData.paid || 0) - (formData.adjustments || 0),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {mode === 'create' ? 'New Billing Item' : 'Edit Billing Item'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Type
              </label>
              <input
                type="text"
                value={formData.serviceType || ''}
                onChange={(e) =>
                  setFormData({ ...formData, serviceType: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Date
              </label>
              <input
                type="date"
                value={formData.serviceDate?.split('T')[0] || ''}
                onChange={(e) =>
                  setFormData({ ...formData, serviceDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount || ''}
                onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                value={formData.paymentMethod || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentMethod: e.target.value as BillingItem['paymentMethod'],
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="insurance">Insurance</option>
                <option value="lien">Lien</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="check">Check</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              ICD Codes
            </label>
            <div className="mt-1 space-y-2">
              {formData.icdCodes?.map((code, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={code.code}
                    onChange={(e) => {
                      const newCodes = [...(formData.icdCodes || [])];
                      newCodes[index] = {
                        ...newCodes[index],
                        code: e.target.value,
                      };
                      setFormData({ ...formData, icdCodes: newCodes });
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="ICD Code"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newCodes = formData.icdCodes?.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, icdCodes: newCodes });
                    }}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newCodes = [
                    ...(formData.icdCodes || []),
                    { code: '', version: 'ICD-10', description: '' },
                  ];
                  setFormData({ ...formData, icdCodes: newCodes });
                }}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Add ICD Code
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              {mode === 'create' ? 'Create Billing Item' : 'Update Billing Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}