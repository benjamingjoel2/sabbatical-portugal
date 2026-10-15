import { Photo } from '@/components/shared/Photo';
import { ContactForm } from '@/components/shared/ContactForm';
import { Reveal } from '@/components/motion/Reveal';

/** Kultiveret booking section: blurred photo with the dark form card ("Shall we begin?"). */
export function BeginForm() {
  return (
    <section id="begin" className="relative isolate overflow-hidden px-gutter py-20 md:py-28" aria-labelledby="begin-title">
      <div className="absolute inset-0 -z-10">
        <Photo k="portoRiverside" sizes="100vw" className="scale-110 blur-md" />
        <div className="absolute inset-0 bg-harbor-deep/30" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-end">
        <h2 id="begin-title" className="tight-display text-mega text-shell [text-shadow:0_1px_30px_rgba(12,24,38,0.35)]">
          The best seasons start with a conversation
        </h2>
        <Reveal y={60}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
