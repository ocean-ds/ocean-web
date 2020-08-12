import React from 'react';
import classNames from 'classnames';

import './styles/switch.scss';

type SwitchProps = React.ComponentPropsWithoutRef<'input'>;

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, id, ...rest },
  ref
) {
  return (
    <label className="ods-switch__root" htmlFor={id}>
      <input
        ref={ref}
        id={id}
        className={classNames('ods-switch', className)}
        {...rest}
        type="checkbox"
      />
      <span className="ods-switch__slider"></span>
    </label>
  );
});

export default Switch;
