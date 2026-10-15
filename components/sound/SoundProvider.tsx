'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

/**
 * Ambient "sounds of Portugal". OFF by default: nothing loads or plays until the
 * visitor explicitly says yes. Files in /public/audio are clearly marked placeholders.
 */
export const ambientLayers = [
  { src: '/audio/atlantic-waves-PLACEHOLDER.mp3', volume: 0.55, label: 'Atlantic waves' },
  { src: '/audio/cafe-terrace-PLACEHOLDER.mp3', volume: 0.22, label: 'Café terrace' },
  { src: '/audio/harbor-gulls-PLACEHOLDER.mp3', volume: 0.28, label: 'Harbor gulls' },
  { src: '/audio/tram-bells-PLACEHOLDER.mp3', volume: 0.25, label: 'Lisbon tram bells' },
] as const;

type Choice = 'unset' | 'on' | 'off';

interface SoundCtx {
  ready: boolean;
  choice: Choice;
  playing: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
}

const Ctx = createContext<SoundCtx | null>(null);
const KEY = 'ps-sound';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice>('unset');
  const [playing, setPlaying] = useState(false);
  const audios = useRef<HTMLAudioElement[]>([]);
  const fadeRaf = useRef<number | null>(null);

  useEffect(() => {
    // A returning visitor who said "yes" still has to press play again: browsers block
    // autoplay with sound, and we never start audio without a fresh user gesture.
    const saved = readStorage<Choice>(KEY, 'unset');
    setChoice(saved === 'on' ? 'off' : saved);
    setReady(true);
    return () => audios.current.forEach((a) => a.pause());
  }, []);

  const fadeTo = useCallback((target: number, done?: () => void) => {
    if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    const start = performance.now();
    const from = audios.current.map((a) => a.volume);
    const dur = 1200;
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      audios.current.forEach((a, i) => {
        a.volume = Math.max(0, Math.min(1, from[i] + (ambientLayers[i].volume * target - from[i]) * k));
      });
      if (k < 1) fadeRaf.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRaf.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(() => {
    if (audios.current.length === 0) {
      audios.current = ambientLayers.map((l) => {
        const a = new Audio(l.src);
        a.loop = true;
        a.preload = 'auto';
        a.volume = 0;
        return a;
      });
    }
    audios.current.forEach((a) => {
      a.play().catch(() => {
        /* file missing or playback blocked: fail silently */
      });
    });
    setPlaying(true);
    fadeTo(1);
  }, [fadeTo]);

  const stop = useCallback(() => {
    setPlaying(false);
    fadeTo(0, () => audios.current.forEach((a) => a.pause()));
  }, [fadeTo]);

  const enable = useCallback(() => {
    setChoice('on');
    writeStorage(KEY, 'on');
    start();
  }, [start]);

  const disable = useCallback(() => {
    setChoice('off');
    writeStorage(KEY, 'off');
    stop();
  }, [stop]);

  const toggle = useCallback(() => (playing ? disable() : enable()), [playing, enable, disable]);

  return (
    <Ctx.Provider value={{ ready, choice, playing, enable, disable, toggle }}>{children}</Ctx.Provider>
  );
}

export function useSound() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSound must be used inside SoundProvider');
  return ctx;
}
