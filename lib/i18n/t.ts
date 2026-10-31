/**
 * Translation helpers used by server and client components alike.
 *
 * Copy stays in English in the source. `i18n/{fr,de,es}.json` map each English string to
 * its translation (keys may contain {0}, {1}… for values filled in at render time).
 * Server components read the dictionary from a per-request store set by `setLocale`
 * (lib/i18n/server.ts); client components read the small client dictionary handed to
 * <LocaleProvider> by the layout, so no translation library ships to the browser.
 */
import * as React from 'react';
import { DEFAULT_LOCALE, localizePath, type Locale } from './config';

export type Dict = Record<string, string>;
type State = { locale: Locale; dict: Dict | null };

const R = React as unknown as Record<string, unknown>;
const cacheFn = R['cache'] as (<T>(fn: () => T) => () => T) | undefined;
const getStore: () => State = cacheFn ? cacheFn(() => ({ locale: DEFAULT_LOCALE, dict: null })) : () => ({ locale: DEFAULT_LOCALE, dict: null });
const createCtx = R['create' + 'Context'] as ((v: State | null) => React.Context<State | null>) | undefined;

/** Client-side context (absent in the React Server Components build). */
export const LocaleContext: React.Context<State | null> | null = typeof createCtx === 'function' ? createCtx(null) : null;

let sync: State | null = null;
let browser: State | null = null;
/** Set by LocaleProvider in the browser, where only one locale is ever active. */
export function _setBrowserState(s: State) {
  if (typeof window !== 'undefined') browser = s;
}
/** Server store (one per request). */
export function _store() {
  return getStore();
}

function state(): State {
  if (sync) return sync;
  if (LocaleContext) {
    const use = R['use'] as (<T>(c: React.Context<T>) => T) | undefined;
    if (use) {
      try {
        const s = use(LocaleContext);
        if (s) return s;
      } catch {
        /* outside render */
      }
    }
    if (browser) return browser;
  }
  return getStore();
}

/** Run `fn` with a fixed locale (for metadata, which renders outside the page tree). */
export function inLocale<T>(locale: Locale, dict: Dict | null, fn: () => T): T {
  const prev = sync;
  sync = { locale, dict };
  try {
    return fn();
  } finally {
    sync = prev;
  }
}

export function getLocale(): Locale {
  return state().locale;
}

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const patCache = new WeakMap<Dict, [RegExp, string][]>();
function patterns(d: Dict) {
  let p = patCache.get(d);
  if (!p) {
    p = Object.keys(d)
      .filter((k) => /\{\d\}/.test(k))
      .map((k) => [new RegExp('^' + k.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\\?\{(\d)\\?\}/g, '(.+?)') + '$', 's'), d[k]] as [RegExp, string]);
    patCache.set(d, p);
  }
  return p;
}

function lookup(d: Dict, s: string): string | undefined {
  const k = norm(s);
  if (!k) return undefined;
  const hit = d[k];
  if (hit !== undefined) return hit;
  for (const [re, out] of patterns(d)) {
    const m = k.match(re);
    if (m) return out.replace(/\{(\d)\}/g, (_, i) => {
      const v = m[+i + 1] ?? '';
      return d[v] ?? v;
    });
  }
  return undefined;
}

/** Translate one English string. Leading/trailing spaces are kept. */
export function t(s: string): string {
  const { dict } = state();
  if (!dict || typeof s !== 'string') return s;
  const tr = lookup(dict, s);
  if (tr === undefined) return s;
  return (s.match(/^\s*/)?.[0] ?? '') + tr + (s.match(/\s*$/)?.[0] ?? '');
}

/** Translate a template: tf('From {0} a month', price). */
export function tf(pattern: string, ...args: unknown[]): string {
  const { dict } = state();
  const fill = (p: string) => p.replace(/\{(\d)\}/g, (_, i) => {
    const v = args[+i];
    return typeof v === 'string' ? t(v) : String(v ?? '');
  });
  const tr = dict ? dict[norm(pattern)] : undefined;
  if (tr !== undefined) return fill(tr);
  const raw = fill(pattern);
  return dict ? t(raw) : raw;
}

const KEEP = new Set(['slug', 'href', 'id', 'key', 'k', 'image', 'images', 'src', 'icon', 'path', 'url', 'email', 'type', 'variant', 'kind', 'value', 'tone', 'color', 'photo', 'file', 'sound', 'currency', 'lat', 'lng', 'coords', 'code', 'iso', 'date', 'theme', 'layout', 'audio']);
const looksLikeId = (s: string) => /^(\/|#|https?:|mailto:|tel:)/.test(s) || /^[a-z0-9]+([-_][a-z0-9]+)*$/.test(s) || /^[a-z]+[A-Z][A-Za-z0-9]*$/.test(s);

/**
 * Translate anything rendered: strings, arrays and plain data objects (deeply).
 * React elements, functions and non-plain objects pass through untouched.
 * Object fields that hold identifiers (slug, href, id, image…) are never translated.
 */
export function tp<T>(v: T, keepKeys: Set<string> = KEEP): T {
  const { dict } = state();
  if (!dict) return v;
  // Strings rendered directly or listed in arrays are always translated; object fields skip identifier-like values.
  const walk = (x: unknown, depth: number, field = false): unknown => {
    if (typeof x === 'string') return field && looksLikeId(x) ? x : t(x);
    if (!x || typeof x !== 'object' || depth > 8) return x;
    if (Array.isArray(x)) return x.map((y) => walk(y, depth + 1));
    if ((x as { $$typeof?: unknown }).$$typeof) return x;
    const proto = Object.getPrototypeOf(x);
    if (proto !== Object.prototype && proto !== null) return x;
    const o: Record<string, unknown> = {};
    for (const [k, y] of Object.entries(x)) o[k] = keepKeys.has(k) ? y : walk(y, depth + 1, true);
    return o;
  };
  return walk(v, 0) as T;
}

/** Point an internal path at the current language. */
export function lhref<T>(href: T): T {
  if (typeof href !== 'string') return href;
  return localizePath(href, getLocale()) as T;
}
