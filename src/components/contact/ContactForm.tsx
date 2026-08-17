import { useState, type FormEvent } from 'react';
import { Loader2, Send } from 'lucide-react';
import { submitContactForm } from './submitContactForm';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (values.message.trim().length < 20) {
    errors.message = 'Say a little more — at least 20 characters.';
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setStatusMessage(null);

    const result = await submitContactForm(values);

    setStatus(result.ok ? 'success' : 'error');
    setStatusMessage(result.message);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className="text-xs text-ink-faint">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={values.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className="mt-1.5 w-full rounded-md border border-hairline bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint"
          placeholder="Your name"
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-orange">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-xs text-ink-faint">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className="mt-1.5 w-full rounded-md border border-hairline bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-orange">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-xs text-ink-faint">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="mt-1.5 w-full resize-none rounded-md border border-hairline bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint"
          placeholder="What are you building?"
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-orange">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-gold-soft disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} strokeWidth={1.6} className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send Message
            <Send size={14} strokeWidth={1.6} />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && <p className="text-sm text-success">{statusMessage}</p>}
        {status === 'error' && statusMessage && <p className="text-sm text-orange">{statusMessage}</p>}
      </div>
    </form>
  );
}
