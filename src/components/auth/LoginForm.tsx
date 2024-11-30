import React from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../../lib/auth/useAuth';

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Lock className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to PERI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use your Microsoft account to sign in
          </p>
        </div>

        <div>
          <button
            onClick={login}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}