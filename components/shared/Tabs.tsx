'use client';

import { useRef } from 'react';

/** Kultiveret-style text tabs: active marked with a small square. Fully keyboard accessible. */
export function TabList<T extends string>({
  tabs,
  value,
  onChange,
  idBase,
  label,
}: {
  tabs: readonly { slug: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  idBase: string;
  label: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = tabs.length - 1;
    if (n >= 0) {
      e.preventDefault();
      onChange(tabs[n].slug);
      refs.current[n]?.focus();
    }
  };
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-x-5 gap-y-2">
      {tabs.map((t, i) => {
        const active = t.slug === value;
        return (
          <button
            key={t.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${idBase}-tab-${t.slug}`}
            aria-selected={active}
            aria-controls={`${idBase}-panel-${t.slug}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.slug)}
            onKeyDown={(e) => onKey(e, i)}
            className={`flex items-center gap-2 text-[0.875rem] transition-opacity ${active ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
          >
            <span aria-hidden className={`h-1.5 w-1.5 bg-terracotta ${active ? 'opacity-100' : 'opacity-0'}`} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
