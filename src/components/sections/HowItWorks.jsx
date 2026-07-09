import { Search, LayoutTemplate, Rocket, TrendingUp } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';

const STEPS = [
  {
    number: 1,
    Icon: Search,
    title: 'Discover',
    description:
      "A 45-minute call and a short workflow questionnaire tell us where your team's time actually goes.",
  },
  {
    number: 2,
    Icon: LayoutTemplate,
    title: 'Design',
    description:
      'We map the exact agent workflow, the tools it touches, and the guardrails it runs inside — and get your sign-off before building anything.',
  },
  {
    number: 3,
    Icon: Rocket,
    title: 'Deploy',
    description:
      "Your agent goes live in a limited pilot first, then rolls out fully once it's proven on real tickets, leads, or tasks.",
  },
  {
    number: 4,
    Icon: TrendingUp,
    title: 'Optimize',
    description: 'We monitor performance monthly and tune the agent as your business and volume grow.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="The process"
      className="bg-white py-16 md:py-24 scroll-mt-16 md:scroll-mt-[72px]"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="THE PROCESS"
          title="From first call to live agent in four steps."
        />

        <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0 m-0">
          {/* Desktop connecting line, through node centers */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-6 h-[2px] bg-gray-200 -z-10"
          />
          {/* Mobile connecting line, behind node circles */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[2px] bg-gray-200 -z-10"
          />

          {STEPS.map(({ number, Icon, title, description }) => (
            <li key={number} className="flex flex-col items-center text-center">
              <div className="relative z-10 w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shrink-0">
                <span className="font-heading font-bold text-white text-lg" aria-hidden="true">
                  {number}
                </span>
              </div>
              <div className="md:max-w-[240px]">
                <Icon size={20} color="#2F5D9F" aria-hidden="true" className="mt-6 mx-auto" />
                <h3 className="mt-2 font-heading font-semibold text-xl text-gray-900">
                  <span className="sr-only">Step {number}: </span>
                  {title}
                </h3>
                <p className="mt-2 font-body text-base leading-[26px] text-gray-700">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
