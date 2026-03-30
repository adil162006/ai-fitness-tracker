'use client';

import React, { useEffect, useState } from 'react';
import {
  Dumbbell,
  Activity,
  Flame,
  Clock,
  TrendingUp,
  ChevronRight,
  Zap,
  Target,
  Calendar as CalendarIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getTodaysPlan,
  getThisWeekLogs,
  getWeeklyDurationHours,
  getWeeklyActivityMap,
  mockAiInsights,
  mockMeals,
  mockUser,
} from '@/lib/mockData';

// Animated counter component
const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
      setCount(0);
      return;
    }
    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}</>;
};

export default function DashboardPage() {
  // ── EER-based data ─────────────────────────────────────────────────────
  const todaysPlan = getTodaysPlan();
  const thisWeekLogs = getThisWeekLogs();
  const weeklyDurationHours = getWeeklyDurationHours();
  const weeklyActivity = getWeeklyActivityMap();

  // Derive stats from workout_logs
  const weeklyCalories = thisWeekLogs.reduce(
    (sum, log) => sum + log.duration_minutes * 8, // rough kcal estimate
    0
  );
  const totalVolumeKg = thisWeekLogs.reduce((sum, log) => {
    return (
      sum +
      log.exercises.reduce((eSum, ex) => {
        const weight = parseFloat(ex.weight) || 0;
        const reps = typeof ex.reps === 'number' ? ex.reps : parseInt(String(ex.reps)) || 0;
        return eSum + weight * reps * ex.sets;
      }, 0)
    );
  }, 0);

  // AI coach tip from the latest ai_insight
  const latestInsight = mockAiInsights[mockAiInsights.length - 1];
  const aiCoachTip = latestInsight?.content || '';

  // Nutrition from latest meal
  const latestMeal = mockMeals[0];
  const proteinMatch = latestMeal?.ai_feedback?.match(/~(\d+)g protein/);
  const proteinCurrent = proteinMatch ? parseInt(proteinMatch[1]) : 0;
  const proteinTarget = Math.round(mockUser.weight_kg * 2.2); // 2.2g/kg target

  const weeklyStats = [
    {
      label: 'Weekly Calories',
      value: weeklyCalories.toLocaleString(),
      unit: 'kcal',
      icon: Flame,
    },
    {
      label: 'Time Spent',
      value: String(weeklyDurationHours),
      unit: 'hours',
      icon: Clock,
    },
    {
      label: 'Volume Moved',
      value: (totalVolumeKg / 1000).toFixed(1),
      unit: 'tons',
      icon: TrendingUp,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Plan - Large Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Today&apos;s Plan</h2>
              <p className="text-sm text-gray-500">
                {todaysPlan
                  ? `${todaysPlan.difficulty.charAt(0).toUpperCase() + todaysPlan.difficulty.slice(1)} • ${todaysPlan.exercises.length} exercises`
                  : 'Rest Day'}
              </p>
            </div>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Workout
            </motion.button>
          </div>

          {/* Exercise List */}
          <div className="space-y-3">
            {todaysPlan?.exercises.slice(0, 3).map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-semibold text-gray-600">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
                    <p className="text-sm text-gray-500">
                      {exercise.sets} sets x {exercise.reps} reps • {exercise.weight}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                  size={20}
                />
              </motion.div>
            ))}
          </div>

          {/* AI Coach Tip */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">AI Coach Tip</h4>
                <p className="text-sm text-blue-700">{aiCoachTip}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Cards */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Fatigue & Recovery */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-800">Fatigue & Recovery</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Recovery Status</span>
                  <span className="text-lg font-bold text-green-600">
                    85% - Great
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Based on your recent workout logs ({thisWeekLogs.length} sessions this week),
                it&apos;s a great day for a{' '}
                {todaysPlan?.difficulty || 'moderate'} session.
              </p>
            </div>
          </motion.div>

          {/* Nutrition AI */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="text-orange-500" size={20} />
              <h3 className="font-bold text-gray-800">Nutrition AI</h3>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Protein Goal</span>
                <span className="text-sm font-semibold text-gray-800">
                  {proteinCurrent}/{proteinTarget}g
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-orange-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((proteinCurrent / proteinTarget) * 100, 100)}%`,
                  }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
                />
              </div>
              {latestMeal && (
                <p className="text-xs text-gray-500 mt-2">
                  Last: {latestMeal.meal_text.substring(0, 50)}…
                </p>
              )}
            </div>
          </motion.div>

          {/* Activity Log Calendar */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-800">Activity Log</h3>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weeklyActivity.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-2">{item.day}</div>
                  <div
                    className={`w-8 h-8 rounded-lg mx-auto ${
                      item.hasWorkout ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Weekly Stats - Bottom Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {weeklyStats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-sm p-6"
            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <stat.icon className="text-blue-500" size={20} />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {stat.label}
              </span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-bold text-gray-800">
                {stat.value}
              </span>
              <span className="text-gray-500 ml-2">{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Next AI Check-In */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-sm p-6 text-white"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Next AI Check-In</h3>
            <p className="text-white/80 text-sm">
              Time for your weekly progress analysis
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">In 4h</div>
            <motion.button
              className="mt-2 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}