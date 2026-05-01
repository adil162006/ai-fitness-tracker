'use client';

import React from 'react';
import { Calendar, TrendingUp, Download, Share2, ChevronDown, CheckCircle2, AlertCircle, Target, Activity, Moon, BarChart3, Loader2 } from 'lucide-react';
import { useWeeklySummary, useAllWeeklySummaries } from '@/hooks/useWeeklySummary';
import { useGetMe } from '@/hooks/useUser';

const WeeklySummaryPage = () => {
  const { data: summaryRes, isLoading } = useWeeklySummary();
  const { data: allSummariesRes } = useAllWeeklySummaries();
  const { user } = useGetMe();

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;

  const summary = summaryRes?.data?.summary;
  const logs = summaryRes?.data?.logs || [];
  const analysis = summaryRes?.data?.analysis;
  const allSummaries = allSummariesRes?.data || [];

  const weekStart = summary?.week_start ? new Date(summary.week_start) : new Date();
  const weekEnd = summary?.week_end ? new Date(summary.week_end) : new Date();
  const weekRange = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  const targetWorkouts = user?.weekly_availability || 4;
  const consistencyScore = summary?.consistency_score || 0;
  const activeStreak = allSummaries.filter((s: any) => s.consistency_score >= 80).length;

  const totalVolume = logs.reduce((sum: number, log: any) => {
    return sum + (log.exercises || []).reduce((eSum: number, ex: any) => {
      const weight = parseFloat(ex.weight) || 0;
      const reps = typeof ex.reps === 'number' ? ex.reps : parseInt(String(ex.reps)) || 0;
      return eSum + weight * reps * (ex.sets || 0);
    }, 0);
  }, 0);

  // Weekly activity map
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const monday = summary?.week_start ? new Date(summary.week_start) : new Date();
  const dailyActivity = dayLabels.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateStr = date.toISOString().split('T')[0];
    const log = logs.find((l: any) => l.date === dateStr);
    return { day: label, volume: log ? (log.duration_minutes || 0) * 50 : 0, hasWorkout: !!log };
  });
  const maxVolume = Math.max(...dailyActivity.map(d => d.volume), 1);

  const stats = {
    workoutsCompleted: { value: logs.length, target: targetWorkouts },
    consistencyScore: { value: consistencyScore, change: consistencyScore > 85 ? `+${consistencyScore - 85}%` : '+0%' },
    totalVolume: { value: Math.round(totalVolume).toLocaleString(), unit: 'kg' },
    activeStreak: { value: activeStreak, unit: 'Weeks' },
  };

  const aiWin = analysis?.win || (summary?.summary_text ? summary.summary_text.split('.').slice(0, 2).join('.') + '.' : 'No data yet.');
  const aiGap = analysis?.gap || (logs.some((l: any) => l.soreness_reported) ? `Soreness was reported after ${logs.filter((l: any) => l.soreness_reported).length} session(s). Consider adding active recovery.` : 'No gaps detected — outstanding!');
  const aiNextWeek = analysis?.next_week_focus || 'Prioritize progressive overload on compound lifts while maintaining recovery between sessions.';

  const recoveryCorrelation = { performance: (consistencyScore / 10).toFixed(1), sleepQuality: '7.8', sleepScore: Math.round(consistencyScore * 0.9) };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Calendar className="text-blue-600" size={18} /></div><span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Performance Review</span></div>
          <h1 className="text-3xl font-bold text-gray-800">Weekly Summary</h1><p className="text-gray-500 mt-1">{weekRange}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"><Share2 size={18} /><span className="font-medium">Share Report</span></button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"><Download size={18} /><span>Download PDF</span></button>
        </div>
      </div>

      {!summary && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-yellow-700">No weekly summary available yet. Log some workouts to generate one!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6"><p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Workouts Completed</p><div className="flex items-end gap-2"><span className="text-4xl font-bold text-gray-800">{stats.workoutsCompleted.value}</span><span className="text-2xl text-gray-400 mb-1">/{stats.workoutsCompleted.target}</span></div><div className="mt-3 w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${Math.min((stats.workoutsCompleted.value / stats.workoutsCompleted.target) * 100, 100)}%` }}></div></div></div>
        <div className="bg-white rounded-2xl shadow-sm p-6"><p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Consistency Score</p><div className="flex items-end gap-2"><span className="text-4xl font-bold text-gray-800">{stats.consistencyScore.value}%</span></div><div className="mt-3 flex items-center gap-2"><TrendingUp size={16} className="text-green-600" /><span className="text-sm font-semibold text-green-600">{stats.consistencyScore.change}</span></div></div>
        <div className="bg-white rounded-2xl shadow-sm p-6"><p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Total Volume</p><div className="flex items-end gap-2"><span className="text-4xl font-bold text-gray-800">{stats.totalVolume.value}</span><span className="text-xl text-gray-500 mb-1">{stats.totalVolume.unit}</span></div></div>
        <div className="bg-white rounded-2xl shadow-sm p-6"><p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Active Streak</p><div className="flex items-end gap-2"><span className="text-4xl font-bold text-gray-800">{stats.activeStreak.value}</span><span className="text-xl text-gray-500 mb-1">{stats.activeStreak.unit}</span></div><div className="mt-3 flex items-center gap-1 text-orange-500"><Activity size={16} /><span className="text-sm font-semibold">On fire!</span></div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Activity Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6"><div><h3 className="text-lg font-bold text-gray-800">Daily Activity</h3><p className="text-sm text-gray-500">Volume (estimated) per day</p></div><div className="flex items-center gap-2"><button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Volume<ChevronDown size={16} /></button></div></div>
            <div className="flex items-end justify-between gap-3 h-48">
              {dailyActivity.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-40">{day.hasWorkout ? <div className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer" style={{ height: `${(day.volume / maxVolume) * 100}%`, minHeight: day.volume > 0 ? '20%' : '0' }}></div> : <div className="w-full h-2 bg-gray-200 rounded"></div>}</div>
                  <span className="text-xs font-medium text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Weekly Analysis */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6"><div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"><BarChart3 className="text-purple-600" size={18} /></div><h3 className="text-lg font-bold text-gray-800">AI Weekly Analysis</h3></div>
            <div className="space-y-6">
              <div className="flex gap-4"><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle2 className="text-green-600" size={24} /></div><div><h4 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">THE WIN</h4><p className="text-gray-700 leading-relaxed">{aiWin}</p></div></div>
              <div className="flex gap-4"><div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0"><AlertCircle className="text-orange-600" size={24} /></div><div><h4 className="text-sm font-bold text-orange-600 uppercase tracking-wide mb-2">THE GAP</h4><p className="text-gray-700 leading-relaxed">{aiGap}</p></div></div>
              <div className="flex gap-4"><div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"><Target className="text-blue-600" size={24} /></div><div><h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">NEXT WEEK FOCUS</h4><p className="text-gray-700 leading-relaxed">{aiNextWeek}</p></div></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Recovery Correlation</h3><p className="text-sm text-gray-600 mb-4">Performance vs. Sleep Quality</p>
            <div className="h-32 mb-4 relative"><svg className="w-full h-full" viewBox="0 0 200 100"><polyline points="0,80 30,60 60,40 90,35 120,30 150,45 180,40 200,30" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" /></svg></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><Activity size={16} className="text-blue-500" /><span className="text-sm font-medium text-gray-700">Performance</span></div><span className="font-bold text-gray-800">{recoveryCorrelation.performance}/10</span></div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><Moon size={16} className="text-purple-500" /><span className="text-sm font-medium text-gray-700">Sleep Quality</span></div><span className="font-bold text-gray-800">{recoveryCorrelation.sleepQuality}h avg</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Full Report Ready</h3><p className="text-sm text-white/90 mb-4">Includes {logs.length} workout logs and AI analysis</p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"><Download size={18} />Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummaryPage;