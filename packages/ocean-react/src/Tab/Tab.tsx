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

/** Returns the id of the tab at `index` inside the bar with id `tabId`. */
export const getTabId = (tabId: string, index: number): string =>
  `${tabId}-tab-${index}`;

const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ tabs, selectedIndex, onChange, id, className, ...rest }, ref) => {
    const baseId = useId(id);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [fill, setFill] = useState(tabs.length <= MAX_FILL_TABS);
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
      };
      measure();
      if (typeof ResizeObserver === 'undefined') {
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
      }
      const observer = new ResizeObserver(measure);
      observer.observe(root);
      itemRefs.current.forEach((item) => {
        if (item?.firstElementChild) observer.observe(item.firstElementChild);
      });
      return () => observer.disconnect();
    }, [tabsKey]);

    // Keeps the selected tab inside the visible part of the bar.
    useEffect(() => {
      const root = rootRef.current as HTMLDivElement;
      const item = itemRefs.current[focusableIndex];
      if (!item) return;
      const style = window.getComputedStyle(root);
      const start = item.offsetLeft - px(style.paddingLeft);
      const end =
        item.offsetLeft +
        item.offsetWidth +
        px(style.paddingRight) -
        root.clientWidth;
      if (start < root.scrollLeft) root.scrollLeft = start;
      else if (end > root.scrollLeft) root.scrollLeft = end;
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
      (itemRefs.current[target] as HTMLButtonElement).focus();
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
              {selected && (
                <span className="ods-tab__indicator" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

Tab.displayName = 'Tab';

export default Tab;
