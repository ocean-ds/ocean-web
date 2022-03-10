import React from 'react';
import classNames from 'classnames';

import useInputFilled from '../_util/useInputFilled';
import FormControl, { FormControlProps } from '../FormControl';

export type InputProps = {
  /**
   * Type of the `input` element.
   * @default 'text'
   */
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';

  /**
   *
   */
  position?: 'right' | 'left';

  /**
   * Sets a custon adornment to be iside of the `input` element.
   */
  adornment?: React.ReactElement;
} & Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type,
    className,
    label,
    helperText,
    error,
    id,
    disabled,
    onChange,
    value,
    adornment,
    defaultValue,
    position,
    ...rest
  },
  ref
) {
  const { filled, handleChange } = useInputFilled({
    defaultValue,
    value,
    onChange,
  });

  return (
    <FormControl
      label={label}
      htmlFor={id}
      helperText={helperText}
      error={error}
      disabled={disabled}
    >
      <div
        className={classNames(
          'ods-input',
          filled && 'ods-input--filled',
          disabled && 'ods-input--disabled',
          error && 'ods-input--error',
          position === 'left' && 'ods-input--left',
          adornment && !filled ? 'ods-input--disabled--text' : '',
          className
        )}
      >
        <input
          ref={ref}
          type={type || 'text'}
          id={id}
          disabled={disabled}
          onChange={handleChange}
          defaultValue={defaultValue}
          value={value}
          {...rest}
        />
        {adornment && <div className="ods-input__adornment">{adornment}</div>}
      </div>
    </FormControl>
  );
});

export default Input;
