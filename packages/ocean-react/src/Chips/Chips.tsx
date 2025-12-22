import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import Badge from '../Badge';
import ContextualMenu from '../ContextualMenu';
import MultipleChoiceOptions from './MultipleChoiceOptions';
import useChip from './hooks/useChip';
import type { ChipValue } from './types';

interface IChips {
  /*
   * The label of the chip button.
   */
  label: string;
  /*
   * The icon of the chip button.
   */
  icon?: React.ReactNode;
  /*
   * Whether the chip button is disabled.
   */
  disabled?: boolean;
  /*
   * Whether the chip button is a multi-choice.
   */
  multiChoice?: boolean;
  /*
   * The options of the chip button.
   */
  options?: ChipValue[];
  /*
   * The default value of the chip button.
   */
  defaultValue?: ChipValue;

  /*
   * The label of the clear button.
   */
  clearLabel?: string;
  /*
   * The label of the filter button.
   */
  filterLabel?: string;
  /*
   * The initial counter of the chip button.
   */
  initialCounter?: number;
  /*
   * Whether the chip button is active.
   */
  actived?: boolean;
  /*
   * The selected value of the chip button.
   */
  selectedValue?: ChipValue | ChipValue[];
  /*
   * The function to call when the chip button is clicked.
   */
  onClick?: () => void;
  /*
   * The function to call when the value of the chip button changes.
   */
  onChange?: (value: ChipValue[] | ChipValue) => void;
  /*
   * The function to call when the chip button is closed.
   */
  onClose?: () => void;
  /*
   * The function to call when the chip button is confirmed.
   */
  onConfirm?: (value: ChipValue[] | ChipValue) => void;
  /*
   * The function to call when the chip button is cleaned.
   */
  onClean?: () => void;
  /*
   * The header options of the chip button.
   */
  headerOptions?: ReactNode;
  /*
   * Whether to select all options.
   */
  selectAllOptions?: boolean;
}

const Chips: React.FunctionComponent<IChips> = ({
  label,
  icon,
  disabled,
  defaultValue,
  options = [],
  multiChoice = false,
  clearLabel = 'Limpar',
  filterLabel = 'Filtrar',
  initialCounter,
  actived,
  selectedValue,
  onClick,
  onChange,
  onClose,
  onConfirm,
  onClean,
  headerOptions,
  selectAllOptions = false,
}) => {
  const {
    clearOptions,
    counter,
    filterOptions,
    handleClickChips,
    handleContextMenuOpenChange,
    handleSelectOption,
    selectedOptions,
    selectionIsOpen,
    wrapperRef,
  } = useChip({
    defaultValue,
    multiChoice,
    onChange,
    onClean,
    onConfirm,
    onClose,
    onClick,
    options,
    selectedValue,
  });

  const displayValue = (): string => {
    if (!Array.isArray(selectedOptions)) {
      return selectedOptions.value ? selectedOptions.label : label;
    }

    return label;
  };

  const contextualMenuItems = React.useMemo(
    () =>
      multiChoice
        ? []
        : options.map(
            ({
              label: optionLabel,
              value,
              indicator,
              disabled: optionDisabled,
              tag,
            }) => ({
              label: optionLabel,
              value,
              icon: indicator,
              disabled: optionDisabled,
              tag,
              id: `chips-option-${value}`,
              type: 'neutral' as const,
            })
          ),
    [multiChoice, options]
  );

  const handleContextualMenuSelect = (value: string) => {
    const option = options.find((item) => item.value === value);

    if (option) {
      handleSelectOption(option.label, option.value);
    }
  };

  const contextualMenuSelectedValue =
    !Array.isArray(selectedOptions) && selectedOptions?.value
      ? selectedOptions.value
      : undefined;

  const hasOptions = options && options?.length > 0;
  const shouldRenderOptions = selectionIsOpen && hasOptions;

  const renderOptions = () => {
    if (multiChoice) {
      return (
        <MultipleChoiceOptions
          options={options}
          onSelect={handleSelectOption}
          selectedOptions={selectedOptions}
          clearLabel={clearLabel}
          filterLabel={filterLabel}
          multiChoice={multiChoice}
          clearOptions={clearOptions}
          filterOptions={filterOptions}
          headerOptions={headerOptions}
          selectionIsOpen={selectionIsOpen}
          handleContextMenuOpenChange={handleContextMenuOpenChange}
          selectAllOptions={selectAllOptions}
        />
      );
    }

    return (
      <ContextualMenu
        items={contextualMenuItems}
        open={selectionIsOpen}
        onOpenChange={handleContextMenuOpenChange}
        onSelect={handleContextualMenuSelect}
        selectedValue={contextualMenuSelectedValue}
        className="ods-chips__contextual-menu"
      />
    );
  };

  const badgeCount = initialCounter ?? counter;

  return (
    <div className="ods-chips" ref={wrapperRef}>
      <button
        type="button"
        onClick={handleClickChips}
        disabled={disabled}
        className={classNames('ods-chips__button', {
          'ods-chips__button--disabled': disabled,
          'ods-chips__button--no-options': !hasOptions,
          'ods-chips__button--active':
            (Array.isArray(selectedOptions)
              ? selectedOptions.length > 0
              : selectedOptions?.value) || actived,
        })}
      >
        {icon || undefined}
        <p className="ods-chips__label">{displayValue()}</p>
        {badgeCount > 0 && (
          <Badge
            color="brand"
            className="ods-chips__badge"
            count={initialCounter ?? counter}
          />
        )}

        {hasOptions && !selectionIsOpen && <ChevronDown />}
        {hasOptions && selectionIsOpen && <ChevronUp />}
      </button>
      {shouldRenderOptions && renderOptions()}
    </div>
  );
};

Chips.displayName = 'Chips';

export type { ChipValue } from './types';

export default Chips;
