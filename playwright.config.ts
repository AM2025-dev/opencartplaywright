import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
timeout: 30 * 1000, //30000 ms(30 secs)
testDir: './tests',
fullyParallel: true,
//retries: process.env.CI ? 2 : 0,
retries: 1, // TODO: Fix CI
//workers: process.env.CI ? 1 : undefined, // TODO: Fix CI
workers: 1, // TODO: Fix CI

reporter: [
['html'],
['allure-playwright'],
['dot'],
['list']
],

use: {
trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure',
//headless: false, // Run tests in headless mode by default
viewport: { width: 1280, height: 720 }, // Set default viewport size for consistency
ignoreHTTPSErrors: true, // Ignore SSL errors if necessary
permissions: ['geolocation'], // Set necessary permissions for geolocation-based tests
},

//grep: /@master/,

projects: [
{
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
    },
/*{
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
},

{
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
} */
],
});



