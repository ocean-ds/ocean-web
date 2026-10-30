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
  /** Identifica a ajuda para associação por aria-describedby. */
  helperTextId?: string;
  /** Anuncia a ajuda quando uma validação do grupo falha. */
  helperTextRole?: 'alert' | 'status';
  /**
   * If true, should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
  id?: string;
  className?: string;
  role?: React.AriaRole;
} & React.AriaAttributes;

const FormControl: React.FC<FormControlProps> = ({
  children,
  label: labelProp,
  tooltipMessage,
  htmlFor,
  helperText,
  helperTextId,
  helperTextRole,
  error,
  disabled,
  className,
  role,
  ...rest
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
    <div
      className={classNames('ods-form-control__root', className, {
        'ods-form-control__root--group':
          role === 'radiogroup' || role === 'group',
      })}
      role={role}
      {...rest}
    >
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
          id={helperTextId}
          role={helperTextRole}
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
