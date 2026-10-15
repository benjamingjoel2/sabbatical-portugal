/** Small animated "sound" squiggle. Rebuilt from scratch as a harbour wave. */
export function WaveIcon({ active = true, className = '' }: { active?: boolean; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`} style={{ width: 24, height: 10 }} aria-hidden>
      <svg
        width="40"
        height="10"
        viewBox="0 0 40 10"
        fill="none"
        className={active ? 'wave-anim' : ''}
        style={{ display: 'block' }}
      >
        <path
          d={active ? 'M0 5c2-4 2-4 4 0s2 4 4 0 2-4 4 0 2 4 4 0 2-4 4 0 2 4 4 0 2-4 4 0 2 4 4 0 2-4 4 0 2 4 4 0' : 'M0 5h40'}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
