/**
 * Generic static card per DESIGN_SPEC.md section 6.4.
 * Used for stat cards, service cards, and testimonial cards (non-interactive).
 */
export default function Card({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`bg-white border border-gray-200 rounded-card p-6 md:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.08)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
