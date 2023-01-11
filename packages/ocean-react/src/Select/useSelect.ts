import { useCallback, useEffect, useMemo, useState } from 'react';
import { useId } from '@reach/auto-id';

import makeId from '../_util/makeId';
import { OptionProps, RawValueType, SelectProps } from './types';

type SelectHookType = {
  controlId?: string;
  labelId?: string;
  listboxId: string;
  selected?: OptionProps;
  selectClosestOption: (incremental: number) => void;
  options: OptionProps[];
  onSelect: (newOption: OptionProps) => void;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const useSelect = ({
  options,
  id,
  value,
  defaultValue,
  onChange,
  label,
}: SelectProps): SelectHookType => {
  const controlId = useId(id);
  const labelId = label ? makeId('label', controlId) : undefined;
  const listboxId = makeId('listbox', controlId);

  const isControlled = Boolean(value);
  const [selected, setSelected] = useState<OptionProps>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState('');

  const currentIndex = selected ? selected.index : -1;

  const optionsMemo = useMemo(
    () =>
      options.map((opt, index) => ({
        ...opt,
        index,
        id: makeId(`option-${opt.value}`, listboxId),
      })),
    [listboxId, options]
  );

  const onSelect = useCallback(
    (option: OptionProps, canEmitChangeEvent = true) => {
      if (selected?.id === option.id) return;

      setSelected(option);
      if (canEmitChangeEvent && onChange) {
        onChange(option);
      }
    },
    [onChange, selected]
  );

  const selectByIndex = useCallback(
    (index: number) => {
      const option = optionsMemo[index];
      return option && onSelect(option);
    },
    [onSelect, optionsMemo]
  );

  const selectClosestOption = useCallback(
    (incremental: number) => {
      const lastIndex = optionsMemo.length - 1;
      let newIndex = incremental === 0 ? 0 : currentIndex + incremental;

      if (newIndex < 0) newIndex = 0;
      else if (newIndex > lastIndex || incremental === lastIndex)
        newIndex = lastIndex;

      selectByIndex(newIndex);
    },
    [currentIndex, optionsMemo.length, selectByIndex]
  );

  const selectByValue = useCallback(
    (val?: RawValueType) => {
      const option = optionsMemo.find((o) => o.value === val);
      return option && onSelect(option, false);
    },
    [onSelect, optionsMemo]
  );

  useEffect(() => {
    if (isControlled) selectByValue(value);
    else if (defaultValue && !selected) selectByValue(defaultValue);
  }, [defaultValue, isControlled, selectByValue, selected, value]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (search) {
      timer = setTimeout(() => {
        const optionList = [
          ...optionsMemo.slice(currentIndex + 1),
          ...optionsMemo.slice(0, currentIndex + 1),
        ];

        const option = optionList.find((o) =>
          o.label.toLowerCase().startsWith(search.toLowerCase())
        );

        if (option) selectByIndex(option.index);
        setSearch('');
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, optionsMemo, search, selectByIndex]);

  return {
    controlId,
    labelId,
    listboxId,
    selected,
    selectClosestOption,
    options: optionsMemo,
    onSelect,
    isExpanded,
    setIsExpanded,
    setSearch,
  };
};

export default useSelect;
