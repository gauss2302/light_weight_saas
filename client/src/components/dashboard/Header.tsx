// src/components/dashboard/Header.tsx
'use client';

import { useAuth } from '@/lib/context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-gray-900">
              Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user?.email}</span>
            <button
              onClick={logout}
              className="inline-flex items-center rounded-md border border-transparent bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
