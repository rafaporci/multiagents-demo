import Button from '../ui/Button.jsx';
import TextLink from '../ui/TextLink.jsx';
import HeroIllustration from '../ui/HeroIllustration.jsx';
import useSmoothScrollTo from '../../hooks/useSmoothScrollTo.js';

export default function Hero() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section
      id="hero"
      tabIndex={-1}
      aria-label="Introduction"
      className="relative overflow-hidden bg-white pt-[160px] md:pt-[168px] pb-16 scroll-mt-16 md:scroll-mt-[72px]"
    >
      {/* Decorative radial gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(47,93,159,0.04), transparent 60%)',
        }}
      />

      <div className="container-page relative grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-12">
        <div className="lg:col-span-7">
          <p className="font-body font-semibold text-xs tracking-[0.08em] uppercase text-brand-primary mb-4">
            AI AGENTS FOR GROWING BUSINESSES
          </p>
          <h1 className="font-heading font-bold text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] lg:text-[56px] lg:leading-[64px] tracking-[-0.02em] text-brand-primary-dark">
            Your business, minus the busywork.
          </h1>
          <p className="mt-4 font-body text-[17px] leading-[26px] lg:text-lg lg:leading-7 text-gray-700 max-w-[560px]">
            Anchorpoint AI designs and deploys AI agents that answer tickets, qualify leads, and
            keep your back office running — so your team can focus on the work only humans can
            do.
          </p>

          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <Button variant="primary" onClick={scrollTo('contact')} className="w-full md:w-auto">
              Book a Free Agent Audit
            </Button>
            <TextLink
              href="#how-it-works"
              onClick={scrollTo('how-it-works')}
              center
              className="w-full md:w-auto md:justify-start"
            >
              See How It Works
            </TextLink>
          </div>

          <p className="mt-4 font-body text-sm text-gray-500">
            No commitment. No sales pitch. Just a clear roadmap.
          </p>
        </div>

        <div className="lg:col-span-5 mt-12 lg:mt-0">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
