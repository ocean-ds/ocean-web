import React, { useState } from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';
import Option, { OptionProps, RawValue } from './Option';
import './styles/select.scss';

type SelectProps = {
  id?: string;
  /**
   * Placeholder of select.
   */
  placeholder?: string;
  options: OptionProps[];
  value?: RawValue;
  defaultValue?: RawValue;
  /**
   * Name of the HTML Input (optional - without this, no input will be rendered)
   */
  name?: string;
} & Omit<FormControlProps, 'children'>;

const Select: React.FC<SelectProps> = ({
  label,
  id,
  helperText,
  error,
  blocked,
  options,
  name,
  value,
  disabled,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <FormControl
      label={label}
      htmlFor={id}
      helperText={helperText}
      error={error}
      blocked={blocked}
      disabled={disabled}
    >
      <div className="ods-select__root">
        <div
          id={id}
          role="button"
          className={classNames('ods-select__control', {
            'ods-select__control--disabled': disabled,
          })}
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-expanded={isExpanded || undefined}
          aria-haspopup="listbox"
          onClick={() => !disabled && setIsExpanded(!isExpanded)}
        >
          <span className="ods-select__value">{value}</span>
          <span className="ods-select__arrow" aria-hidden>
            {isExpanded ? '▲' : '▼'}
          </span>
          {name && <input type="hidden" name={name} />}
        </div>
        {isExpanded && (
          <div className="ods-select__list-container">
            <ul
              tabIndex={-1}
              role="listbox"
              className="ods-select__list-options"
            >
              {options.map((o) => (
                <Option key={o.value} {...o} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </FormControl>
  );
};

export default Select;
