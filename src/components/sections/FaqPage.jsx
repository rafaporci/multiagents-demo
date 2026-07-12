import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import AccordionItem from '../ui/AccordionItem.jsx';
import { FAQ_CATEGORIES, FAQ_TOTAL_QUESTIONS } from './faqData.js';

/**
 * The FAQ page, spec §8. A separate route (not a landing-page section) per
 * the integration decision in §8.1.
 */
export default function FaqPage() {
  const h1Ref = useRef(null);
  // Page-wide (not per-category) array of trigger-button DOM nodes, sized to
  // the total question count, so Home/End/Arrow-key navigation in §8.7 can
  // move focus across category boundaries without wrapping.
  const triggerRefs = useRef(new Array(FAQ_TOTAL_QUESTIONS).fill(null));

  useEffect(() => {
    document.title = 'FAQ — Anchorpoint AI';
  }, []);

  // Route-change focus management (spec §8.8): move focus to the <h1> on
  // navigating to /faq, so screen reader users aren't left with focus
  // stranded on whichever Navbar/Footer link they just activated.
  useEffect(() => {
    h1Ref.current?.focus();
  }, []);

  return (
    <>
      {/* Page header block (spec §8.6) */}
      <section className="bg-white pt-[128px] md:pt-[168px] pb-8 md:pb-16">
        <div className="container-page">
          <div className="max-w-[640px] mx-auto text-center">
            <p className="font-body font-semibold text-xs tracking-[0.08em] uppercase text-brand-primary mb-4">
              QUESTIONS, ANSWERED
            </p>
            <h1
              ref={h1Ref}
              tabIndex={-1}
              className="font-heading font-bold text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] lg:text-[56px] lg:leading-[64px] tracking-[-0.02em] text-brand-primary-dark focus:outline-none"
            >
              Straight answers before you book a call.
            </h1>
            <p className="mt-4 font-body text-[17px] leading-[26px] lg:text-lg lg:leading-7 text-gray-700">
              We wrote these because operators asked us — not because a template told us to. If
              something below doesn&rsquo;t cover it, ask us directly; a real person replies
              within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Category blocks (spec §8.6) */}
      <div className="bg-white">
        <div className="container-page">
          <div className="max-w-[720px] mx-auto">
            {FAQ_CATEGORIES.map((category, categoryIndex) => (
              <div key={category.heading} className={categoryIndex === 0 ? '' : 'mt-8 md:mt-16'}>
                {/* Semantically <h2> (correct outline under the page <h1>, spec §8.8) but
                    visually styled at the H3 scale — an intentional decoupling per §8.6. */}
                <h2 className="font-heading font-semibold text-gray-900 text-[22px] leading-[30px] md:text-[24px] md:leading-[32px] lg:text-[28px] lg:leading-[36px]">
                  {category.heading}
                </h2>
                <div className="mt-8 bg-white border border-gray-200 rounded-card overflow-hidden">
                  {category.questions.map((item, questionIndex) => (
                    <AccordionItem
                      key={item.n}
                      n={item.n}
                      index={item.n - 1}
                      question={item.q}
                      answer={item.a}
                      triggerRefs={triggerRefs}
                      isLast={questionIndex === category.questions.length - 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing CTA band (spec §8.6) */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-page">
          <div className="max-w-[640px] mx-auto text-center">
            <h3 className="font-heading font-semibold text-gray-900 text-[22px] leading-[30px] md:text-[24px] md:leading-[32px] lg:text-[28px] lg:leading-[36px]">
              Still have questions?
            </h3>
            <p className="mt-2 font-body text-base leading-[26px] text-gray-700">
              We&rsquo;d rather talk it through than have you guess. Ask us anything above on a
              real call — no script, no ticket queue, no obligation.
            </p>
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-6">
              <Button as={Link} to="/#contact" variant="primary" className="w-full md:w-auto">
                Book a Free Agent Audit
              </Button>
              <a
                href="mailto:hello@anchorpoint.ai"
                className="font-body text-sm text-gray-500 hover:text-brand-primary hover:underline text-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                or email hello@anchorpoint.ai
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
