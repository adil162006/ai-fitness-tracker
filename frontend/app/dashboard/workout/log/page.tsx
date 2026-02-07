'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Dumbbell,
  Plus,
  Trash2,
  CheckCircle2,
  History,
  Mic
} from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  intensity: string;
}

export default function WorkoutLogPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: 'Bench Press', sets: 3, reps: 10, weight: 185, intensity: 'Medium' }
  ]);

  const todaysPlan = {
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    exercises: [
      { name: 'Barbell Squats', sets: '3 sets x 10 reps', weight: '185lbs' },
      { name: 'Deadlifts', sets: '3 sets x 8 reps', weight: '225lbs' },
      { name: 'Bulgarian Split Squats', sets: '3 sets x 8/leg', weight: '50lbs' },
    ]
  };

  const quickStats = {
    weeklyStreak: '5 Days',
    caloriesBurned: '342 est'
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0, intensity: 'Low' }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Log Your Workout</h1>
          <p className="text-gray-500 mt-1">
            Type naturally or use the manual form below to record your progress
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <History size={18} />
          <span className="font-medium">View History</span>
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="text-green-600" size={24} />
          <div>
            <h4 className="font-semibold text-green-900">Workout logged successfully!</h4>
            <p className="text-sm text-green-700">Great job staying consistent!</p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="ml-auto text-green-600 hover:text-green-700"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Natural Language Input */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles className="text-blue-600" size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">AI Natural Language Input</h3>
            </div>

            <div className="relative">
              <textarea
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:outline-none"
                placeholder="Describe your workout in your own words (e.g., 'I did 3 sets of 10 bench press at 60kg and then 15 minutes on the treadmill')"
              />
              <button className="absolute bottom-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Mic size={20} className="text-gray-600" />
              </button>
            </div>

            <button className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Convert to Log
            </button>
          </div>

          {/* Structured Log Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Dumbbell className="text-gray-600" size={18} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Structured Log Form</h3>
              </div>
              <span className="text-sm text-gray-500">MANUAL ENTRY</span>
            </div>

            {/* Exercise Entries */}
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-gray-700">Exercise {index + 1}</span>
                    {exercises.length > 1 && (
                      <button
                        onClick={() => removeExercise(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exercise Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Squats"
                        value={exercise.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sets
                      </label>
                      <input
                        type="number"
                        placeholder="3"
                        value={exercise.sets || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reps
                      </label>
                      <input
                        type="number"
                        placeholder="10"
                        value={exercise.reps || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        placeholder="60"
                        value={exercise.weight || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intensity
                    </label>
                    <select
                      value={exercise.intensity}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addExercise}
              className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Another Exercise
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              Clear Form
            </button>
            <button
              onClick={() => setShowSuccess(true)}
              className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
            >
              Save Workout
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's AI Plan */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-800">Today&apos;s AI Plan</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{todaysPlan.date}</p>

            <div className="space-y-3">
              {todaysPlan.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {exercise.name}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 ml-8">
                    {exercise.sets} • {exercise.weight}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors">
              Apply Plan to Form
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Weekly Streak</p>
                <p className="text-2xl font-bold text-gray-800">
                  {quickStats.weeklyStreak}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Calories Est.</p>
                <p className="text-2xl font-bold text-gray-800">
                  {quickStats.caloriesBurned}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}