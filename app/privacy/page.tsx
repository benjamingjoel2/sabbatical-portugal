import type { Metadata } from 'next';
import { site } from '@/config/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: 'Privacy Policy', description: 'How Porto Season collects, uses, protects and deletes your personal data and documents.', path: '/privacy' });

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-shell px-gutter pb-24 pt-[calc(var(--header-h)+3.5rem)]">
        <h1 className="tight-display text-mega">Privacy policy</h1>
        <div className="prose-season mt-12 md:ml-[33%]">
          <p>
            <strong>Placeholder text.</strong> This policy must be reviewed by a qualified data protection adviser before launch.
          </p>
          <p>
            {site.name} is the data controller for personal data collected through this
            website and in planning your season. Contact: {site.contact.email}.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Details you give us in forms: name, email, phone, preferences, travel dates and party details.</li>
            <li>Documents you choose to share for your plan or visa: passport scans, proof of income, bank statements.</li>
            <li>Basic technical data needed to run the site securely.</li>
          </ul>
          <h2>How we use it</h2>
          <p>
            Only to plan and deliver your season, to reply to you, and to meet legal obligations. Visa documents are shared only with
            our partner immigration lawyers, {site.visaPartner}, with your permission.
          </p>
          <h2>Your documents</h2>
          <p>
            Documents are uploaded through encrypted links, stored encrypted in the EU with access logged, and permanently deleted on
            request within {site.documentDeletionDays} days.
          </p>
          <h2 id="cookies">Cookies and local storage</h2>
          <p>
            We use your browser’s local storage only for conveniences: remembering your currency, your sound preference and your
            season planner progress on this device. [Analytics provider, if any, to be listed here.]
          </p>
          <h2>Your rights</h2>
          <p>
            Under the GDPR you can access, correct, export or delete your data, and object to processing. Write to{' '}
            {site.contact.email}. You may also complain to the Portuguese data protection authority (CNPD).
          </p>
        </div>
      </section>
    </>
  );
}
