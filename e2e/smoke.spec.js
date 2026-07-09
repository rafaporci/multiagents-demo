import { test, expect } from '@playwright/test';

/**
 * Lightweight end-to-end smoke pass over the Anchorpoint AI landing page,
 * cross-checked against DESIGN_SPEC.md. Complements the Vitest+RTL+jest-axe
 * unit/component suite (`npm test`) with real-browser layout/behavior checks
 * that jsdom cannot catch (actual CSS layout, viewport resize, focus order
 * across real rendering). Run with `npm run test:e2e`.
 *
 * Some of these are EXPECTED TO FAIL until known bugs (see TEST_REPORT.md)
 * are fixed — that failure is the point: they exist to catch regressions
 * and to prove the fix once applied.
 */

test.describe('Navigation', () => {
  test('desktop nav: gap between last link and "Book a Call" is ~24px (spec 5.1)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const lastLink = page.locator('nav[aria-label="Primary"] ul a', { hasText: 'Contact' });
    const button = page.locator('nav[aria-label="Primary"] >> text=Book a Call');
    const linkBox = await lastLink.boundingBox();
    const btnBox = await button.boundingBox();
    const gap = btnBox.x - (linkBox.x + linkBox.width);
    expect(gap, `expected ~24px gap, measured ${gap.toFixed(1)}px`).toBeLessThanOrEqual(27);
  });

  test('tablet (768px) nav bar fits on one line without text wrapping (spec 5.1)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 200 });
    await page.goto('/');
    // Wait for the real webfonts (Space Grotesk/Inter) to finish swapping in —
    // fallback-font metrics can mask/create wrapping differences vs. the real fonts.
    await page.evaluate(() => document.fonts.ready);
    const wordmark = page.locator('header a[href="#hero"] span').first();
    const box = await wordmark.boundingBox();
    // Single-line wordmark is ~28px tall; wrapping to 2 lines roughly doubles it.
    expect(box.height, `wordmark height ${box.height}px suggests text wrapped`).toBeLessThan(36);
  });

  test('clicking a nav link smooth-scrolls to the matching section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.locator('nav[aria-label="Primary"] ul a:has-text("Pricing")').click();
    await page.waitForTimeout(1000);
    const box = await page.locator('#pricing').boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(-10);
    expect(box.y).toBeLessThanOrEqual(120);
  });

  test('mobile menu opens as a full-screen overlay that covers page content (spec 5.1)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(400);
    const dialogBox = await page.locator('#mobile-menu').boundingBox();
    expect(dialogBox.height, 'overlay should fill viewport below the nav bar, not collapse to 0 height').toBeGreaterThan(400);
    await expect(page.locator('h1')).toBeHidden();
  });

  test('mobile menu traps focus while open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(300);
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      const inDialog = await page.evaluate(() => {
        const dialog = document.getElementById('mobile-menu');
        return dialog ? dialog.contains(document.activeElement) : false;
      });
      expect(inDialog, `focus escaped the open mobile dialog after ${i + 1} Tab presses`).toBe(true);
    }
  });

  test('Escape closes the mobile menu and returns focus to the trigger', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
    await expect(page.locator('button[aria-label="Open menu"]')).toBeFocused();
  });
});

test.describe('Responsive layout', () => {
  for (const width of [375, 768, 1280]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }

  test('Growth pricing tile is visually first below 1280px (spec 5.7)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 1400 });
    await page.goto('/');
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const tiles = await page.locator('#pricing h3').all();
    const positions = [];
    for (const t of tiles) {
      const box = await t.boundingBox();
      positions.push({ text: await t.textContent(), y: box.y });
    }
    positions.sort((a, b) => a.y - b.y);
    expect(positions[0].text).toBe('Growth');
  });
});

test.describe('Forms', () => {
  test('Final CTA form validates required fields then shows mock success', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/');
    await page.locator('nav[aria-label="Primary"] >> text=Book a Call').click();
    await page.waitForTimeout(1000);
    const submit = page.locator('form[aria-label="Request an audit call"] button[type="submit"]');
    await submit.click();
    await expect(page.locator('text=Enter your name.')).toBeVisible();

    await page.fill('#cta-name', 'Jordan Reyes');
    await page.fill('#cta-email', 'jordan@example.com');
    await page.fill('#cta-message', 'Our inbox is buried every Monday.');
    await submit.click();
    await expect(page.locator('text=Request received.')).toBeVisible({ timeout: 3000 });
  });

  test('footer newsletter form shows mock success state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/');
    await page.locator('#newsletter-email').fill('you@example.com');
    await page.locator('footer button:has-text("Subscribe")').click();
    await expect(page.locator('text=Subscribed. (Demo only')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('exactly one H1 and no skipped heading levels', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/');
    const headings = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h) => Number(h.tagName[1]))
    );
    expect(headings.filter((l) => l === 1).length).toBe(1);
    let prev = 1;
    for (const level of headings) {
      expect(level, `heading level jumped from h${prev} to h${level}`).toBeLessThanOrEqual(prev + 1);
      prev = level;
    }
  });
});
