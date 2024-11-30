import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { Shield } from 'lucide-react';
import { APISettings } from '../components/settings/APISettings';
import { IntegrationSettings } from '../components/settings/IntegrationSettings';
import { StorageSettings } from '../components/settings/StorageSettings';

export default function Settings() {
  const { settings } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Shield className="h-5 w-5 mr-2" />
          Administrator Access Only
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <APISettings />
        <IntegrationSettings />
        <StorageSettings />
      </div>
    </div>
  );
}