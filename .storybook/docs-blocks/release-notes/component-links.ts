/*
 * Components named by a release note change, linked to their page in this Storybook.
 *
 * The pages come from the Storybook index (`index.json`, published next to `iframe.html`),
 * read when the page opens: a link only exists while its page exists. When the index cannot
 * be read, there are no component links and the page works as before.
 *
 * Rule (safe side: no link when in doubt):
 * - Names in the change text are matched whole and written as in Storybook ("Filter Bar",
 *   "FilterBar", "Transaction List", "Tag"), with an optional "Ocean" prefix
 *   ("OceanFilterBar"). A longer name wins over the shorter ones inside it.
 * - The scope (`filter-bar`, `tab`) also names a component.
 * - Scope and text that point to different components are a conflict: no link.
 * - Otherwise every component found gets a link, in the order of the text.
 */

export type ComponentPage = { id: string; name: string };

type IndexEntry = {
  id: string;
  type: string;
  title: string;
  importPath?: string;
};

export type ComponentCatalog = {
  /** Normalized name → page. */
  pages: Map<string, ComponentPage>;
  /** Names as written in Storybook (longest first) → normalized name. */
  names: [string, string][];
};

export const EMPTY_CATALOG: ComponentCatalog = { pages: new Map(), names: [] };

const normalize = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]/g, '');

/** "TransactionFooter" → "Transaction Footer". */
const spaced = (text: string): string =>
  text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

const escapeRegExp = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Component docs pages of the index; a group Overview stands for its group. */
export const buildCatalog = (entries: IndexEntry[]): ComponentCatalog => {
  const docs = entries
    .filter(
      (entry) => entry.type === 'docs' && entry.title.startsWith('Components/')
    )
    .sort(
      (a, b) =>
        Number(b.title.endsWith('/Overview')) -
        Number(a.title.endsWith('/Overview'))
    );
  const pages = new Map<string, ComponentPage>();
  const written = new Map<string, string>();
  const add = (name: string, page: ComponentPage) => {
    const key = normalize(name);
    if (!key) return;
    if (!pages.has(key)) pages.set(key, page);
    [name, spaced(name)].forEach((form) => {
      if (!written.has(form)) written.set(form, key);
    });
  };
  const titles = new Set(docs.map((entry) => entry.title));
  /** Name of a page: its own title, its group for an Overview, and the group in front of a
   * generic part of a component group ("Transaction Summary/Footer" → "Transaction Summary
   * Footer"). */
  const pageName = (title: string): string => {
    const parts = title.split('/').slice(1);
    const last = parts[parts.length - 1];
    if (last === 'Overview' && parts.length > 1) return parts[parts.length - 2];
    const parent = parts[parts.length - 2];
    const isGroup =
      parent &&
      titles.has(`Components/${parts.slice(0, -1).join('/')}/Overview`);
    return isGroup && !last.startsWith(parent) ? `${parent} ${last}` : last;
  };
  // Own names first, so "Transaction List Read Only" is its own page and not the group
  // Overview that lives in the same source folder.
  docs.forEach((entry) => {
    add(pageName(entry.title), { id: entry.id, name: pageName(entry.title) });
  });
  // Then source folders, for names that differ from the title: the TransactionFooter
  // component is the "Transaction Summary/Footer" page. Only when the folder leads to one
  // page: alone in it, or the only one whose title ends the folder name ("Footer"). The
  // Date folder holds DatePicker and DateRange, so "date" names neither.
  const byFolder = new Map<string, IndexEntry[]>();
  docs.forEach((entry) => {
    const folder = entry.importPath?.match(/\/src\/([A-Za-z]+)\//)?.[1];
    if (folder)
      byFolder.set(folder, (byFolder.get(folder) ?? []).concat(entry));
  });
  byFolder.forEach((inFolder, folder) => {
    const ending = inFolder.filter((entry) => {
      const last = entry.title.split('/').pop() ?? '';
      return normalize(folder).endsWith(normalize(last));
    });
    const only = inFolder.length === 1 ? inFolder : ending;
    if (only.length === 1) {
      add(folder, { id: only[0].id, name: spaced(folder) });
    }
  });
  // Array.from, not spread: the docs are compiled to ES5, where spreading a Map is empty.
  const names = Array.from(written.entries()).sort(
    (a, b) => b[0].length - a[0].length
  );
  return { pages, names };
};

/** Pages named in the text, in the order they appear. */
const pagesInText = (
  text: string,
  catalog: ComponentCatalog
): ComponentPage[] => {
  const taken: [number, number][] = [];
  const found: { at: number; page: ComponentPage }[] = [];
  catalog.names.forEach(([name, key]) => {
    const pattern = new RegExp(
      `(?<![A-Za-z0-9])(?:Ocean)?${escapeRegExp(name)}(?![A-Za-z0-9])`,
      'g'
    );
    Array.from(text.matchAll(pattern)).forEach((match) => {
      const start = match.index ?? 0;
      const end = start + match[0].length;
      if (taken.some(([s, e]) => start < e && end > s)) return;
      taken.push([start, end]);
      const page = catalog.pages.get(key);
      if (page) found.push({ at: start, page });
    });
  });
  const seen = new Set<string>();
  return found
    .sort((a, b) => a.at - b.at)
    .map(({ page }) => page)
    .filter((page) => !seen.has(page.id) && seen.add(page.id));
};

/** Component pages of a change; empty when none is found or scope and text disagree. */
export const componentsFor = (
  change: { text: string; scope?: string },
  catalog: ComponentCatalog
): ComponentPage[] => {
  if (catalog.pages.size === 0) return [];
  const inText = pagesInText(change.text, catalog);
  const fromScope = change.scope
    ? catalog.pages.get(normalize(change.scope))
    : undefined;
  if (!fromScope) return inText;
  if (inText.length === 0) return [fromScope];
  return inText.some((page) => page.id === fromScope.id) ? inText : [];
};

/** Storybook index next to `iframe.html`; the empty catalog when it cannot be read. */
export const loadCatalog = async (): Promise<ComponentCatalog> => {
  try {
    // Own query string: a request of this page only, apart from the one Storybook makes.
    const response = await fetch('index.json?release-notes', {
      cache: 'no-cache',
    });
    if (!response.ok) return EMPTY_CATALOG;
    const index = (await response.json()) as {
      entries?: Record<string, IndexEntry>;
    };
    return buildCatalog(Object.values(index.entries ?? {}));
  } catch {
    return EMPTY_CATALOG;
  }
};
