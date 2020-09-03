import React, { useContext, useMemo, useRef, useEffect } from 'react';
import classNames from 'classnames';

import './styles/option.scss';
import { RawValueType } from './types';
import Context from './context';
import makeId from '../_util/makeId';

export type OptionProps = {
  value: RawValueType;
  label: string;
  className?: string;
  id?: string;
  [propName: string]: unknown;
};

function useOptionId(value: RawValueType, id?: string) {
  const { listboxId } = useContext(Context);
  return id ? id : makeId(`option-${value}`, listboxId);
}

const Option: React.FC<OptionProps> = React.memo(function Option({
  value,
  label,
  className,
  id,
  ...rest
}) {
  const refOption = useRef<HTMLLIElement | null>(null);
  const { selected, onSelect } = useContext(Context);
  const isSelected = useMemo(() => selected?.value === value, [
    selected,
    value,
  ]);
  const optionId = useOptionId(value, id);

  useEffect(() => {
    if (refOption && isSelected) {
      refOption.current?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  }, [isSelected, refOption]);

  return (
    <li
      ref={refOption}
      id={optionId}
      role="option"
      className={classNames(
        'ods-select__option',
        isSelected && 'ods-select__option--selected',
        className
      )}
      onClick={() =>
        onSelect?.({
          id: optionId,
          label,
          value,
        })
      }
      // In a single-select listbox, the selected option has `aria-selected`
      // set to `true`.
      aria-selected={isSelected || undefined}
      {...rest}
    >
      <span>{label}</span>
    </li>
  );
});

export default Option;
