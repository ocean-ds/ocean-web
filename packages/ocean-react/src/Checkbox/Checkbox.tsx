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
  /**
   * If `true`, the input will be displayed in an error state.
   * @default false
   */
  error?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ error, className, label, id, indeterminate, ...rest }, ref) => (
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
          indeterminate && 'ods-checkbox__checkmark--indeterminate',
          error && 'ods-checkbox__checkmark--error'
        )}
      />
      {label && (
        <span className="ods-typography ods-typography__description ods-checkbox__label">
          {label}
        </span>
      )}
    </label>
  )
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
