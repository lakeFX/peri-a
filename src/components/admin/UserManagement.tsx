import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { UserPlus, Key, Shield, Lock } from 'lucide-react';
import type { AdminUser, UserRole, UserStatus } from '../../types/admin';

export function UserManagement() {
  const { users, addUser, updateUser, resetPassword, toggleMFA } = useAdminStore();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const roles: UserRole[] = ['admin', 'staff', 'provider', 'billing'];
  const statuses: UserStatus[] = ['active', 'inactive', 'pending'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Users</h2>
        <button
          onClick={() => setIsAddingUser(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MFA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.mfaEnabled ? (
                    <Shield className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString()
                    : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => resetPassword(user.id)}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    <Key className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleMFA(user.id, !user.mfaEnabled)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Shield className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}