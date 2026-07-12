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

test.describe('FAQ page (spec §8)', () => {
  test('direct navigation / hard refresh on /faq does not 404 (SPA fallback)', async ({ page }) => {
    const response = await page.goto('/faq');
    expect(response.status()).toBeLessThan(400);
    await expect(page.locator('h1')).toHaveText('Straight answers before you book a call.');
    await page.reload();
    expect((await page.title())).toBe('FAQ — Anchorpoint AI');
  });

  test('exactly one H1 and no skipped heading levels on /faq', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/faq');
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

  test('clicking the Navbar "FAQ" link navigates to /faq and focuses the H1', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.locator('nav[aria-label="Primary"] ul a', { hasText: 'FAQ' }).click();
    await expect(page).toHaveURL(/\/faq$/);
    await expect(page.locator('h1')).toBeFocused();
  });

  test('an accordion row expands on click, updates aria-expanded, and multiple rows stay open', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/faq');
    const first = page.getByRole('button', { name: /do you offer a free trial\?/i });
    const second = page.getByRole('button', { name: /what happens when my audit engagement ends\?/i });

    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await first.click();
    await expect(first).toHaveAttribute('aria-expanded', 'true');

    await second.click();
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  test('Home/End move focus to the first/last trigger across all 3 categories', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/faq');
    const triggers = page.getByRole('button', { name: /\?$/ });
    await expect(triggers).toHaveCount(14);

    await triggers.nth(5).focus();
    await page.keyboard.press('End');
    await expect(triggers.nth(13)).toBeFocused();

    await page.keyboard.press('Home');
    await expect(triggers.nth(0)).toBeFocused();
  });

  test('clicking "Book a Free Agent Audit" in the closing CTA navigates to / and scrolls to the contact form', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/faq');
    await page.getByRole('link', { name: /book a free agent audit/i }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    // A cross-page CTA click here does a full route transition (FaqPage
    // unmounts, LandingPage mounts, then the hash-scroll effect in §8.1
    // fires), so allow a little more settle time and vertical tolerance
    // than the same-page anchor-click smooth-scroll checks above.
    await page.waitForTimeout(1500);
    const box = await page.locator('#contact').boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(-10);
    expect(box.y).toBeLessThanOrEqual(200);
  });

  test('Footer "FAQ" resource link navigates to /faq', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/');
    await page.locator('footer a', { hasText: 'FAQ' }).click();
    await expect(page).toHaveURL(/\/faq$/);
  });

  for (const width of [375, 768, 1280]) {
    test(`no horizontal overflow on /faq at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1200 });
      await page.goto('/faq');
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
