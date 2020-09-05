import React, { useState, useRef, useEffect, useMemo } from 'react';

import FormControl, { FormControlProps } from '../FormControl';
import Option from './Option';
import { OptionType, RawValueType } from './types';
import './styles/select.scss';

import Context, { SelectedType } from './context';
import makeId from '../_util/makeId';

type SelectProps = {
  id?: string;
  /**
   * Placeholder of select.
   */
  placeholder?: string;
  options: OptionType[];
  value?: RawValueType;
  defaultValue?: RawValueType;
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
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
  // value,
  // defaultValue,
  disabled,
  ariaLabelledBy,
  ariaLabel,
  onChange,
}) => {
  const controlId = id || 'sel-control';
  const listboxId = makeId('listbox', controlId);
  const [selected, setSelected] = useState<SelectedType>();
  const [isExpanded, setIsExpanded] = useState(false);
  const refListbox = useRef<HTMLUListElement | null>(null);
  const options = useMemo(
    () =>
      optionsProp.map((opt) => ({
        ...opt,
        id: makeId(`option-${opt.value}`, listboxId),
      })),
    [listboxId, optionsProp]
  );

  useEffect(() => {
    if (isExpanded) {
      refListbox.current?.focus();
    }
  }, [isExpanded]);

  const selectClosestOption = (inc: number) => {
    const currentIndex = selected ? selected.index : -1;
    let nextIndex = inc == 0 ? 0 : currentIndex + inc;

    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > options.length - 1) nextIndex = options.length - 1;

    const { id, value, label } = options[nextIndex];
    setSelected({
      index: nextIndex,
      id,
      value,
      label,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const mapEventsWithInc: Record<string, number> = {
      ArrowDown: 1,
      ArrowUp: -1,
      PageDown: 4,
      PageUp: -4,
      Home: 0,
      End: options.length - 1,
    };

    const incremental = mapEventsWithInc[event.key];
    if (incremental != null) selectClosestOption(incremental);
  };

  const handleChange = (newValue: SelectedType) => {
    if (onChange) {
      onChange(newValue.value);
    }
    setIsExpanded(false);
    setSelected(newValue);
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
      <Context.Provider value={{ selected, onSelect: handleChange, listboxId }}>
        <div className="ods-select__root">
          <button
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
            <div className="ods-select__listbox-wrapper">
              <ul
                ref={refListbox}
                id={listboxId}
                tabIndex={-1}
                role="listbox"
                // Tells assistive technologies which of the options, if any, is
                // visually indicated as having keyboard focus. DOM focus remains on the
                // `ul` element and the idref specified for `aria-activedescendant`
                // refers to the `li` element that is visually styled as focused. When
                // navigation keys, such as `Down Arrow`, are pressed, the JavaScript
                // changes the value.
                aria-activedescendant={selected?.id || undefined}
                className="ods-select__listbox"
                onKeyDown={handleKeyDown}
              >
                {options.map((option, index) => (
                  <Option key={option.value} index={index} {...option} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Context.Provider>
    </FormControl>
  );
};

export default Select;
