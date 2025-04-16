'use client';

import { useAuth } from '@/lib/context/AuthContext';

export function UserCard() {
  const { user } = useAuth();

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <span className="text-xl font-medium text-indigo-600">
            {user?.username?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {user?.username}
          </h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Member since</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {new Date(user?.createdAt || '').toLocaleDateString()}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Active
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
