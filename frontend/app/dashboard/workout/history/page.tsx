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
import { mockWorkoutLogs, mockAiInsights } from '@/lib/mockData';

const WorkoutHistoryPage = () => {
  // ── EER-based data from workout_logs ───────────────────────────────────
  const totalWorkouts = mockWorkoutLogs.length;

  // Average intensity
  const highIntensityCount = mockWorkoutLogs.filter((l) => l.intensity === 'high').length;
  const avgIntensityPercent = Math.round((highIntensityCount / totalWorkouts) * 100);

  // Active streak (consecutive days with logs)
  const sortedDates = mockWorkoutLogs
    .map((l) => l.date)
    .sort()
    .reverse();
  let activeStreak = 1;
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i]);
    const prev = new Date(sortedDates[i + 1]);
    const diffDays = Math.round((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 2) {
      activeStreak++;
    } else {
      break;
    }
  }

  const stats = {
    totalWorkouts,
    avgIntensity: `${avgIntensityPercent}%`,
    activeStreak,
    streakLabel: 'Days',
  };

  // Map workout_logs to history cards
  const workoutHistory = mockWorkoutLogs.map((log) => {
    const dateObj = new Date(log.date);
    const createdObj = new Date(log.created_at);

    // Find a matching AI insight for this date
    const relatedInsight = mockAiInsights.find(
      (ai) => ai.generated_for_date === log.date || ai.generated_for_date === log.date
    );

    return {
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
      time: createdObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      title: `${log.exercises[0]?.name || 'Workout'} Session`,
      exercises: log.exercises.map((ex) => `${ex.name} (${ex.sets}x${ex.reps})`).join(', '),
      intensity: log.intensity === 'high' ? 'HIGH INTENSITY' : 'MEDIUM INTENSITY',
      intensityColor: log.intensity === 'high' ? 'red' : 'orange',
      duration: `${log.duration_minutes} min`,
      aiInsight: relatedInsight?.content?.substring(0, 60) + '…' || (log.soreness_reported
        ? 'Soreness reported — recovery recommended'
        : 'Solid session — performance on track'),
      badge: log.soreness_reported && log.intensity === 'high' ? 'PR' : null,
      notes: log.notes,
    };
  });

  // Strength progress from workout_logs exercises
  const pushExercises = ['Bench Press', 'Barbell Bench Press', 'Incline Dumbbell Press', 'Overhead Press', 'Dips', 'Tricep Dips', 'Cable Flyes'];
  const pullExercises = ['Pull-ups', 'Barbell Rows', 'Seated Cable Row', 'Face Pulls', 'Barbell Curls'];
  const legExercises = ['Barbell Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Leg Press', 'Standing Calf Raises', 'Deadlifts', 'Lunges'];

  const countCategory = (names: string[]) => {
    let total = 0;
    mockWorkoutLogs.forEach((log) => {
      log.exercises.forEach((ex) => {
        if (names.some((n) => ex.name.includes(n) || n.includes(ex.name))) {
          total++;
        }
      });
    });
    return total;
  };

  const pushCount = countCategory(pushExercises);
  const pullCount = countCategory(pullExercises);
  const legCount = countCategory(legExercises);
  const totalExCount = pushCount + pullCount + legCount || 1;

  const progressCharts = [
    { label: 'Push', value: Math.round((pushCount / totalExCount) * 100), color: 'bg-blue-500' },
    { label: 'Pull', value: Math.round((pullCount / totalExCount) * 100), color: 'bg-purple-500' },
    { label: 'Legs', value: Math.round((legCount / totalExCount) * 100), color: 'bg-green-500' },
  ];

  // AI Coach tip from latest insight
  const latestInsight = mockAiInsights[mockAiInsights.length - 1];

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
            <span className="text-sm text-green-600 ml-2">logged</span>
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
            <span className="text-sm text-gray-500 ml-2">high intensity</span>
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
                All Sessions
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                High Intensity
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

              {workout.notes && (
                <p className="text-xs text-gray-500 italic mb-3">&quot;{workout.notes}&quot;</p>
              )}

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
              <h3 className="font-bold text-gray-800">Volume Distribution</h3>
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
              Based on {totalWorkouts} logged workout sessions
            </p>
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
                  {latestInsight?.content || 'Keep your training consistent to see best results!'}
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