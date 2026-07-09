import { useState } from 'react';
import { Linkedin } from 'lucide-react';
import AnchorMark from '../ui/AnchorMark.jsx';
import useSmoothScrollTo from '../../hooks/useSmoothScrollTo.js';

const COMPANY_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Results', id: 'results' },
  { label: 'Pricing', id: 'pricing' },
];

const RESOURCE_LINKS = ['Blog', 'Case Studies', 'FAQ'];
const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service'];

function XGlyph({ size = 20, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="4" x2="16" y2="16" />
      <line x1="16" y1="4" x2="4" y2="16" />
    </svg>
  );
}

function FooterLinkList({ heading, children }) {
  return (
    <div>
      <h3 className="font-body font-semibold text-sm text-white mb-4">{heading}</h3>
      <ul className="list-none p-0 m-0 space-y-2">{children}</ul>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Demo only — no real network request.
    setStatus('success');
  };

  return (
    <div className="mt-6">
      <label htmlFor="newsletter-email" className="block font-body text-sm font-medium text-gray-300 mb-2">
        Get monthly agentic AI insights
      </label>
      {status === 'success' ? (
        <p role="status" className="font-body text-sm text-white">
          Subscribed. (Demo only — no email was sent.)
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 h-11 px-3 rounded-lg border border-gray-700 bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-2 focus:border-brand-primary"
          />
          <button
            type="submit"
            className="shrink-0 h-11 px-4 rounded-lg bg-brand-primary text-white font-body font-semibold text-sm hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  const scrollTo = useSmoothScrollTo();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-page pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-3 lg:col-span-1">
            <a href="#hero" onClick={scrollTo('hero')} className="inline-flex items-center gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <AnchorMark color="#FFFFFF" size={28} />
              <span className="font-heading font-bold text-lg text-white">Anchorpoint AI</span>
            </a>
            <p className="mt-4 font-body text-sm text-gray-400 max-w-xs">
              Agentic AI, grounded in your business.
            </p>
            <a href="mailto:hello@anchorpoint.ai" className="mt-2 inline-block font-body text-sm text-gray-300 hover:text-white hover:underline">
              hello@anchorpoint.ai
            </a>
            <NewsletterForm />
          </div>

          <FooterLinkList heading="Company">
            {COMPANY_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={scrollTo(link.id)}
                  className="font-body text-sm text-gray-300 hover:text-white hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </FooterLinkList>

          <FooterLinkList heading="Resources">
            {RESOURCE_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="font-body text-sm text-gray-300 hover:text-white hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </FooterLinkList>

          <FooterLinkList heading="Legal">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="font-body text-sm text-gray-300 hover:text-white hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </FooterLinkList>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-gray-300 text-center md:text-left">
            © 2026 Anchorpoint AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Anchorpoint AI on LinkedIn"
              className="text-gray-400 hover:text-white rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              aria-label="Anchorpoint AI on X"
              className="text-gray-400 hover:text-white rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <XGlyph size={20} color="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
