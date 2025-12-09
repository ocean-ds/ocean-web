import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ListSelectable from '../ListSelectable';
import { ChipValue } from './Chips';

interface IMultipleChoiceOptions {
  options: Array<ChipValue>;
  selectedOptions: ChipValue[] | ChipValue;
  clearLabel: string;
  filterLabel: string;
  multiChoice: boolean;
  onSelect: (label: string, value: string) => void;
  clearOptions: () => void;
  filterOptions: () => void;
  headerOptions?: ReactNode;
}

const MultipleChoiceOptions: React.FunctionComponent<
  IMultipleChoiceOptions
> = ({
  options,
  selectedOptions,
  clearLabel,
  filterLabel,
  multiChoice,
  onSelect,
  clearOptions,
  filterOptions,
  headerOptions,
}) => {
  if (!multiChoice) {
    return null;
  }

  const columns = multiChoice ? Math.ceil(options.length / 5) : 1;
  const isMultiArray = Array.isArray(selectedOptions);

  return (
    <div className="ods-chips__options" data-testid="ods-chips-option">
      <div
        className={classNames(
          'ods-chips__options--container',
          `ods-chips__options--content--columns-${columns}`
        )}
      >
        {headerOptions && headerOptions}
        {options.map(({ label, value, indicator, disabled, indeterminate }) => {
          const isSelected = Array.isArray(selectedOptions)
            ? selectedOptions.some(
                (option: ChipValue) => option.value === value
              )
            : selectedOptions.value === value;

          return (
            <div key={value}>
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
        })}
      </div>

      <div className="ods-chips__options--footer">
        <button
          type="button"
          onClick={clearOptions}
          className="ods-btn ods-btn--sm ods-btn--secondary"
          disabled={!isMultiArray || selectedOptions.length === 0}
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
    </div>
  );
};

export default MultipleChoiceOptions;
