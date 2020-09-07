import React, { useRef, useEffect, useCallback } from 'react';

import FormControl, { FormControlProps } from '../FormControl';
import { OptionType, RawValueType } from './types';
import './styles/select.scss';

import Context from './context';
import Listbox from './Listbox';
import useSelect from './useSelect';

type SelectProps = {
  /**
   * 	The id of the wrapper element or the select element when native.
   */
  id?: string;
  /**
   * Placeholder of select.
   */
  placeholder?: string;
  /**
   * Array of options that populate the select menu.
   */
  options: OptionType[];
  /**
   * Current selected option. Use when the component is controlled.
   */
  value?: RawValueType;
  /**
   * 	The default selected option. Use when the component is not controlled.
   */
  defaultValue?: RawValueType;
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  /**
   *	Callback function fired when an option is selected.
   */
  onChange?: (newValue: RawValueType) => void;
} & Omit<FormControlProps, 'children'>;

const Select: React.FC<SelectProps> = ({
  label,
  id,
  helperText,
  error,
  blocked,
  options: optionsProp,
  name,
  value,
  defaultValue,
  disabled,
  ariaLabelledBy,
  ariaLabel,
  onChange,
}) => {
  const {
    controlId,
    listboxId,
    selected,
    selectClosestOption,
    options,
    onSelect,
    isExpanded,
    setIsExpanded,
    setSearch,
  } = useSelect(optionsProp, id, value, defaultValue, onChange);

  const timeOutId = useRef<number>();
  const refSelControl = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key } = event;
      const mapEventsWithInc: Record<string, number> = {
        ArrowDown: 1,
        ArrowUp: -1,
        PageDown: 4,
        PageUp: -4,
        Home: 0,
        End: options.length - 1,
      };

      const incremental = mapEventsWithInc[key];
      if (incremental != null) selectClosestOption(incremental);

      setSearch((keysSoFar) => keysSoFar + key);
    },
    [options.length, selectClosestOption, setSearch]
  );

  const handleListboxKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
        case 'Escape':
          event.preventDefault();
          refSelControl.current?.focus();
          setIsExpanded(false);
          break;
        default:
          handleKeyDown(event);
      }
    },
    [handleKeyDown, setIsExpanded]
  );

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  const onBlurHandler = () => {
    timeOutId.current = setTimeout(() => {
      setIsExpanded(false);
    });
  };

  // If a child receives focus, do not close the popover.
  const onFocusHandler = () => {
    clearTimeout(timeOutId.current);
  };

  return (
    <FormControl
      label={label}
      htmlFor={controlId}
      helperText={helperText}
      error={error}
      blocked={blocked}
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
          className="ods-select__root"
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
        >
          <button
            ref={refSelControl}
            id={controlId}
            type="button"
            className="ods-select__control"
            disabled={disabled}
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyDown={handleKeyDown}
            // Set by the JavaScript when the listbox is displayed. Otherwise, is
            // not present.
            aria-expanded={isExpanded || undefined}
            aria-haspopup="listbox"
            // If an `aria-label` is passed, we should skip `aria-labelledby` to
            // avoid confusion.
            aria-labelledby={
              ariaLabel
                ? undefined
                : [ariaLabelledBy, controlId].filter(Boolean).join(' ')
            }
            aria-label={ariaLabel}
          >
            <span className="ods-select__value">{selected?.label}</span>
            <span className="ods-select__arrow" aria-hidden>
              {isExpanded ? '▲' : '▼'}
            </span>
            {name && (
              <input type="hidden" name={name} value={selected?.value} />
            )}
          </button>
          {isExpanded && (
            <Listbox
              id={listboxId}
              options={options}
              onKeyDown={handleListboxKeyDown}
            />
          )}
        </div>
      </Context.Provider>
    </FormControl>
  );
};

export default Select;
