import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useId } from '@reach/auto-id';
import Badge from '../Badge';

export type TabItem = {
  /** Text of the tab. Always on one line; it is never truncated. */
  label: string;
  /** Optional counter shown after the label. */
  count?: number;
  /** Id of the panel this tab controls; sets `aria-controls`. */
  panelId?: string;
};

export type TabProps = {
  /** Tabs of the bar, in order. Use from 2 to 8 tabs. */
  tabs: TabItem[];
  /** Index of the selected tab. */
  selectedIndex: number;
  /** Called with the index of the tab chosen by click or keyboard. */
  onChange: (index: number) => void;
  /**
   * Id of the bar. Each tab gets the id `<id>-tab-<index>`, which a panel can
   * use in `aria-labelledby`. Generated when omitted.
   */
  id?: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'role'>;

/** Up to this many tabs share the width equally on mobile, when every label fits. */
const MAX_FILL_TABS = 3;

const px = (value: string) => parseFloat(value) || 0;

/** Scroll of the bar to the selected tab, in ms; the selection line uses the same rhythm. */
const SCROLL_DURATION = 400;
/** A tab closer than this to an edge of the bar counts as hidden. */
const EDGE_MARGIN = 24;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Indicator = { left: number; width: number; animate: boolean };

/** Returns the id of the tab at `index` inside the bar with id `tabId`. */
export const getTabId = (tabId: string, index: number): string =>
  `${tabId}-tab-${index}`;

const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ tabs, selectedIndex, onChange, id, className, ...rest }, ref) => {
    const baseId = useId(id);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [fill, setFill] = useState(tabs.length <= MAX_FILL_TABS);
    const [indicator, setIndicator] = useState<Indicator | null>(null);
    const focusableIndex =
      selectedIndex >= 0 && selectedIndex < tabs.length ? selectedIndex : 0;
    const tabsKey = tabs.map(({ label, count }) => `${label}:${count}`).join();

    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    // Moves the selection line under the selected tab; it appears in place the first time.
    const placeIndicator = useCallback(() => {
      const item = itemRefs.current[selectedIndex];
      if (!item) {
        setIndicator(null);
        return;
      }
      const left = item.offsetLeft;
      const width = item.offsetWidth;
      setIndicator((previous) =>
        previous && previous.left === left && previous.width === width
          ? previous
          : { left, width, animate: previous !== null }
      );
    }, [selectedIndex]);
    const placeRef = useRef(placeIndicator);
    placeRef.current = placeIndicator;

    // Mobile layout: up to 3 tabs share the width while the widest one fits its share.
    useEffect(() => {
      const root = rootRef.current as HTMLDivElement;
      const measure = () => {
        const items = itemRefs.current.filter(
          (item): item is HTMLButtonElement => Boolean(item)
        );
        if (items.length > MAX_FILL_TABS) {
          setFill(false);
          return;
        }
        const widest = Math.max(
          0,
          ...items.map((item) => {
            const style = window.getComputedStyle(item);
            const content = item.firstElementChild as HTMLElement;
            return (
              content.getBoundingClientRect().width +
              px(style.paddingLeft) +
              px(style.paddingRight)
            );
          })
        );
        setFill(widest * items.length <= root.clientWidth);
        placeRef.current();
      };
      measure();
      let active = true;
      // Re-place the line once fonts settle; a failed font load still re-places it.
      const onFontsSettled = () => {
        if (active) placeRef.current();
      };
      document.fonts?.ready.then(onFontsSettled, onFontsSettled);
      if (typeof ResizeObserver === 'undefined') {
        window.addEventListener('resize', measure);
        return () => {
          active = false;
          window.removeEventListener('resize', measure);
        };
      }
      const observer = new ResizeObserver(measure);
      observer.observe(root);
      itemRefs.current.forEach((item) => {
        if (item?.firstElementChild) observer.observe(item.firstElementChild);
      });
      return () => {
        active = false;
        observer.disconnect();
      };
    }, [tabsKey]);

    useEffect(placeIndicator, [placeIndicator, fill, tabsKey]);

    // Brings a hidden or edge tab toward the center of the bar with an eased scroll.
    const scrolledOnce = useRef(false);
    useEffect(() => {
      const root = rootRef.current as HTMLDivElement;
      const item = itemRefs.current[focusableIndex];
      if (!item) return undefined;
      const animate = scrolledOnce.current && !prefersReducedMotion();
      scrolledOnce.current = true;
      const from = root.scrollLeft;
      const start = item.offsetLeft;
      const end = start + item.offsetWidth;
      if (
        start >= from + EDGE_MARGIN &&
        end <= from + root.clientWidth - EDGE_MARGIN
      )
        return undefined;
      const max = Math.max(0, root.scrollWidth - root.clientWidth);
      const target = Math.min(
        max,
        Math.max(0, start + item.offsetWidth / 2 - root.clientWidth / 2)
      );
      if (target === from) return undefined;
      if (!animate) {
        root.scrollLeft = target;
        return undefined;
      }
      let began: number | undefined;
      const step = (time: number) => {
        if (began === undefined) began = time;
        const progress = Math.min(1, (time - began) / SCROLL_DURATION);
        root.scrollLeft = from + (target - from) * easeInOutCubic(progress);
        if (progress < 1) frame = window.requestAnimationFrame(step);
      };
      let frame = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(frame);
    }, [focusableIndex, fill, tabsKey]);

    const handleKeyDown = (
      event: KeyboardEvent<HTMLButtonElement>,
      from: number
    ) => {
      const last = tabs.length - 1;
      const targets: Record<string, number> = {
        ArrowRight: from === last ? 0 : from + 1,
        ArrowLeft: from === 0 ? last : from - 1,
        Home: 0,
        End: last,
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      const target = targets[event.key];
      (itemRefs.current[target] as HTMLButtonElement).focus({
        preventScroll: true,
      });
      if (target !== selectedIndex) onChange(target);
    };

    return (
      <div
        ref={setRootRef}
        id={baseId}
        role="tablist"
        aria-orientation="horizontal"
        className={classNames('ods-tab', { 'ods-tab--fill': fill }, className)}
        {...rest}
      >
        {tabs.map(({ label, count, panelId }, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={`${label}-${index}`}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              id={baseId ? getTabId(baseId, index) : undefined}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={
                // Read the counter as the Badge shows it, separated from the label.
                typeof count === 'number'
                  ? `${label}, ${count > 99 ? '99+' : count}`
                  : undefined
              }
              aria-controls={panelId}
              tabIndex={index === focusableIndex ? 0 : -1}
              className={classNames('ods-tab__item', {
                'ods-tab__item--selected': selected,
              })}
              onClick={() => {
                if (!selected) onChange(index);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="ods-tab__content">
                <span className="ods-tab__label">{label}</span>
                {typeof count === 'number' && (
                  <Badge
                    // Inside a tab the counter is read as part of the tab name.
                    role={undefined}
                    className="ods-tab__count"
                    variation="small"
                    color={selected ? 'brand' : 'neutral'}
                    count={count}
                  />
                )}
              </span>
            </button>
          );
        })}
        {indicator && (
          <span
            className={classNames('ods-tab__indicator', {
              'ods-tab__indicator--animated': indicator.animate,
            })}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Tab.displayName = 'Tab';

export default Tab;
