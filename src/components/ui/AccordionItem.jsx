import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * A single FAQ accordion row, per DESIGN_SPEC.md §8.7 (WAI-ARIA Accordion
 * pattern). Multiple items may be open at once — there is no "close the
 * others" behavior, by design (see §8.7's rationale).
 *
 * `index` is this item's position in the page-wide (not per-category) list
 * of trigger buttons, and `triggerRefs` is a ref to the page-wide array of
 * trigger DOM nodes — both are needed so Home/End (and non-wrapping
 * Up/Down) can move focus across category boundaries per §8.7.
 */
export default function AccordionItem({ n, index, question, answer, triggerRefs, isLast }) {
  const [open, setOpen] = useState(false);
  const triggerId = `faq-trigger-${n}`;
  const panelId = `faq-panel-${n}`;

  const handleKeyDown = (event) => {
    const refs = triggerRefs.current;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        refs[index + 1]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        refs[index - 1]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        refs[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        refs[refs.length - 1]?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className={isLast ? '' : 'border-b border-gray-200'}>
      <h3>
        <button
          ref={(el) => {
            triggerRefs.current[index] = el;
          }}
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleKeyDown}
          className={`w-full flex items-center justify-between gap-4 text-left py-6 px-6 md:px-8 font-heading font-semibold text-[18px] leading-[26px] md:text-[19px] md:leading-[27px] lg:text-xl lg:leading-7 transition-colors duration-150 ease-out hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary focus-visible:rounded ${
            open ? 'text-brand-primary' : 'text-gray-900'
          }`}
        >
          <span>{question}</span>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 ease-in-out ${
              open ? 'rotate-180 text-brand-primary' : 'text-gray-500'
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden" aria-hidden={!open}>
          <p className="px-6 md:px-8 pb-6 font-body text-base leading-[26px] text-gray-700">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
