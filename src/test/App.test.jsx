import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App.jsx';

expect.extend(toHaveNoViolations);

describe('App', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error');
    consoleWarnSpy = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('renders every required section with real copy, with zero console errors/warnings', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /your business, minus the busywork/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /manual work is quietly taxing your business/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /three ways we put agents to work for you/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /from first call to live agent in four steps/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /businesses like yours, running lighter/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /simple pricing, scoped to how far you want to go/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /let.s find your first agent/i })).toBeInTheDocument();
    expect(screen.getByText(/anchorpoint ai\. all rights reserved/i)).toBeInTheDocument();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('has no critical or serious automated accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container, {
      rules: {
        // Landmark-uniqueness/region rules can false-positive on decorative
        // wrapper divs in jsdom; core WCAG rules are all still active.
      },
    });
    const seriousOrWorse = results.violations.filter((v) =>
      ['critical', 'serious'].includes(v.impact)
    );
    expect(seriousOrWorse).toEqual([]);
  });

  it('opens and closes the mobile nav menu with keyboard, and Escape returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<App />);

    const openButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(openButton);

    const dialog = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole('link', { name: /pricing/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveFocus();
  });

  it('shows field-level errors on invalid submit and a mock success state on valid submit', async () => {
    const user = userEvent.setup();
    render(<App />);

    const submitButtons = screen.getAllByRole('button', { name: /request my audit call/i });
    const submitButton = submitButtons[submitButtons.length - 1];

    await user.click(submitButton);
    expect(await screen.findByText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your work email/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^name$/i), 'Jordan Reyes');
    await user.type(screen.getByLabelText(/work email/i), 'jordan@example.com');
    await user.type(screen.getByLabelText(/slowing your team down/i), 'Our inbox is buried.');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/request received/i)).toBeInTheDocument();
    });
  });
});
