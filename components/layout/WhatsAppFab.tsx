import { site } from '@/config/site';
import { WhatsAppIcon } from '@/components/svg/Icons';

export function WhatsAppFab() {
  return (
    <a
      href={site.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Porto Season on WhatsApp"
      className="fixed bottom-4 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-harbor text-shell shadow-lg shadow-harbor/20 transition-colors hover:bg-terracotta md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
