import { test, expect } from '@playwright/test';

test.describe('Escape Room Game', () => {
  test('should start game and show timer when clicking start button', async ({ page }) => {
    // Navigate to escape room page
    await page.goto('/escape-room');

    // Verify initial state
    await expect(page.getByRole('heading', { name: 'Escape Room' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();

    // Start the game
    await page.getByRole('button', { name: 'Start' }).click();

    // Verify timer and first room are shown
    await expect(page.getByText('⏳')).toBeVisible();
    await expect(page.locator('text=45:')).toBeVisible();
  });

  test('should disable next button until correct solution is provided', async ({ page }) => {
    await page.goto('/escape-room');

    // Start game
    await page.getByRole('button', { name: 'Start' }).click();

    // Check that Next button exists and is disabled
    const nextButton = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeDisabled();

    // Verify terminal is visible
    await expect(page.getByTestId('terminal')).toBeVisible();
  });
});

