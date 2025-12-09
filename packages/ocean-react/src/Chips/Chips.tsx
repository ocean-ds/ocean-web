import React, { useRef, useEffect, ReactNode } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import Badge from '../Badge';
import SingleChoiceOptions from './SingleChoiceOptions';
import MultipleChoiceOptions from './MultipleChoiceOptions';

export type ChipValue = {
  label: string;
  value: string;
  indicator?: ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
};

interface IChips {
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  multiChoice?: boolean;
  options?: ChipValue[];
  defaultValue?: ChipValue;
  clearLabel?: string;
  filterLabel?: string;
  initialCounter?: number;
  actived?: boolean;
  selectedValue?: ChipValue | ChipValue[];
  onClick?: () => void;
  onChange?: (value: ChipValue[] | ChipValue) => void;
  onClose?: () => void;
  onConfirm?: (value: ChipValue[] | ChipValue) => void;
  onClean?: () => void;
  headerOptions?: ReactNode;
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
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = React.useState<number>(0);
  const [selectionIsOpen, setSelectionIsOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<
    ChipValue[] | ChipValue
  >(defaultValue || multiChoice ? [] : { label: '', value: '' });

  function handleClickOutside(event: TouchEvent | MouseEvent) {
    const target = event.target as Node;

    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      setSelectionIsOpen(false);

      if (onClose && selectionIsOpen) onClose();
    }
  }

  useEffect(() => {
    if (selectedValue && selectedValue !== selectedOptions) {
      setSelectedOptions(selectedValue);

      if (multiChoice && Array.isArray(selectedValue)) {
        setCounter(selectedValue.length);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef, selectionIsOpen]);

  const handleClickChips = () => {
    if (options && options?.length > 0) {
      setSelectionIsOpen(!selectionIsOpen);
    }

    if (onClick) {
      onClick();
    }
  };

  const handleSelectOption = (labelProp: string, value: string) => {
    if (!multiChoice) {
      setSelectedOptions({ label: labelProp, value });
      setSelectionIsOpen(false);
      if (onClose) onClose();

      if (onChange) {
        onChange({ label: labelProp, value });
      }

      return;
    }

    if (Array.isArray(selectedOptions)) {
      let copyOptions = [...selectedOptions];

      if (selectedOptions.find((option) => option.value === value)) {
        copyOptions = copyOptions.filter((option) => option.value !== value);
      } else {
        copyOptions.push({ label: labelProp, value });
      }

      setCounter(copyOptions.length);
      setSelectedOptions(copyOptions);

      if (onChange) {
        onChange(copyOptions);
      }
    }
  };

  const displayValue = (): string => {
    if (!Array.isArray(selectedOptions)) {
      return selectedOptions.value ? selectedOptions.label : label;
    }

    return label;
  };

  const clearOptions = () => {
    setSelectedOptions([]);
    setCounter(0);
    setSelectionIsOpen(false);
    if (onChange) onChange([]);
    if (onClean) onClean();
    if (onClose) onClose();
  };

  const filterOptions = () => {
    setSelectionIsOpen(false);

    if (onConfirm) onConfirm(selectedOptions);
    if (onClose) onClose();
  };

  return (
    <div className="ods-chips" ref={wrapperRef}>
      <button
        type="button"
        onClick={handleClickChips}
        disabled={disabled}
        className={classNames('ods-chips__button', {
          'ods-chips__button--disabled': disabled,
          'ods-chips__button--active':
            selectionIsOpen ||
            (Array.isArray(selectedOptions)
              ? selectedOptions.length > 0
              : selectedOptions?.value) ||
            actived,
        })}
      >
        {icon || undefined}
        <p className="ods-chips__label">{displayValue()}</p>
        {(counter > 0 || initialCounter) && (
          <Badge color="brand" className="ods-chips__badge">
            {initialCounter ?? counter}
          </Badge>
        )}
        {options && options?.length > 0 && !selectionIsOpen && <ChevronDown />}
        {options && options?.length > 0 && selectionIsOpen && <ChevronUp />}
      </button>
      {selectionIsOpen &&
        options &&
        (multiChoice ? (
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
          />
        ) : (
          <SingleChoiceOptions
            options={options}
            onSelect={handleSelectOption}
            selectedOptions={selectedOptions}
          />
        ))}
    </div>
  );
};

Chips.displayName = 'Chips';

export default Chips;
