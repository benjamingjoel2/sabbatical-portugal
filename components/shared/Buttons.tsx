import Link from 'next/link';
import { ArrowUpRight } from '@/components/svg/Icons';

type Tone = 'light' | 'dark' | 'outline' | 'outline-light';

const tones: Record<Tone, string> = {
  light: 'bg-shell text-harbor hover:bg-terracotta hover:text-shell',
  dark: 'bg-harbor text-shell hover:bg-terracotta',
  outline: 'border border-harbor text-harbor hover:bg-harbor hover:text-shell',
  'outline-light': 'border border-shell/80 text-shell hover:bg-shell hover:text-harbor',
};

/** Kultiveret-style square button: sentence case, medium weight, no radius. */
export function Pill({
  href,
  children,
  tone = 'light',
  className = '',
  small = false,
  icon = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  small?: boolean;
  icon?: boolean;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em] transition-colors duration-300 ${
        small ? 'h-7 px-2.5 text-[0.75rem]' : 'h-12 px-5 text-[0.9375rem]'
      } ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
      {icon && <ArrowUpRight className="h-2.5 w-2.5" />}
    </Link>
  );
}

export function PillButton({
  children,
  tone = 'light',
  className = '',
  ...rest
}: { tone?: Tone; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 px-5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:opacity-50 ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Kultiveret-style underlined text link with arrow: "plan my season →" */
export function ArrowLink({
  href,
  children,
  className = '',
  large = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2 border-b border-current text-azulejo transition-colors hover:text-terracotta ${
        large ? 'text-statement pb-0.5' : 'pb-0.5 text-sm'
      } ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
