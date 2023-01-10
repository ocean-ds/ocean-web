import React from 'react';
import classNames from 'classnames';

const Divider = React.forwardRef<
  HTMLHRElement,
  React.ComponentPropsWithoutRef<'hr'>
>(({ className, ...rest }, ref) => (
  <hr ref={ref} className={classNames('ods-divider', className)} {...rest} />
));

Divider.displayName = 'Divider';

export default Divider;
