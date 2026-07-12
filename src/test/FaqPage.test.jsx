import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App.jsx';

expect.extend(toHaveNoViolations);

/**
 * Coverage for the FAQ route/page added per DESIGN_SPEC.md §8. `App` owns
 * its own `<BrowserRouter>` (see src/App.jsx), so these tests drive the
 * route by pushing history state before rendering, then render the same
 * `<App />` root used by the landing-page test suite (src/test/App.test.jsx)
 * — no extra router wrapper is needed in tests.
 */
function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('FaqPage (/faq)', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error');
    consoleWarnSpy = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    window.history.pushState({}, '', '/');
  });

  it('renders the page header, all 3 categories, all 14 questions, and the closing CTA, with zero console errors/warnings', () => {
    renderAt('/faq');

    expect(
      screen.getByRole('heading', { level: 1, name: /straight answers before you book a call/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/questions, answered/i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: /pricing & plans/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /data, security & integrations/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /working with anchorpoint/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /do you offer a free trial\?/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /is our industry a good fit for agentic ai\?/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /\?$/ })).toHaveLength(14);

    expect(screen.getByRole('heading', { level: 3, name: /still have questions\?/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /book a free agent audit/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /or email hello@anchorpoint\.ai/i })).toBeInTheDocument();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('sets the document title to "FAQ — Anchorpoint AI"', () => {
    renderAt('/faq');
    expect(document.title).toBe('FAQ — Anchorpoint AI');
  });

  it('moves focus to the <h1> on navigating to /faq', () => {
    renderAt('/faq');
    expect(
      screen.getByRole('heading', { level: 1, name: /straight answers before you book a call/i })
    ).toHaveFocus();
  });

  it('has no heading level skipped, in the exact order specified by §8.8', () => {
    renderAt('/faq');
    const headings = screen
      .getAllByRole('heading')
      .map((h) => Number(h.tagName[1]));

    expect(headings[0]).toBe(1);
    let prev = headings[0];
    headings.forEach((level) => {
      expect(level).toBeLessThanOrEqual(prev + 1);
      prev = level;
    });
    // 1 h1 (page title), 3 h2s (categories). h3 count is 14 questions + 1
    // closing-CTA "Still have questions?" (page content) plus the shared
    // Footer's 3 column headings ("Company"/"Resources"/"Legal", also real
    // h3s, unchanged from the landing page) = 18.
    expect(headings.filter((l) => l === 1)).toHaveLength(1);
    expect(headings.filter((l) => l === 2)).toHaveLength(3);
    expect(headings.filter((l) => l === 3)).toHaveLength(18);
  });

  it('accordion rows toggle independently (multi-open, not exclusive) with correct aria wiring', async () => {
    const user = userEvent.setup();
    renderAt('/faq');

    const trigger1 = screen.getByRole('button', { name: /do you offer a free trial\?/i });
    const trigger2 = screen.getByRole('button', { name: /what happens when my audit engagement ends\?/i });

    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    const panel1Id = trigger1.getAttribute('aria-controls');
    const panel1 = document.getElementById(panel1Id);
    expect(panel1).toHaveAttribute('role', 'region');
    expect(panel1).toHaveAttribute('aria-labelledby', trigger1.id);

    await user.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(within(panel1).getByText(/not in the software-trial sense/i)).toBeInTheDocument();

    // Opening a second item must not close the first — explicitly not an
    // exclusive accordion (spec §8.7).
    await user.click(trigger2);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');

    await user.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports Arrow/Home/End keyboard navigation across all 14 triggers, without wrapping', async () => {
    const user = userEvent.setup();
    renderAt('/faq');

    const triggers = screen.getAllByRole('button', { name: /\?$/ });
    expect(triggers).toHaveLength(14);

    triggers[0].focus();
    expect(triggers[0]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(triggers[1]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(triggers[0]).toHaveFocus();

    // Does not wrap past the first item.
    await user.keyboard('{ArrowUp}');
    expect(triggers[0]).toHaveFocus();

    await user.keyboard('{End}');
    expect(triggers[13]).toHaveFocus();

    // Does not wrap past the last item.
    await user.keyboard('{ArrowDown}');
    expect(triggers[13]).toHaveFocus();

    await user.keyboard('{Home}');
    expect(triggers[0]).toHaveFocus();
  });

  it('has no critical or serious automated accessibility violations', async () => {
    const { container } = renderAt('/faq');
    const results = await axe(container);
    const seriousOrWorse = results.violations.filter((v) =>
      ['critical', 'serious'].includes(v.impact)
    );
    expect(seriousOrWorse).toEqual([]);
  });
});

describe('Route-aware Navbar/Footer integration (spec §8.2/§8.3)', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('shows a "FAQ" nav link that is a real route link, active only on /faq', () => {
    renderAt('/');
    const header = screen.getByRole('banner');
    const faqLink = within(header).getByRole('link', { name: 'FAQ' });
    expect(faqLink).toHaveAttribute('href', '/faq');
    expect(faqLink).not.toHaveAttribute('aria-current');
  });

  it('marks the FAQ nav link as the current-page active link when on /faq', () => {
    renderAt('/faq');
    const header = screen.getByRole('banner');
    const faqLink = within(header).getAllByRole('link', { name: 'FAQ' })[0];
    expect(faqLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders the other nav links as cross-page navigations back to "/" when on /faq', () => {
    renderAt('/faq');
    const header = screen.getByRole('banner');
    const pricingLink = within(header).getAllByRole('link', { name: 'Pricing' })[0];
    expect(pricingLink).toHaveAttribute('href', '/#pricing');
  });

  it('Footer Resources list renders "FAQ" as a real link to /faq', () => {
    renderAt('/');
    const footer = screen.getByRole('contentinfo');
    const faqLink = within(footer).getByRole('link', { name: 'FAQ' });
    expect(faqLink).toHaveAttribute('href', '/faq');
  });

  it('Footer Company links become cross-page navigations back to "/" when on /faq', () => {
    renderAt('/faq');
    const footer = screen.getByRole('contentinfo');
    const servicesLink = within(footer).getByRole('link', { name: 'Services' });
    expect(servicesLink).toHaveAttribute('href', '/#services');
  });
});
