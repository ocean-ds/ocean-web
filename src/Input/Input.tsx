import React from 'react';
import classNames from 'classnames';

import './styles/input.scss';

type InputProps = {
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type?: React.InputHTMLAttributes<unknown>['type'];
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
  {
    className,
    type = 'text',
    label,
    helperText,
    blocked = false,
    error = false,
    ...rest
  },
  ref
) {
  return (
    <div
      className={classNames(
        'ods-input__root',
        blocked && 'ods-input__root--blocked'
      )}
    >
      {label && <label className="ods-input__label">{label}</label>}
      <input
        ref={ref}
        type={type}
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
