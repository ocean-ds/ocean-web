import React from 'react';
import classNames from 'classnames';

import Checkbox from '../Checkbox';
import { ChipValue } from './Chips';

interface IOptions {
  options: Array<ChipValue>;
  selectedOptions?: ChipValue[];
  clearLabel: string;
  filterLabel: string;
  multiChoice: boolean;
  onSelect: (label: string, value: string) => void;
  filterOptions: () => void;
  clearOptions: () => void;
}

const Options: React.FunctionComponent<IOptions> = ({
  options,
  selectedOptions = [],
  clearLabel,
  filterLabel,
  multiChoice,
  onSelect,
  filterOptions,
  clearOptions,
}) => {
  const columns = multiChoice ? Math.ceil(10 / 5) : 1;

  return (
    <div className="ods-chips__options" data-testid="ods-chips-option">
      <div
        className={classNames(
          'ods-chips__options--content',
          `ods-chips__options--content--columns-${columns}`
        )}
      >
        {options.map(({ label, value }) => (
          <button
            key={label}
            type="button"
            value={value}
            onClick={() => onSelect(label, value)}
            className="ods-chips__options--option"
          >
            {multiChoice && (
              <Checkbox
                checked={
                  !!selectedOptions.find((option) => option.value === value)
                }
                readOnly
              />
            )}
            {label}
          </button>
        ))}
      </div>
      {multiChoice && (
        <div className="ods-chips__options--footer">
          <button
            type="button"
            onClick={clearOptions}
            className="ods-btn ods-btn--sm ods-btn--text"
          >
            {clearLabel}
          </button>
          <button
            type="button"
            onClick={filterOptions}
            className="ods-btn ods-btn--sm ods-btn--primary"
          >
            {filterLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default Options;
