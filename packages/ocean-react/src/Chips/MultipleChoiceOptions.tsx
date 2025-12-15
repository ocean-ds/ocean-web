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
  selectAllOptions: boolean;
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
  selectAllOptions,
}) => {
  const isMobile = useMedia('(max-width: 768px)');

  const selectedArray = Array.isArray(selectedOptions) ? selectedOptions : [];

  const selectedValues = selectedArray.map((option) => option.value);
  const allOptionsSelected =
    selectedValues.length === options.length && options.length > 0;
  const someOptionsSelected =
    selectedValues.length > 0 && selectedValues.length < options.length;

  const handleSelectAllOptions = () => {
    if (!Array.isArray(selectedOptions)) {
      return;
    }

    if (allOptionsSelected) {
      selectedArray.forEach(({ label, value }) => {
        onSelect(label, value);
      });
      return;
    }

    options.forEach((option) => {
      if (!selectedValues.includes(option.value)) {
        onSelect(option.label, option.value);
      }
    });
  };

  if (!multiChoice) {
    return null;
  }

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
        {selectAllOptions && (
          <div className="ods-chips__options__select-all">
            <ListSelectable
              status="highlight"
              type="text"
              title="Selecionar todos"
              checkbox={{
                id: 'select-all',
                checked: allOptionsSelected || someOptionsSelected,
                indeterminate: someOptionsSelected,
                onChange: () => handleSelectAllOptions(),
              }}
              platform={isMobile ? 'app' : 'web'}
            />
          </div>
        )}
        {headerOptions && (
          <div className="ods-chips__options__header">{headerOptions}</div>
        )}
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
