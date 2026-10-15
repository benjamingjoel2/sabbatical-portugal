'use client';

import Link from 'next/link';
import { useState } from 'react';
import { contactSchema, type ContactInput } from '@/lib/schemas';
import { site } from '@/config/site';
import { PillButton } from './Buttons';

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
      <label htmlFor={`cf-${name}`} className="field-label">
        {label}
      </label>
      <input
        id={`cf-${name}`}
        name={name}
        className="field-input"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `cf-${name}-err` : undefined}
        {...props}
      />
      {errors[name] && (
        <p id={`cf-${name}-err`} className="field-error">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className={`grid bg-shell text-harbor shadow-2xl shadow-harbor-deep/20 md:grid-cols-[1fr_15rem] ${className}`}>
      {status === 'sent' ? (
        <div className="flex min-h-[26rem] flex-col justify-center gap-4 p-8 md:col-span-2 md:p-12" role="status">
          <p className="font-display-caps text-display-m">Thank you</p>
          <p className="max-w-md text-[0.9375rem] leading-relaxed">
            Your message is with us. Your specialist will reply within one working day (Lisbon time). If it’s urgent, message
            us on WhatsApp.
          </p>
          <p className="font-display text-xl uppercase tracking-[0.04em]">{site.signOff}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="contents" aria-label="Contact form">
          <div className="grid gap-x-8 gap-y-7 p-6 md:grid-cols-2 md:p-8">
            {field('firstName', 'First name', { autoComplete: 'given-name', required: true })}
            {field('lastName', 'Last name', { autoComplete: 'family-name', required: true })}
            <div className="md:col-span-2">{field('email', 'Email address', { type: 'email', autoComplete: 'email', required: true })}</div>
            <div className="md:col-span-2">
              {field('phone', 'Phone (with country code)', { type: 'tel', autoComplete: 'tel', placeholder: '+44 7700 900000' })}
            </div>
            <div className="field md:col-span-2">
              <label htmlFor="cf-message" className="field-label">
                Message: where, when, who’s coming
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                required
                className="field-input resize-y"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'cf-message-err' : undefined}
              />
              {errors.message && (
                <p id="cf-message-err" className="field-error">
                  {errors.message}
                </p>
              )}
            </div>
            <div className="hidden" aria-hidden>
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>
          </div>
          <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-harbor p-6 text-shell md:p-6">
            <div className="azulejo-pattern absolute inset-0 opacity-[0.12]" aria-hidden />
            <p className="relative font-display text-[1.25rem] uppercase leading-tight tracking-[0.03em]">Shall we begin?</p>
            <div className="relative space-y-4">
              <p className="text-[0.8125rem] leading-snug text-shell/80">
                Prefer to tell us everything at once?{' '}
                <Link href="/plan-my-season" className="underline underline-offset-2 hover:text-terracotta">
                  Use the full season planner →
                </Link>
              </p>
              <PillButton type="submit" tone="light" disabled={status === 'sending'} className="w-full">
                {status === 'sending' ? 'Sending…' : 'Send request'}
              </PillButton>
              {status === 'error' && (
                <p className="text-[0.8125rem] text-shell" role="alert">
                  Something went wrong. Please try again or email {site.contact.email}.
                </p>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
