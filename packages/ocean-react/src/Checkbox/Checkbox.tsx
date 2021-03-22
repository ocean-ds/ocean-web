import React from 'react';
import classNames from 'classnames';

type CheckboxProps = {
  /**
   * The label content.
   */
  label?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, label, id, ...rest }, ref) {
    return (
      <label className="ods-checkbox__root" htmlFor={id}>
        <input
          ref={ref}
          id={id}
          className={classNames('ods-checkbox', className)}
          {...rest}
          type="checkbox"
        />
        <span className="ods-checkbox__checkmark"></span>
        {label && (
          <span className="ods-typography ods-typography__paragraph ods-checkbox__label">
            {label}
          </span>
        )}
      </label>
    );
  }
);

export default Checkbox;
