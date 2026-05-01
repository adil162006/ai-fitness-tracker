// =============================================================================
// Mock Data — Strictly Based on the EER Model
// =============================================================================

// ── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  fitness_goal: string;
  experience_level: string;
  weekly_availability: number;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
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
  weekly_availability: 4,
  profile_completed: true,
  created_at: '2025-06-15T08:30:00Z',
  updated_at: '2026-03-28T14:22:00Z',
};

// ── Workout Plans ─────────────────────────────────────────────────────────────
// Matches backend Exercise interface exactly — no weight field, rest_seconds not rest_time, note not notes

export interface WorkoutPlanExercise {
  name: string;
  sets: number;
  reps: string;          // always string e.g. "8-10" or "12"
  rest_seconds: number;  // backend returns seconds as number
  note: string;          // singular, not notes
}

export type DayOfWeek =
  | 'Monday' | 'Tuesday' | 'Wednesday'
  | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'none';

export interface WorkoutPlan {
  id: string;
  user_id: string;
  date: string;
  week_start: string;
  day_of_week: DayOfWeek;
  exercises: WorkoutPlanExercise[];
  is_rest_day: boolean;
  difficulty: Difficulty;
  explanation: string;
  source: string;
  created_at: string;
}

export interface RestDayResponse {
  is_rest_day: true;
  day_of_week: DayOfWeek;
  message: string;
}

export type TodayPlanResponse = WorkoutPlan | RestDayResponse;

export const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: 'wp-001-a1b2-c3d4-e5f6-789012340001',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-04-28',
    week_start: '2026-04-28',
    day_of_week: 'Monday',
    is_rest_day: false,
    exercises: [
      {
        name: 'Barbell Bench Press',
        sets: 4,
        reps: '8-10',
        rest_seconds: 90,
        note: 'Focus on controlled eccentric phase',
      },
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '10-12',
        rest_seconds: 60,
        note: 'Full range of motion, squeeze at top',
      },
      {
        name: 'Overhead Press',
        sets: 3,
        reps: '8',
        rest_seconds: 90,
        note: 'Brace core, no back lean',
      },
      {
        name: 'Cable Flyes',
        sets: 3,
        reps: '12',
        rest_seconds: 45,
        note: 'Keep slight bend in elbows throughout',
      },
      {
        name: 'Tricep Dips',
        sets: 3,
        reps: '10-12',
        rest_seconds: 60,
        note: 'Lean forward slightly for chest activation',
      },
    ],
    difficulty: 'medium',
    explanation:
      "Push-focused session targeting chest, shoulders, and triceps. Volume and intensity are matched to your intermediate level and muscle-gain goal. Progressive overload applied to bench press.",
    source: 'gemini',
    created_at: '2026-04-28T05:00:00Z',
  },
  {
    id: 'wp-002-a1b2-c3d4-e5f6-789012340002',
    user_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    date: '2026-04-29',
    week_start: '2026-04-28',
    day_of_week: 'Tuesday',
    is_rest_day: false,
    exercises: [
      {
        name: 'Barbell Squats',
        sets: 4,
        reps: '8',
        rest_seconds: 120,
        note: 'Focus on depth and controlled descent',
      },
      {
        name: 'Romanian Deadlifts',
        sets: 3,
        reps: '10',
        rest_seconds: 90,
        note: 'Maintain neutral spine throughout',
      },
      {
        name: 'Bulgarian Split Squats',
        sets: 3,
        reps: '10',
        rest_seconds: 60,
        note: 'Keep torso upright, control the movement',
      },
      {
        name: 'Leg Press',
        sets: 3,
        reps: '12',
        rest_seconds: 60,
        note: 'Full range of motion, no lockout at top',
      },
      {
        name: 'Standing Calf Raises',
        sets: 4,
        reps: '15',
        rest_seconds: 45,
        note: 'Pause at the top for 2 seconds',
      },
    ],
    difficulty: 'hard',
    explanation:
      "Lower body day emphasising compound movements. Squat load progresses from last week. RDLs strengthen the posterior chain to support overall pulling strength.",
    source: 'gemini',
    created_at: '2026-04-29T05:00:00Z',
  },
];

// ── Helper ────────────────────────────────────────────────────────────────────

export const getTodaysPlan = (): TodayPlanResponse => {
  const today = new Date().toISOString().split('T')[0]!;
  const todayDayIndex = new Date().getDay();
  const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[todayDayIndex] as DayOfWeek;

  const plan = mockWorkoutPlans.find((p) => p.date === today || p.day_of_week === todayName);

  if (!plan) {
    return {
      is_rest_day: true,
      day_of_week: todayName,
      message: "No workout today — it's a rest day. Recovery is part of the plan!",
    };
  }

  return plan;
};

// ── Workout Logs ─────────────────────────────────────────────────────────────

export interface WorkoutLogExercise {
  name: string;
  sets: number;
  reps: number | string;
  weight: string;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  date: string;
  exercises: WorkoutLogExercise[];
  duration_minutes: number;
  intensity: string;
  soreness_reported: boolean;
  notes: string;
  created_at: string;
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
  id: string;
  user_id: string;
  type: string;
  content: string;
  generated_for_date: string;
  created_at: string;
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
  id: string;
  user_id: string;
  week_start: string;
  week_end: string;
  summary_text: string;
  consistency_score: number;
  created_at: string;
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
  id: string;
  user_id: string;
  meal_text: string;
  ai_feedback: string;
  logged_at: string;
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

// ── Other helpers (unchanged) ─────────────────────────────────────────────────

export const getThisWeekLogs = (): WorkoutLog[] => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  return mockWorkoutLogs.filter((log) => new Date(log.date) >= startOfWeek);
};

export const getLatestWeeklySummary = (): WeeklySummary => {
  return mockWeeklySummaries[0]!;
};

export const getWeeklyDurationHours = (): number => {
  const logs = getThisWeekLogs();
  const totalMinutes = logs.reduce((sum, log) => sum + log.duration_minutes, 0);
  return Math.round((totalMinutes / 60) * 10) / 10;
};

export const getWeeklyWorkoutCount = (): number => {
  return getThisWeekLogs().length;
};

export const getWeeklyActivityMap = (): { day: string; hasWorkout: boolean; volume: number }[] => {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);

  return dayLabels.map((label, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const dateStr = date.toISOString().split('T')[0]!;
    const log = mockWorkoutLogs.find((l) => l.date === dateStr);
    return {
      day: label,
      hasWorkout: !!log,
      volume: log ? log.duration_minutes * 50 : 0,
    };
  });
};