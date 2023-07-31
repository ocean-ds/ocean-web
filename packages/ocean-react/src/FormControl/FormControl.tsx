import React from 'react';
import classNames from 'classnames';

import { InformationCircle } from '@useblu/ocean-icons-react';
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
  /**
   * Defines the tooltip property and text.
   */
  tooltipMessage?: string;
  /**
   *
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
  tooltipMessage,
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
      {(labelProp || tooltipMessage) && (
        <div className="ods-form-control__header">
          {labelProp && <div className="ods-form-control__label">{label}</div>}
          {tooltipMessage && (
            <div
              aria-label={tooltipMessage}
              className="ods-form-control__icon ods-tooltip"
              data-tooltip-pos="up-left"
            >
              <InformationCircle size={16} color="#B6B9CC" />{' '}
            </div>
          )}
        </div>
      )}
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
