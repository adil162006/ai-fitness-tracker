// =============================
// AUTH TYPES
// =============================

export interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword:string
}

export interface LoginForm {
  email: string;
  password: string;
}


// =============================
// ENUM TYPES (FROM YOUR SELECT OPTIONS)
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

export type WeeklyAvailability =
  | "1-2"
  | "3-4"
  | "5-6"
  | "daily";

// =============================
// COMPLETE PROFILE FORM TYPE
// (matches your JSX form inputs)
// =============================
export interface CompleteProfileForm {
  age: number;
  height: number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}
export interface UpdateProfileForm{
  fullName: string;
  age:number;
  height:number;
  weight: number;
  fitnessGoal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  weeklyAvailability: WeeklyAvailability;
}