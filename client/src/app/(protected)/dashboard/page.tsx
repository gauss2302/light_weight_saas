// src/app/(protected)/dashboard/page.tsx
'use client';

import { Header } from '@/components/dashboard/Header';
import { Footer } from '@/components/dashboard/Footer';
import { UserCard } from '@/components/dashboard/UserCard';
import TaskList from '@/components/tasks/TaskList';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {/* User Info Card */}
              <div className="col-span-1 flex flex-col items-center space-y-6">
                <UserCard />
                {/* Projects Button */}
                <div>
                  <button
                    onClick={() => router.push('/projects')}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    View Projects
                  </button>
                </div>
              </div>

              {/* Task Management Section */}
              <div className="col-span-1 md:col-span-3">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
