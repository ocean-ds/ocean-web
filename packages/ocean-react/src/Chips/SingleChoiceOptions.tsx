import React from 'react';
import classNames from 'classnames';
import { ChipValue } from './Chips';

interface ISingleChoiceOptions {
  options: Array<ChipValue>;
  selectedOptions: ChipValue[] | ChipValue;
  onSelect: (label: string, value: string) => void;
}

const SingleChoiceOptions: React.FunctionComponent<ISingleChoiceOptions> = ({
  options,
  selectedOptions,
  onSelect,
}) => (
  <div className="ods-chips__options" data-testid="ods-chips-option">
    <div className={classNames('ods-chips__options--container')}>
      {options.map(({ label, value }) => {
        const isSelected =
          !Array.isArray(selectedOptions) && selectedOptions?.value === value;

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
  </div>
);

export default SingleChoiceOptions;
