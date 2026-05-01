# AI Fitness Tracker 🏋️‍♂️

> A full-stack fitness tracking app where AI generates personalized weekly workout plans, tracks workout logs, generates daily insights, and produces weekly performance summaries — all based on your unique profile, goals, and history.

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)

---

## ✨ Features

- **Authentication**: Secure signup, login, and profile completion onboarding flow powered by Supabase Auth (JWT).
- **AI Workout Plans**: Generates a complete, personalized weekly plan based on the user's goals, experience, and availability. Displays today's specific routine or a dynamic rest day message.
- **Workout Logger**: Structured form for logging exercises, tracking name, sets, reps, weight, intensity, duration, soreness, and personal notes.
- **Workout History**: Paginated, searchable log history complete with volume distribution charts, active streaks, and average intensity stats.
- **AI Daily Insights**: 5 personalized daily insights (Consistency, Fatigue, Recovery, Motivation, Performance) intelligently generated from recent activity and cached in the DB.
- **Weekly Performance Summary**: AI-powered weekly review highlighting your "Win", "Gap", and "Next Week Focus" along with a calculated consistency score.
- **Centralized Dashboard**: A comprehensive hub aggregating today's plan, quick stats, weekly activity map, AI coach tips, and nutrition targets in one view.

---

## 📂 Project Structure

```text
ai-fitness-tracker/
├── frontend/
│   ├── app/                # Next.js 14 App Router pages
│   ├── api/                # Axios API clients for backend communication
│   ├── components/         # Reusable UI components
│   ├── hooks/              # TanStack Query custom hooks
│   ├── lib/                # Utilities (Axios interceptors, etc.)
│   └── store/              # Zustand global state (Auth)
└── backend/
    ├── src/
    │   ├── controllers/    # Request handlers & business logic
    │   ├── routes/         # Express API routes
    │   ├── services/       # AI logic & Gemini integrations
    │   ├── lib/            # Supabase & Arcjet setup
    │   └── types/          # Shared TypeScript interfaces
    └── index.ts            # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Bun (optional, but recommended)
- A Supabase account and project
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-fitness-tracker.git
cd ai-fitness-tracker
```

### 2. Install Dependencies
**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in both the `frontend` and `backend` directories. Refer to the Environment Variables table below.

### 4. Run the Development Servers
**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your Express backend URL (e.g., `http://localhost:3001/api`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Public Key |

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default: 3001) |
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_KEY` | Your Supabase Service Role / Anon Key |
| `GEMINI_API_KEY` | Your Google Gemini API Key |
| `ARCJET_KEY` | Arcjet Key for security (if configured) |

---

## 🔌 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/signup` | POST | Register a new user |
| `/api/auth/login` | POST | Authenticate user and return JWT |
| `/api/auth/logout` | POST | Log out the user |
| `/api/user/me` | GET | Get current user profile |
| `/api/user/profile` | PUT | Update user metrics and goals |
| `/api/dashboard/dashboard` | GET | Get aggregated dashboard metrics |
| `/api/ai/workout/today` | GET | Generate/fetch today's AI workout plan |
| `/api/workouts/logs` | POST | Log a completed workout |
| `/api/workouts/logs` | GET | Fetch recent workout logs |
| `/api/workouts/history`| GET | Fetch paginated workout history |
| `/api/insights/insights` | GET | Fetch cached daily AI insights |
| `/api/insights/insights/refresh` | POST | Force regenerate AI insights |
| `/api/weekly-summary/summary` | GET | Fetch or generate weekly summary |
| `/api/weekly-summary/summary/all`| GET | Fetch list of all past weekly summaries |

---

## 🗄️ Database Schema Overview

The application uses PostgreSQL (via Supabase) with the following core tables:

| Table Name | Key Columns | Description |
|---|---|---|
| `users` | `id`, `email`, `name`, `fitness_goal`, `experience_level`, `weekly_availability` | Extended user profile data |
| `workout_plans` | `id`, `user_id`, `date`, `exercises` (JSONB), `is_rest_day` | AI-generated daily workout structures |
| `workout_logs` | `id`, `user_id`, `date`, `duration_minutes`, `intensity`, `exercises` (JSONB) | Actual completed workouts logged by the user |
| `ai_insights` | `id`, `user_id`, `type`, `content`, `generated_for_date` | Daily generated coaching tips |
| `weekly_summaries` | `id`, `user_id`, `week_start`, `consistency_score`, `summary_text` | Aggregated weekly performance reports |

---

## 🧠 AI Features & Architecture

This application heavily leverages the **Google Gemini 2.5 Flash** model for dynamic content generation:

1. **Workout Generation**: We prompt Gemini with the user's exact profile constraints (goals, availability) to output a strictly typed JSON structure containing 7 days of workouts (or rest days).
2. **Daily Insights**: Gemini analyzes the last 7 days of logs and outputs categorized insights (fatigue, recovery, consistency). 
3. **Weekly Summaries**: At the end of the week, the AI processes all logged data to determine a consistency score and identifies wins and gaps.
4. **Caching Strategy**: AI calls are expensive and slow. We cache daily plans in `workout_plans`, daily insights in `ai_insights`, and weekly reports in `weekly_summaries`. The backend always checks the database first before querying the Gemini API. 

---

## ⚠️ Known Limitations & Future Improvements

- **AI Latency**: Generating a full 7-day plan on the fly can take 3-5 seconds. (Future: Background cron jobs for pre-generation).
- **Gemini Rate Limits**: Free tier API keys may hit rate limits if aggressively regenerating plans. (Future: Better retry logic and queueing).
- **Offline Support**: Currently requires an active connection. (Future: PWA implementation with local queueing for logs).
- **Social Features**: No current way to share routines with friends.
