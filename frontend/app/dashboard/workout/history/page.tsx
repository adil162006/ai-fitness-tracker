'use client';

import React, { useState } from 'react';
import { Search, Calendar, TrendingUp, Eye, BarChart3, ChevronLeft, ChevronRight, Flame, Loader2 } from 'lucide-react';
import { useWorkoutHistory } from '@/hooks/useWorkout';

const WorkoutHistoryPage = () => {
  const [page, setPage] = useState(1);
  const [intensityFilter, setIntensityFilter] = useState<string | undefined>(undefined);
  const { data: response, isLoading, isError } = useWorkoutHistory(page, 10, intensityFilter);

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  if (isError || !response?.data) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-gray-500">Failed to load workout history.</p></div>;

  const { logs, stats, pagination } = response.data;

  const workoutHistory = (logs || []).map((log: any) => {
    const dateObj = new Date(log.date);
    const createdObj = new Date(log.created_at);
    return {
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
      time: createdObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      title: `${log.exercises?.[0]?.name || 'Workout'} Session`,
      exercises: (log.exercises || []).map((ex: any) => `${ex.name} (${ex.sets}x${ex.reps})`).join(', '),
      intensity: log.intensity === 'high' ? 'HIGH INTENSITY' : 'MEDIUM INTENSITY',
      intensityColor: log.intensity === 'high' ? 'red' : 'orange',
      duration: `${log.duration_minutes} min`,
      badge: log.soreness_reported && log.intensity === 'high' ? 'PR' : null,
      notes: log.notes,
    };
  });

  // Volume distribution from logs on this page
  const pushEx = ['Bench Press', 'Barbell Bench Press', 'Incline Dumbbell Press', 'Overhead Press', 'Dips', 'Tricep Dips', 'Cable Flyes'];
  const pullEx = ['Pull-ups', 'Barbell Rows', 'Seated Cable Row', 'Face Pulls', 'Barbell Curls'];
  const legEx = ['Barbell Squats', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Leg Press', 'Standing Calf Raises', 'Deadlifts', 'Lunges'];
  const countCat = (names: string[]) => { let t = 0; (logs || []).forEach((l: any) => (l.exercises || []).forEach((ex: any) => { if (names.some(n => ex.name?.includes(n) || n.includes(ex.name))) t++; })); return t; };
  const pc = countCat(pushEx), plc = countCat(pullEx), lc = countCat(legEx);
  const tot = pc + plc + lc || 1;
  const progressCharts = [
    { label: 'Push', value: Math.round((pc / tot) * 100), color: 'bg-blue-500' },
    { label: 'Pull', value: Math.round((plc / tot) * 100), color: 'bg-purple-500' },
    { label: 'Legs', value: Math.round((lc / tot) * 100), color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div><h1 className="text-3xl font-bold text-gray-800">Workout History</h1><p className="text-gray-500 mt-1">Track your progress and review past sessions</p></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"><Calendar className="text-blue-600" size={20} /></div><span className="text-sm text-gray-600 font-medium">Total Workouts</span></div><div className="mt-3"><span className="text-3xl font-bold text-gray-800">{stats?.totalWorkouts || 0}</span><span className="text-sm text-green-600 ml-2">logged</span></div></div>
        <div className="bg-white rounded-2xl shadow-sm p-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center"><TrendingUp className="text-purple-600" size={20} /></div><span className="text-sm text-gray-600 font-medium">Avg. Intensity</span></div><div className="mt-3"><span className="text-3xl font-bold text-gray-800">{stats?.avgIntensityPercent || 0}%</span><span className="text-sm text-gray-500 ml-2">high intensity</span></div></div>
        <div className="bg-white rounded-2xl shadow-sm p-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center"><Flame className="text-orange-600" size={20} /></div><span className="text-sm text-gray-600 font-medium">Active Streak</span></div><div className="mt-3"><span className="text-3xl font-bold text-gray-800">{stats?.activeStreak || 0}</span><span className="text-gray-500 ml-2">Days</span></div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search exercises..." className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" /></div>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => setIntensityFilter(undefined)} className={`px-4 py-2 rounded-lg text-sm font-medium ${!intensityFilter ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>All Sessions</button>
              <button onClick={() => setIntensityFilter('high')} className={`px-4 py-2 rounded-lg text-sm font-medium ${intensityFilter === 'high' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>High Intensity</button>
            </div>
          </div>

          {workoutHistory.map((workout: any, index: number) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2"><h3 className="text-lg font-bold text-gray-800">{workout.title}</h3>{workout.badge && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">{workout.badge}</span>}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-500"><span className="font-medium">{workout.date}</span><span>•</span><span>{workout.day}</span><span>•</span><span>{workout.time}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${workout.intensityColor === 'red' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{workout.intensity}</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Eye size={18} className="text-gray-600" /></button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{workout.exercises}</p>
              {workout.notes && <p className="text-xs text-gray-500 italic mb-3">&quot;{workout.notes}&quot;</p>}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100"><span className="text-sm font-medium text-gray-600">{workout.duration}</span></div>
            </div>
          ))}

          {pagination && (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between">
                <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"><ChevronLeft size={18} /><span className="font-medium">Previous</span></button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).slice(0, 5).map(p => (
                    <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-lg font-medium ${p === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>{p}</button>
                  ))}
                </div>
                <button onClick={() => setPage(Math.min(pagination.totalPages, page + 1))} disabled={page >= pagination.totalPages} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"><span className="font-medium">Next</span><ChevronRight size={18} /></button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6"><BarChart3 className="text-blue-500" size={20} /><h3 className="font-bold text-gray-800">Volume Distribution</h3></div>
            <div className="space-y-6">
              {progressCharts.map((chart, index) => (
                <div key={index}><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">{chart.label}</span><span className="text-sm font-bold text-gray-800">{chart.value}%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${chart.color} transition-all`} style={{ width: `${chart.value}%` }}></div></div></div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Based on {stats?.totalWorkouts || 0} logged workout sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistoryPage;