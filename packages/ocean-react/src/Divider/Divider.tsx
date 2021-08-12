import React from 'react';
import classNames from 'classnames';

const Divider = React.forwardRef<
  HTMLHRElement,
  React.ComponentPropsWithoutRef<'hr'>
>(function Divider({ className, ...rest }, ref) {
  return (
    <hr ref={ref} className={classNames('ods-divider', className)} {...rest} />
  );
});

export default Divider;
