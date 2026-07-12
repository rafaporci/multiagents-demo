import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero.jsx';
import ProblemSection from './ProblemSection.jsx';
import Services from './Services.jsx';
import HowItWorks from './HowItWorks.jsx';
import Testimonials from './Testimonials.jsx';
import Pricing from './Pricing.jsx';
import FinalCTA from './FinalCTA.jsx';
import useSmoothScrollTo from '../../hooks/useSmoothScrollTo.js';

/**
 * The single-page landing-page body (spec §5). Extracted out of App.jsx per
 * spec §8.1 so it can live at route "/" alongside the new "/faq" route,
 * while Navbar/Footer stay mounted once as shared chrome around <Routes>.
 */
export default function LandingPage() {
  const location = useLocation();
  const scrollTo = useSmoothScrollTo();

  useEffect(() => {
    document.title = 'Anchorpoint AI — Agentic AI, grounded in your business.';
  }, []);

  // Cross-page anchor scrolling (spec §8.1): React Router v6 does not
  // auto-scroll to a URL hash on route change, so when a visitor arrives
  // here via a Link like `/#pricing` (e.g. from the FAQ page's Navbar),
  // scroll to that section once its DOM has rendered. Also re-runs if the
  // hash changes while already on this route.
  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.slice(1);

    // Wait a tick so the section elements (already always rendered here,
    // but this keeps the mechanism robust/future-proof) have painted before
    // we measure/scroll to them.
    const raf = requestAnimationFrame(() => scrollTo(id)());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return (
    <>
      <Hero />
      <ProblemSection />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </>
  );
}
