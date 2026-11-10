import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import FilterBar from '../../../packages/ocean-react/src/FilterBar';
import type { FilterBarProps } from '../../../packages/ocean-react/src/FilterBar';
import type { SegmentedControlIndex } from '../../../packages/ocean-react/src/SegmentedControl';
import '../docs.scss';

export type ControlledFilterBarProps = FilterBarProps & {
  /** Frame width: `wide` and `narrow` desktop bars; `full` takes the container. */
  width?: 'full' | 'wide' | 'narrow';
};

/**
 * FilterBar that keeps its own state, for stories and docs examples: chips without options
 * turn on and off, and the Segmented Control keeps its selection.
 */
export const ControlledFilterBar = ({
  filters,
  segmentedControl,
  width = 'full',
  className,
  ...props
}: ControlledFilterBarProps): React.ReactElement => {
  const [active, setActive] = useState<string[]>([]);
  const [scope, setScope] = useState<SegmentedControlIndex>(
    segmentedControl?.selectedIndex ?? 0
  );
  useEffect(
    () => setScope(segmentedControl?.selectedIndex ?? 0),
    [segmentedControl?.selectedIndex]
  );
  const toggle = (label: string) =>
    setActive((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  const chips = filters.map((filter) =>
    filter.options?.length
      ? filter
      : {
          ...filter,
          actived: filter.actived || active.includes(filter.label),
          onClick: () => {
            toggle(filter.label);
            filter.onClick?.();
          },
        }
  ) as FilterBarProps['filters'];
  return (
    <div
      className={classNames(
        'odoc-filter-bar-example',
        `odoc-filter-bar-example--${width}`
      )}
    >
      <FilterBar
        {...props}
        className={className}
        filters={chips}
        segmentedControl={
          segmentedControl && {
            ...segmentedControl,
            selectedIndex: scope,
            onChange: (index) => {
              setScope(index);
              segmentedControl.onChange?.(index);
            },
          }
        }
      />
    </div>
  );
};
