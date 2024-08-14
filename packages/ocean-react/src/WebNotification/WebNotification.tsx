import React, { Dispatch, SetStateAction } from 'react';
import { X } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

import useWebNotification from './hook/useWebNotification';

export type Position =
  | 'bottom-left'
  | 'top-left'
  | 'top-right'
  | 'bottom-right';

export type WebNotificationProps = {
  type?: 'info' | 'positive' | 'warning';
  description?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  action?: () => void;
  actionLabel?: string;
  position?: Position;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

// let notificationCounter = -30;

const WebNotification = React.forwardRef<HTMLDivElement, WebNotificationProps>(
  (
    {
      type = 'info',
      description,
      isOpen,
      setIsOpen,
      action,
      actionLabel,
      position = 'bottom-right',
      className,
    },
    ref
  ) => {
    const { closeWebNotification, dispatchAction } = useWebNotification({
      type,
      isOpen,
      setIsOpen,
      action,
    });

    // Increment counter and calculate z-index
    // eslint-disable-next-line no-plusplus
    // notificationCounter += 70;
    // const zIndex = notificationCounter;

    return (
      <>
        {isOpen && (
          <div
            className={classNames(
              'ods-web-notification',
              `ods-web-notification__${position}-${
                action ? 'action' : 'default'
              }`,
              className
            )}
            ref={ref}
            // style={{ bottom: zIndex }}
            data-testid="web-notification-test"
          >
            <div className="ods-web-notification__content">
              <div className="ods-web-notification__container">
                <div className="ods-web-notification__description">
                  {description}
                </div>
                {action && (
                  <div
                    className="ods-web-notification__action"
                    onClick={dispatchAction}
                  >
                    <div
                      className={`ods-web-notification__action-text-${type}`}
                    >
                      {actionLabel ?? 'action'}
                    </div>
                  </div>
                )}
              </div>
              <div
                className="ods-web-notification__wrapper"
                onClick={closeWebNotification}
              >
                <X size={16} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

WebNotification.displayName = 'WebNotification';

export default WebNotification;
