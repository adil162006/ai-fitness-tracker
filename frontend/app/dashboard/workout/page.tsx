'use client';

import React, { useState, useEffect } from 'react';
import { Dumbbell, ChevronRight, Zap, Play, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkoutPage() {
  const [todaysDate, setTodaysDate] = useState<string>('');

  useEffect(() => {
    setTodaysDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  const workoutType = "Push Day Focus";

  const todaysPlan = {
    date: todaysDate,
    type: workoutType,
    difficulty: "Intermediate",
    estimatedTime: "45-60 min",
    exercises: [
      {
        name: 'Barbell Squats',
        sets: 3,
        reps: 10,
        weight: '185 lbs',
        restTime: '90 sec',
        notes: 'Focus on depth and controlled descent'
      },
      {
        name: 'Bulgarian Split Squats',
        sets: 3,
        reps: '8/leg',
        weight: '50 lbs',
        restTime: '60 sec',
        notes: 'Keep torso upright, control the movement'
      },
      {
        name: 'Deadlifts',
        sets: 3,
        reps: 8,
        weight: '225 lbs',
        restTime: '120 sec',
        notes: 'Maintain neutral spine throughout'
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: 12,
        weight: '300 lbs',
        restTime: '60 sec',
        notes: 'Full range of motion, no lockout'
      },
      {
        name: 'Planks',
        sets: 3,
        reps: '60 sec',
        weight: 'Bodyweight',
        restTime: '45 sec',
        notes: 'Keep core tight, no sagging'
      }
    ],
    aiExplanation: "Today's workout targets your lower body with a focus on compound movements. Your recovery metrics show you're ready for heavier loads. The progressive overload on squats will help break through your current plateau."
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Today&apos;s AI Workout Plan</h1>
          <p className="text-gray-500 mt-1">{todaysDate}</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar size={18} />
            <span className="font-medium">View History</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={18} />
            <span>Start Workout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Workout Overview Card */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{workoutType}</h2>
            <div className="flex items-center gap-4 text-blue-100">
              <span className="flex items-center gap-1">
                <Dumbbell size={16} />
                {todaysPlan.difficulty}
              </span>
              <span>•</span>
              <span>{todaysPlan.estimatedTime}</span>
              <span>•</span>
              <span>{todaysPlan.exercises.length} exercises</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="text-white" size={24} />
          </div>
        </div>

        {/* AI Explanation */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-3">
            <FileText size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">AI Coach Explanation</h3>
              <p className="text-sm text-blue-50 leading-relaxed">
                {todaysPlan.aiExplanation}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Exercise List */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Exercise Breakdown</h3>
          <p className="text-sm text-gray-500 mt-1">
            Follow the exercises in order for optimal results
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {todaysPlan.exercises.map((exercise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
              whileHover={{ backgroundColor: "rgba(249,250,251,1)", scale: 1.005 }}
              className="p-6 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {/* Exercise Number */}
                  <motion.div
                    className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Exercise Details */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {exercise.name}
                    </h4>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Sets</p>
                        <p className="font-semibold text-gray-800">{exercise.sets}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Reps</p>
                        <p className="font-semibold text-gray-800">{exercise.reps}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Weight</p>
                        <p className="font-semibold text-gray-800">{exercise.weight}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Rest</p>
                        <p className="font-semibold text-gray-800">{exercise.restTime}</p>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                      <p className="text-sm text-yellow-800">
                        <span className="font-semibold">Note: </span>
                        {exercise.notes}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow Icon */}
                <ChevronRight
                  className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-4"
                  size={24}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <motion.button
          className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Regenerate Plan
        </motion.button>
        <motion.button
          className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Play size={20} />
          Begin Workout
        </motion.button>
      </motion.div>
    </motion.div>
  );
}