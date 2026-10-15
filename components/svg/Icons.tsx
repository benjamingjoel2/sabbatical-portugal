/** 8-point compass star, used as bullet and divider (our take on the reference's star motif). */
export function CompassStar({ className = '', size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 0l1.6 9.2L12 12l-1.6-2.8L12 0zM12 24l-1.6-9.2L12 12l1.6 2.8L12 24zM0 12l9.2-1.6L12 12l-2.8 1.6L0 12zM24 12l-9.2 1.6L12 12l2.8-1.6L24 12z" />
      <path d="M4 4l6.2 5.4L12 12l-3-.8L4 4zM20 20l-6.2-5.4L12 12l3 .8L20 20zM20 4l-5.4 6.2L12 12l.8-3L20 4zM4 20l5.4-6.2L12 12l-.8 3L4 20z" opacity=".55" />
    </svg>
  );
}

/** Small harbour-wave mark for the logo. */
export function WaveMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 14" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M1 9c3-4 5-4 8 0s5 4 8 0 5-4 8 0" />
      <path d="M14 1v6M11 4h6" />
    </svg>
  );
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 9l6-6M4 3h5v5" />
    </svg>
  );
}

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}

export function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 8" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1 1.5l5 5 5-5" />
    </svg>
  );
}

export function Plus({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M6 0v12M0 6h12" />
    </svg>
  );
}

export function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 000-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.2 5.1 5.1 0 001.1 2.7 11.6 11.6 0 004.4 3.9c1.6.7 2.3.8 3.1.6a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.5-.3z" />
    </svg>
  );
}
