'use client';

import React, { useState, useMemo } from 'react';
import {
  User,
  Camera,
  Ruler,
  Target,
  Award,
  Shield,
  Key,
  LogOut,
  ChevronRight,
  Crown,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useGetMe, useUpdateUser } from '@/hooks/useUser';
import { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, isLoading: userLoading } = useGetMe();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  // Derive initial form data from user using useMemo (no cascading renders)
  const initialFormData = useMemo(() => ({
    fullName: user?.name || '',
    age: user?.age || 0,
    height: user?.height_cm || 0,
    weight: user?.weight_kg || 0,
    fitnessGoal: (user?.fitness_goal || '') as 'lose-weight' | 'gain-muscle' | 'stay-fit' | 'improve-strength' | 'endurance',
    experienceLevel: (user?.experience_level || '') as 'beginner' | 'intermediate' | 'advanced',
    weeklyAvailability: (user?.weekly_availability || '') as '1-2' | '3-4' | '5-6' | 'daily'
  }), [user]);

  const [formData, setFormData] = useState(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync form data when user data changes (after fetch or update)
  React.useEffect(() => {
    if (user) {
      setFormData(initialFormData);
    }
  }, [initialFormData, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUser(formData, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    });
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const stats = {
    totalWorkouts: 124,
    consistencyScore: 94
  };

  const securitySettings = [
    { label: 'Change Password', icon: Key, hasValue: false },
    { label: 'Two-Factor Auth', icon: Shield, hasValue: 'ON', valueColor: 'text-green-600' }
  ];

  return (
    <>
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your personal information, physical metrics, and fitness goals
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
                  <div className="relative flex flex-col items-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || 'User')}&background=3b82f6&color=fff&size=128`}
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                    />
                    <button 
                      type="button"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Camera size={16} className="text-white" />
                    </button>
                    <span className="text-xs text-gray-500 mt-2 text-center max-w-[96px]">
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
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          disabled={isUpdating}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                          disabled
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
                      name="age"
                      value={formData.age || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      disabled={isUpdating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      disabled={isUpdating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ''}
                      onChange={handleChange}
                      step="0.1"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      disabled={isUpdating}
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
                    <select 
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      disabled={isUpdating}
                    >
                      <option value="lose-weight">Lose Weight</option>
                      <option value="gain-muscle">Gain Muscle</option>
                      <option value="stay-fit">Stay Fit</option>
                      <option value="improve-strength">Improve Strength</option>
                      <option value="endurance">Endurance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      disabled={isUpdating}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Availability
                    </label>
                    <select
                      name="weeklyAvailability"
                      value={formData.weeklyAvailability}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      disabled={isUpdating}
                    >
                      <option value="1-2">1-2 days / week</option>
                      <option value="3-4">3-4 days / week</option>
                      <option value="5-6">5-6 days / week</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-4">
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" size={24} />
                  <div>
                    <h4 className="font-semibold text-green-900">Profile updated successfully!</h4>
                    <p className="text-sm text-green-700">Your stats are up to date.</p>
                  </div>
                </div>
              )}
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
                  <p className="text-xs text-gray-500">Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</p>
                  <button type="button" className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
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
                      type="button"
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

                  <button 
                    type="button"
                    className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors group text-red-600"
                  >
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

                <button 
                  type="button"
                  className="w-full py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                >
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;