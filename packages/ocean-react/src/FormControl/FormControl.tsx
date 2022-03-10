import React from 'react';
import classNames from 'classnames';

import FormLabel from '../FormLabel';

export type FormControlProps = {
  /**
   * A single child content element.
   */
  children: React.ReactElement;
  /**
   * The label content.
   */
  label?: string | React.ReactNode;
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
  helperText?: string;
  /**
   * If true, should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
};

const FormControl: React.FC<FormControlProps> = ({
  children,
  label: labelProp,
  htmlFor,
  helperText,
  error,
  disabled,
}) => {
  let label;
  if (labelProp) {
    label =
      typeof labelProp === 'string' ? (
        <FormLabel htmlFor={htmlFor} disabled={disabled}>
          {labelProp}
        </FormLabel>
      ) : (
        labelProp
      );
  }

  return (
    <div className="ods-form-control__root">
      {label}
      <div className={classNames('ods-form-control__element')}>{children}</div>
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
};

export default FormControl;
