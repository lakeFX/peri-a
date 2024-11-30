import React from 'react';
import { useAdminStore } from '../../store/adminStore';

export function IntegrationSettings() {
  const { settings, updateSetting } = useAdminStore();

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Microsoft Integration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Azure AD Tenant ID
            </label>
            <input
              type="text"
              value={settings.find((s) => s.key === 'azure_tenant_id')?.value || ''}
              onChange={(e) => updateSetting('azure_tenant_id', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              SharePoint Site URL
            </label>
            <input
              type="text"
              value={settings.find((s) => s.key === 'sharepoint_url')?.value || ''}
              onChange={(e) => updateSetting('sharepoint_url', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Microsoft Lists Site ID
            </label>
            <input
              type="text"
              value={settings.find((s) => s.key === 'lists_site_id')?.value || ''}
              onChange={(e) => updateSetting('lists_site_id', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}