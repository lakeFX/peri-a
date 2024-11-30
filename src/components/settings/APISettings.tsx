import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Eye, EyeOff } from 'lucide-react';

export function APISettings() {
  const { settings, updateSetting } = useAdminStore();
  const [showKeys, setShowKeys] = useState(false);

  const apiSettings = settings.filter((s) => s.category === 'integration');

  const handleUpdate = (id: string, value: string) => {
    updateSetting(id, value);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          API Configuration
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OpenAI API Key
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showKeys ? 'text' : 'password'}
                value={settings.find((s) => s.key === 'openai_api_key')?.value || ''}
                onChange={(e) => handleUpdate('openai_api_key', e.target.value)}
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => setShowKeys(!showKeys)}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
              >
                {showKeys ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              OpenAI Organization ID
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              value={settings.find((s) => s.key === 'openai_org_id')?.value || ''}
              onChange={(e) => handleUpdate('openai_org_id', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}