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
  size?: 'short' | 'long';
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
      size = 'long',
      button,
      buttonAction,
      ...rest
    },
    ref
  ) => {
    const alertIcon = <AlertIcon type={type} icon={icon} />;

    const longSize = size === 'long' && !button;
    const marginHeader = longSize && children && title;

    return (
      <div
        ref={ref}
        role="alert"
        className={classNames(
          'ods-alert',
          `ods-alert--${type}`,
          longSize && 'ods-alert--long',
          button && 'ods-alert--with-button',
          button && !title && 'ods-alert--with-button__no-title',
          className
        )}
        {...rest}
      >
        {longSize ? (
          <div>
            <div
              className={classNames(
                'ods-alert__header',
                marginHeader && 'ods-alert__header--margin'
              )}
            >
              {alertIcon}
              {title ? (
                <div className="ods-alert__title">{title}</div>
              ) : (
                <div className="alert__content">{children}</div>
              )}
            </div>
            {title && <div className="alert__content">{children}</div>}
          </div>
        ) : (
          <>
            <div
              className={classNames(
                'ods-alert__header',
                marginHeader && 'ods-alert__header--margin'
              )}
            >
              {alertIcon}
              <div className="ods-alert__text">
                {title && <div className="ods-alert__title">{title}</div>}
                <div
                  className={classNames('alert__content', {
                    'alert__content--no-title': !title,
                  })}
                >
                  {children}
                </div>
              </div>
              {button && (
                <div className="ods-alert__button">
                  <Button size="sm" onClick={buttonAction}>
                    {button}
                  </Button>
                </div>
              )}
            </div>
            {button && (
              <div className="ods-alert__button--mobile">
                <Link size="sm" onClick={buttonAction} icon="linkChevron">
                  {button}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
