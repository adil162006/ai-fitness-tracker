// lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor — attach Bearer token from Zustand
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor — handle 401 by clearing Zustand and redirecting
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Response:', response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          console.error('🔒 Unauthorized - Clearing session and redirecting');
          // Clear Zustand store
          useAuthStore.getState().clearAuth();
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
          break;

        case 403:
          console.error('🚫 Forbidden - Access denied');
          break;

        case 404:
          console.error('🔍 Not Found');
          break;

        case 500:
          console.error('💥 Server Error');
          break;

        default:
          console.error(`❌ Error ${status}:`, data?.message || 'Unknown error');
      }

      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        data: data,
      });
    } else if (error.request) {
      console.error('📡 Network Error - No response received');
      return Promise.reject({
        status: 0,
        message: 'Network error - please check your connection',
        data: null,
      });
    } else {
      console.error('⚙️ Request Setup Error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message || 'Request failed',
        data: null,
      });
    }
  }
);

export default axiosInstance;