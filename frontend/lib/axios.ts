// lib/axios.ts
import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: sends cookies with requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookie or localStorage if needed
    // For cookie-based auth, browser handles this automatically with withCredentials
    
    // Optional: Add token from localStorage as fallback
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
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

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Response:', response.config.url, response.status);
    }

    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          console.error('🔒 Unauthorized - Redirecting to login');
          if (typeof window !== 'undefined') {
            // Clear any stored tokens
            localStorage.removeItem('access_token');
            // Redirect to login
            window.location.href = '/login';
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

      // Return structured error
      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        data: data,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('📡 Network Error - No response received');
      return Promise.reject({
        status: 0,
        message: 'Network error - please check your connection',
        data: null,
      });
    } else {
      // Error setting up request
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