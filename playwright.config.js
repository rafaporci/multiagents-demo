import { defineConfig } from '@playwright/test';

/**
 * Minimal Playwright E2E config for manual/CI smoke runs against the dev
 * server. Not part of `npm test` (which stays Vitest+RTL+jest-axe) — run
 * explicitly via `npm run test:e2e`. Auto-starts `npm run dev` and reuses an
 * already-running server if present (useful for local iteration).
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'off',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
