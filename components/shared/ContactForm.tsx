'use client';

import Link from 'next/link';
import { useState } from 'react';
import { contactSchema, type ContactInput } from '@/lib/schemas';
import { site } from '@/config/site';

type Errors = Partial<Record<keyof ContactInput, string>>;

/**
 * Flyward's "Shall we begin?" card: a light form panel plus a narrow dark column with the title,
 * line art and the send button.
 */
export function ContactForm({ className = '' }: { className?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as keyof ContactInput] ??= issue.message;
      setErrors(errs);
      const first = Object.keys(errs)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const field = (name: keyof ContactInput, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="field">
      <label htmlFor={`cf-${name}`} className="eyebrow text-shell/70">
        {label}
      </label>
      <input
        id={`cf-${name}`}
        name={name}
        className="field-input border-shell/30 text-[0.9375rem] focus:border-terracotta"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `cf-${name}-err` : undefined}
        {...props}
      />
      {errors[name] && (
        <p id={`cf-${name}-err`} className="text-[0.8125rem] text-[#f1b49b]">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className={`bg-harbor text-shell shadow-2xl shadow-harbor-deep/30 ${className}`}>
      {status === 'sent' ? (
        <div className="flex min-h-[24rem] flex-col justify-center gap-4 p-6 md:p-8" role="status">
          <p className="tight-display text-[2.25rem]">Thank you</p>
          <p className="max-w-md text-[0.9375rem] font-light leading-relaxed text-shell/85">
            Your message is with us. Your specialist will reply within one working day (Lisbon time).
          </p>
          <p className="tight-display text-[1.5rem]">{site.signOff}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-label="Contact form">
          <p className="px-6 pt-6 text-[1rem] font-light text-shell/85 md:px-8">
            Tell us a little about your season and we’ll come back with the best options.
          </p>
          <div className="grid gap-x-8 gap-y-7 p-6 md:grid-cols-2 md:p-8">
            {field('firstName', 'First name', { autoComplete: 'given-name', required: true })}
            {field('lastName', 'Last name', { autoComplete: 'family-name', required: true })}
            <div className="md:col-span-2">{field('email', 'Email address', { type: 'email', autoComplete: 'email', required: true })}</div>
            <div className="field md:col-span-2">
              <label htmlFor="cf-message" className="eyebrow text-shell/70">
                Message: where, when, who’s coming
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                required
                className="field-input resize-y border-shell/30 text-[0.9375rem] focus:border-terracotta"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cf-message-err' : undefined}
              />
              {errors.message && (
                <p id="cf-message-err" className="text-[0.8125rem] text-[#f1b49b]">
                  {errors.message}
                </p>
              )}
            </div>
            <div className="hidden" aria-hidden>
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <p className="text-[0.8125rem] text-shell/70 md:col-span-2">
              Prefer to tell us everything at once?{' '}
              <Link href="/plan-my-season" className="underline underline-offset-2 hover:text-terracotta">
                Use the full season planner →
              </Link>
            </p>
            {status === 'error' && (
              <p className="text-[0.8125rem] text-[#f1b49b] md:col-span-2" role="alert">
                Something went wrong. Please try again or email {site.contact.email}.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group flex h-14 w-full items-center justify-between bg-shell px-6 text-[1rem] font-medium text-harbor transition-colors hover:bg-terracotta hover:text-shell disabled:opacity-60 md:px-8"
          >
            <span>{status === 'sending' ? 'Sending…' : 'Shall we begin?'}</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
