'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompleteProfile } from '@/hooks/useUser';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function CompleteProfilePage() {
  const router = useRouter();
  const { mutate: completeProfile, isPending } = useCompleteProfile();

  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    fitnessGoal: '' as 'lose-weight' | 'gain-muscle' | 'stay-fit' | 'improve-strength' | 'endurance' | '',
    experienceLevel: '' as 'beginner' | 'intermediate' | 'advanced' | '',
    weeklyAvailability: '' as '1-2' | '3-4' | '5-6' | 'daily' | ''
  });

  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    fitnessGoal?: string;
    experienceLevel?: string;
    weeklyAvailability?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.age || Number(formData.age) < 10 || Number(formData.age) > 100) {
      newErrors.age = 'Please enter a valid age (10-100)';
    }

    if (!formData.height || Number(formData.height) < 100 || Number(formData.height) > 250) {
      newErrors.height = 'Please enter a valid height (100-250 cm)';
    }

    if (!formData.weight || Number(formData.weight) < 30 || Number(formData.weight) > 300) {
      newErrors.weight = 'Please enter a valid weight (30-300 kg)';
    }

    if (!formData.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal';
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }

    if (!formData.weeklyAvailability) {
      newErrors.weeklyAvailability = 'Please select your weekly availability';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    completeProfile(
      {
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        fitnessGoal: formData.fitnessGoal as 'lose-weight' | 'gain-muscle' | 'stay-fit' | 'improve-strength' | 'endurance',
        experienceLevel: formData.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
        weeklyAvailability: formData.weeklyAvailability as '1-2' | '3-4' | '5-6' | 'daily'
      },
      {
        onSuccess: () => {
          // Navigate to dashboard after successful profile completion
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        }
      }
    );
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">AI Fitness Tracker</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Help us personalize your fitness plan for better results.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="25"
                      className={`w-full px-4 py-2.5 border ${
                        errors.age ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-400`}
                      disabled={isPending}
                    />
                    {errors.age && (
                      <p className="mt-1 text-xs text-red-600">{errors.age}</p>
                    )}
                  </div>

                  {/* Height */}
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Height (cm) *
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 180"
                      className={`w-full px-4 py-2.5 border ${
                        errors.height ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-400`}
                      disabled={isPending}
                    />
                    {errors.height && (
                      <p className="mt-1 text-xs text-red-600">{errors.height}</p>
                    )}
                  </div>

                  {/* Weight */}
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 75"
                      step="0.1"
                      className={`w-full px-4 py-2.5 border ${
                        errors.weight ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-400`}
                      disabled={isPending}
                    />
                    {errors.weight && (
                      <p className="mt-1 text-xs text-red-600">{errors.weight}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Fitness Preferences Section */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-900">Fitness Preferences</h2>
                </div>

                <div className="space-y-4">
                  {/* Fitness Goal */}
                  <div>
                    <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Fitness Goal *
                    </label>
                    <div className="relative">
                      <select
                        id="fitnessGoal"
                        name="fitnessGoal"
                        value={formData.fitnessGoal}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border ${
                          errors.fitnessGoal ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 appearance-none bg-white cursor-pointer`}
                        disabled={isPending}
                      >
                        <option value="">Select your goal</option>
                        <option value="lose-weight">Lose Weight</option>
                        <option value="gain-muscle">Gain Muscle</option>
                        <option value="stay-fit">Stay Fit</option>
                        <option value="improve-strength">Improve Strength</option>
                        <option value="endurance">Endurance</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.fitnessGoal && (
                      <p className="mt-1 text-xs text-red-600">{errors.fitnessGoal}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Experience Level */}
                    <div>
                      <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Experience Level *
                      </label>
                      <div className="relative">
                        <select
                          id="experienceLevel"
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 border ${
                            errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 appearance-none bg-white cursor-pointer`}
                          disabled={isPending}
                        >
                          <option value="">Select level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.experienceLevel && (
                        <p className="mt-1 text-xs text-red-600">{errors.experienceLevel}</p>
                      )}
                    </div>

                    {/* Weekly Availability */}
                    <div>
                      <label htmlFor="weeklyAvailability" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Weekly Availability *
                      </label>
                      <div className="relative">
                        <select
                          id="weeklyAvailability"
                          name="weeklyAvailability"
                          value={formData.weeklyAvailability}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 border ${
                            errors.weeklyAvailability ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 appearance-none bg-white cursor-pointer`}
                          disabled={isPending}
                        >
                          <option value="">Select days</option>
                          <option value="1-2">1-2 days / week</option>
                          <option value="3-4">3-4 days / week</option>
                          <option value="5-6">5-6 days / week</option>
                          <option value="daily">Daily</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.weeklyAvailability && (
                        <p className="mt-1 text-xs text-red-600">{errors.weeklyAvailability}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition duration-200 shadow-sm flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Completing Profile...
                    </>
                  ) : (
                    <>
                      Save & Continue
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-gray-500 mt-3">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">SECURE AI PROCESSING</span>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              © 2025 AI Fitness Tracker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}