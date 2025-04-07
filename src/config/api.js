/**
 * API Configuration
 *
 * This file contains the configuration for API endpoints based on the environment.
 * It automatically selects the appropriate base URL for the current environment.
 */

// Get API URL from environment variables or use default values
const API_URL = import.meta.env.VITE_API_URL;

// Define API base URLs for different environments
const API_URLS = {
  development: 'http://localhost:5000/api',
  production: 'https://where-is-my-bus-backend.onrender.com/api',
  // Add more environments if needed (e.g., staging, testing)
};

// Determine current environment
const ENV = import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || 'development';

// Select the appropriate API base URL - prefer environment variable if available
export const API_BASE_URL = API_URL || API_URLS[ENV] || API_URLS.development;

// Log the API URL being used (helpful for debugging)
console.log(`Using API URL: ${API_BASE_URL} (Environment: ${ENV})`);


// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  SIGNUP: '/users/signup',
  LOGIN: '/users/login',
  PROFILE: '/users/profile',

  // Seat endpoints
  SEATS: '/seats',

  // Ticket endpoints
  BOOK_TICKET: '/tickets/book',

  // Test endpoints
  DB_STATUS: '/test/db-status',

  // Health check
  HEALTH: '/health',
};

/**
 * Constructs a full API URL for the given endpoint
 * @param {string} endpoint - The API endpoint path
 * @returns {string} The complete API URL
 */
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export default {
  API_BASE_URL,
  ENDPOINTS,
  getApiUrl,
};
