import React from 'react';
import classNames from 'classnames';

import './styles/input.scss';

type InputProps = {
  /**
   * Type of the `input` element.
   * @default 'text'
   */
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the label will be displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;
  /**
   * Spans the full width of the Input parent.
   * @default false
   */
  blocked?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, className, label, helperText, blocked, error, id, ...rest },
  ref
) {
  return (
    <div className="ods-input__root">
      {label && (
        <label className="ods-input__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type || 'text'}
        id={id}
        className={classNames(
          'ods-input',
          blocked && 'ods-input--blocked',
          error && 'ods-input--error',
          className
        )}
        {...rest}
      />
      {helperText && (
        <p
          className={classNames(
            'ods-input__helper-text',
            error && 'ods-input__helper-text--error'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
