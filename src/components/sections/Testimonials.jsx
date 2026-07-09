import { Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Card from '../ui/Card.jsx';

const TESTIMONIALS = [
  {
    quote: 'We killed our support backlog in six weeks, not six months.',
    name: 'Renata Osei',
    title: 'Owner, Harborlight Dental Group',
    initials: 'RO',
    avatarBg: 'bg-brand-primary',
  },
  {
    quote:
      'Our sales team stopped drowning in follow-up emails. The agent does it better than we did, honestly.',
    name: 'Miguel Ferris',
    title: 'VP Sales, Fenwick & Cole Logistics',
    initials: 'MF',
    avatarBg: 'bg-brand-secondary',
  },
  {
    quote: "Anchorpoint didn't sell us dashboards. They sold us hours back.",
    name: 'Dana Whitfield',
    title: 'COO, Kestrel Manufacturing',
    initials: 'DW',
    avatarBg: 'bg-brand-accent-dark',
  },
];

const CLIENT_LOGOS = [
  'Harborlight Dental Group',
  'Fenwick & Cole Logistics',
  'BrightLeaf Realty',
  'Kestrel Manufacturing',
  'Third Coast Insurance',
  'Palisade Home Services',
];

export default function Testimonials() {
  return (
    <section
      id="results"
      aria-label="Results and testimonials"
      className="bg-white py-16 md:py-24 scroll-mt-16 md:scroll-mt-[72px]"
    >
      <div className="container-page">
        <SectionHeader eyebrow="RESULTS" title="Businesses like yours, running lighter." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map(({ quote, name, title, initials, avatarBg }, i) => (
            <Card
              key={name}
              as="figure"
              className={`!p-8 ${i === 2 ? 'md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0' : ''}`}
            >
              <Quote size={32} color="#2F5D9F" strokeWidth={2} className="opacity-20" aria-hidden="true" />
              <blockquote className="mt-4 font-body italic text-lg leading-7 text-gray-900">
                “{quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  className={`w-10 h-10 rounded-full ${avatarBg} text-white font-heading font-semibold text-base flex items-center justify-center shrink-0`}
                  aria-hidden="true"
                >
                  {initials}
                </span>
                <span>
                  <span className="block font-body font-semibold text-sm text-gray-900">{name}</span>
                  <span className="block font-body text-sm text-gray-500">{title}</span>
                </span>
              </figcaption>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center font-body text-sm text-gray-500">
          Trusted by SMBs across services, logistics, and manufacturing
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-8 list-none p-0">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo} className="font-heading font-semibold text-base text-gray-400">
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
