import { Photo } from '@/components/shared/Photo';
import { ContactForm } from '@/components/shared/ContactForm';
import { RevealLines, Reveal } from '@/components/motion/Reveal';
import { ShoreEdge } from '@/components/svg/ShoreEdge';

/** Flyward A9: statement over a photo, then the 3-column form card rising into view. */
export function BeginForm() {
  return (
    <section id="begin" className="relative isolate overflow-hidden px-gutter pb-28 pt-36 text-shell md:pb-40" aria-labelledby="begin-title">
      <div className="absolute inset-0 -z-10">
        <Photo k="portoRiverside" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-harbor-deep/50 via-harbor-deep/20 to-harbor-deep/60" />
      </div>
      <ShoreEdge position="top" fillClass="fill-shell" />
      <RevealLines
        id="begin-title"
        lines={['The best seasons start', 'with a conversation']}
        className="font-display-caps text-display-l mx-auto max-w-5xl text-center"
      />
      <Reveal y={80} className="mx-auto mt-16 max-w-4xl md:mt-24">
        <ContactForm />
      </Reveal>
    </section>
  );
}
