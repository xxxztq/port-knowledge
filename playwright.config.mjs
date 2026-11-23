import {defineConfig, devices} from '@playwright/test';

// A dedicated production-preview port avoids silently testing against astro dev,
// which does not have the generated full-text search index.
const port = Number(process.env.PORT_KNOWLEDGE_TEST_PORT || 4397);
const origin = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  reporter: [['list'], ['html', {open: 'never'}]],
  use: {baseURL: origin, trace: 'retain-on-failure', screenshot: 'only-on-failure'},
  webServer: {command: `npm run preview -- --port ${port}`, url: origin + '/port-knowledge/', reuseExistingServer: false, timeout: 60000},
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
});
