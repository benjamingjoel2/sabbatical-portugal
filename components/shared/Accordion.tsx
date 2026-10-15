'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import { Chevron, Plus } from '@/components/svg/Icons';
import { ease } from '@/config/theme';

export interface AccordionItem {
  id: string;
  q: React.ReactNode;
  a: React.ReactNode;
}

/**
 * Two looks, one behaviour:
 *  - 'lines' (Flyward FAQ): rules between items, chevron, serif-ish question
 *  - 'cards' (Kultiveret FAQ): limestone cards with a plus icon
 */
export function Accordion({
  items,
  variant = 'lines',
  defaultOpen = [],
}: {
  items: AccordionItem[];
  variant?: 'lines' | 'cards';
  defaultOpen?: string[];
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const base = useId();
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className={variant === 'cards' ? 'flex flex-col gap-1.5' : 'border-t border-line'}>
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        const btnId = `${base}-${it.id}-b`;
        const panelId = `${base}-${it.id}-p`;
        return (
          <div key={it.id} className={variant === 'cards' ? 'bg-limestone/70' : 'border-b border-line'}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(it.id)}
                className={`flex w-full items-start justify-between gap-6 text-left transition-colors hover:text-terracotta ${
                  variant === 'cards' ? 'px-4 py-4 text-[0.9375rem] font-medium' : 'py-5 text-lg md:text-xl'
                }`}
              >
                <span>{it.q}</span>
                {variant === 'cards' ? (
                  <Plus className={`mt-1 h-3 w-3 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                ) : (
                  <Chevron className={`mt-2 h-2 w-3 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                )}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <div className={`text-[0.875rem] leading-relaxed text-harbor/80 ${variant === 'cards' ? 'px-4 pb-5' : 'pb-6 pr-8'}`}>
                    {it.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
