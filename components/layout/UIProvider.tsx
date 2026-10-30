'use client';

import { createContext, useContext, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

interface UICtx {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}
const Ctx = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // LazyMotion + `m` components (imported as `motion`) ship only the animation features the site uses
  // (no layout or drag), which keeps the shared JavaScript smaller.
  return (
    <Ctx.Provider value={{ menuOpen, setMenuOpen }}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </Ctx.Provider>
  );
}

export function useUI() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useUI must be inside UIProvider');
  return c;
}
