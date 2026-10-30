import React, { useEffect, useState } from 'react';
import Tab from '../../../packages/ocean-react/src/Tab';
import type { TabProps } from '../../../packages/ocean-react/src/Tab';
import '../docs.scss';

export type ControlledTabProps = Omit<TabProps, 'onChange'> & {
  onChange?: (index: number) => void;
  /** Limits the width to the mobile frame, to show the horizontal scroll. */
  narrow?: boolean;
};

/** Tab that keeps its own selection, for stories and docs examples. */
export const ControlledTab = ({
  selectedIndex,
  onChange,
  narrow = false,
  ...props
}: ControlledTabProps): React.ReactElement => {
  const [selected, setSelected] = useState(selectedIndex);
  useEffect(() => setSelected(selectedIndex), [selectedIndex]);
  return (
    <div
      className={`odoc-tab-example${narrow ? ' odoc-tab-example--narrow' : ''}`}
    >
      <Tab
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
