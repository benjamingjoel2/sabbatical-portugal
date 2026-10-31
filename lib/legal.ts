import { site } from '@/config/site';
import { legal } from '@/data/legal';

/** Porto Season's legal pages: the shared text plus what this site actually stores and does. */
import { tp } from '@/lib/i18n/t';

const keepName = new Set(['name']);

/** Built per request so the storage and processor lists follow the page language. */
const buildLegalPages = () => legal({
  brand: site.name,
  email: site.contact.email,
  address: site.location.addressLines,
  storage: tp([
    { name: 'ps-currency', type: 'local storage', duration: 'until you clear it', purpose: 'remembers the currency you chose for showing prices' },
    { name: 'ps-sound', type: 'local storage', duration: 'until you clear it', purpose: 'remembers whether you turned the ambient sound on or off' },
    {
      name: 'ps-season-planner-v1',
      type: 'local storage',
      duration: 'until you send the planner or clear it',
      purpose: 'saves your answers in the season planner on this device so you can finish later; it is deleted when you send it',
    },
  ], keepName),
  processors: tp([{ name: 'Vercel', purpose: 'hosts this website and processes enquiry form submissions' }], keepName),
  extraPrivacy: [
    {
      h: 'Documents for your visa, lease and paperwork',
      p: [
        'If you choose to share documents such as passport scans, proof of income or bank statements, we use them only to arrange your stay and, with your permission, to share them with our partner immigration lawyers so that they can advise on and prepare your visa application. We ask you to send them through an encrypted link, not by ordinary email.',
        'Documents are stored encrypted, access is limited and logged, and we permanently delete them once they are no longer needed for your stay or as soon as you ask us to, unless the law requires us to keep them.',
      ],
    },
  ],
});

export const legalPages = buildLegalPages();
export const getLegalPage = (slug: 'privacy' | 'terms' | 'cookies') => buildLegalPages().find((p) => p.slug === slug)!;
