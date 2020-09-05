import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import FormControl, { FormControlProps } from '../FormControl';
import { OptionType, RawValueType } from './types';
import './styles/select.scss';

import Context, { SelectedType } from './context';
import makeId from '../_util/makeId';
import Listbox from './Listbox';

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
  const [search, setSearch] = useState('');
  const refSelControl = useRef<HTMLButtonElement | null>(null);
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
    const select = refSelControl.current;

    if (isExpanded) refListbox.current?.focus();

    return () => {
      select?.focus();
    };
  }, [isExpanded]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any = null;

    if (search) {
      timer = setTimeout(() => {
        const index = options.findIndex((o) => o.label.startsWith(search));
        if (index >= 0) {
          const option = options[index];
          setSelected({
            id: option.id,
            index,
            label: option.label,
            value: option.value,
          });
        }

        setSearch('');
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [options, search]);

  const selectClosestOption = useCallback(
    (inc: number) => {
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
    },
    [options, selected]
  );

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
    [options.length, selectClosestOption]
  );

  const toggleIsExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleChange = (newValue: SelectedType) => {
    if (onChange) {
      onChange(newValue.value);
    }
    setIsExpanded(false);
    setSelected(newValue);
  };

  const handleListboxKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
        case 'Escape':
          toggleIsExpanded();
          break;
        default:
          handleKeyDown(event);
      }
    },
    [handleKeyDown, toggleIsExpanded]
  );

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
            ref={refSelControl}
            id={controlId}
            type="button"
            className="ods-select__control"
            disabled={disabled}
            onClick={toggleIsExpanded}
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
              ref={refListbox}
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
