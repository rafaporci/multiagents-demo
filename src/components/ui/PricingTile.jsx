import { Check } from 'lucide-react';
import Button from './Button.jsx';

/**
 * Pricing tile per DESIGN_SPEC.md sections 5.7 / 6.5.
 * The "Growth" tier is visually emphasized (border, shadow, scale, badge).
 */
export default function PricingTile({
  name,
  price,
  cadence,
  description,
  includes,
  ctaLabel,
  featured = false,
  buttonVariant,
  onCtaClick,
}) {
  return (
    <div
      className={`relative flex flex-col h-full bg-white rounded-tile p-8 transition-shadow duration-200 ease-out hover:shadow-[0_18px_36px_rgba(15,23,42,0.16)] ${
        featured
          ? 'border-2 border-brand-primary shadow-[0_12px_32px_rgba(47,93,159,0.18)] lg:scale-[1.03]'
          : 'border border-gray-200 shadow-[0_1px_3px_rgba(15,23,42,0.08)]'
      }`}
    >
      {featured && (
        <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-brand-accent text-gray-900 font-body font-semibold text-sm px-4 py-[6px] rounded-full whitespace-nowrap">
          Most Popular
        </span>
      )}

      <h3 className="font-heading font-semibold text-xl text-gray-900">{name}</h3>
      <p className="mt-2">
        <span className="font-heading font-bold text-[32px] lg:text-[40px] text-gray-900">
          {price}
        </span>{' '}
        <span className="font-body text-sm text-gray-500">{cadence}</span>
      </p>
      <p className="mt-4 font-body text-base leading-[26px] text-gray-700">{description}</p>

      <hr className="my-6 border-t border-gray-200" />

      <ul className="flex-1 space-y-2 list-none p-0 m-0">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check size={16} color="#15803D" strokeWidth={2.5} className="mt-[3px] shrink-0" aria-hidden="true" />
            <span className="font-body text-sm text-gray-700">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button variant={buttonVariant} fullWidth onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
