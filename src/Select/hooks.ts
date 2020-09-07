import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useId } from '@reach/auto-id';

import makeId from '../_util/makeId';
import { SelectedType } from './context';
import { OptionType, RawValueType } from './types';

type SelectHookType = {
  controlId: string;
  listboxId: string;
  selected?: SelectedType;
  selectByValue: (newValue: RawValueType) => void;
  selectByIndex: (newIndex: number) => void;
  selectClosestOption: (incremental: number) => void;
  options: Array<{ id: string } & OptionType>;
  onSelect: (newOption: SelectedType) => void;
};

export const useSelect = (
  options: OptionType[],
  id?: string,
  value?: RawValueType,
  defaultValue?: RawValueType,
  onChange?: (newValue: RawValueType) => void
): SelectHookType => {
  const controlId = useId(id);
  const listboxId = makeId('listbox', controlId);

  const [selected, setSelected] = useState<SelectedType>();
  const optionsMemo = useMemo(
    () =>
      options.map((opt, index) => ({
        ...opt,
        index,
        id: makeId(`option-${opt.value}`, listboxId),
      })),
    [listboxId, options]
  );

  const isControlled = useRef(Boolean(value || onChange));

  const handleChange = useCallback(
    (option: SelectedType) => {
      if (isControlled.current) {
        onChange?.(option.value);
      } else {
        setSelected(option);
      }
    },
    [onChange]
  );

  const selectByValue = useCallback(
    (value?: RawValueType) => {
      const option = optionsMemo.find((o) => o.value === value);
      if (option) handleChange(option);
    },
    [handleChange, optionsMemo]
  );

  const selectByIndex = useCallback(
    (index: number) => {
      const option = optionsMemo[index];
      if (option) handleChange(option);
    },
    [handleChange, optionsMemo]
  );

  const selectClosestOption = useCallback(
    (incremental: number) => {
      const currentIndex = selected ? selected.index : -1;
      let newIndex = incremental == 0 ? 0 : currentIndex + incremental;

      if (newIndex < 0) newIndex = 0;
      if (newIndex > options.length - 1) newIndex = options.length - 1;

      selectByIndex(newIndex);
    },
    [options.length, selectByIndex, selected]
  );

  useEffect(() => {
    if (isControlled.current) {
      selectByValue(value);
    } else if (defaultValue && !selected) {
      selectByValue(defaultValue);
    }
  }, [defaultValue, selectByValue, selected, value]);

  return {
    controlId: controlId || 'sel-control',
    listboxId,
    selected,
    selectByValue,
    selectByIndex,
    selectClosestOption,
    options: optionsMemo,
    onSelect: handleChange,
  };
};
