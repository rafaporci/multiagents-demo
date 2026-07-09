import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia — provide a stub used by
// prefers-reduced-motion checks and the scroll-spy/Navbar hooks.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom does not implement IntersectionObserver — provide a minimal stub
// so components using useScrollSpy can render in tests.
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!window.Element.prototype.scrollIntoView) {
  window.Element.prototype.scrollIntoView = () => {};
}
