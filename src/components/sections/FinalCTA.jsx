import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { TextField, TextareaField } from '../ui/FormField.jsx';

function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = 'Enter your name.';
  }
  if (!values.email.trim()) {
    errors.email = 'Enter your work email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.message.trim()) {
    errors.message = "Tell us what's slowing your team down.";
  }
  return errors;
}

export default function FinalCTA() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    // Demo only — no real network request. Simulates latency, then succeeds.
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  return (
    <section
      id="contact"
      aria-label="Book a call"
      className="bg-brand-primary-dark py-16 md:py-24 scroll-mt-16 md:scroll-mt-[72px]"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="lg:col-span-5">
          <h2 className="font-heading font-bold text-[28px] leading-9 md:text-[32px] md:leading-10 lg:text-[40px] lg:leading-[48px] tracking-[-0.01em] text-white">
            Let&rsquo;s find your first agent.
          </h2>
          <p className="mt-4 font-body text-base leading-[26px] lg:text-lg lg:leading-7 text-gray-300">
            Book a free 30-minute audit call. We&rsquo;ll look at one workflow together and tell
            you honestly whether an agent is a fit — before you spend anything.
          </p>
          <p className="mt-4 font-body text-sm text-gray-300">
            No commitment. No sales pitch. We reply within one business day.
          </p>
        </div>

        <div className="lg:col-span-7 mt-12 lg:mt-0 max-w-[560px] mx-auto lg:max-w-none w-full">
          <div className="bg-white rounded-tile p-8 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
            {status === 'success' ? (
              <div role="status" className="text-center py-8">
                <CheckCircle2 size={40} color="#15803D" className="mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-heading font-semibold text-xl text-gray-900">
                  Request received.
                </h3>
                <p className="mt-2 font-body text-base text-gray-700">
                  This is a demo form — no message was actually sent, but in production we&rsquo;d
                  reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Request an audit call">
                <p className="mb-4 font-body text-xs text-gray-500">
                  Demo form — submitting will not send a real message.
                </p>
                <div className="flex flex-col gap-4">
                  <TextField
                    id="cta-name"
                    label="Name"
                    placeholder="Jordan Reyes"
                    value={values.name}
                    onChange={handleChange('name')}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <TextField
                    id="cta-email"
                    label="Work email"
                    type="email"
                    placeholder="jordan@yourcompany.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <TextareaField
                    id="cta-message"
                    label="What's slowing your team down?"
                    placeholder="e.g. our support inbox is buried every Monday morning"
                    value={values.message}
                    onChange={handleChange('message')}
                    error={errors.message}
                  />
                  <Button type="submit" variant="primary" fullWidth loading={status === 'submitting'}>
                    Request My Audit Call
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
