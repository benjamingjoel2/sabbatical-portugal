'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  homeTypeOptions,
  incomeOptions,
  lengthOptions,
  months,
  mustHaveOptions,
  nationalityGroups,
  plannerSchema,
  plannerSteps,
  vibeOptions,
  workspaceOptions,
} from '@/lib/schemas';
import { destinations } from '@/data/destinations';
import type { ImageKey } from '@/data/images';
import { readStorage, removeStorage, writeStorage } from '@/lib/storage';
import { Photo } from '@/components/shared/Photo';
import { ArrowRight } from '@/components/svg/Icons';
import { VisaDisclaimer } from '@/components/shared/VisaDisclaimer';
import { likelyVisaPath, type VisaGuidance } from './visaPath';
import { site } from '@/config/site';
import { useCurrency } from '@/lib/currency';
import { ease } from '@/config/theme';

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

const STEP_KEYS = ['when', 'where', 'life', 'who', 'contact'] as const;
type StepKey = (typeof STEP_KEYS)[number];

const STEP_TITLES: Record<StepKey, string> = {
  when: 'When and how long',
  where: 'Where and what vibe',
  life: 'Your life setup',
  who: 'Who’s coming',
  contact: 'How to reach you',
};

const STEP_IMAGES: Record<StepKey, ImageKey> = {
  when: 'planning',
  where: 'lisbonRooftopsSea',
  life: 'homeLounge',
  who: 'familyBeach',
  contact: 'portoRibeira',
};

interface Child {
  age: string;
  schoolNeeds: string;
}

interface State {
  when: { startMonth: string; startYear: string; length: string; customLength: string; flexible: string };
  where: { vibes: string[]; destinations: string[] };
  life: { remote: string; workspace: string; homeType: string; bedrooms: string; mustHaves: string[] };
  who: {
    adults: string;
    children: Child[];
    nationality: string;
    nationalityDetail: string;
    income: string;
    budget: string;
  };
  contact: {
    name: string;
    email: string;
    notes: string;
    consent: boolean;
  };
}

const initial: State = {
  when: { startMonth: '', startYear: '2027', length: '', customLength: '', flexible: '' },
  where: { vibes: [], destinations: [] },
  life: { remote: '', workspace: '', homeType: '', bedrooms: '1', mustHaves: [] },
  who: { adults: '1', children: [], nationality: '', nationalityDetail: '', income: '', budget: '' },
  contact: { name: '', email: '', notes: '', consent: false },
};

const STORAGE_KEY = 'ps-season-planner-v1';

type Errors = Record<string, string>;

/** zod schemas expect undefined for optional enums rather than '' */
function clean<T extends Record<string, unknown>>(o: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) out[k] = v === '' && k === 'workspace' ? undefined : v;
  return out as T;
}

/* ------------------------------------------------------------------ */
/* Small field primitives (dark card)                                  */
/* ------------------------------------------------------------------ */

const labelCls = 'eyebrow block text-shell/70 tracking-[0.12em]';
const inputCls =
  'mt-2 w-full border-0 border-b border-shell/30 bg-transparent pb-2 pt-1 text-[0.9375rem] text-shell outline-none transition-colors placeholder:text-shell/30 focus:border-terracotta';

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.8125rem] text-[#f1b49b]">
      {msg}
    </p>
  );
}

function Chips({
  name,
  legend,
  options,
  value,
  onChange,
  multiple = false,
  error,
  labels,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multiple?: boolean;
  error?: string;
  labels: Record<string, string>;
}) {
  const selected = (o: string) => (multiple ? (value as string[]).includes(o) : value === o);
  const toggle = (o: string) => {
    if (!multiple) return onChange(o);
    const arr = value as string[];
    onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
  };
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined} aria-invalid={!!error}>
      <legend className={labelCls}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <label
            key={o}
            className={`cursor-pointer border px-3 py-1.5 text-[0.8125rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azulejo-mist ${
              selected(o) ? 'border-shell bg-shell text-harbor' : 'border-shell/30 text-shell hover:border-shell'
            }`}
          >
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={o}
              checked={selected(o)}
              onChange={() => toggle(o)}
              className="sr-only"
            />
            {labels[o] ?? o}
          </label>
        ))}
      </div>
      <ErrorText id={`${name}-err`} msg={error} />
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/* Labels                                                              */
/* ------------------------------------------------------------------ */

const L = {
  length: { '1': '1 month', '2': '2 months', '3': '3 months', '6': '6 months', '9': '9 months', '12': '12 months', custom: 'Custom' },
  yesNo: { yes: 'Yes', no: 'No' },
  workspace: { 'home-desk': 'A desk at home', coworking: 'Coworking', both: 'Both' },
  homeType: {
    'city-apartment': 'City apartment',
    'beach-house': 'Beach house',
    quinta: 'Quinta (country house)',
    'island-home': 'Island home',
    'no-preference': 'No preference',
  },
  mustHave: { 'sea-view': 'Sea view', walkable: 'Walkable', 'outdoor-space': 'Outdoor space', 'pet-friendly': 'Pet-friendly' },
  income: { 'remote-salary': 'Remote salary', freelance: 'Freelance / own business', passive: 'Passive income or pension', 'not-working': 'Not working' },
  nationality: {
    'eu-eea-swiss': 'EU, EEA or Swiss',
    'visa-exempt': 'Visa-exempt (e.g. US, UK, Canada, Australia, Brazil)',
    'visa-required': 'Needs a Schengen visa',
    unsure: 'Not sure',
  },
} as const;

const vibeCards: Record<(typeof vibeOptions)[number], { label: string; image: ImageKey }> = {
  city: { label: 'City energy', image: 'lisbonAlfama' },
  surf: { label: 'Surf town', image: 'surfWave' },
  countryside: { label: 'Quiet countryside', image: 'mistyHills' },
  island: { label: 'Island life', image: 'forestPath' },
  wine: { label: 'Wine country', image: 'vineyard' },
  unsure: { label: 'Not sure yet', image: 'planning' },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function SeasonPlanner({ onDone, compact = false }: { onDone?: () => void; compact?: boolean }) {
  const [state, setState] = useState<State>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [guidance, setGuidance] = useState<VisaGuidance | null>(null);
  const [loaded, setLoaded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { format } = useCurrency();

  // Restore saved progress
  useEffect(() => {
    const saved = readStorage<{ state: State; step: number } | null>(STORAGE_KEY, null);
    if (saved?.state) {
      setState({ ...initial, ...saved.state });
      setStep(Math.min(Math.max(0, saved.step ?? 0), STEP_KEYS.length - 1));
    }
    setLoaded(true);
  }, []);

  // Save progress
  useEffect(() => {
    if (loaded && status !== 'done') writeStorage(STORAGE_KEY, { state, step });
  }, [state, step, loaded, status]);

  const key = STEP_KEYS[step];

  function update<K extends StepKey>(k: K, patch: Partial<State[K]>) {
    setState((s) => ({ ...s, [k]: { ...s[k], ...patch } }));
  }

  function validate(k: StepKey): boolean {
    const res = plannerSteps[k].safeParse(clean(state[k] as unknown as Record<string, unknown>));
    if (res.success) {
      setErrors({});
      return true;
    }
    const errs: Errors = {};
    for (const i of res.error.issues) errs[i.path.join('.')] ??= i.message;
    setErrors(errs);
    requestAnimationFrame(() => {
      bodyRef.current?.querySelector<HTMLElement>('[aria-invalid="true"] input, input[aria-invalid="true"], select[aria-invalid="true"], [aria-invalid="true"]')?.focus();
    });
    return false;
  }

  function goTo(n: number) {
    setStep(n);
    setErrors({});
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function next() {
    if (!validate(key)) return;
    if (step < STEP_KEYS.length - 1) return goTo(step + 1);

    // Submit
    const payload = {
      when: state.when,
      where: state.where,
      life: clean(state.life),
      who: state.who,
      contact: state.contact,
    };
    const parsed = plannerSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      const idx = STEP_KEYS.indexOf(first.path[0] as StepKey);
      if (idx >= 0) goTo(idx);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/season-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setGuidance(likelyVisaPath(parsed.data));
      setStatus('done');
      removeStorage(STORAGE_KEY);
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setStatus('error');
    }
  }

  const err = (p: string) => errors[p];
  const inv = (p: string) => ({ 'aria-invalid': !!errors[p], 'aria-describedby': errors[p] ? `${p}-err` : undefined });

  /* ---------- Confirmation ---------- */
  if (status === 'done' && guidance) {
    return (
      <div className="bg-harbor text-shell">
        <div className="relative h-40 overflow-hidden md:h-48">
          <Photo k="portoGoldenHour" sizes="40rem" />
        </div>
        <div className="space-y-6 p-6 md:p-8" role="status">
          <h2 ref={headingRef} tabIndex={-1} className="font-display-caps text-display-m outline-none">
            Thank you, {state.contact.name.split(' ')[0]}
          </h2>
          <p className="text-[0.9375rem] leading-relaxed text-shell/85">
            Your season request is with us. Your specialist will be in touch within one working day (Lisbon time) by{' '}
            email at {state.contact.email}.
          </p>
          <div className="border border-shell/20 p-5">
            <p className="eyebrow text-shell/60">Likely visa path · guidance only</p>
            <p className="mt-2 font-display font-semibold text-[1.375rem] leading-tight tracking-[-0.04em]">{guidance.title}</p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-shell/85">{guidance.summary}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.8125rem] text-shell/80">
              {guidance.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <VisaDisclaimer tone="light" className="mt-5" />
          </div>
          <p className="font-display font-semibold text-[1.5rem] tracking-[-0.04em]">{site.signOff}</p>
          {onDone && (
            <button type="button" onClick={onDone} className="h-11 bg-shell px-5 text-[0.9375rem] font-medium text-harbor hover:bg-terracotta hover:text-shell">
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ---------- Steps ---------- */
  return (
    <div className="flex flex-col bg-harbor text-shell" aria-label="Season planner">
      <div className={`relative overflow-hidden ${compact ? 'h-28' : 'h-36 md:h-44'}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Photo k={STEP_IMAGES[key]} sizes="40rem" />
          </motion.div>
        </AnimatePresence>
        {/* Progress */}
        <div
          className="absolute inset-x-0 bottom-0 h-1 bg-harbor/50"
          role="progressbar"
          aria-label="Planner progress"
          aria-valuemin={1}
          aria-valuemax={STEP_KEYS.length}
          aria-valuenow={step + 1}
          aria-valuetext={`Step ${step + 1} of ${STEP_KEYS.length}: ${STEP_TITLES[key]}`}
        >
          <motion.div className="h-full bg-terracotta" animate={{ width: `${((step + 1) / STEP_KEYS.length) * 100}%` }} transition={{ duration: 0.6, ease }} />
        </div>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="flex grow flex-col"
      >
        <div ref={bodyRef} className="grow space-y-7 p-6 md:p-8">
          <div>
            <p className="eyebrow text-shell/50">
              Step {step + 1} of {STEP_KEYS.length}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="mt-2 font-display font-semibold text-[1.5rem] leading-none tracking-[-0.04em] outline-none">
              {STEP_TITLES[key]}
            </h2>
            <ol className="mt-4 flex gap-1.5" aria-label="Steps">
              {STEP_KEYS.map((k, i) => (
                <li key={k}>
                  <button
                    type="button"
                    disabled={i > step}
                    onClick={() => goTo(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className={`text-[0.6875rem] tabular-nums transition-opacity disabled:cursor-not-allowed ${i === step ? 'opacity-100' : i < step ? 'opacity-60 hover:opacity-100' : 'opacity-25'}`}
                  >
                    <span className="sr-only">{STEP_TITLES[k]}: </span>0{i + 1}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {key === 'when' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startMonth" className={labelCls}>
                    Start month
                  </label>
                  <select
                    id="startMonth"
                    value={state.when.startMonth}
                    onChange={(e) => update('when', { startMonth: e.target.value })}
                    className={`${inputCls} [&>option]:text-harbor`}
                    {...inv('startMonth')}
                  >
                    <option value="">Choose…</option>
                    {months.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <ErrorText id="startMonth-err" msg={err('startMonth')} />
                </div>
                <div>
                  <label htmlFor="startYear" className={labelCls}>
                    Year
                  </label>
                  <select
                    id="startYear"
                    value={state.when.startYear}
                    onChange={(e) => update('when', { startYear: e.target.value })}
                    className={`${inputCls} [&>option]:text-harbor`}
                  >
                    {[2026, 2027, 2028].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Chips
                name="length"
                legend="How long"
                options={lengthOptions}
                value={state.when.length}
                onChange={(v) => update('when', { length: v as string })}
                labels={L.length}
                error={err('length')}
              />
              {state.when.length === 'custom' && (
                <div>
                  <label htmlFor="customLength" className={labelCls}>
                    Roughly how long?
                  </label>
                  <input
                    id="customLength"
                    value={state.when.customLength}
                    onChange={(e) => update('when', { customLength: e.target.value })}
                    placeholder="e.g. 4 months, or a school year"
                    className={inputCls}
                    {...inv('customLength')}
                  />
                  <ErrorText id="customLength-err" msg={err('customLength')} />
                </div>
              )}
              <Chips
                name="flexible"
                legend="Are your dates flexible?"
                options={['yes', 'no']}
                value={state.when.flexible}
                onChange={(v) => update('when', { flexible: v as string })}
                labels={L.yesNo}
                error={err('flexible')}
              />
            </>
          )}

          {key === 'where' && (
            <>
              <fieldset aria-describedby={err('vibes') ? 'vibes-err' : undefined} aria-invalid={!!err('vibes')}>
                <legend className={labelCls}>What vibe are you after? Pick any</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {vibeOptions.map((v) => {
                    const on = state.where.vibes.includes(v);
                    return (
                      <label
                        key={v}
                        className={`group relative block aspect-[4/3] cursor-pointer overflow-hidden border transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azulejo-mist ${
                          on ? 'border-terracotta' : 'border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={on}
                          onChange={() =>
                            update('where', {
                              vibes: on ? state.where.vibes.filter((x) => x !== v) : [...state.where.vibes, v],
                            })
                          }
                        />
                        <Photo
                          k={vibeCards[v].image}
                          sizes="12rem"
                          className={`transition-all duration-500 ${on ? 'scale-105' : 'grayscale-[40%] group-hover:grayscale-0'}`}
                        />
                        <span className={`absolute inset-0 transition-colors ${on ? 'bg-harbor-deep/20' : 'bg-harbor-deep/50'}`} />
                        <span className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[0.8125rem]">
                          {vibeCards[v].label}
                          <span
                            aria-hidden
                            className={`grid h-4 w-4 place-items-center border text-[0.6rem] ${on ? 'border-terracotta bg-terracotta' : 'border-shell/70'}`}
                          >
                            {on ? '✓' : ''}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <ErrorText id="vibes-err" msg={err('vibes')} />
              </fieldset>
              <Chips
                name="destinations"
                legend="Any destinations in mind? (optional)"
                options={destinations.map((d) => d.slug)}
                value={state.where.destinations}
                onChange={(v) => update('where', { destinations: v as string[] })}
                multiple
                labels={Object.fromEntries(destinations.map((d) => [d.slug, d.shortName]))}
              />
            </>
          )}

          {key === 'life' && (
            <>
              <Chips
                name="remote"
                legend="Will you be working remotely?"
                options={['yes', 'no']}
                value={state.life.remote}
                onChange={(v) => update('life', { remote: v as string, workspace: v === 'no' ? '' : state.life.workspace })}
                labels={L.yesNo}
                error={err('remote')}
              />
              {state.life.remote === 'yes' && (
                <Chips
                  name="workspace"
                  legend="What workspace do you need?"
                  options={workspaceOptions}
                  value={state.life.workspace}
                  onChange={(v) => update('life', { workspace: v as string })}
                  labels={L.workspace}
                  error={err('workspace')}
                />
              )}
              <Chips
                name="homeType"
                legend="Home type"
                options={homeTypeOptions}
                value={state.life.homeType}
                onChange={(v) => update('life', { homeType: v as string })}
                labels={L.homeType}
                error={err('homeType')}
              />
              <div className="max-w-[10rem]">
                <label htmlFor="bedrooms" className={labelCls}>
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  value={state.life.bedrooms}
                  onChange={(e) => update('life', { bedrooms: e.target.value })}
                  className={`${inputCls} [&>option]:text-harbor`}
                >
                  {['0', '1', '2', '3', '4', '5'].map((b) => (
                    <option key={b} value={b}>
                      {b === '0' ? 'Studio' : b}
                    </option>
                  ))}
                </select>
              </div>
              <Chips
                name="mustHaves"
                legend="Must-haves (optional)"
                options={mustHaveOptions}
                value={state.life.mustHaves}
                onChange={(v) => update('life', { mustHaves: v as string[] })}
                multiple
                labels={L.mustHave}
              />
            </>
          )}

          {key === 'who' && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="adults" className={labelCls}>
                    Adults
                  </label>
                  <input
                    id="adults"
                    type="number"
                    min={1}
                    max={8}
                    inputMode="numeric"
                    value={state.who.adults}
                    onChange={(e) => update('who', { adults: e.target.value })}
                    className={inputCls}
                    {...inv('adults')}
                  />
                  <ErrorText id="adults-err" msg={err('adults')} />
                </div>
                <div>
                  <p className={labelCls}>Children</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Remove a child"
                      disabled={state.who.children.length === 0}
                      onClick={() => update('who', { children: state.who.children.slice(0, -1) })}
                      className="grid h-8 w-8 place-items-center border border-shell/40 disabled:opacity-30"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="w-6 text-center tabular-nums">
                      {state.who.children.length}
                    </span>
                    <button
                      type="button"
                      aria-label="Add a child"
                      disabled={state.who.children.length >= 8}
                      onClick={() => update('who', { children: [...state.who.children, { age: '', schoolNeeds: '' }] })}
                      className="grid h-8 w-8 place-items-center border border-shell/40 disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {state.who.children.map((c, i) => (
                <div key={i} className="grid grid-cols-[5rem_1fr] gap-4">
                  <div>
                    <label htmlFor={`child-${i}-age`} className={labelCls}>
                      Child {i + 1} age
                    </label>
                    <input
                      id={`child-${i}-age`}
                      type="number"
                      min={0}
                      max={17}
                      inputMode="numeric"
                      value={c.age}
                      onChange={(e) => {
                        const children = [...state.who.children];
                        children[i] = { ...c, age: e.target.value };
                        update('who', { children });
                      }}
                      className={inputCls}
                      {...inv(`children.${i}.age`)}
                    />
                    <ErrorText id={`children.${i}.age-err`} msg={err(`children.${i}.age`)} />
                  </div>
                  <div>
                    <label htmlFor={`child-${i}-school`} className={labelCls}>
                      School needs (optional)
                    </label>
                    <input
                      id={`child-${i}-school`}
                      value={c.schoolNeeds}
                      placeholder="e.g. British curriculum, Year 4"
                      onChange={(e) => {
                        const children = [...state.who.children];
                        children[i] = { ...c, schoolNeeds: e.target.value };
                        update('who', { children });
                      }}
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
              <Chips
                name="nationality"
                legend="Passport (helps us show the likely visa path)"
                options={nationalityGroups}
                value={state.who.nationality}
                onChange={(v) => update('who', { nationality: v as string })}
                labels={L.nationality}
                error={err('nationality')}
              />
              <div>
                <label htmlFor="nationalityDetail" className={labelCls}>
                  Nationality (optional)
                </label>
                <input
                  id="nationalityDetail"
                  value={state.who.nationalityDetail}
                  onChange={(e) => update('who', { nationalityDetail: e.target.value })}
                  placeholder="e.g. Canadian"
                  className={inputCls}
                />
              </div>
              <Chips
                name="income"
                legend="Main income during your stay"
                options={incomeOptions}
                value={state.who.income}
                onChange={(v) => update('who', { income: v as string })}
                labels={L.income}
                error={err('income')}
              />
              <div className="max-w-xs">
                <label htmlFor="budget" className={labelCls}>
                  Budget per month, all in (EUR)
                </label>
                <input
                  id="budget"
                  type="number"
                  min={500}
                  step={100}
                  inputMode="numeric"
                  value={state.who.budget}
                  onChange={(e) => update('who', { budget: e.target.value })}
                  placeholder="e.g. 3500"
                  className={inputCls}
                  {...inv('budget')}
                />
                {state.who.budget && Number(state.who.budget) > 0 && (
                  <p className="mt-1.5 text-[0.75rem] text-shell/60">≈ {format(Number(state.who.budget))} per month</p>
                )}
                <ErrorText id="budget-err" msg={err('budget')} />
              </div>
            </>
          )}

          {key === 'contact' && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelCls}>
                    Name
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    value={state.contact.name}
                    onChange={(e) => update('contact', { name: e.target.value })}
                    className={inputCls}
                    {...inv('name')}
                  />
                  <ErrorText id="name-err" msg={err('name')} />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={state.contact.email}
                    onChange={(e) => update('contact', { email: e.target.value })}
                    className={inputCls}
                    {...inv('email')}
                  />
                  <ErrorText id="email-err" msg={err('email')} />
                </div>
              </div>
              <div>
                <label htmlFor="notes" className={labelCls}>
                  Anything else? (optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={state.contact.notes}
                  onChange={(e) => update('contact', { notes: e.target.value })}
                  placeholder="Pets, accessibility needs, a town you’ve fallen for…"
                  className={`${inputCls} resize-y`}
                />
              </div>
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] text-shell/80">
                  <input
                    type="checkbox"
                    checked={state.contact.consent}
                    onChange={(e) => update('contact', { consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 accent-[var(--color-terracotta)]"
                    {...inv('consent')}
                  />
                  <span>
                    I’m happy for Porto Season to contact me about my season and to store these details as described in the{' '}
                    <a href="/privacy" className="underline underline-offset-2">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>
                <ErrorText id="consent-err" msg={err('consent')} />
              </div>
            </>
          )}

          {status === 'error' && (
            <p role="alert" className="text-[0.875rem] text-[#f1b49b]">
              We couldn’t send that just now. Your answers are saved; please try again, or email {site.contact.email}.
            </p>
          )}
          <p className="text-[0.75rem] text-shell/40">Your answers are saved on this device as you go.</p>
        </div>

        {/* Footer bar (Kultiveret "1/2 · Final step →") */}
        <div className="flex items-stretch bg-shell text-harbor">
          <span className="flex items-center px-5 text-[1rem] font-medium tabular-nums">
            {step + 1}/{STEP_KEYS.length}
          </span>
          {step > 0 && (
            <button type="button" onClick={() => goTo(step - 1)} className="px-3 text-[0.875rem] text-harbor/60 hover:text-harbor">
              ← Back
            </button>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group ml-auto flex h-14 grow items-center justify-end gap-6 px-5 text-[1rem] font-medium transition-colors hover:bg-terracotta hover:text-shell disabled:opacity-50"
          >
            <span>{status === 'sending' ? 'Sending…' : step === STEP_KEYS.length - 1 ? 'Send my season request' : step === STEP_KEYS.length - 2 ? 'Final step' : 'Next step'}</span>
            <ArrowRight className="h-3 w-7 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
