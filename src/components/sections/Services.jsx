import { ClipboardCheck, Workflow, LifeBuoy } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';
import TextLink from '../ui/TextLink.jsx';
import useSmoothScrollTo from '../../hooks/useSmoothScrollTo.js';

const SERVICES = [
  {
    Icon: ClipboardCheck,
    title: 'Agent Audit & Roadmap',
    description:
      'We map your busiest workflows and hand you a prioritized list of exactly where an AI agent will save the most time and money — before you spend a dollar on build.',
  },
  {
    Icon: Workflow,
    title: 'Agent Implementation',
    description:
      'We design, build, and launch AI agents inside the tools you already use — your helpdesk, CRM, and inbox — fully integrated, not a bolt-on app nobody opens.',
  },
  {
    Icon: LifeBuoy,
    title: 'Training & Ongoing Support',
    description:
      'We train your team to run alongside their new agents and stay on call to tune, expand, and troubleshoot as your business changes.',
  },
];

export default function Services() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section
      id="services"
      aria-label="What we do"
      className="bg-white py-16 md:py-24 scroll-mt-16 md:scroll-mt-[72px]"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="WHAT WE DO"
          title="Three ways we put agents to work for you."
          subhead="Whether you need a clear-eyed audit or a fully managed rollout, we meet you where you are."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map(({ Icon, title, description }, i) => (
            <Card
              key={title}
              className={i === 2 ? 'md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0' : ''}
            >
              <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                <Icon size={28} color="#2F5D9F" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading font-semibold text-xl text-gray-900">{title}</h3>
              <p className="mt-2 font-body text-base leading-[26px] text-gray-700">{description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <TextLink href="#pricing" onClick={scrollTo('pricing')} center>
            See Pricing &amp; Packages
          </TextLink>
        </div>
      </div>
    </section>
  );
}
