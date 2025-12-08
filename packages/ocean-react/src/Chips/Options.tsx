import React, { ReactNode } from 'react';
import classNames from 'classnames';

import ListSelectable from '../ListSelectable';

import { ChipValue } from './Chips';

interface IOptions {
  options: Array<ChipValue>;
  selectedOptions: ChipValue[] | ChipValue;
  clearLabel: string;
  filterLabel: string;
  multiChoice: boolean;
  isClearDisabled: boolean;
  onSelect: (label: string, value: string) => void;
  filterOptions: () => void;
  clearOptions: () => void;
  headerOptions?: ReactNode;
}

const Options: React.FunctionComponent<IOptions> = ({
  options,
  selectedOptions,
  clearLabel,
  filterLabel,
  multiChoice,
  isClearDisabled,
  onSelect,
  filterOptions,
  clearOptions,
  headerOptions,
}) => {
  const columns = multiChoice ? Math.ceil(options.length / 5) : 1;
  const isMultiArray = Array.isArray(selectedOptions);

  return (
    <div className="ods-chips__options" data-testid="ods-chips-option">
      <div
        className={classNames(
          `ods-chips__options--content--columns-${columns}`,
          {
            'ods-chips__options--content': !multiChoice,
          }
        )}
      >
        {multiChoice && headerOptions && { headerOptions }}
        {options.map(({ label, value, indicator, disabled, indeterminate }) => {
          if (multiChoice && isMultiArray) {
            const isSelected = selectedOptions.some(
              (option) => option.value === value
            );

            return (
              <div
                key={value}
                className={classNames({
                  'ods-chips__options--option--selected': isSelected,
                })}
              >
                <ListSelectable
                  inverted
                  indicator={indicator}
                  type="text"
                  title={label}
                  showDivider
                  checkbox={{
                    id: `chips-option-${value}`,
                    checked: isSelected,
                    onClick: () => onSelect(label, value),
                    readOnly: true,
                    disabled,
                    indeterminate: indeterminate || false,
                  }}
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
            disabled={isClearDisabled}
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
