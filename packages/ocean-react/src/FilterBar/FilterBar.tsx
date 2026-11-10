import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { AdjustmentsOutline } from '@useblu/ocean-icons-react';
import Chips from '../Chips';
import SegmentedControl from '../SegmentedControl';
import type { SegmentedControlOption } from '../SegmentedControl';
import type { FilterBarProps } from './types';

/**
 * Same width as `media-breakpoint-down(md)` in ocean-core, where the bar switches to the
 * mobile layout and Chips opens its options as a bottom sheet.
 */
export const FILTER_BAR_MOBILE_QUERY = '(max-width: 767.98px)';

/** Default text of the "All filters" chip. */
export const ALL_FILTERS_LABEL = 'Todos os filtros';

const matchesMobile = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(FILTER_BAR_MOBILE_QUERY).matches;

const useMobile = (): boolean => {
  const [mobile, setMobile] = useState(matchesMobile);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia(FILTER_BAR_MOBILE_QUERY);
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return mobile;
};

/** On mobile the Segmented Control shows only the labels. */
const labelOnly = ([first, second]: [
  SegmentedControlOption,
  SegmentedControlOption
]): [SegmentedControlOption, SegmentedControlOption] => [
  { label: first.label },
  { label: second.label },
];

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      filters,
      allFilters,
      segmentedControl,
      className,
      onClickCapture,
      onScrollCapture,
      ...rest
    },
    ref
  ) => {
    const mobile = useMobile();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const anchorRef = useRef<Element | null>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    // The chip popovers are anchored to the bar, so the scrolling chip area does not clip
    // them. On desktop they open under the chip that was clicked, following its scroll.
    const placePopover = useCallback(() => {
      const root = rootRef.current as HTMLDivElement;
      const chip = anchorRef.current;
      if (!chip) return;
      const bar = root.getBoundingClientRect();
      const anchor = chip.getBoundingClientRect();
      root.style.setProperty(
        '--ods-filter-bar-popover-left',
        `${anchor.left - bar.left}px`
      );
      root.style.setProperty(
        '--ods-filter-bar-popover-top',
        `${anchor.bottom - bar.top}px`
      );
    }, []);

    // The scrolling area has no scrollbar, so Shift + vertical wheel scrolls it sideways, as
    // browsers do on a scrollbar. A wheel that already brings deltaX is left to the browser.
    const hasFilters = filters.length > 0;
    useEffect(() => {
      const root = rootRef.current;
      if (!root) return undefined;
      const onWheel = (event: WheelEvent) => {
        if (!event.shiftKey || event.deltaX !== 0 || event.deltaY === 0) return;
        const target = event.target as Node;
        // Desktop scrolls the chips; mobile scrolls chips and "All filters" together.
        const scroller = Array.from(
          root.querySelectorAll<HTMLElement>(
            '.ods-filter-bar__chips, .ods-filter-bar__filters'
          )
        ).find(
          (area) =>
            area.contains(target) && getComputedStyle(area).overflowX === 'auto'
        );
        if (!scroller) return;
        const max = scroller.scrollWidth - scroller.clientWidth;
        const next = Math.max(
          0,
          Math.min(max, scroller.scrollLeft + event.deltaY)
        );
        if (next === scroller.scrollLeft) return;
        event.preventDefault();
        scroller.scrollLeft = next;
      };
      root.addEventListener('wheel', onWheel, { passive: false });
      return () => root.removeEventListener('wheel', onWheel);
    }, [hasFilters]);

    if (!hasFilters) return null;

    return (
      <div
        ref={setRef}
        role="group"
        onClickCapture={(event) => {
          anchorRef.current = (event.target as Element).closest('.ods-chips');
          placePopover();
          onClickCapture?.(event);
        }}
        onScrollCapture={(event) => {
          placePopover();
          onScrollCapture?.(event);
        }}
        className={classNames(
          'ods-filter-bar',
          {
            'ods-filter-bar--all-filters': allFilters,
            'ods-filter-bar--segmented': segmentedControl,
          },
          className
        )}
        {...rest}
      >
        <div className="ods-filter-bar__filters">
          <div className="ods-filter-bar__chips">
            {filters.map((filter, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Chips key={index} {...filter} />
            ))}
          </div>
          {allFilters && (
            <>
              <span
                className="ods-filter-bar__divider ods-filter-bar__divider--all-filters"
                aria-hidden="true"
              />
              <div className="ods-filter-bar__all-filters">
                <Chips
                  label={allFilters.label ?? ALL_FILTERS_LABEL}
                  icon={<AdjustmentsOutline />}
                  initialCounter={allFilters.count}
                  onClick={allFilters.onClick}
                />
              </div>
            </>
          )}
        </div>
        {segmentedControl && (
          <>
            <span
              className="ods-filter-bar__divider ods-filter-bar__divider--segmented"
              aria-hidden="true"
            />
            <div className="ods-filter-bar__segmented">
              <SegmentedControl
                {...segmentedControl}
                options={
                  mobile
                    ? labelOnly(segmentedControl.options)
                    : segmentedControl.options
                }
              />
            </div>
          </>
        )}
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';

export default FilterBar;
