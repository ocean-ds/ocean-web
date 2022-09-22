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
   * Input label string.
   */
  label?: string;
  /**
   *  Input helper text.
   */
  helperText?: string;
  /**
   * Sets the input styles to error.
   */
  error?: boolean;
  /**
   * Sets the input styles to disabled.
   */
  disabled?: boolean;
  /**
   * Sets a custon adornment to be iside of the `input` element.
   */
  /**
   * Specifies the default value of the text field
   */
  defaultValue?: string;
  /**
   * Defines the tooltip property and text.
   */
  tooltipMessage?: string;
  /**
   *
   */
  position?: 'right' | 'left';
  /**
   *
   */
  adornment?: React.ReactElement;
} & Omit<FormControlProps, 'children'> &
  React.ComponentPropsWithoutRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type,
    label,
    helperText,
    error,
    disabled,
    defaultValue,
    tooltipMessage,
    position,
    adornment,
    className,
    id,
    onChange,
    value,
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
      tooltipMessage={tooltipMessage}
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
        {adornment && (
          <div
            className={classNames('ods-input__adornment', {
              'ods-input__adornment--placeholder': !filled,
            })}
          >
            {adornment}
          </div>
        )}
      </div>
    </FormControl>
  );
});

export default Input;
