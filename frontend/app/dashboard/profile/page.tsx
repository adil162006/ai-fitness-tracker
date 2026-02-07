'use client';

import React from 'react';
import {
  User,
  Mail,
  Camera,
  Ruler,
  Scale,
  Target,
  Award,
  Calendar,
  Shield,
  Key,
  LogOut,
  ChevronRight,
  Crown,
  CheckCircle2
} from 'lucide-react';

const ProfilePage = () => {
  const userInfo = {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: 'June 2023'
  };

  const fitnessMetrics = {
    age: 28,
    height: 182,
    weight: 78.5,
    heightUnit: 'cm',
    weightUnit: 'kg'
  };

  const goals = {
    fitnessGoal: 'Muscle Gain',
    experienceLevel: 'Intermediate',
    weeklyAvailability: '4 Days / week'
  };

  const stats = {
    totalWorkouts: 124,
    consistencyScore: 94
  };

  const securitySettings = [
    { label: 'Change Password', icon: Key, hasValue: false },
    { label: 'Two-Factor Auth', icon: Shield, hasValue: 'ON', valueColor: 'text-green-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 mt-1">
          Manage your personal information, physical metrics, and fitness goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="text-blue-600" size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
            </div>

            <div className="flex items-start gap-6 mb-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src="https://ui-avatars.com/api/?name=Alex+Johnson&background=3b82f6&color=fff&size=128"
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Camera size={16} className="text-white" />
                </button>
                <span className="text-xs text-gray-500 mt-2 block text-center">
                  Profile picture must be at least 200×200 pixels
                </span>
              </div>

              {/* Form Fields */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userInfo.fullName}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Metrics */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Ruler className="text-purple-600" size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Fitness Metrics</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={fitnessMetrics.age}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height ({fitnessMetrics.heightUnit})
                </label>
                <input
                  type="number"
                  value={fitnessMetrics.height}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight ({fitnessMetrics.weightUnit})
                </label>
                <input
                  type="number"
                  value={fitnessMetrics.weight}
                  step="0.1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Goals & Training */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="text-orange-600" size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Goals & Training</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fitness Goal
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>Muscle Gain</option>
                  <option>Weight Loss</option>
                  <option>Endurance</option>
                  <option>General Fitness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weekly Availability
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>3 Days / week</option>
                  <option>4 Days / week</option>
                  <option>5 Days / week</option>
                  <option>6 Days / week</option>
                  <option>7 Days / week</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
              Save Changes
            </button>
          </div>

          {/* Success Message (hidden by default) */}
          <div className="hidden bg-green-50 border border-green-200 rounded-xl p-4 items-center gap-3">
            <CheckCircle2 className="text-green-600" size={24} />
            <div>
              <h4 className="font-semibold text-green-900">Profile updated successfully!</h4>
              <p className="text-sm text-green-700">Your stats are up to date.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
                  Total Workouts
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-800">{stats.totalWorkouts}</p>
                  <span className="text-sm text-green-600 font-semibold">+12%</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">
                  Consistency Score
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-800">{stats.consistencyScore}%</p>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.consistencyScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">Member since {userInfo.joinDate}</p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <Award size={16} />
                View History
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-800">Security</h3>
            </div>

            <div className="space-y-2">
              {securitySettings.map((setting, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <setting.icon size={18} className="text-gray-600" />
                    <span className="font-medium text-gray-700">{setting.label}</span>
                  </div>
                  {setting.hasValue ? (
                    <span className={`text-sm font-semibold ${setting.valueColor}`}>
                      {setting.hasValue}
                    </span>
                  ) : (
                    <ChevronRight
                      size={18}
                      className="text-gray-400 group-hover:text-gray-600"
                    />
                  )}
                </button>
              ))}

              <button className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors group text-red-600">
                <div className="flex items-center gap-3">
                  <LogOut size={18} />
                  <span className="font-medium">Sign Out</span>
                </div>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Pro Plan Active */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Crown className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold">Pro Plan Active</h3>
                <p className="text-xs text-white/80">Plan Renews Dec 31, 2023</p>
              </div>
            </div>

            <button className="w-full py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;