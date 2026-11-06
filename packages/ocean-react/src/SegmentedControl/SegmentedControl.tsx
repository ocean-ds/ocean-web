import React, {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import Badge from '../Badge';

export type SegmentedControlOption = {
  /** Text of the option. One line; cut with an ellipsis when it does not fit. */
  label: string;
  /** Optional 16px icon shown before the label. */
  icon?: ReactNode;
  /** Optional counter shown after the label. */
  count?: number;
};

/** Index of an option: the control always has exactly two. */
export type SegmentedControlIndex = 0 | 1;

export type SegmentedControlProps = {
  /** The two options of the control, in order. */
  options: [SegmentedControlOption, SegmentedControlOption];
  /** Index of the selected option. One option is always selected. */
  selectedIndex: SegmentedControlIndex;
  /** Called with the index of the option chosen by click or keyboard. */
  onChange: (index: SegmentedControlIndex) => void;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'role'>;

/** The control draws exactly this many options; extra ones are ignored. */
const OPTION_COUNT = 2;

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Selection = {
  index: SegmentedControlIndex;
  left: number;
  width: number;
  animate: boolean;
};

const NAVIGATION_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];

const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ options, selectedIndex, onChange, className, ...rest }, ref) => {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selection, setSelection] = useState<Selection | null>(null);
  const items = options.slice(0, OPTION_COUNT);
  const selected: SegmentedControlIndex = selectedIndex === 1 ? 1 : 0;
  const optionsKey = items
    .map(({ label, count }) => `${label}:${count}`)
    .join();

  // Moves the selection background to the selected option. It slides only when the selection
  // changes; the first placement and a new measure (resize, fonts) put it in place at once.
  const placeSelection = useCallback(() => {
    const option = optionRefs.current[selected];
    if (!option) {
      setSelection(null);
      return;
    }
    const left = option.offsetLeft;
    const width = option.offsetWidth;
    setSelection((previous) =>
      previous &&
      previous.index === selected &&
      previous.left === left &&
      previous.width === width
        ? previous
        : {
            index: selected,
            left,
            width,
            animate:
              previous !== null &&
              previous.index !== selected &&
              !prefersReducedMotion(),
          }
    );
  }, [selected]);
  const placeRef = useRef(placeSelection);
  placeRef.current = placeSelection;

  // Places the background again when an option changes size or the fonts load.
  useEffect(() => {
    let active = true;
    const measure = () => {
      if (active) placeRef.current();
    };
    document.fonts?.ready.then(measure, measure);
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => {
        active = false;
        window.removeEventListener('resize', measure);
      };
    }
    const observer = new ResizeObserver(measure);
    optionRefs.current.forEach((option) => {
      if (option) observer.observe(option);
    });
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [optionsKey]);

  useEffect(placeSelection, [placeSelection, optionsKey]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!NAVIGATION_KEYS.includes(event.key) || items.length < OPTION_COUNT)
      return;
    event.preventDefault();
    const target: SegmentedControlIndex = selected === 0 ? 1 : 0;
    (optionRefs.current[target] as HTMLButtonElement).focus();
    onChange(target);
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={classNames('ods-segmented-control', className)}
      {...rest}
    >
      {selection && (
        <span
          className={classNames('ods-segmented-control__selection', {
            'ods-segmented-control__selection--animated': selection.animate,
          })}
          style={{
            transform: `translateX(${selection.left}px)`,
            width: selection.width,
          }}
          aria-hidden="true"
        />
      )}
      {items.map(({ label, icon, count }, index) => {
        const isSelected = index === selected;
        return (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            ref={(node) => {
              optionRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={
              // Read the counter as the Badge shows it, separated from the label.
              typeof count === 'number'
                ? `${label}, ${count > 99 ? '99+' : count}`
                : undefined
            }
            tabIndex={isSelected ? 0 : -1}
            className={classNames('ods-segmented-control__option', {
              'ods-segmented-control__option--selected': isSelected,
            })}
            onClick={() => {
              if (!isSelected) onChange(index as SegmentedControlIndex);
            }}
            onKeyDown={handleKeyDown}
          >
            {icon && (
              <span className="ods-segmented-control__icon" aria-hidden="true">
                {icon}
              </span>
            )}
            <span className="ods-segmented-control__label">{label}</span>
            {typeof count === 'number' && (
              <Badge
                // Inside an option the counter is read as part of its name.
                role={undefined}
                className="ods-segmented-control__count"
                variation="small"
                color="brand"
                count={count}
              />
            )}
          </button>
        );
      })}
    </div>
  );
});

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;
