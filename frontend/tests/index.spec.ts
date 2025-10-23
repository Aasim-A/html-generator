import { test, expect } from '@playwright/test';

test.describe('Frontend Landing Page', () => {
  test('should display main navigation elements and theme toggle', async ({ page }) => {
    // Navigate to index page
    await page.goto('/');

    // Check navigation elements
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Saved Pages' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Escape Room' }).first()).toBeVisible();

    // Verify theme toggle button exists
    const themeToggle = page.getByTestId('themeToggleButton');
    await expect(themeToggle).toBeVisible();

    // Test theme toggle functionality
    await themeToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should load HTML Generator component with tabs', async ({ page }) => {
    await page.goto('/');

    // Verify HTML Generator component is present
    await expect(page.getByRole('heading', { name: /HTML Generator/i })).toBeVisible();

    // Check if all tabs are present
    const tabs = page.getByTestId('tabList').locator('div');
    await expect(tabs).toHaveCount(2);

    // Test tab switching
    const allTabs = await tabs.all();
    for (let i = 0; i < allTabs.length; i++) {
      const tab = allTabs[i];
      await tab.click();
      await expect(tab).toHaveClass(/bg-blue/);
    }
  });
});

