import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Shield, Key, Lock } from 'lucide-react';

export function SecuritySettings() {
  const { settings, updateSetting } = useAdminStore();

  const securitySettings = settings.filter((s) => s.category === 'security');

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Password Policy
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Password Length
              </label>
              <input
                type="number"
                min="8"
                max="32"
                value={
                  settings.find((s) => s.key === 'min_password_length')?.value || 12
                }
                onChange={(e) =>
                  updateSetting('min_password_length', parseInt(e.target.value))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Expiry (days)
              </label>
              <input
                type="number"
                min="30"
                max="365"
                value={
                  settings.find((s) => s.key === 'password_expiry_days')?.value ||
                  90
                }
                onChange={(e) =>
                  updateSetting('password_expiry_days', parseInt(e.target.value))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Multi-Factor Authentication
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={
                  settings.find((s) => s.key === 'mfa_required')?.value || false
                }
                onChange={(e) => updateSetting('mfa_required', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Require MFA for all users
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Session Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="1440"
                value={
                  settings.find((s) => s.key === 'session_timeout_minutes')?.value ||
                  30
                }
                onChange={(e) =>
                  updateSetting('session_timeout_minutes', parseInt(e.target.value))
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}