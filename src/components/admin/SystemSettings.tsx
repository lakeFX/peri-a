import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Settings, Bell, Mail, Database } from 'lucide-react';

export function SystemSettings() {
  const { settings, updateSetting } = useAdminStore();

  const systemSettings = settings.filter((s) => s.category === 'billing' || s.category === 'notifications');

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Billing Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Lien Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.find((s) => s.key === 'default_lien_rate')?.value || 0}
                onChange={(e) => updateSetting('default_lien_rate', parseFloat(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Auto-Generate Invoice Numbers
              </label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  checked={settings.find((s) => s.key === 'auto_invoice_numbers')?.value || false}
                  onChange={(e) => updateSetting('auto_invoice_numbers', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-500">
                  Automatically generate sequential invoice numbers
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Invoice Prefix
              </label>
              <input
                type="text"
                value={settings.find((s) => s.key === 'invoice_prefix')?.value || ''}
                onChange={(e) => updateSetting('invoice_prefix', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., INV-"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.find((s) => s.key === 'notify_appointments')?.value || false}
                    onChange={(e) => updateSetting('notify_appointments', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Appointment reminders
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.find((s) => s.key === 'notify_documents')?.value || false}
                    onChange={(e) => updateSetting('notify_documents', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Document uploads
                  </span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.find((s) => s.key === 'notify_billing')?.value || false}
                    onChange={(e) => updateSetting('notify_billing', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Billing updates
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reminder Lead Time (hours)
              </label>
              <input
                type="number"
                min="1"
                max="72"
                value={settings.find((s) => s.key === 'reminder_lead_time')?.value || 24}
                onChange={(e) => updateSetting('reminder_lead_time', parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            System Maintenance
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Auto-Archive Period (days)
              </label>
              <input
                type="number"
                min="30"
                max="365"
                value={settings.find((s) => s.key === 'auto_archive_days')?.value || 90}
                onChange={(e) => updateSetting('auto_archive_days', parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Database Backup Frequency
              </label>
              <select
                value={settings.find((s) => s.key === 'backup_frequency')?.value || 'daily'}
                onChange={(e) => updateSetting('backup_frequency', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}