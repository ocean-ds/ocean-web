import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { DocsContext } from '@storybook/blocks';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import Link from '../../packages/ocean-react/src/Link';

/*
 * Documentation language. The toolbar global `locale` (English by default) switches the
 * docs text only; components and sample data stay the same in every language.
 */

export type Locale = 'en' | 'pt';
export type Dictionary = { [key: string]: string | string[] | Dictionary };
export type LocaleFiles = Record<Locale, Dictionary>;

type GlobalsStore = { get?: () => Record<string, unknown> };
type DocsContextShape = {
  channel?: {
    on: (event: string, fn: (payload: never) => void) => void;
    off: (event: string, fn: (payload: never) => void) => void;
  };
  store?: { globals?: GlobalsStore };
};

const asLocale = (value: unknown): Locale => (value === 'pt' ? 'pt' : 'en');

const localeFromUrl = (): unknown => {
  try {
    const globals = new URLSearchParams(window.location.search).get('globals');
    return globals?.match(/locale:(\w+)/)?.[1];
  } catch {
    return undefined;
  }
};

/** Current documentation locale, updated live when the toolbar changes. */
export const useLocale = (): Locale => {
  const context = useContext(DocsContext) as unknown as DocsContextShape;
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      return asLocale(
        context?.store?.globals?.get?.().locale ?? localeFromUrl()
      );
    } catch {
      return asLocale(localeFromUrl());
    }
  });

  useEffect(() => {
    const channel = context?.channel;
    if (!channel) return undefined;
    const onGlobals = ({ globals }: { globals: Record<string, unknown> }) =>
      setLocale(asLocale(globals.locale));
    channel.on(GLOBALS_UPDATED, onGlobals as (payload: never) => void);
    return () =>
      channel.off(GLOBALS_UPDATED, onGlobals as (payload: never) => void);
  }, [context]);

  return locale;
};

const lookup = (dictionary: Dictionary, key: string): unknown =>
  key
    .split('.')
    .reduce<unknown>(
      (node, part) =>
        node && typeof node === 'object'
          ? (node as Dictionary)[part]
          : undefined,
      dictionary
    );

export type Translate = {
  /** Text of a key, falling back to English and then to the key itself. */
  (key: string): string;
  /** List of texts (rules, bullets). */
  list: (key: string) => string[];
  /** Whether the key exists in English. */
  has: (key: string) => boolean;
  locale: Locale;
};

export const makeTranslate = (
  files: LocaleFiles[],
  locale: Locale
): Translate => {
  const find = (key: string): unknown => {
    for (const lang of [locale, 'en'] as Locale[]) {
      for (const file of files) {
        const value = lookup(file[lang], key);
        if (value !== undefined) return value;
      }
    }
    return undefined;
  };
  const t = ((key: string) => {
    const value = find(key);
    return typeof value === 'string' ? value : key;
  }) as Translate;
  t.list = (key) => {
    const value = find(key);
    return Array.isArray(value) ? value : [];
  };
  t.has = (key) => find(key) !== undefined;
  t.locale = locale;
  return t;
};

/** Translator bound to the current locale. Later files override earlier ones. */
export const useTranslate = (...files: LocaleFiles[]): Translate => {
  const locale = useLocale();
  return makeTranslate([...files].reverse(), locale);
};

const docsHref = (target: string) => {
  if (target.startsWith('docs:')) return `./?path=/docs/${target.slice(5)}`;
  if (target.startsWith('story:')) return `./?path=/story/${target.slice(6)}`;
  return target;
};

/**
 * Inline markdown of the locale files: `code`, **bold** and [label](href). Links to
 * `docs:<id>` and `story:<id>` open the Storybook entry.
 */
export const Md = ({ text }: { text: string }): React.ReactElement => {
  const parts: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match = pattern.exec(text);
  while (match) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = `${match.index}`;
    if (match[1] !== undefined) parts.push(<code key={key}>{match[1]}</code>);
    else if (match[2] !== undefined)
      parts.push(<strong key={key}>{match[2]}</strong>);
    else {
      const href = docsHref(match[4]);
      const external = href.startsWith('http');
      parts.push(
        <Link
          key={key}
          href={href}
          target={external ? '_blank' : '_top'}
          rel={external ? 'noreferrer' : undefined}
        >
          {match[3]}
        </Link>
      );
    }
    last = match.index + match[0].length;
    match = pattern.exec(text);
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};
