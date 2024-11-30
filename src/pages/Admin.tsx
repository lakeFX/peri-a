import React, { useState } from 'react';
import { Users, Settings, Shield, Activity } from 'lucide-react';
import { UserManagement } from '../components/admin/UserManagement';
import { SystemSettings } from '../components/admin/SystemSettings';
import { SecuritySettings } from '../components/admin/SecuritySettings';
import { AuditLogs } from '../components/admin/AuditLogs';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'users' | 'settings' | 'security' | 'audit'>(
    'users'
  );

  const tabs = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'settings', name: 'System Settings', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'audit', name: 'Audit Logs', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${
                      activeTab === tab.id
                        ? 'text-primary-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'settings' && <SystemSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'audit' && <AuditLogs />}
      </div>
    </div>
  );
}