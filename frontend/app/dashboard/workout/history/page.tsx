'use client';

import React from 'react';
import {
  Search,
  Calendar,
  TrendingUp,
  Eye,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';

const WorkoutHistoryPage = () => {
  const stats = {
    totalWorkouts: 48,
    avgIntensity: '85%',
    activeStreak: 12,
    streakLabel: 'Days'
  };

  const workoutHistory = [
    {
      date: 'Oct 24, 2023',
      day: 'Thursday',
      time: '7:30 AM',
      title: 'Morning Strength Session',
      exercises: 'Bench Press (5x5), Squats (3x10), Pull-ups (3x10)',
      intensity: 'HIGH INTENSITY',
      intensityColor: 'red',
      duration: '52 min',
      aiInsight: 'Strength increased by 7% compared to last session',
      badge: 'PR'
    },
    {
      date: 'Oct 22, 2023',
      day: 'Tuesday',
      time: '5:30 PM',
      title: 'Lower Body & Core',
      exercises: 'Deadlifts (5x5), Leg Press (3x10), Planks (3x60s)',
      intensity: 'MEDIUM INTENSITY',
      intensityColor: 'orange',
      duration: '48 min',
      aiInsight: 'Form has improved throughout the session',
      badge: null
    },
    {
      date: 'Oct 20, 2023',
      day: 'Sunday',
      time: '9:00 AM',
      title: 'Upper Body Focus',
      exercises: 'Overhead Press (4x8), Dips (3x12), Rows (4x10)',
      intensity: 'HIGH INTENSITY',
      intensityColor: 'red',
      duration: '45 min',
      aiInsight: 'Excellent recovery - ready for next session',
      badge: null
    },
    {
      date: 'Oct 18, 2023',
      day: 'Friday',
      time: '6:15 PM',
      title: 'Full Body Circuit',
      exercises: 'Squats (3x12), Push-ups (3x15), Lunges (3x10/leg)',
      intensity: 'MEDIUM INTENSITY',
      intensityColor: 'orange',
      duration: '40 min',
      aiInsight: 'Consistent performance across all sets',
      badge: null
    }
  ];

  const progressCharts = [
    { label: 'Push', value: 65, color: 'bg-blue-500' },
    { label: 'Pull', value: 50, color: 'bg-purple-500' },
    { label: 'Legs', value: 25, color: 'bg-green-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Workout History</h1>
        <p className="text-gray-500 mt-1">Track your progress and review past sessions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <span className="text-sm text-gray-600 font-medium">Total Workouts</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-800">{stats.totalWorkouts}</span>
            <span className="text-sm text-green-600 ml-2">+6 this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <span className="text-sm text-gray-600 font-medium">Avg. Intensity</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-800">{stats.avgIntensity}</span>
            <span className="text-sm text-gray-500 ml-2">Optimized for growth</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="text-orange-600" size={20} />
            </div>
            <span className="text-sm text-gray-600 font-medium">Active Streak</span>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-800">{stats.activeStreak}</span>
            <span className="text-gray-500 ml-2">{stats.streakLabel}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search exercises..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
                Last 30 Days
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Last 90 Days
              </button>
            </div>
          </div>

          {/* Workout Cards */}
          {workoutHistory.map((workout, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{workout.title}</h3>
                    {workout.badge && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                        {workout.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="font-medium">{workout.date}</span>
                    <span>•</span>
                    <span>{workout.day}</span>
                    <span>•</span>
                    <span>{workout.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      workout.intensityColor === 'red'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {workout.intensity}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{workout.exercises}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">{workout.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp size={16} className="text-blue-500" />
                  <span className="text-blue-600 font-medium">{workout.aiInsight}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronLeft size={18} />
                <span className="font-medium">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 bg-blue-500 text-white rounded-lg font-medium">
                  1
                </button>
                <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">
                  2
                </button>
                <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">
                  3
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium">Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Strength Progress */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-800">Strength Progress</h3>
            </div>

            <div className="space-y-6">
              {progressCharts.map((chart, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{chart.label}</span>
                    <span className="text-sm font-bold text-gray-800">{chart.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${chart.color} transition-all`}
                      style={{ width: `${chart.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Your strength volume has increased by 10% compared to last week
            </p>
          </div>

          {/* Volume Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Volume Distribution</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Push</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-10">65%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pull</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-10">50%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Legs</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-10">25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Coach Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-white" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">AI Coach Tip!</h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  You haven&apos;t hit Legs in 4 days. Tomorrow is a great time to focus on Squats to maintain your overall balance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistoryPage;