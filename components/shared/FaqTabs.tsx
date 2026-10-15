'use client';

import { useEffect, useState } from 'react';
import { faqTabs, type FaqTab } from '@/data/types';
import { faqs } from '@/data/faqs';
import { fillTokens } from '@/lib/tokens';
import { TabList } from './Tabs';
import { Accordion } from './Accordion';

/** Kultiveret booking info: tab row (■ marks active), FAQ cards below. Deep-linkable via ?tab=. */
export function FaqTabs() {
  const [tab, setTab] = useState<FaqTab>('your-stay');

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tab');
    if (t && faqTabs.some((x) => x.slug === t)) setTab(t as FaqTab);
  }, []);

  const change = (t: FaqTab) => {
    setTab(t);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', t);
    window.history.replaceState(null, '', url);
  };

  const list = faqs.filter((f) => f.tab === tab);
  return (
    <div>
      <TabList tabs={faqTabs} value={tab} onChange={change} idBase="faq" label="FAQ topics" />
      <div role="tabpanel" id={`faq-panel-${tab}`} aria-labelledby={`faq-tab-${tab}`} className="mt-8" tabIndex={0}>
        <Accordion key={tab} variant="cards" items={list.map((f) => ({ id: f.id, q: f.q, a: <p>{fillTokens(f.a)}</p> }))} defaultOpen={list[0] ? [list[0].id] : []} />
      </div>
    </div>
  );
}
