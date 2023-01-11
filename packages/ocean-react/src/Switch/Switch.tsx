import React from 'react';
import classNames from 'classnames';

export type SwitchProps = React.ComponentPropsWithoutRef<'input'>;

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, id, ...rest }, ref) => (
    <label className="ods-switch__root" htmlFor={id}>
      <input
        ref={ref}
        id={id}
        className={classNames('ods-switch', className)}
        {...rest}
        type="checkbox"
      />
      <span className="ods-switch__slider" />
    </label>
  )
);

Switch.displayName = 'Switch';

export default Switch;
