import SectionHeader from '../ui/SectionHeader.jsx';
import PricingTile from '../ui/PricingTile.jsx';
import useSmoothScrollTo from '../../hooks/useSmoothScrollTo.js';

const TIERS = [
  {
    id: 'audit',
    name: 'Audit',
    price: '$2,800',
    cadence: 'one-time',
    description:
      'A focused 2-week engagement to map your workflows and identify your highest-ROI agent opportunities.',
    includes: [
      'Full workflow audit across 3 departments',
      'Prioritized agent opportunity roadmap',
      'ROI estimate for each use case',
      '90-minute findings presentation',
      '30 days of email support after delivery',
    ],
    ctaLabel: 'Start with an Audit',
    buttonVariant: 'secondary',
    featured: false,
    orderClassName: 'order-2 lg:order-1',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$6,500',
    cadence: '/month, 3-month minimum',
    description:
      'End-to-end design, build, and launch of your first 1–3 AI agents, fully integrated into your existing stack.',
    includes: [
      'Everything in Audit',
      'Up to 3 custom agents designed & deployed',
      'Integration with your existing CRM/helpdesk/tools',
      '2 live team training sessions',
      'Bi-weekly optimization check-ins',
      'Dedicated Slack support channel',
    ],
    ctaLabel: 'Start Growing',
    buttonVariant: 'primary',
    featured: true,
    orderClassName: 'order-1 lg:order-2',
  },
  {
    id: 'partner',
    name: 'Partner',
    price: 'Starting at $12,000',
    cadence: '/month, custom scoped',
    description:
      'Ongoing agent design, monitoring, and expansion — a fractional AI operations team for your business.',
    includes: [
      'Everything in Growth',
      'Unlimited agent iteration & new use-case design',
      'Dedicated reliability monitoring & monthly reporting',
      'Quarterly strategy roadmap review',
      'Priority same-day support',
      'Named senior AI strategist as your point of contact',
    ],
    ctaLabel: 'Talk to a Strategist',
    buttonVariant: 'secondary',
    featured: false,
    orderClassName: 'order-3 lg:order-3',
  },
];

export default function Pricing() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section
      id="pricing"
      aria-label="Engagement models and pricing"
      className="bg-gray-50 py-16 md:py-24 scroll-mt-16 md:scroll-mt-[72px]"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="ENGAGEMENT MODELS"
          title="Simple pricing, scoped to how far you want to go."
          subhead="Start with clarity, or go all-in on a fully managed rollout. Every tier includes a named point of contact — never a ticket queue."
        />

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 md:gap-6">
          {TIERS.map((tier) => (
            <div key={tier.id} className={`${tier.orderClassName} lg:flex-1`}>
              <PricingTile {...tier} onCtaClick={scrollTo('contact')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
