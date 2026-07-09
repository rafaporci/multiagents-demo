/**
 * Text / email input per DESIGN_SPEC.md section 6.7.
 * Uses box-sizing: border-box globally (see index.css) so the focus state's
 * thicker border doesn't shift layout.
 */
export function TextField({ label, id, error, ...rest }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        className={`w-full h-12 px-4 rounded-lg border bg-white text-gray-900 text-base placeholder:text-gray-400 transition-colors duration-150 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed ${
          error
            ? 'border-2 border-error-500 focus:border-2 focus:border-error-500'
            : 'border-gray-300 hover:border-gray-400 focus:border-2 focus:border-brand-primary focus:shadow-[0_0_0_4px_rgba(47,93,159,0.12)]'
        }`}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 font-body text-sm text-error-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextareaField({ label, id, error, ...rest }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-body text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        rows={4}
        className={`w-full min-h-[140px] px-4 py-3 rounded-lg border bg-white text-gray-900 text-base placeholder:text-gray-400 transition-colors duration-150 focus:outline-none resize-y disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed ${
          error
            ? 'border-2 border-error-500'
            : 'border-gray-300 hover:border-gray-400 focus:border-2 focus:border-brand-primary focus:shadow-[0_0_0_4px_rgba(47,93,159,0.12)]'
        }`}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 font-body text-sm text-error-500">
          {error}
        </p>
      )}
    </div>
  );
}
