import React, { useRef, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { ChevronDownOutline } from '@useblu/ocean-icons-react';

import FormControl from '../FormControl';
import FormLabel from '../FormLabel';
import { SelectProps } from './types';
import Context from './context';
import Listbox from './Listbox';
import useSelect from './useSelect';
import Input from '../Input';

const SelectAutocomplete: React.FC<SelectProps> = ({
  label,
  id,
  helperText,
  error,
  options: optionsProp,
  name,
  value,
  defaultValue,
  disabled,
  ariaLabel,
  onChange,
  placeholder,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');
  const timeOutId = useRef<number | undefined>();
  const refSelControl = useRef<HTMLInputElement | null>(null);

  const filteredOptions = optionsProp.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const {
    controlId,
    labelId,
    listboxId,
    selected,
    selectClosestOption,
    options,
    onSelect,
    isExpanded,
    setIsExpanded,
    setSearch,
  } = useSelect({
    options: filteredOptions,
    id,
    value,
    defaultValue,
    onChange,
    label,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsExpanded(true);

    if (event.target.value === '') {
      onSelect({
        value: '',
        label: '',
        index: -1,
        id: '',
      });
    }
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;
      const mapEventsWithInc: Record<string, number> = {
        ArrowDown: 1,
        ArrowUp: -1,
        PageDown: 4,
        PageUp: -4,
        Home: 0,
        End: filteredOptions.length - 1,
      };

      const incremental = mapEventsWithInc[key];
      if (incremental != null) {
        selectClosestOption(incremental);

        setSearch((keysSoFar) => keysSoFar + key);
      }
    },
    [filteredOptions.length, selectClosestOption, setSearch]
  );

  const handleListboxKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (refSelControl.current) {
        switch (event.key) {
          case 'Enter':
          case 'Escape':
          case 'Tab':
            event.preventDefault();
            refSelControl.current.blur();
            setIsExpanded(false);
            setInputValue(selected ? selected.label : '');
            break;
          default:
            handleKeyDown(event);
        }
      }
    },
    [handleKeyDown, setIsExpanded, selected]
  );

  const onBlurHandler = () => {
    timeOutId.current = window.setTimeout(() => {
      setIsExpanded(false);
    });
  };

  const onFocusHandler = () => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    if (isExpanded && refSelControl.current) {
      refSelControl.current.focus();
    }
  }, [isExpanded, selected]);

  return (
    <FormControl
      label={
        label && (
          <FormLabel component="span" disabled={disabled} id={labelId}>
            {label}
          </FormLabel>
        )
      }
      helperText={helperText}
      error={error}
      disabled={disabled}
    >
      <Context.Provider
        value={{
          selected,
          onSelect,
          setIsExpanded,
          refSelControl,
        }}
      >
        <div
          className="ods-select-autocomplete__root"
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
        >
          <Input
            {...rest}
            error={error}
            ref={refSelControl}
            id={controlId}
            disabled={disabled}
            onClick={() => setIsExpanded(true)}
            onKeyDown={handleListboxKeyDown}
            aria-expanded={isExpanded || undefined}
            aria-haspopup="listbox"
            aria-labelledby={ariaLabel ? undefined : labelId}
            aria-label={ariaLabel}
            value={inputValue || selected?.label || ''}
            onChange={handleInputChange}
            placeholder={placeholder}
            autoFocus
            adornment={<ChevronDownOutline />}
            className={classNames('ods-select-autocomplete__arrow', {
              'ods-select-autocomplete__arrow--up': isExpanded,
              'ods-select-autocomplete__arrow--down': !isExpanded,
              'ods-select-autocomplete__arrow--disabled': disabled,
            })}
            data-testid="select-autocomplete-test"
          />
          {name && (
            <input type="hidden" name={name} value={selected?.value || ''} />
          )}
          {isExpanded && (
            <Listbox
              id={listboxId}
              options={options.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              )}
              onKeyDown={handleListboxKeyDown}
            />
          )}
        </div>
      </Context.Provider>
    </FormControl>
  );
};

export default SelectAutocomplete;
