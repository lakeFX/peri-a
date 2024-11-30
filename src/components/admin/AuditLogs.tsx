import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { format } from 'date-fns';
import { Activity, User, Settings, Shield } from 'lucide-react';

export function AuditLogs() {
  const { auditLogs } = useAdminStore();

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'user':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'settings':
        return <Settings className="h-5 w-5 text-green-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Audit Logs</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {auditLogs.map((log) => (
            <li key={log.id} className="px-4 py-4">
              <div className="flex items-center">
                {getActionIcon(log.action)}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {log.action} - {log.resource}
                  </p>
                  <div className="flex space-x-4">
                    <p className="text-sm text-gray-500">
                      User: {log.userId}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                    </p>
                    {log.ipAddress && (
                      <p className="text-sm text-gray-500">
                        IP: {log.ipAddress}
                      </p>
                    )}
                  </div>
                  {log.details && (
                    <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </li>
          ))}
          {auditLogs.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No audit logs found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}