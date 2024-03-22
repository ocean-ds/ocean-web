import React from 'react';
import Checkbox from '../Checkbox';

import { ChipValue } from './Chips';

interface IOptions {
  options: Array<ChipValue>;
  checkbox?: boolean;
  selectedOptions?: ChipValue[];
  onSelect: (label: string, value: string) => void;
}

const Options: React.FunctionComponent<IOptions> = ({
  options,
  checkbox,
  selectedOptions = [],
  onSelect,
}) => (
  <div className="ods-chips__options">
    {options.map(({ label, value }) => (
      <button
        key={label}
        type="button"
        value={value}
        onClick={() => onSelect(label, value)}
        className="ods-chips__options--option"
      >
        {checkbox && (
          <Checkbox
            checked={!!selectedOptions.find((option) => option.value === value)}
            readOnly
          />
        )}
        {label}
      </button>
    ))}
  </div>
);

export default Options;
