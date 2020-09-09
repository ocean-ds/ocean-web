import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useId } from '@reach/auto-id';

import makeId from '../_util/makeId';
import { SelectedType } from './context';
import { OptionType, RawValueType, SelectProps } from './types';

type SelectHookType = {
  controlId?: string;
  labelId: string;
  listboxId: string;
  selected?: SelectedType;
  selectByValue: (newValue: RawValueType) => void;
  selectClosestOption: (incremental: number) => void;
  options: Array<{ id: string } & OptionType>;
  onSelect: (newOption: SelectedType) => void;
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
}: SelectProps): SelectHookType => {
  const controlId = useId(id);
  const labelId = makeId('label', controlId);
  const listboxId = makeId('listbox', controlId);

  const isControlled = useRef(value != null);
  const [selected, setSelected] = useState<SelectedType>();
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

  const handleChange = useCallback(
    (option: SelectedType) => {
      if (selected?.id == option.id) return;

      if (!selected && defaultValue) {
        setSelected(option);
      } else {
        if (!isControlled.current) setSelected(option);
        onChange?.(option);
      }
    },
    [defaultValue, onChange, selected]
  );

  const selectByValue = useCallback(
    (value?: RawValueType) => {
      const option = optionsMemo.find((o) => o.value === value);
      option && handleChange(option);
    },
    [handleChange, optionsMemo]
  );

  const selectByIndex = useCallback(
    (index: number) => {
      const option = optionsMemo[index];
      option && handleChange(option);
    },
    [handleChange, optionsMemo]
  );

  const selectClosestOption = useCallback(
    (incremental: number) => {
      const lastIndex = optionsMemo.length - 1;
      let newIndex = incremental == 0 ? 0 : currentIndex + incremental;

      if (newIndex < 0) newIndex = 0;
      else if (newIndex > lastIndex || incremental == lastIndex)
        newIndex = lastIndex;

      selectByIndex(newIndex);
    },
    [currentIndex, optionsMemo.length, selectByIndex]
  );

  useEffect(() => {
    if (isControlled.current) selectByValue(value);
    else if (defaultValue && !selected) selectByValue(defaultValue);
  }, [defaultValue, selectByValue, selected, value]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (search) {
      timer = setTimeout(() => {
        const options = [
          ...optionsMemo.slice(currentIndex + 1),
          ...optionsMemo.slice(0, currentIndex + 1),
        ];

        const option = options.find((o) =>
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
    selectByValue,
    selectClosestOption,
    options: optionsMemo,
    onSelect: handleChange,
    isExpanded,
    setIsExpanded,
    setSearch,
  };
};

export default useSelect;
