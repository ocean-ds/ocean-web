import React from 'react';
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
  { type, className, label, helperText, blocked, error, id, disabled, ...rest },
  ref
) {
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
          error && 'ods-input--error',
          className
        )}
        disabled={disabled}
        {...rest}
      />
    </FormControl>
  );
});

export default Input;
