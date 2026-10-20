import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Dummy values so unit tests can construct the Firebase/Algolia clients
// without real credentials. Real values come from .env.local (see
// .env.example); these never ship to the bundle.
const testEnv = {
  VITE_FIREBASE_API_KEY: 'test-api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
  VITE_FIREBASE_DATABASE_URL: 'https://test.firebaseio.com',
  VITE_FIREBASE_PROJECT_ID: 'test-project',
  VITE_FIREBASE_STORAGE_BUCKET: 'test.appspot.com',
  VITE_FIREBASE_MESSAGING_SENDER_ID: '0',
  VITE_FIREBASE_APP_ID: '1:0:web:test',
  VITE_CONFIRMATION_EMAIL_REDIRECT: 'http://localhost',
  VITE_ALGOLIA_APP_ID: 'TESTAPPID',
  VITE_ALGOLIA_SEARCH_KEY: 'test-search-key',
  VITE_GOOGLE_MAPS_API_KEY: 'test-google-key',
  VITE_DEFAULT_PORTRAIT: 'http://localhost/portrait.png'
};

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    env: testEnv
  }
});
