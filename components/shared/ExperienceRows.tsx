'use client';

import { t, tp } from '@/lib/i18n/t';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useState } from 'react';
import type { Experience } from '@/data/types';
import { plans } from '@/data/plans';
import { HoverPreviewList } from './HoverPreviewList';
import { Photo } from './Photo';
import { Price } from './Price';
import { ArrowLink } from './Buttons';
import { ease } from '@/config/theme';

/** Kultiveret experience rows: title left, tag and duration right; click to expand details. */
export function ExperienceRows({ items }: { items: Experience[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <HoverPreviewList items={items.map((e) => ({ key: e.slug, image: e.image }))}>
      {(bind) => (
        <ul className="flex flex-col gap-1.5">
          {items.map((e) => {
            const isOpen = open === e.slug;
            const panelId = `exp-${e.slug}`;
            return (
              <li key={e.slug} id={e.slug} className="bg-limestone/60" {...(isOpen ? {} : bind(e.slug))}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : e.slug)}
                  className="grid w-full gap-4 px-4 py-6 text-left transition-colors hover:bg-limestone md:grid-cols-[1.4fr_1fr_auto] md:items-end md:px-5 md:py-8"
                >
                  <span className={`text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-[1.05] tracking-[-0.02em] transition-opacity ${open && !isOpen ? 'opacity-50' : ''}`}>
                    {tp(e.title)}
                  </span>
                  <span className="flex items-center gap-2 text-[0.8125rem] text-harbor/70">
                    <span aria-hidden className="h-1.5 w-1.5 bg-harbor/70" />
                    {tp(e.tag)} · {tp(e.where)}
                  </span>
                  <span className="text-[0.8125rem] text-harbor/70 md:text-right">{tp(e.duration)}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-10 px-4 pb-10 md:grid-cols-[1.2fr_1fr] md:px-5">
                        <div className="relative">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Photo k={e.image} sizes="(min-width: 768px) 50vw, 100vw" />
                          </div>
                          <div className="absolute -bottom-6 right-[-4%] aspect-square w-[38%] overflow-hidden rounded-full border-[6px] border-limestone">
                            <Photo k={e.cutoutImage} sizes="20vw" />
                          </div>
                        </div>
                        <div className="text-[0.9375rem] leading-relaxed">
                          <p>{tp(e.description)}</p>
                          <dl className="mt-6 space-y-3 text-[0.875rem]">
                            {e.fromPrice !== undefined && (
                              <div>
                                <dt className="font-medium">{t("Price")}</dt>
                                <dd>
                                  {t("From ")}<Price eur={e.fromPrice} /> {t("per person")}</dd>
                              </div>
                            )}
                            {e.includedIn && e.includedIn.length > 0 && (
                              <div>
                                <dt className="font-medium">{t("Included in")}</dt>
                                <dd>{tp(e.includedIn.map((s) => plans.find((p) => p.slug === s)?.name ?? s)).join(', ')} {t("plans")}</dd>
                              </div>
                            )}
                            <div>
                              <dt className="font-medium">{t("Where")}</dt>
                              <dd>{tp(e.where)}</dd>
                            </div>
                          </dl>
                          <ArrowLink href="/plan-my-season" className="mt-8">
                            {t("add it to my season")}</ArrowLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}
    </HoverPreviewList>
  );
}
