/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  useContext,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';

import Context from './context';
import { OptionProps } from './types';
import './styles/option.scss';

const Option: React.FC<OptionProps> = React.memo(function Option(option) {
  const { label, className, id, index, ...rest } = option;
  const { selected, onSelect, setIsExpanded, refSelControl } = useContext(
    Context
  );
  const isSelected = useMemo(() => selected?.index === index, [
    selected,
    index,
  ]);
  const refOption = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (refOption && isSelected) {
      refOption.current!.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  }, [isSelected, refOption]);

  const handleClick = useCallback(() => {
    onSelect!(option);
    refSelControl!.current!.focus();
    setIsExpanded!(false);
  }, [onSelect, option, refSelControl, setIsExpanded]);

  return (
    <li
      {...rest}
      ref={refOption}
      id={id}
      role="option"
      className={classNames(
        'ods-select__option',
        isSelected && 'ods-select__option--selected',
        className
      )}
      onClick={handleClick}
      // In a single-select listbox, the selected option has `aria-selected`
      // set to `true`.
      aria-selected={isSelected || undefined}
    >
      <span>{label}</span>
    </li>
  );
});

export default Option;
