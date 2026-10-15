'use client';

import { useSound } from './SoundProvider';
import { WaveIcon } from './WaveIcon';

export function SoundToggle({ className = '' }: { className?: string }) {
  const { playing, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Turn off the sounds of Portugal' : 'Turn on the sounds of Portugal'}
      title={playing ? 'Sound on' : 'Sound off'}
      className={`grid h-9 w-9 place-items-center rounded-full transition-opacity hover:opacity-60 ${className}`}
    >
      <WaveIcon active={playing} />
    </button>
  );
}
