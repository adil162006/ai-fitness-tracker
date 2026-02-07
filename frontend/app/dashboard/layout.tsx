'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Dumbbell,
  LayoutDashboard,
  Activity,
  Calendar,
  TrendingUp,
  User,
  Menu,
  Bell,
  LogOut
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Dumbbell, label: 'Workout', path: '/dashboard/workout' },
    { icon: Calendar, label: 'Log', path: '/dashboard/workout/log' },
    { icon: TrendingUp, label: 'Insights', path: '/dashboard/insights' },
    { icon: Activity, label: 'Weekly Summary', path: '/dashboard/summary' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Dumbbell className="text-white" size={24} />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-xl text-gray-800">FitAI</span>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pro Plan Banner */}
        {sidebarOpen && (
          <div className="p-4 m-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
            <p className="text-sm font-semibold mb-1">PRO PLAN</p>
            <p className="text-xs mb-3 opacity-90">
              Unlock all AI features and advanced tracking
            </p>
            <button className="w-full bg-white text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        )}

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Welcome Message */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, Alex</h1>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Alex+Smith&background=3b82f6&color=fff"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </div>

              {/* Logout */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}