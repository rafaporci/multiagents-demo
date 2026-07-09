import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: true,
    // Playwright's e2e/ suite is a separate runner (`npm run test:e2e`) and
    // must not be picked up by Vitest's default test-file globbing.
    exclude: ['**/node_modules/**', '**/e2e/**'],
  },
});
