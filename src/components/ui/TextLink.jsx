import { ChevronRight } from 'lucide-react';

/**
 * Text link with a trailing chevron, used for secondary CTAs that scroll
 * to another section (e.g. hero "See How It Works", services "See Pricing & Packages").
 */
export default function TextLink({ href, onClick, children, className = '', center = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-1 font-body font-semibold text-base text-brand-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent rounded ${
        center ? 'justify-center' : ''
      } ${className}`}
    >
      {children}
      <ChevronRight size={18} aria-hidden="true" />
    </a>
  );
}
