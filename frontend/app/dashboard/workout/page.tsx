'use client';

import React from 'react';
import { Dumbbell, ChevronRight, Zap, Play, Calendar, FileText, Moon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTodaysPlan } from '@/hooks/useWorkout';

export default function WorkoutPage() {
  const { data: response, isLoading, isError } = useTodaysPlan();
  const todaysDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  if (isError || !response) return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-gray-500">Failed to load plan.</p></div>;

  const plan = response;
  const isRestDay = plan.is_rest_day;

  if (isRestDay) {
    return (
      <motion.div className="max-w-7xl mx-auto space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-gray-800">Today&apos;s Plan</h1><p className="text-gray-500 mt-1">{todaysDate}</p></div>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-sm p-10 text-center">
          <Moon size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Rest Day</h2>
          <p className="text-gray-500 max-w-md mx-auto">{plan.message || "Recovery is part of the plan!"}</p>
          <p className="text-sm text-gray-400 mt-2">{plan.day_of_week}</p>
        </motion.div>
      </motion.div>
    );
  }

  const diff = plan.difficulty || 'medium';
  const exercises = plan.exercises || [];

  return (
    <motion.div className="max-w-7xl mx-auto space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-gray-800">Today&apos;s AI Workout Plan</h1><p className="text-gray-500 mt-1">{todaysDate}</p></div>
        <div className="flex gap-3">
          <motion.button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}><Calendar size={18} /><span className="font-medium">View History</span></motion.button>
          <motion.button className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Play size={18} /><span>Start Workout</span></motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white" whileHover={{ scale: 1.01 }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{diff.charAt(0).toUpperCase() + diff.slice(1)} Training Day</h2>
            <div className="flex items-center gap-4 text-blue-100">
              <span className="flex items-center gap-1"><Dumbbell size={16} />{diff.charAt(0).toUpperCase() + diff.slice(1)}</span><span>•</span>
              <span>{Math.round(exercises.length * 8)}-{Math.round(exercises.length * 12)} min</span><span>•</span><span>{exercises.length} exercises</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Zap className="text-white" size={24} /></div>
        </div>
        <motion.div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex gap-3"><FileText size={20} className="flex-shrink-0 mt-0.5" /><div><h3 className="font-semibold mb-1">AI Coach Explanation</h3><p className="text-sm text-blue-50 leading-relaxed">{plan.explanation || ''}</p></div></div>
        </motion.div>
        {plan.source === 'gemini' && <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg text-xs text-blue-100"><Zap size={12} /> AI-Generated Plan</div>}
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-bold text-gray-800">Exercise Breakdown</h3><p className="text-sm text-gray-500 mt-1">Follow the exercises in order for optimal results</p></div>
        <div className="divide-y divide-gray-200">
          {exercises.map((exercise: any, index: number) => (
            <motion.div key={index} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }} whileHover={{ backgroundColor: 'rgba(249,250,251,1)', scale: 1.005 }} className="p-6 cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <motion.div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600 flex-shrink-0" whileHover={{ scale: 1.1, rotate: 5 }}>{index + 1}</motion.div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{exercise.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                      <div><p className="text-xs text-gray-500 mb-1">Sets</p><p className="font-semibold text-gray-800">{exercise.sets}</p></div>
                      <div><p className="text-xs text-gray-500 mb-1">Reps</p><p className="font-semibold text-gray-800">{exercise.reps}</p></div>
                      <div><p className="text-xs text-gray-500 mb-1">Rest</p><p className="font-semibold text-gray-800">{exercise.rest_seconds >= 60 ? `${Math.floor(exercise.rest_seconds / 60)}m ${exercise.rest_seconds % 60 > 0 ? `${exercise.rest_seconds % 60}s` : ''}`.trim() : `${exercise.rest_seconds}s`}</p></div>
                    </div>
                    {exercise.note && <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2"><p className="text-sm text-yellow-800"><span className="font-semibold">Note: </span>{exercise.note}</p></div>}
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-4" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-4">
        <motion.button className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>Regenerate Plan</motion.button>
        <motion.button className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}><Play size={20} />Begin Workout</motion.button>
      </motion.div>
    </motion.div>
  );
}