/**
 * Centered header block: eyebrow + H2 + optional subhead, max-width 640px.
 * Reused by Problem, Services, How It Works, Social Proof, and Pricing sections.
 */
export default function SectionHeader({ eyebrow, title, subhead, className = '' }) {
  return (
    <div className={`max-w-[640px] mx-auto text-center mb-12 ${className}`}>
      <p className="font-body font-semibold text-xs tracking-[0.08em] uppercase text-brand-primary mb-4">
        {eyebrow}
      </p>
      <h2 className="font-heading font-bold text-[28px] leading-9 md:text-[32px] md:leading-10 lg:text-[40px] lg:leading-[48px] tracking-[-0.01em] text-gray-900">
        {title}
      </h2>
      {subhead && (
        <p className="mt-4 font-body text-base leading-[26px] lg:text-lg lg:leading-7 text-gray-700">
          {subhead}
        </p>
      )}
    </div>
  );
}
