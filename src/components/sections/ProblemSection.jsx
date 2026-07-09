import { Clock, Headset, CircleDollarSign } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';

const STATS = [
  {
    Icon: Clock,
    stat: '22 hrs',
    description: 'Average hours per employee spent weekly on repetitive digital tasks.',
  },
  {
    Icon: Headset,
    stat: '68%',
    description: 'Of inbound support tickets are answerable without a human.',
  },
  {
    Icon: CircleDollarSign,
    stat: '$54K',
    description: 'Estimated annual cost of one unfilled operations hire.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" aria-label="The hidden cost of manual work" className="bg-gray-50 py-16 md:py-24">
      <div className="container-page">
        <SectionHeader
          eyebrow="THE HIDDEN COST"
          title="Manual work is quietly taxing your business."
          subhead="Every unanswered ticket, every manual data-entry pass, every 'I'll get to it Friday' is a small tax your business pays every single week. It adds up faster than most owners realize."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {STATS.map(({ Icon, stat, description }) => (
            <Card key={stat}>
              <Icon size={28} color="#94A3B8" aria-hidden="true" className="mb-4" />
              <p className="font-heading font-bold text-[40px] leading-tight text-brand-primary">
                {stat}
              </p>
              <p className="mt-2 font-body text-base leading-[26px] text-gray-700">{description}</p>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-sm text-gray-400">
          Source: Anchorpoint Workflow Index, 2025 (composite of client workflow audits).
        </p>
      </div>
    </section>
  );
}
