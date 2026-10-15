'use client';

import { createContext, useContext, useState } from 'react';

interface UICtx {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}
const Ctx = createContext<UICtx | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <Ctx.Provider value={{ menuOpen, setMenuOpen }}>{children}</Ctx.Provider>;
}

export function useUI() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useUI must be inside UIProvider');
  return c;
}
