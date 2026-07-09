import Navbar from './components/sections/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import ProblemSection from './components/sections/ProblemSection.jsx';
import Services from './components/sections/Services.jsx';
import HowItWorks from './components/sections/HowItWorks.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Pricing from './components/sections/Pricing.jsx';
import FinalCTA from './components/sections/FinalCTA.jsx';
import Footer from './components/sections/Footer.jsx';

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-brand-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProblemSection />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
