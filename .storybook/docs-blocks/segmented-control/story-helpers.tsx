import React, { useEffect, useState } from 'react';
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
};

/** SegmentedControl that keeps its own selection, for stories and docs examples. */
export const ControlledSegmentedControl = ({
  selectedIndex,
  onChange,
  narrow = false,
  ...props
}: ControlledSegmentedControlProps): React.ReactElement => {
  const [selected, setSelected] = useState(selectedIndex);
  useEffect(() => setSelected(selectedIndex), [selectedIndex]);
  return (
    <div
      className={`odoc-segmented-control-example${
        narrow ? ' odoc-segmented-control-example--narrow' : ''
      }`}
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
