'use client';

import React from 'react';
import {
  Calendar,
  TrendingUp,
  Download,
  Share2,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Target,
  Activity,
  Moon,
  BarChart3
} from 'lucide-react';

const WeeklySummaryPage = () => {
  const weekRange = 'Oct 16 - Oct 22';

  const stats = {
    workoutsCompleted: { value: 5, target: 6 },
    consistencyScore: { value: 92, change: '+2%' },
    totalVolume: { value: '12,500', unit: 'lbs' },
    activeStreak: { value: 3, unit: 'Weeks' }
  };

  const dailyActivity = [
    { day: 'MON', volume: 2800, hasWorkout: true },
    { day: 'TUE', volume: 3200, hasWorkout: true },
    { day: 'WED', volume: 0, hasWorkout: false },
    { day: 'THU', volume: 2400, hasWorkout: true },
    { day: 'FRI', volume: 2100, hasWorkout: true },
    { day: 'SAT', volume: 2000, hasWorkout: true },
    { day: 'SUN', volume: 0, hasWorkout: false }
  ];

  const maxVolume = Math.max(...dailyActivity.map(d => d.volume));

  const aiAnalysis = {
    wins: [
      {
        title: 'THE WIN',
        message: "Your consistency on leg days has improved by 30%. You're maintaining a powerful level throughout the entire set.",
        icon: CheckCircle2,
        color: 'green'
      }
    ],
    gaps: [
      {
        title: 'THE GAP',
        message: "You missed your Thursday cardio session. Heart rate data suggests recovery was likely needed after Wednesday's intensity.",
        icon: AlertCircle,
        color: 'orange'
      }
    ],
    nextWeek: [
      {
        title: 'NEXT WEEK & FOCUS',
        message: 'Prioritize active recovery on Wednesday to maximize high intensity for Friday session.',
        icon: Target,
        color: 'blue'
      }
    ]
  };

  const recoveryCorrelation = {
    performance: 7.8,
    sleepQuality: 8.2,
    sleepScore: 84
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={18} />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Performance Review
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Weekly Summary</h1>
          <p className="text-gray-500 mt-1">{weekRange}</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Share2 size={18} />
            <span className="font-medium">Share Report</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
            <Download size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
            Workouts Completed
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">
              {stats.workoutsCompleted.value}
            </span>
            <span className="text-2xl text-gray-400 mb-1">
              /{stats.workoutsCompleted.target}
            </span>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${(stats.workoutsCompleted.value / stats.workoutsCompleted.target) * 100}%`
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
            Consistency Score
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">{stats.consistencyScore.value}%</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              {stats.consistencyScore.change}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Total Volume</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">{stats.totalVolume.value}</span>
            <span className="text-xl text-gray-500 mb-1">{stats.totalVolume.unit}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Active Streak</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">{stats.activeStreak.value}</span>
            <span className="text-xl text-gray-500 mb-1">{stats.activeStreak.unit}</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-orange-500">
            <Activity size={16} />
            <span className="text-sm font-semibold">On fire!</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Activity Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Daily Activity</h3>
                <p className="text-sm text-gray-500">Volume (kg) vs Time (min)</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Volume
                  <ChevronDown size={16} />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Oval
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-3 h-48">
              {dailyActivity.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-40">
                    {day.hasWorkout ? (
                      <div
                        className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer"
                        style={{
                          height: `${(day.volume / maxVolume) * 100}%`,
                          minHeight: day.volume > 0 ? '20%' : '0'
                        }}
                      ></div>
                    ) : (
                      <div className="w-full h-2 bg-gray-200 rounded"></div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Weekly Analysis */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-purple-600" size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">AI Weekly Analysis</h3>
            </div>

            <div className="space-y-6">
              {/* The Win */}
              {aiAnalysis.wins.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`text-${item.color}-600`} size={24} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold text-${item.color}-600 uppercase tracking-wide mb-2`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}

              {/* The Gap */}
              {aiAnalysis.gaps.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`text-${item.color}-600`} size={24} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold text-${item.color}-600 uppercase tracking-wide mb-2`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}

              {/* Next Week Focus */}
              {aiAnalysis.nextWeek.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`text-${item.color}-600`} size={24} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold text-${item.color}-600 uppercase tracking-wide mb-2`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recovery Correlation */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Recovery Correlation</h3>
            <p className="text-sm text-gray-600 mb-4">Performance vs. Sleep Quality</p>

            {/* Line Chart Placeholder */}
            <div className="h-32 mb-4 relative">
              <svg className="w-full h-full" viewBox="0 0 200 100">
                <polyline
                  points="0,80 30,60 60,40 90,35 120,30 150,45 180,40 200,30"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Performance</span>
                </div>
                <span className="font-bold text-gray-800">
                  {recoveryCorrelation.performance} avg/stop
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Moon size={16} className="text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">Sleep Quality</span>
                </div>
                <span className="font-bold text-gray-800">
                  {recoveryCorrelation.sleepQuality}h avg
                </span>
              </div>
            </div>
          </div>

          {/* Sleep Score */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="text-purple-500" size={20} />
              <h3 className="font-bold text-gray-800">Sleep Score</h3>
            </div>

            <div className="text-center py-4">
              <div className="text-4xl font-bold text-gray-800 mb-1">
                {recoveryCorrelation.sleepScore}/100
              </div>
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                OPTIMAL
              </div>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-sm text-purple-700">
                Your sleep consistency directly impacts your training performance. Keep it up!
              </p>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Full Report Ready</h3>
            <p className="text-sm text-white/90 mb-4">
              Includes authentic data and exercise history
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <Download size={18} />
              Download PDF
            </button>
            <button className="w-full mt-2 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl font-semibold transition-colors">
              View Detailed Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummaryPage;