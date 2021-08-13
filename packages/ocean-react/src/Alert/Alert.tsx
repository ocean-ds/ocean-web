import React from 'react';
import classNames from 'classnames';

import AlertIcon from './AlertIcon';

export type AlertProps = {
  /**
   * Determines the type of alert, with default icon and colors for each type
   * @default 'default'
   */
  type?: 'success' | 'warning' | 'error' | 'default';
  /**
   * Sets a title for the Alert
   */
  title?: string;
  /**
   * Sets a custon icon for the Alert.
   */
  icon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { children, type = 'default', title, className, icon, ...rest },
  ref
) {
  const alertIcon = (
    <AlertIcon type={type} icon={icon} className="ods-alert__icon" />
  );

  return (
    <div
      ref={ref}
      role="alert"
      className={classNames(
        'ods-alert',
        `ods-alert--${type}`,
        title && 'ods-alert--has-header',
        className
      )}
      {...rest}
    >
      {title ? (
        <div className="ods-alert__header">
          {alertIcon}
          <div className="ods-alert__title">{title}</div>
        </div>
      ) : (
        alertIcon
      )}

      {children}
    </div>
  );
});

export default Alert;
