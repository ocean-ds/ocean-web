import React from 'react';

/*
 * Turns the props of an example into the JSX shown by "Show code", so the snippet and the
 * live render come from the same object.
 */

const handlerNames = new Map<unknown, string>();

/** Gives a function a readable name in the snippets (names don't survive minification). */
export const named = <T extends (...args: never[]) => unknown>(
  name: string,
  fn: T
): T => {
  handlerNames.set(fn, name);
  return fn;
};

const elementName = (element: React.ReactElement): string => {
  const { type } = element;
  if (typeof type === 'string') return type;
  const component = type as { displayName?: string; name?: string };
  return component.displayName || component.name || 'Component';
};

const INDENT = '  ';

export const literal = (value: unknown, depth: number): string => {
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);
  if (typeof value === 'function') return handlerNames.get(value) ?? '() => {}';
  if (React.isValidElement(value)) return element(value, depth);
  if (Array.isArray(value)) {
    const items = value.map((item) => literal(item, depth + 1));
    const inline = `[${items.join(', ')}]`;
    if (inline.length < 60) return inline;
    const pad = INDENT.repeat(depth + 1);
    return `[\n${items
      .map((item) => `${pad}${item},`)
      .join('\n')}\n${INDENT.repeat(depth)}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    const items = entries.map(([k, v]) => `${k}: ${literal(v, depth + 1)}`);
    const inline = `{ ${items.join(', ')} }`;
    if (inline.length < 70) return inline;
    const pad = INDENT.repeat(depth + 1);
    return `{\n${items
      .map((item) => `${pad}${item},`)
      .join('\n')}\n${INDENT.repeat(depth)}}`;
  }
  return 'undefined';
};

const attribute = (
  name: string,
  value: unknown,
  depth: number
): string | null => {
  if (value === undefined || name === 'key') return null;
  if (value === true) return name;
  if (typeof value === 'string') return `${name}="${value}"`;
  return `${name}={${literal(value, depth)}}`;
};

/** JSX of an element, one prop per line when it does not fit in one. */
export const element = (node: React.ReactElement, depth = 0): string => {
  const name = elementName(node);
  const { children, size, ...props } = node.props as Record<string, unknown>;
  const ownProps =
    size !== undefined && size !== 24 ? { size, ...props } : props;
  const attrs = Object.entries(ownProps)
    .map(([key, value]) => attribute(key, value, depth + 1))
    .filter(Boolean) as string[];
  const pad = INDENT.repeat(depth);
  const inline = `<${name}${attrs.map((a) => ` ${a}`).join('')}`;
  const multiline = inline.length > 60 || attrs.some((a) => a.includes('\n'));
  const open = multiline
    ? `<${name}\n${attrs.map((a) => `${pad}${INDENT}${a}`).join('\n')}\n${pad}`
    : inline;
  const kids = React.Children.toArray(children as React.ReactNode).filter(
    React.isValidElement
  ) as React.ReactElement[];
  if (!kids.length) return `${open}${multiline ? '' : ' '}/>`;
  const inner = kids
    .map((kid) => `${pad}${INDENT}${element(kid, depth + 1)}`)
    .join('\n');
  return `${open}>\n${inner}\n${pad}</${name}>`;
};

/** Snippet for a list of rows, wrapped in `List`. */
export const listCode = (rows: React.ReactElement[]): string =>
  rows.length === 1
    ? element(rows[0])
    : `<List>\n${rows
        .map((row) => `  ${element(row, 1)}`)
        .join('\n')}\n</List>`;
