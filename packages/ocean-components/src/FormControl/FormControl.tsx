import React from 'react';
import classNames from 'classnames';

import './styles/form-control.scss';

export type FormControlProps = {
  /**
   * A single child content element.
   */
  children: React.ReactElement;
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * Specifies which form element a label is bound to.
   */
  htmlFor?: string;
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
   * Spans the full width of the element parent.
   * @default false
   */
  blocked?: boolean;
  /**
   * If true, should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
};

const FormControl: React.FC<FormControlProps> = ({
  children,
  label,
  htmlFor,
  helperText,
  error,
  blocked,
  disabled,
}) => (
  <div className="ods-form-control__root">
    {label && (
      <label
        className={classNames(
          'ods-form-control__label',
          disabled && 'ods-form-control__label--disabled'
        )}
        htmlFor={htmlFor}
      >
        {label}
      </label>
    )}
    <div
      className={classNames(
        'ods-form-control__element',
        blocked && 'ods-form-control__element--blocked'
      )}
    >
      {children}
    </div>
    {helperText && (
      <p
        className={classNames(
          'ods-form-control__helper-text',
          error && 'ods-form-control__helper-text--error',
          disabled && 'ods-form-control__helper-text--disabled'
        )}
      >
        {helperText}
      </p>
    )}
  </div>
);

export default FormControl;
