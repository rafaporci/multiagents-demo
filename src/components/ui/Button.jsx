/**
 * Primary / secondary button per DESIGN_SPEC.md section 6.2 / 6.3.
 * Supports default / hover / focus-visible / active / disabled / loading states.
 */
export default function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  compact = false,
  type = 'button',
  className = '',
  children,
  loadingLabel = 'Sending…',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-body font-semibold text-base leading-6 transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent';

  const width = fullWidth ? 'w-full' : '';

  const isDisabled = disabled || loading;

  // `compact` gives a slightly tighter padding below the desktop breakpoint,
  // reverting to the spec-exact padding at `lg`. It exists only for the nav's
  // "Book a Call" button, which otherwise doesn't fit the 768-1279px row
  // alongside the wordmark and 5 links (see Navbar.jsx / TEST_REPORT.md Bug #3).
  // Encoding both sizes in one string (rather than layering a second, competing
  // padding utility via `className`) avoids any Tailwind cascade-order ambiguity.
  const paddingClasses =
    variant === 'primary'
      ? compact
        ? 'px-4 py-[10px] lg:px-7 lg:py-[14px]'
        : 'px-7 py-[14px]'
      : compact
      ? 'px-[14.5px] py-[8.5px] lg:px-[26.5px] lg:py-[12.5px]'
      : 'px-[26.5px] py-[12.5px]';

  // Loading is deliberately NOT styled like `disabled`: the spec calls for the
  // button to keep its normal brand-colored background while submitting
  // (only true `disabled` gets the gray/washed-out treatment), so it doesn't
  // read as broken mid-submit.
  const variantClasses =
    variant === 'primary'
      ? [
          paddingClasses,
          'border-none shadow-[0_1px_2px_rgba(15,23,42,0.08)]',
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
            : loading
            ? 'bg-brand-primary text-white cursor-not-allowed shadow-none'
            : 'bg-brand-primary text-white hover:bg-brand-primary-hover hover:shadow-[0_4px_12px_rgba(47,93,159,0.35)] active:bg-brand-primary-active active:shadow-none cursor-pointer',
        ].join(' ')
      : [
          paddingClasses,
          'border-[1.5px] bg-transparent',
          disabled
            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
            : loading
            ? 'border-brand-primary text-brand-primary cursor-not-allowed'
            : 'border-brand-primary text-brand-primary hover:bg-brand-primary/[0.08] active:bg-brand-primary/[0.14] cursor-pointer',
        ].join(' ');

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={`${base} ${width} ${variantClasses} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-4 rounded-full border-2 border-white/30 animate-spin600"
          style={{ borderTopColor: '#FFFFFF' }}
        />
      )}
      {loading ? loadingLabel : children}
    </button>
  );
}
