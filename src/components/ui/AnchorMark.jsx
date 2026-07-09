/**
 * Custom hand-rolled anchor glyph, per DESIGN_SPEC.md section 7.2.
 * Monoline, stroke-based, 24x24 viewBox, round line caps/joins.
 * Used standalone (brand-primary on white) in the nav logo, and in white
 * (on brand-primary fill) inside the hero hub illustration.
 */
export default function AnchorMark({ color = '#2F5D9F', size = 24, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* ring */}
      <circle cx="12" cy="4" r="2" />
      {/* vertical shaft */}
      <line x1="12" y1="6" x2="12" y2="18" />
      {/* crossbar / arms */}
      <line x1="8" y1="10" x2="16" y2="10" />
      {/* left fluke */}
      <path d="M12 18 C 11 18.5, 7 18.5, 6 15" />
      {/* right fluke */}
      <path d="M12 18 C 13 18.5, 17 18.5, 18 15" />
    </svg>
  );
}
