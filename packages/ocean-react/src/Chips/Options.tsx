import React from 'react';
import classNames from 'classnames';

import Checkbox from '../Checkbox';
import { ChipValue } from './Chips';

interface IOptions {
  options: Array<ChipValue>;
  selectedOptions: ChipValue[] | ChipValue;
  clearLabel: string;
  filterLabel: string;
  multiChoice: boolean;
  onSelect: (label: string, value: string) => void;
  filterOptions: () => void;
  clearOptions: () => void;
}

const Options: React.FunctionComponent<IOptions> = ({
  options,
  selectedOptions,
  clearLabel,
  filterLabel,
  multiChoice,
  onSelect,
  filterOptions,
  clearOptions,
}) => {
  const columns = multiChoice ? Math.ceil(options.length / 5) : 1;
  const isMultiArray = Array.isArray(selectedOptions);

  return (
    <div className="ods-chips__options" data-testid="ods-chips-option">
      <div
        className={classNames(
          'ods-chips__options--content',
          `ods-chips__options--content--columns-${columns}`
        )}
      >
        {options.map(({ label, value }) => {
          if (multiChoice && isMultiArray) {
            const isSelected = selectedOptions.some(
              (option) => option.value === value
            );

            return (
              <div
                key={value}
                className={classNames(
                  'ods-chips__options--option',
                  'ods-chips__options--option-container',
                  {
                    'ods-chips__options--option--selected': isSelected,
                  }
                )}
              >
                <Checkbox
                  checked={isSelected}
                  id={`chips-option-${value}`}
                  onClick={() => onSelect(label, value)}
                  readOnly
                  label={label}
                />
              </div>
            );
          }

          const isSelected =
            !multiChoice && !isMultiArray && selectedOptions.value === value;

          return (
            <button
              key={value}
              type="button"
              value={value}
              onClick={() => onSelect(label, value)}
              className={classNames('ods-chips__options--option', {
                'ods-chips__options--option--selected': isSelected,
              })}
            >
              {label}
            </button>
          );
        })}
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
