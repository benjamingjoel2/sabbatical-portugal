'use client';

import { tp } from '@/lib/i18n/t';
import { useSound } from './SoundProvider';
import { WaveIcon } from './WaveIcon';

export function SoundToggle({ className = '' }: { className?: string }) {
  const { playing, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={tp(playing ? 'Turn off the sounds of Portugal' : 'Turn on the sounds of Portugal')}
      title={tp(playing ? 'Sound on' : 'Sound off')}
      className={`grid h-9 w-9 place-items-center rounded-full transition-opacity hover:opacity-60 ${className}`}
    >
      <WaveIcon active={playing} />
    </button>
  );
}
