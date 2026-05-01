'use client';

import React, { useState } from 'react';
import { Calendar, Dumbbell, Plus, Trash2, CheckCircle2, History, Loader2 } from 'lucide-react';
import { useTodaysPlan, useCreateWorkoutLog } from '@/hooks/useWorkout';

interface Exercise { name: string; sets: number; reps: number; weight: number; intensity: string; }

export default function WorkoutLogPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([{ name: 'Bench Press', sets: 3, reps: 10, weight: 80, intensity: 'Medium' }]);
  const [duration, setDuration] = useState(45);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [soreness, setSoreness] = useState(false);
  const [notes, setNotes] = useState('');
  const [mounted, setMounted] = useState(false);

  const { data: planData, isLoading: planLoading } = useTodaysPlan();
  const { mutate: createLog, isPending: isSaving } = useCreateWorkoutLog();

  React.useEffect(() => { setMounted(true); }, []);

  const planExercises = planData && !planData.is_rest_day ? (planData.exercises || []) : [];
  const todaysPlan = {
    date: mounted ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
    exercises: planExercises.map((ex: any) => ({ name: ex.name, sets: `${ex.sets} sets x ${ex.reps} reps`, weight: ex.rest_seconds })),
  };

  const addExercise = () => setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0, intensity: 'Low' }]);
  const removeExercise = (index: number) => setExercises(exercises.filter((_, i) => i !== index));
  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const handleSave = () => {
    const validExercises = exercises.filter(e => e.name.trim());
    if (validExercises.length === 0) return;
    createLog({
      exercises: validExercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight })),
      duration_minutes: duration,
      intensity,
      soreness_reported: soreness,
      notes,
    }, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setExercises([{ name: '', sets: 0, reps: 0, weight: 0, intensity: 'Low' }]);
        setNotes('');
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold text-gray-800">Log Your Workout</h1><p className="text-gray-500 mt-1">Type naturally or use the manual form below to record your progress</p></div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"><History size={18} /><span className="font-medium">View History</span></button>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="text-green-600" size={24} />
          <div><h4 className="font-semibold text-green-900">Workout logged successfully!</h4><p className="text-sm text-green-700">Great job staying consistent!</p></div>
          <button onClick={() => setShowSuccess(false)} className="ml-auto text-green-600 hover:text-green-700">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"><Dumbbell className="text-gray-600" size={18} /></div><h3 className="text-lg font-bold text-gray-800">Structured Log Form</h3></div>
              <span className="text-sm text-gray-500">MANUAL ENTRY</span>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-gray-700">Exercise {index + 1}</span>
                    {exercises.length > 1 && <button onClick={() => removeExercise(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Exercise Name *</label><input type="text" placeholder="e.g. Squats" value={exercise.name} onChange={(e) => updateExercise(index, 'name', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Sets</label><input type="number" placeholder="3" value={exercise.sets || ''} onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Reps</label><input type="number" placeholder="10" value={exercise.reps || ''} onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label><input type="number" placeholder="60" value={exercise.weight || ''} onChange={(e) => updateExercise(index, 'weight', parseInt(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" /></div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addExercise} className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 font-medium"><Plus size={20} />Add Another Exercise</button>

            {/* Duration, Intensity, Soreness, Notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label><input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value) || 0)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Intensity</label><select value={intensity} onChange={(e) => setIntensity(e.target.value as any)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
              <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={soreness} onChange={(e) => setSoreness(e.target.checked)} className="w-5 h-5 text-blue-500 rounded" /><span className="text-sm font-medium text-gray-700">Soreness Reported</span></label></div>
            </div>
            <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-2">Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the workout feel?" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none h-20 resize-none" /></div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => { setExercises([{ name: '', sets: 0, reps: 0, weight: 0, intensity: 'Low' }]); setNotes(''); }} className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Clear Form</button>
            <button onClick={handleSave} disabled={isSaving} className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              {isSaving ? <><Loader2 className="w-5 h-5 animate-spin" />Saving...</> : 'Save Workout'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4"><Calendar className="text-blue-500" size={20} /><h3 className="font-bold text-gray-800">Today&apos;s AI Plan</h3></div>
            <p className="text-sm text-gray-500 mb-4">{todaysPlan.date}</p>
            {planLoading ? <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div> : (
              <div className="space-y-3">
                {todaysPlan.exercises.map((exercise: any, index: number) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-1"><div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">{index + 1}</div><h4 className="font-semibold text-gray-800 text-sm">{exercise.name}</h4></div>
                    <p className="text-xs text-gray-600 ml-8">{exercise.sets}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}