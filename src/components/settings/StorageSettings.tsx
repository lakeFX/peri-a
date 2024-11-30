import React from 'react';
import { useAdminStore } from '../../store/adminStore';

export function StorageSettings() {
  const { settings, updateSetting } = useAdminStore();

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Storage Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Azure Storage Account Name
            </label>
            <input
              type="text"
              value={
                settings.find((s) => s.key === 'azure_storage_account')?.value || ''
              }
              onChange={(e) => updateSetting('azure_storage_account', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Azure Storage Container
            </label>
            <input
              type="text"
              value={
                settings.find((s) => s.key === 'azure_storage_container')?.value || ''
              }
              onChange={(e) =>
                updateSetting('azure_storage_container', e.target.value)
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Document Retention Policy
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Retention Period (days)
                </label>
                <input
                  type="number"
                  value={
                    settings.find((s) => s.key === 'document_retention_days')
                      ?.value || 365
                  }
                  onChange={(e) =>
                    updateSetting('document_retention_days', parseInt(e.target.value))
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Archive Storage Path
                </label>
                <input
                  type="text"
                  value={
                    settings.find((s) => s.key === 'archive_storage_path')?.value ||
                    ''
                  }
                  onChange={(e) =>
                    updateSetting('archive_storage_path', e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}