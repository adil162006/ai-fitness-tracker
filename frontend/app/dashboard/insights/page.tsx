'use client';

import React from 'react';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Calendar,
  Zap
} from 'lucide-react';

const InsightsPage = () => {
  const recoveryScore = 92;
  const recoveryStatus = 'High';
  const recoveryColor = 'blue';

  const growthTrends = [
    { label: 'Volume Lifted', value: '+28%', color: 'blue' },
    { label: 'Sleep Quality', value: '+12%', color: 'green' },
    { label: 'Resting HRV', value: '-2%', color: 'red' }
  ];

  const insights = [
    {
      type: 'CONSISTENCY',
      icon: CheckCircle2,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      time: '2d ago',
      title: 'Consistency Achievement',
      message: "You've hit your goals for 12 days straight! Your morning workouts seem to be more effective, showing a 15% higher intensity on average."
    },
    {
      type: 'MILD FATIGUE',
      icon: AlertTriangle,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      time: '4h ago',
      title: 'Mild Fatigue Detected',
      message: 'Late-night screen time has impacted your sleep latency by 22 minutes. AI suggests shifting your wind-down routine 30 minutes earlier to maintain recovery.'
    },
    {
      type: 'MOTIVATION',
      icon: Zap,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      time: 'Yesterday',
      title: 'Motivation Boost',
      message: "You are only 3 sessions away from achieving your 'Iron Month' badge. Your volume in bench press has increased by 10kg over the last 30 days."
    }
  ];

  const customizeMetrics = [
    'Sleep Quality',
    'Resting HRV',
    'Training Volume',
    'Recovery Time'
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI Insights</h1>
          <p className="text-gray-500 mt-1">
            Deep analysis of your performance metrics and physiological data
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
          <RefreshCw size={18} />
          <span>Refresh Insights</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recovery Status Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="text-green-600" size={18} />
              </div>
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                The Big Picture
              </span>
            </div>

            <div className="flex items-center gap-8">
              {/* Circular Progress */}
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - recoveryScore / 100)}`}
                    className="text-blue-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800">{recoveryScore}</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Recovery Status: {recoveryStatus}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  You&apos;re in excellent condition for a strength session today. Your HRV and sleep
                  quality correlate with high explosive readiness.
                </p>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
                    Start Peak Workout
                  </button>
                  <button className="px-6 py-2.5 border-2 border-gray-300 hover:bg-gray-50 rounded-xl font-semibold text-gray-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Trends */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Growth Trends</h3>
              </div>
              <span className="text-sm text-gray-500">90 DAYS</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {growthTrends.map((trend, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">{trend.label}</p>
                  <p
                    className={`text-2xl font-bold ${
                      trend.color === 'blue'
                        ? 'text-blue-600'
                        : trend.color === 'green'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {trend.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Your strength volume has increased by 10%</span>{' '}
                compared to last week. Keep maintaining this progressive overload!
              </p>
            </div>
          </div>

          {/* All Insights */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm">
                  All Insights
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">
                  Fatigue
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">
                  Recovery
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors">
                  Consistency
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {insights.map((insight, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 ${insight.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <insight.icon className={insight.iconColor} size={24} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          {insight.type}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{insight.time}</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{insight.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{insight.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Customize Metrics */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Customize Metrics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select which metrics you want to track for deeper insights
            </p>

            <div className="space-y-2">
              {customizeMetrics.map((metric, index) => (
                <label key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    defaultChecked={index < 2}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{metric}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pro Coaching Card */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Pro Coaching</h3>
            <p className="text-sm text-white/90 mb-4 leading-relaxed">
              Get AI 1-on-1 reviews of these insights with a human coach.
            </p>
            <button className="w-full py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Upgrade Now
            </button>
          </div>

          {/* Schedule Next Check-in */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-800">Next Check-In</h3>
            </div>

            <div className="text-center py-4">
              <div className="text-3xl font-bold text-gray-800 mb-1">In 4h</div>
              <p className="text-sm text-gray-500">Weekly progress analysis</p>
            </div>

            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors">
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;