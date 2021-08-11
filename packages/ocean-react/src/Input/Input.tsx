import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import FormControl, { FormControlProps } from '../FormControl';

export type InputProps = {
  /**
   * Type of the `input` element.
   * @default 'text'
   */
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
} & Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type,
    className,
    label,
    helperText,
    blocked,
    error,
    id,
    disabled,
    onChange,
    value = undefined,
    defaultValue,
    ...rest
  },
  ref
) {
  const [filled, setFilled] = useState(Boolean(value || defaultValue));

  const handleChange = useCallback(
    (event) => {
      if (onChange) return onChange(event);

      // uncontrolled version
      setFilled(Boolean(event.target.value));
    },
    [onChange]
  );

  useEffect(() => {
    setFilled(Boolean(value));
  }, [value]);

  useEffect(() => {
    setFilled(Boolean(defaultValue));
  }, [defaultValue]);

  return (
    <FormControl
      label={label}
      htmlFor={id}
      helperText={helperText}
      error={error}
      blocked={blocked}
      disabled={disabled}
    >
      <input
        ref={ref}
        type={type || 'text'}
        id={id}
        className={classNames(
          'ods-input',
          filled && 'ods-input--filled',
          error && 'ods-input--error',
          className
        )}
        disabled={disabled}
        onChange={handleChange}
        defaultValue={defaultValue}
        value={value}
        {...rest}
      />
    </FormControl>
  );
});

export default Input;
