import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useMedia } from 'react-use';
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
  selectionIsOpen: boolean;
  handleContextMenuOpenChange: (open: boolean) => void;
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
  selectionIsOpen,
  handleContextMenuOpenChange,
}) => {
  const isMobile = useMedia('(max-width: 768px)');

  if (!multiChoice) {
    return null;
  }

  const columns = multiChoice ? Math.ceil(options.length / 5) : 1;
  const isMultiArray = Array.isArray(selectedOptions);

  const contextualOverlayClasses = classNames('ods-contextual-menu__overlay', {
    'ods-contextual-menu__overlay--after-open': selectionIsOpen,
    'ods-contextual-menu__overlay--before-close': !selectionIsOpen,
  });

  const responsivePrimaryBtnClasses = isMobile
    ? 'ods-btn ods-btn--md ods-btn--primary'
    : 'ods-btn ods-btn--sm ods-btn--primary';
  const responsiveSecondaryBtnClasses = isMobile
    ? 'ods-btn ods-btn--md ods-btn--secondary'
    : 'ods-btn ods-btn--sm ods-btn--secondary';

  return (
    <>
      <div
        className={contextualOverlayClasses}
        onClick={() => handleContextMenuOpenChange(false)}
        aria-hidden="true"
        data-testid="ods-chips-multiselect-overlay"
      />
      <div className="ods-chips__options" data-testid="ods-chips-option">
        <div
          className={classNames(
            'ods-chips__options--container',
            `ods-chips__options--content--columns-${columns}`
          )}
        >
          {headerOptions && headerOptions}
          {options.map(
            ({ label, value, indicator, disabled, indeterminate }, index) => {
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
                    showDivider={index !== options.length - 1}
                    platform={isMobile ? 'app' : 'web'}
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
          )}
        </div>

        <div className="ods-chips__options--footer">
          <button
            type="button"
            onClick={clearOptions}
            className={responsiveSecondaryBtnClasses}
            disabled={!isMultiArray || selectedOptions.length === 0}
          >
            {clearLabel}
          </button>
          <button
            type="button"
            onClick={filterOptions}
            className={responsivePrimaryBtnClasses}
          >
            {filterLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export default MultipleChoiceOptions;
