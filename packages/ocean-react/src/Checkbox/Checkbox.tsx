import React from 'react';
import classNames from 'classnames';

export type CheckboxProps = {
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the input.
   */
  indeterminate?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, label, id, indeterminate, ...rest }, ref) {
    return (
      <label className="ods-checkbox__root" htmlFor={id}>
        <input
          ref={ref}
          id={id}
          className={classNames('ods-checkbox', className)}
          {...rest}
          type="checkbox"
          data-indeterminate={indeterminate}
        />
        <span
          className={classNames(
            'ods-checkbox__checkmark',
            indeterminate && 'ods-checkbox__checkmark--indeterminate'
          )}
        ></span>
        {label && (
          <span className="ods-typography ods-typography__description ods-checkbox__label">
            {label}
          </span>
        )}
      </label>
    );
  }
);

export default Checkbox;
