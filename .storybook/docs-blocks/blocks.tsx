import './docs.scss';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Source } from '@storybook/blocks';
import * as tokens from '@useblu/ocean-tokens/web/tokens';
import Typography from '../../packages/ocean-react/src/Typography';

/* Generic blocks of the documentation pages. Styles live in docs.scss (Ocean tokens only). */

export const c = (text: string): React.ReactElement => <code>{text}</code>;

export const slug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const scrollToId = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/** Section of a page, listed in "On this page". A divider separates it from the previous one. */
export const Section = ({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}): React.ReactElement => (
  <section className="odoc-section odoc-prose" id={id ?? slug(title)}>
    <Typography variant="heading2" className="odoc-section__title">
      {title}
    </Typography>
    {children}
  </section>
);

export const Subsection = ({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}): React.ReactElement => (
  <div className="odoc-subsection odoc-prose" id={id ?? slug(title)}>
    <Typography variant="heading3" className="odoc-section__subtitle">
      {title}
    </Typography>
    {children}
  </div>
);

export type TocItem = { id: string; label: string; sub?: boolean };

/** "On this page": one link per section, highlighted while in view. */
export const OnThisPage = ({
  items,
  title = 'On this page',
}: {
  items: TocItem[];
  title?: string;
}): React.ReactElement => {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '0px 0px -70% 0px' }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="odoc-toc" aria-label={title}>
      <p className="odoc-toc__title">{title}</p>
      <ul className="odoc-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`odoc-toc__link${
                item.sub ? ' odoc-toc__link--sub' : ''
              }${item.id === active ? ' odoc-toc__link--active' : ''}`}
              aria-current={item.id === active ? 'true' : undefined}
              onClick={() => {
                setActive(item.id);
                scrollToId(item.id);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export type TabItem = { id: string; label: string };

/**
 * Tabs that follow the Ocean Tab spec: heading 4 label, primary color and indicator when
 * selected, dark-up when not. Arrow keys move between tabs.
 */
export const Tabs = ({
  tabs,
  active,
  onChange,
  label,
  className = 'odoc-tabs',
  idPrefix = 'odoc-tab',
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
  idPrefix?: string;
}): React.ReactElement => {
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    onChange(next.id);
    document.getElementById(`${idPrefix}-${next.id}`)?.focus();
  };
  return (
    <div className={className} role="tablist" aria-label={label}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          id={`${idPrefix}-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={tab.id === active}
          tabIndex={tab.id === active ? 0 : -1}
          className={`${className}__tab${
            tab.id === active ? ` ${className}__tab--active` : ''
          }`}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/** Table with the docs styling. Cells accept any node. */
export const DocTable = ({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}): React.ReactElement => (
  <div className="odoc-table-wrap">
    <table className="odoc-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Example area: neutral stage with one or more frames, each with an optional label. */
export const Stage = ({
  frames,
  caption,
}: {
  frames: { label?: string; content: ReactNode; className?: string }[];
  caption?: ReactNode;
}): React.ReactElement => (
  <figure className="odoc-stage">
    <div className="odoc-stage__surface">
      {frames.map((frame, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          {frame.label && (
            <span className="odoc-stage__label">{frame.label}</span>
          )}
          <div className={`odoc-stage__frame ${frame.className ?? ''}`}>
            {frame.content}
          </div>
        </div>
      ))}
    </div>
    {caption && (
      <figcaption className="odoc-stage__caption">{caption}</figcaption>
    )}
  </figure>
);

export const CodeBlock = ({
  code,
  language,
  label,
}: {
  code: string;
  language: string;
  label?: string;
}): React.ReactElement => (
  <div className="odoc-code">
    {label && <span className="odoc-code__label">{label}</span>}
    <Source code={code} language={language} dark />
  </div>
);

export type Verdict = 'do' | 'dont' | 'caution';

const VERDICT_LABEL: Record<Verdict, string> = {
  do: 'Do',
  dont: "Don't",
  caution: 'Caution',
};

export const DoDont = ({
  items,
  verdicts = VERDICT_LABEL,
}: {
  items: {
    kind: Verdict;
    example: ReactNode;
    text: ReactNode;
    /** Snippet below the text (for example, the wrong and the right version). */
    code?: string;
  }[];
  verdicts?: Record<Verdict, string>;
}): React.ReactElement => (
  <div className="odoc-dodont">
    {items.map((item, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={`odoc-dodont__card odoc-dodont__card--${item.kind}`}
      >
        <div className="odoc-dodont__example">
          <div className="odoc-stage__frame">{item.example}</div>
        </div>
        <p className="odoc-dodont__verdict">{verdicts[item.kind]}</p>
        <p className="odoc-dodont__text">{item.text}</p>
        {item.code && (
          <div className="odoc-dodont__code">
            <Source code={item.code} language="tsx" dark />
          </div>
        )}
      </div>
    ))}
  </div>
);

const camel = (token: string) =>
  token.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());

/** Value of an Ocean token from its SCSS name (`color-interface-dark-deep`). */
export const tokenValue = (token: string): string =>
  String((tokens as Record<string, unknown>)[camel(token)] ?? '');

/** Token name with its color chip. */
export const Swatch = ({ token }: { token: string }): React.ReactElement => (
  <span className="odoc-swatch">
    <span
      className="odoc-swatch__chip"
      style={{ background: tokenValue(token) }}
      aria-hidden
    />
    {c(token)}
  </span>
);

type Pin = { x: number; y: number; tx: number; ty: number };

/**
 * Anatomy: the live example with numbered pins outside it, each linked to its element by a
 * leader line. Positions come from the rendered DOM; pins on the same side are spread so
 * they never overlap.
 */
export const Anatomy = ({
  example,
  parts,
}: {
  example: ReactNode;
  parts: {
    selector: string;
    side: 'left' | 'right' | 'top' | 'bottom';
    /** Where the line lands along the element, from 0 to 1. Default 0.5. */
    anchor?: number;
  }[];
}): React.ReactElement => {
  const stage = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [pins, setPins] = useState<(Pin | null)[]>([]);

  const measure = useCallback(() => {
    const root = stage.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const gutter = parseFloat(getComputedStyle(root).paddingLeft) / 2;
    const raw = parts.map(({ selector, side, anchor = 0.5 }) => {
      const el = root.querySelector(selector);
      if (!el) return null;
      // Text bounds, not the block box: lines land on the visible content.
      const range = document.createRange();
      range.selectNodeContents(el);
      const textBox = range.getBoundingClientRect();
      const r = textBox.width ? textBox : el.getBoundingClientRect();
      const left = r.left - rect.left;
      const top = r.top - rect.top;
      const y = top + r.height * anchor;
      const x = left + r.width * anchor;
      if (side === 'left') return { x: gutter, y, tx: left, ty: y };
      if (side === 'right')
        return { x: rect.width - gutter, y, tx: left + r.width, ty: y };
      if (side === 'top') return { x, y: gutter, tx: x, ty: top };
      return { x, y: rect.height - gutter, tx: x, ty: top + r.height };
    });
    (['left', 'right', 'top', 'bottom'] as const).forEach((side) => {
      const vertical = side === 'left' || side === 'right';
      const key = vertical ? 'y' : 'x';
      const indexes = parts
        .map((part, index) => (part.side === side && raw[index] ? index : -1))
        .filter((index) => index >= 0)
        .sort((a, b) => (raw[a] as Pin)[key] - (raw[b] as Pin)[key]);
      let last = -Infinity;
      indexes.forEach((index) => {
        const pin = raw[index] as Pin;
        pin[key] = Math.max(pin[key], last + gutter);
        last = pin[key];
      });
    });
    setBox({ w: rect.width, h: rect.height });
    setPins(raw);
  }, [parts]);

  useLayoutEffect(() => {
    measure();
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(measure)
        : null;
    if (observer && stage.current) observer.observe(stage.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => observer?.disconnect();
  }, [measure]);

  return (
    <div className="odoc-anatomy">
      <div className="odoc-anatomy__stage" ref={stage}>
        <div className="odoc-stage__frame">{example}</div>
        <svg
          className="odoc-anatomy__lines"
          width={box.w}
          height={box.h}
          aria-hidden
        >
          {pins.map(
            (pin, index) =>
              pin && (
                // eslint-disable-next-line react/no-array-index-key
                <path
                  key={index}
                  d={`M ${pin.x} ${pin.y} L ${pin.tx} ${pin.ty}`}
                />
              )
          )}
        </svg>
        {pins.map(
          (pin, index) =>
            pin && (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="odoc-anatomy__pin"
                style={{ left: pin.x, top: pin.y }}
                aria-hidden
              >
                {index + 1}
              </span>
            )
        )}
      </div>
    </div>
  );
};

/** Grid of labelled examples used by the story matrices (Chromatic snapshots). */
export const MatrixGrid = ({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; cells: ReactNode[] }[];
}): React.ReactElement => (
  <div
    className="odoc-matrix"
    style={{ ['--odoc-columns' as string]: columns.length }}
  >
    <span />
    {columns.map((column) => (
      <p key={column} className="odoc-matrix__label">
        {column}
      </p>
    ))}
    {rows.map((row) => (
      <React.Fragment key={row.label}>
        <p className="odoc-matrix__label">{row.label}</p>
        {row.cells.map((cell, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{cell}</div>
        ))}
      </React.Fragment>
    ))}
  </div>
);

/** Fixed-width frame for single-row stories. */
export const Frame = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): React.ReactElement => (
  <div className={`odoc-frame ${className ?? ''}`}>{children}</div>
);
