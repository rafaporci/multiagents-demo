/**
 * Returns a click handler that scrolls smoothly to the target section id,
 * honoring prefers-reduced-motion (falls back to an instant jump).
 */
export default function useSmoothScrollTo() {
  return (id) => (event) => {
    if (event) event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    el.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    // Keep focus management sane for keyboard/AT users landing on a new section.
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };
}
