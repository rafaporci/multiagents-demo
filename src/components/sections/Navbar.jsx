import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import AnchorMark from '../ui/AnchorMark.jsx';
import Button from '../ui/Button.jsx';
import useSmoothScrollTo from '../../hooks/useSmoothScrollTo.js';
import useScrollSpy from '../../hooks/useScrollSpy.js';

const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Results', id: 'results' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Contact', id: 'contact' },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useSmoothScrollTo();
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const getFocusable = () =>
      Array.from(menuRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      // Focus trap: keep Tab/Shift+Tab cycling within the open dialog only,
      // per the WAI-ARIA modal dialog pattern (aria-modal="true" implies this).
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !menuRef.current?.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !menuRef.current?.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    // Hide the rest of the page from assistive tech and CSS rendering while
    // the full-screen dialog is open — it visually and semantically covers
    // this content, so it shouldn't remain in the accessibility tree or be
    // reachable if the focus trap above is ever bypassed.
    const mainEl = document.getElementById('main-content');
    const footerEl = document.querySelector('footer');
    mainEl?.setAttribute('aria-hidden', 'true');
    footerEl?.setAttribute('aria-hidden', 'true');
    if (mainEl) mainEl.style.visibility = 'hidden';
    if (footerEl) footerEl.style.visibility = 'hidden';

    // Move focus into the menu when it opens.
    const firstFocusable = getFocusable()[0];
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      mainEl?.removeAttribute('aria-hidden');
      footerEl?.removeAttribute('aria-hidden');
      if (mainEl) mainEl.style.visibility = '';
      if (footerEl) footerEl.style.visibility = '';
    };
  }, [menuOpen]);

  const handleNavClick = (id) => (e) => {
    scrollTo(id)(e);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 md:h-[72px] bg-white/[0.92] backdrop-blur-sm transition-shadow duration-150 ${
        scrolled ? 'shadow-[0_1px_2px_rgba(15,23,42,0.06),0_2px_8px_rgba(15,23,42,0.06)] !bg-white' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className="nav-container h-full flex items-center justify-between"
      >
        <a
          href="#hero"
          onClick={handleNavClick('hero')}
          className="flex items-center gap-2 font-heading font-bold text-xl whitespace-nowrap rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <AnchorMark color="#2F5D9F" size={32} />
          <span>
            <span className="text-gray-900">Anchorpoint</span>{' '}
            <span className="text-brand-primary">AI</span>
          </span>
        </a>

        {/* Desktop / tablet: links + CTA grouped together with a fixed 24px
            gap between them (spec 5.1), independent of how much leftover
            flex space there is between the logo and this group. */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-3 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={handleNavClick(link.id)}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`relative text-sm font-medium py-1 whitespace-nowrap rounded transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                    activeId === link.id
                      ? 'text-brand-primary after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-[7px] after:h-[2px] after:bg-brand-primary'
                      : 'text-gray-700 hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button variant="primary" compact onClick={handleNavClick('contact')} className="whitespace-nowrap">
            Book a Call
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} color="#0F172A" /> : <Menu size={24} color="#0F172A" />}
        </button>
      </nav>

      {/* Mobile full-screen overlay menu, rendered via a portal to
          document.body. It MUST NOT be a DOM descendant of the <header>
          above: that header has `backdrop-blur-sm` (backdrop-filter), which
          per the CSS spec creates a new containing block for `position:
          fixed` descendants. Nested inside the header, this overlay's
          `fixed inset-0` would resolve against the header's own ~64-72px
          box instead of the viewport, collapsing to 0 height (see
          TEST_REPORT.md Bug #1). Rendering it as a sibling of <header> in
          the body avoids that containing-block interaction entirely. */}
      {menuOpen &&
        createPortal(
          <div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="md:hidden fixed inset-0 top-16 bg-white z-[60] flex flex-col items-center justify-center px-6 animate-slide-down motion-reduce:animate-none"
          >
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={handleNavClick(link.id)}
                    className="font-heading font-semibold text-2xl text-gray-900 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="w-full max-w-sm mt-12">
              <Button variant="primary" fullWidth onClick={handleNavClick('contact')}>
                Book a Call
              </Button>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
