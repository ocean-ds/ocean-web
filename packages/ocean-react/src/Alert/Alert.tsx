import React from 'react';
import classNames from 'classnames';

import AlertIcon from './AlertIcon';

import Button from '../Button';
import Link from '../Link';

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
   * Sets a custom icon for the Alert.
   */
  icon?: React.ReactElement;
  /**
   * Sets a size of the description.
   */
  descriptionSize?: 'short' | 'long';
  /**
   * Sets a button label.
   */
  button?: string;
  /**
   * Sets a button action.
   */
  buttonAction?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      type = 'default',
      title,
      className,
      icon,
      descriptionSize = 'long',
      button,
      buttonAction,
      ...rest
    },
    ref
  ) => {
    const alertIcon = <AlertIcon type={type} icon={icon} />;

    const descriptionBottom = descriptionSize === 'long';

    return (
      <div
        ref={ref}
        role="alert"
        className={classNames(
          'ods-alert',
          `ods-alert--${type}`,
          `ods-alert--size-${descriptionSize}`,
          title && 'ods-alert--has-header',
          className
        )}
        {...rest}
      >
        {title ? (
          <div className="ods-alert__header">
            {alertIcon}
            {!descriptionBottom ? (
              <div className="ods-alert__text">
                <div className="ods-alert__title">{title}</div>
                <div className="ods-alert__content">{children}</div>
                {button && (
                  <div className="ods-alert__button--mobile">
                    <Link size="sm" icon="linkChevron" onClick={buttonAction}>
                      {button}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="ods-alert__title">{title}</div>
            )}
            {button && (
              <div className="ods-alert__button">
                <Button size="sm" onClick={buttonAction}>
                  {button}
                </Button>
              </div>
            )}
          </div>
        ) : (
          alertIcon
        )}
        {descriptionBottom && (
          <div className="ods-alert__content">{children}</div>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
