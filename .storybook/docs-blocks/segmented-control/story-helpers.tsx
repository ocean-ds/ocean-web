import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import SegmentedControl from '../../../packages/ocean-react/src/SegmentedControl';
import type {
  SegmentedControlIndex,
  SegmentedControlProps,
} from '../../../packages/ocean-react/src/SegmentedControl';
import '../docs.scss';

export type ControlledSegmentedControlProps = Omit<
  SegmentedControlProps,
  'onChange'
> & {
  onChange?: (index: SegmentedControlIndex) => void;
  /** Limits the width, to show long labels cut with an ellipsis. */
  narrow?: boolean;
  /** Puts the control on a light up surface, where the white background is used. */
  surface?: boolean;
};

/** SegmentedControl that keeps its own selection, for stories and docs examples. */
export const ControlledSegmentedControl = ({
  selectedIndex,
  onChange,
  narrow = false,
  surface = false,
  ...props
}: ControlledSegmentedControlProps): React.ReactElement => {
  const [selected, setSelected] = useState(selectedIndex);
  useEffect(() => setSelected(selectedIndex), [selectedIndex]);
  return (
    <div
      className={classNames('odoc-segmented-control-example', {
        'odoc-segmented-control-example--narrow': narrow,
        'odoc-segmented-control-example--surface': surface,
      })}
    >
      <SegmentedControl
        {...props}
        selectedIndex={selected}
        onChange={(index) => {
          setSelected(index);
          onChange?.(index);
        }}
      />
    </div>
  );
};
