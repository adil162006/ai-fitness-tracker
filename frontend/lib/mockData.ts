// =============================================================================
// Mock Data — Strictly Based on the EER Model
// =============================================================================
// All field names, data types, and relationships follow the provided schema.
// This file serves as the single source of truth for frontend mock data.
// =============================================================================

// ── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;             // uuid [pk]
  name: string;           // text
  email: string;          // text
  age: number;            // int
  height_cm: number;      // int
  weight_kg: number;      // int
  fitness_goal: string;   // text
  experience_level: string; // text
  weekly_availability: number; // int
  profile_completed: boolean;  // boolean [default: false]
  created_at: string;     // timestamp
  updated_at: string;     // timestamp
}

export const mockUser: User = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  name: 'Alex Thompson',
  email: 'alex.thompson@email.com',
  age: 28,
  height_cm: 180,
  weight_kg: 78,
  fitness_goal: 'gain-muscle',
  experience_level: 'intermediate',
  weekly_availability: 5,
  profile_completed: true,
  created_at: '2025-06-15T08:30:00Z',
  updated_at: '2026-03-28T14:22:00Z',
};

// ── Workout Plans ────────────────────────────────────────────────────────────

export interface WorkoutPlanExercise {
  name: string;
  sets: number;
  reps: number | string;
  weight: string;
  rest_time: string;
  notes: string;
}

export interface WorkoutPlan {
  id: string;             // uuid [pk]
  user_id: string;        // uuid [ref: > users.id]
  date: string;           // date
  exercises: WorkoutPlanExercise[]; // jsonb
  difficulty: string;     // text
  explanation: string;    // text
  source: string;         // text
  created_at: string;     // timestamp
}

export const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: 'wp-001-a1b2-c3d4-e5f6-789012340001',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-30',
    exercises: [
      {
        name: 'Barbell Bench Press',
        sets: 4,
        reps: 8,
        weight: '80 kg',
        rest_time: '90 sec',
        notes: 'Focus on controlled eccentric phase',
      },
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: 10,
        weight: '28 kg',
        rest_time: '60 sec',
        notes: 'Full range of motion, squeeze at top',
      },
      {
        name: 'Overhead Press',
        sets: 3,
        reps: 8,
        weight: '45 kg',
        rest_time: '90 sec',
        notes: 'Brace core, no back lean',
      },
      {
        name: 'Cable Flyes',
        sets: 3,
        reps: 12,
        weight: '15 kg',
        rest_time: '45 sec',
        notes: 'Keep slight bend in elbows throughout',
      },
      {
        name: 'Tricep Dips',
        sets: 3,
        reps: 'to failure',
        weight: 'Bodyweight',
        rest_time: '60 sec',
        notes: 'Lean forward slightly for chest activation',
      },
    ],
    difficulty: 'intermediate',
    explanation:
      "Today's push-focused session targets chest, shoulders, and triceps. Based on your recovery metrics (85% readiness) and recent volume trends, we're progressively overloading your bench press by 2.5kg. The cable flyes will maximize hypertrophy through constant tension.",
    source: 'ai-generated',
    created_at: '2026-03-30T05:00:00Z',
  },
  {
    id: 'wp-002-a1b2-c3d4-e5f6-789012340002',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-29',
    exercises: [
      {
        name: 'Barbell Squats',
        sets: 4,
        reps: 8,
        weight: '100 kg',
        rest_time: '120 sec',
        notes: 'Focus on depth and controlled descent',
      },
      {
        name: 'Romanian Deadlifts',
        sets: 3,
        reps: 10,
        weight: '80 kg',
        rest_time: '90 sec',
        notes: 'Maintain neutral spine throughout',
      },
      {
        name: 'Bulgarian Split Squats',
        sets: 3,
        reps: '10/leg',
        weight: '20 kg',
        rest_time: '60 sec',
        notes: 'Keep torso upright, control the movement',
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: 12,
        weight: '140 kg',
        rest_time: '60 sec',
        notes: 'Full range of motion, no lockout at top',
      },
      {
        name: 'Standing Calf Raises',
        sets: 4,
        reps: 15,
        weight: '60 kg',
        rest_time: '45 sec',
        notes: 'Pause at the top for 2 seconds',
      },
    ],
    difficulty: 'intermediate',
    explanation:
      "Lower body day with emphasis on compound movements. Your squat has been progressing well — increasing load by 5kg from last session. RDLs are added to strengthen the posterior chain which will support your deadlift goals.",
    source: 'ai-generated',
    created_at: '2026-03-29T05:00:00Z',
  },
  {
    id: 'wp-003-a1b2-c3d4-e5f6-789012340003',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-28',
    exercises: [
      {
        name: 'Pull-ups',
        sets: 4,
        reps: 8,
        weight: 'Bodyweight + 10 kg',
        rest_time: '90 sec',
        notes: 'Full hang to chin over bar',
      },
      {
        name: 'Barbell Rows',
        sets: 4,
        reps: 8,
        weight: '70 kg',
        rest_time: '90 sec',
        notes: 'Squeeze shoulder blades at top',
      },
      {
        name: 'Seated Cable Row',
        sets: 3,
        reps: 12,
        weight: '55 kg',
        rest_time: '60 sec',
        notes: 'Keep elbows close to body',
      },
      {
        name: 'Face Pulls',
        sets: 3,
        reps: 15,
        weight: '20 kg',
        rest_time: '45 sec',
        notes: 'External rotation at the top',
      },
      {
        name: 'Barbell Curls',
        sets: 3,
        reps: 10,
        weight: '30 kg',
        rest_time: '45 sec',
        notes: 'No swinging, strict form',
      },
    ],
    difficulty: 'intermediate',
    explanation:
      "Pull day targeting back and biceps. Weighted pull-ups are progressing well. Adding face pulls for shoulder health and posture correction based on your seated work hours.",
    source: 'ai-generated',
    created_at: '2026-03-28T05:00:00Z',
  },
];

// ── Workout Logs ─────────────────────────────────────────────────────────────

export interface WorkoutLogExercise {
  name: string;
  sets: number;
  reps: number | string;
  weight: string;
}

export interface WorkoutLog {
  id: string;             // uuid [pk]
  user_id: string;        // uuid [ref: > users.id]
  date: string;           // date
  exercises: WorkoutLogExercise[]; // jsonb
  duration_minutes: number; // int
  intensity: string;      // text
  soreness_reported: boolean; // boolean
  notes: string;          // text
  created_at: string;     // timestamp
}

export const mockWorkoutLogs: WorkoutLog[] = [
  {
    id: 'wl-001-a1b2-c3d4-e5f6-789012340001',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-29',
    exercises: [
      { name: 'Barbell Squats', sets: 4, reps: 8, weight: '100 kg' },
      { name: 'Romanian Deadlifts', sets: 3, reps: 10, weight: '80 kg' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '10/leg', weight: '20 kg' },
      { name: 'Leg Press', sets: 3, reps: 12, weight: '140 kg' },
      { name: 'Standing Calf Raises', sets: 4, reps: 15, weight: '60 kg' },
    ],
    duration_minutes: 58,
    intensity: 'high',
    soreness_reported: true,
    notes: 'Felt strong on squats, hit a new PR. Slight quad soreness expected.',
    created_at: '2026-03-29T08:15:00Z',
  },
  {
    id: 'wl-002-a1b2-c3d4-e5f6-789012340002',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-28',
    exercises: [
      { name: 'Pull-ups', sets: 4, reps: 8, weight: 'BW + 10 kg' },
      { name: 'Barbell Rows', sets: 4, reps: 8, weight: '70 kg' },
      { name: 'Seated Cable Row', sets: 3, reps: 12, weight: '55 kg' },
      { name: 'Face Pulls', sets: 3, reps: 15, weight: '20 kg' },
      { name: 'Barbell Curls', sets: 3, reps: 10, weight: '30 kg' },
    ],
    duration_minutes: 52,
    intensity: 'high',
    soreness_reported: false,
    notes: 'Pull day felt excellent. Improved pull-up count by 1 rep per set.',
    created_at: '2026-03-28T07:45:00Z',
  },
  {
    id: 'wl-003-a1b2-c3d4-e5f6-789012340003',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-27',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: 8, weight: '77.5 kg' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: '26 kg' },
      { name: 'Overhead Press', sets: 3, reps: 8, weight: '42.5 kg' },
      { name: 'Cable Flyes', sets: 3, reps: 12, weight: '14 kg' },
      { name: 'Tricep Dips', sets: 3, reps: 12, weight: 'Bodyweight' },
    ],
    duration_minutes: 50,
    intensity: 'medium',
    soreness_reported: false,
    notes: 'Solid push session. Bench press progressive overload on track.',
    created_at: '2026-03-27T07:30:00Z',
  },
  {
    id: 'wl-004-a1b2-c3d4-e5f6-789012340004',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-25',
    exercises: [
      { name: 'Deadlifts', sets: 5, reps: 5, weight: '120 kg' },
      { name: 'Barbell Squats', sets: 3, reps: 10, weight: '95 kg' },
      { name: 'Leg Press', sets: 3, reps: 12, weight: '130 kg' },
      { name: 'Planks', sets: 3, reps: '60 sec', weight: 'Bodyweight' },
    ],
    duration_minutes: 55,
    intensity: 'high',
    soreness_reported: true,
    notes: 'Heavy deadlift day. New 5RM at 120kg! Lower back slightly tight.',
    created_at: '2026-03-25T17:30:00Z',
  },
  {
    id: 'wl-005-a1b2-c3d4-e5f6-789012340005',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-24',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: 8, weight: '40 kg' },
      { name: 'Lateral Raises', sets: 3, reps: 15, weight: '10 kg' },
      { name: 'Dips', sets: 3, reps: 12, weight: 'Bodyweight' },
      { name: 'Barbell Rows', sets: 4, reps: 10, weight: '65 kg' },
    ],
    duration_minutes: 45,
    intensity: 'medium',
    soreness_reported: false,
    notes: 'Upper body session. Focused on form over weight.',
    created_at: '2026-03-24T07:00:00Z',
  },
  {
    id: 'wl-006-a1b2-c3d4-e5f6-789012340006',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-03-22',
    exercises: [
      { name: 'Barbell Squats', sets: 3, reps: 12, weight: '90 kg' },
      { name: 'Push-ups', sets: 3, reps: 20, weight: 'Bodyweight' },
      { name: 'Lunges', sets: 3, reps: '10/leg', weight: '20 kg' },
      { name: 'Pull-ups', sets: 3, reps: 8, weight: 'Bodyweight' },
    ],
    duration_minutes: 40,
    intensity: 'medium',
    soreness_reported: false,
    notes: 'Full body circuit. Consistent performance across all sets.',
    created_at: '2026-03-22T09:00:00Z',
  },
];

// ── AI Insights ──────────────────────────────────────────────────────────────

export interface AiInsight {
  id: string;             // uuid [pk]
  user_id: string;        // uuid [ref: > users.id]
  type: string;           // text
  content: string;        // text
  generated_for_date: string; // date
  created_at: string;     // timestamp
}

export const mockAiInsights: AiInsight[] = [
  {
    id: 'ai-001-a1b2-c3d4-e5f6-789012340001',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'consistency',
    content:
      "You've hit your workout goals for 12 days straight! Your morning workouts seem to be more effective, showing a 15% higher intensity on average. Keep this momentum going.",
    generated_for_date: '2026-03-28',
    created_at: '2026-03-28T06:00:00Z',
  },
  {
    id: 'ai-002-a1b2-c3d4-e5f6-789012340002',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'fatigue',
    content:
      'Your recent workout logs show increasing volume without adequate rest days. Consider adding an active recovery session tomorrow to prevent overtraining and maintain performance gains.',
    generated_for_date: '2026-03-29',
    created_at: '2026-03-29T06:00:00Z',
  },
  {
    id: 'ai-003-a1b2-c3d4-e5f6-789012340003',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'recovery',
    content:
      "Based on your reported soreness after leg day and the high-intensity deadlift session, your lower body needs 48-72 hours of recovery. Today is ideal for an upper body or cardio-focused session.",
    generated_for_date: '2026-03-30',
    created_at: '2026-03-30T06:00:00Z',
  },
  {
    id: 'ai-004-a1b2-c3d4-e5f6-789012340004',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'motivation',
    content:
      "You are only 3 sessions away from achieving your 'Iron Month' badge. Your volume in bench press has increased by 5kg over the last 30 days. Keep the progressive overload consistent!",
    generated_for_date: '2026-03-30',
    created_at: '2026-03-30T07:00:00Z',
  },
  {
    id: 'ai-005-a1b2-c3d4-e5f6-789012340005',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'performance',
    content:
      'Your squat 1RM estimate has increased from 115kg to 125kg this month. Your pull-up strength is also trending upward with +1 rep per set on weighted pull-ups.',
    generated_for_date: '2026-03-30',
    created_at: '2026-03-30T08:00:00Z',
  },
];

// ── Weekly Summaries ─────────────────────────────────────────────────────────

export interface WeeklySummary {
  id: string;             // uuid [pk]
  user_id: string;        // uuid [ref: > users.id]
  week_start: string;     // date
  week_end: string;       // date
  summary_text: string;   // text
  consistency_score: number; // int
  created_at: string;     // timestamp
}

export const mockWeeklySummaries: WeeklySummary[] = [
  {
    id: 'ws-001-a1b2-c3d4-e5f6-789012340001',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    week_start: '2026-03-24',
    week_end: '2026-03-30',
    summary_text:
      "Excellent week! You completed 5 out of 5 planned workouts with a focus on progressive overload across all major lifts. Your squat hit a new PR at 100kg for 8 reps. Bench press is trending upward with a 2.5kg increase. One area for improvement: you missed your Wednesday active recovery session — consider adding mobility work to prevent stiffness. Overall volume increased by 12% compared to last week.",
    consistency_score: 92,
    created_at: '2026-03-30T12:00:00Z',
  },
  {
    id: 'ws-002-a1b2-c3d4-e5f6-789012340002',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    week_start: '2026-03-17',
    week_end: '2026-03-23',
    summary_text:
      "Solid week with 4 out of 5 planned workouts completed. Missed Friday's session due to scheduling but compensated with a Saturday full-body circuit. Deadlift volume was strong and consistent. Nutrition tracking shows you're hitting protein targets 5 out of 7 days. Focus on maintaining hydration levels next week.",
    consistency_score: 85,
    created_at: '2026-03-23T12:00:00Z',
  },
  {
    id: 'ws-003-a1b2-c3d4-e5f6-789012340003',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    week_start: '2026-03-10',
    week_end: '2026-03-16',
    summary_text:
      "Great progress this week! 5 out of 5 planned workouts completed — your best consistency in a month. All major lifts saw volume increases. Soreness was reported after 2 sessions but recovered within expected timeframes. Sleep quality averaged 7.5 hours which is above your 7-hour target.",
    consistency_score: 96,
    created_at: '2026-03-16T12:00:00Z',
  },
];

// ── Meals ────────────────────────────────────────────────────────────────────

export interface Meal {
  id: string;             // uuid [pk]
  user_id: string;        // uuid [ref: > users.id]
  meal_text: string;      // text
  ai_feedback: string;    // text
  logged_at: string;      // timestamp
}

export const mockMeals: Meal[] = [
  {
    id: 'ml-001-a1b2-c3d4-e5f6-789012340001',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    meal_text: '4 eggs scrambled, 2 slices whole wheat toast, 1 avocado, black coffee',
    ai_feedback:
      'Great protein-rich breakfast! ~35g protein, ~45g carbs, ~25g fats. Consider adding some greens for micronutrients. Total: ~540 calories.',
    logged_at: '2026-03-30T07:30:00Z',
  },
  {
    id: 'ml-002-a1b2-c3d4-e5f6-789012340002',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    meal_text: 'Grilled chicken breast 200g, brown rice 150g, steamed broccoli, olive oil dressing',
    ai_feedback:
      'Excellent post-workout meal! ~52g protein, ~60g carbs, ~12g fats. The chicken and rice combo provides optimal recovery nutrition. Total: ~560 calories.',
    logged_at: '2026-03-30T12:30:00Z',
  },
  {
    id: 'ml-003-a1b2-c3d4-e5f6-789012340003',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    meal_text: 'Protein shake (whey 30g) with banana and peanut butter',
    ai_feedback:
      'Good quick protein boost! ~38g protein, ~35g carbs, ~16g fats. Ideal as a snack between meals to hit your daily protein target. Total: ~430 calories.',
    logged_at: '2026-03-30T15:30:00Z',
  },
  {
    id: 'ml-004-a1b2-c3d4-e5f6-789012340004',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    meal_text: 'Salmon fillet 180g, sweet potato 200g, mixed salad with lemon dressing',
    ai_feedback:
      'Outstanding dinner choice! ~40g protein, ~50g carbs, ~18g fats. Salmon provides omega-3s that support recovery and reduce inflammation. Total: ~520 calories.',
    logged_at: '2026-03-29T19:00:00Z',
  },
];

// ── Derived / Helper Data (computed from the models above) ───────────────────

/** Today's workout plan (convenience accessor) */
export const getTodaysPlan = (): WorkoutPlan | undefined => {
  const today = new Date().toISOString().split('T')[0];
  return mockWorkoutPlans.find((p) => p.date === today) || mockWorkoutPlans[0];
};

/** This week's workout logs */
export const getThisWeekLogs = (): WorkoutLog[] => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  return mockWorkoutLogs.filter((log) => new Date(log.date) >= startOfWeek);
};

/** Latest weekly summary */
export const getLatestWeeklySummary = (): WeeklySummary => {
  return mockWeeklySummaries[0];
};

/** Total duration this week in hours */
export const getWeeklyDurationHours = (): number => {
  const logs = getThisWeekLogs();
  const totalMinutes = logs.reduce((sum, log) => sum + log.duration_minutes, 0);
  return Math.round((totalMinutes / 60) * 10) / 10;
};

/** Number of workouts completed this week */
export const getWeeklyWorkoutCount = (): number => {
  return getThisWeekLogs().length;
};

/** Daily activity for the current week (Mon-Sun) */
export const getWeeklyActivityMap = (): { day: string; hasWorkout: boolean; volume: number }[] => {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday

  return dayLabels.map((label, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const dateStr = date.toISOString().split('T')[0];
    const log = mockWorkoutLogs.find((l) => l.date === dateStr);
    return {
      day: label,
      hasWorkout: !!log,
      volume: log ? log.duration_minutes * 50 : 0, // rough volume estimate
    };
  });
};
