import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChipValue, IUseChipOptions, IUseChipReturn } from '../types';

const shouldDefaultToEmpty = (
  defaultValue?: ChipValue,
  multiChoice?: boolean
) => Boolean(defaultValue) || Boolean(multiChoice);

const useChip = ({
  defaultValue,
  multiChoice = false,
  onChange,
  onClean,
  onConfirm,
  onClose,
  onClick,
  options = [],
  selectedValue,
}: IUseChipOptions): IUseChipReturn => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState<number>(0);
  const [selectionIsOpen, setSelectionIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    ChipValue[] | ChipValue
  >(() =>
    shouldDefaultToEmpty(defaultValue, multiChoice)
      ? []
      : { label: '', value: '' }
  );

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
    const handleClickOutside = (event: TouchEvent | MouseEvent) => {
      const target = event.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setSelectionIsOpen(false);

        if (onClose && selectionIsOpen) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, selectionIsOpen]);

  const handleClickChips = useCallback(() => {
    if (options.length > 0) {
      setSelectionIsOpen((prev) => !prev);
    }

    if (onClick) {
      onClick();
    }
  }, [options.length, onClick]);

  const handleSelectOption = useCallback(
    (labelProp: string, value: string) => {
      if (!multiChoice) {
        const nextSelection = { label: labelProp, value };
        setSelectedOptions(nextSelection);
        setSelectionIsOpen(false);

        if (onChange) {
          onChange(nextSelection);
        }

        return;
      }

      setSelectedOptions((prev) => {
        if (!Array.isArray(prev)) {
          return prev;
        }

        let copyOptions = [...prev];

        if (copyOptions.find((option) => option.value === value)) {
          copyOptions = copyOptions.filter((option) => option.value !== value);
        } else {
          const matchedOption = options.find(
            (option) => option.value === value
          );
          copyOptions.push(matchedOption ?? { label: labelProp, value });
        }

        setCounter(copyOptions.length);

        if (onChange) {
          onChange(copyOptions);
        }

        return copyOptions;
      });
    },
    [multiChoice, onChange, options]
  );

  const clearOptions = useCallback(() => {
    setSelectedOptions([]);
    setCounter(0);
    setSelectionIsOpen(false);

    if (onChange) {
      onChange([]);
    }

    if (onClean) {
      onClean();
    }

    if (onClose) {
      onClose();
    }
  }, [onChange, onClean, onClose]);

  const filterOptions = useCallback(() => {
    setSelectionIsOpen(false);

    if (onConfirm) {
      onConfirm(selectedOptions);
    }

    if (onClose) {
      onClose();
    }
  }, [onConfirm, onClose, selectedOptions]);

  const handleContextMenuOpenChange = useCallback(
    (open: boolean) => {
      if (!open && selectionIsOpen && onClose) {
        onClose();
      }

      setSelectionIsOpen(open);
    },
    [onClose, selectionIsOpen]
  );

  return {
    clearOptions,
    counter,
    filterOptions,
    handleClickChips,
    handleContextMenuOpenChange,
    handleSelectOption,
    selectionIsOpen,
    selectedOptions,
    wrapperRef,
  };
};

export default useChip;
