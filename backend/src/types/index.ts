// =============================
// AUTH TYPES
// =============================

export interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

// =============================
// ENUM TYPES
// =============================

export type FitnessGoal =
  | "lose-weight"
  | "gain-muscle"
  | "stay-fit"
  | "improve-strength"
  | "endurance";

export type ExperienceLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

// String union as the form sends it
export type WeeklyAvailability =
  | "1-2"
  | "3-4"
  | "5-6"
  | "daily";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Difficulty = "easy" | "medium" | "hard" | "none";

// =============================
// FORM TYPES
// =============================

export interface CompleteProfileForm {
  age: number;
  height: number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}

export interface UpdateProfileForm {
  fullName: string;
  age: number;
  height: number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}

// =============================
// USER TYPE
// Matches DB column names so the Supabase row can be cast directly
// =============================
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  fitness_goal: FitnessGoal;
  experience_level: ExperienceLevel;
  weekly_availability: number; // stored as int in DB (converted from WeeklyAvailability string)
  profile_completed: boolean;
}

// =============================
// WORKOUT PLAN TYPES
// =============================

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  note: string;
}

export interface DayPlan {
  day_of_week: DayOfWeek;
  exercises: Exercise[];
  is_rest_day: boolean;
  difficulty: Difficulty;
  explanation: string;
}

// Returned by the service — full week before DB insert
export interface WeeklyPlan {
  week_start: string;
  days: DayPlan[];
  source: string;
}

// Single day row as stored in and returned from Supabase
export interface WorkoutPlan {
  id?: string;
  user_id?: string;
  date: string;
  week_start: string;
  day_of_week: DayOfWeek;
  exercises: Exercise[];
  is_rest_day: boolean;
  difficulty: Difficulty;
  explanation: string;
  source: string;
  created_at?: string;
}

export interface RestDayResponse {
  is_rest_day: true;
  day_of_week: DayOfWeek;
  message: string;
}

export type TodayPlanResponse = WorkoutPlan | RestDayResponse;