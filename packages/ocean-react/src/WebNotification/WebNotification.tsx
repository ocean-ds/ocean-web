import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from 'react';
import { X } from '@useblu/ocean-icons-react';
import classNames from 'classnames';
import useWebNotification from './hook/useWebNotification';

export type Position = 'bottom-left' | 'bottom-right';

export type WebNotificationProps = {
  type?: 'info' | 'positive' | 'warning';
  description?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  action?: () => void;
  actionLabel?: string;
  position?: Position;
  className?: string;
  title?: string;
} & React.ComponentPropsWithoutRef<'div'>;

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
      title,
    },
    ref
  ) => {
    const { closeWebNotification, dispatchAction } = useWebNotification({
      type,
      isOpen,
      setIsOpen,
      action,
    });

    const [notificationIndex, setNotificationIndex] = useState<number>(0);
    const notificationRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (isOpen) {
        const notifications = Array.from(
          document.querySelectorAll('.ods-web-notification')
        ).reverse();
        const index =
          notifications.findIndex((el) => el === notificationRef.current) + 1;
        setNotificationIndex(index);
      }
    }, [isOpen]);

    return (
      <>
        {isOpen && (
          <div
            className={classNames(
              'ods-web-notification',
              `position-${notificationIndex}`,
              `ods-web-notification__${position}-${
                action ? 'action' : 'default'
              }`,
              className
            )}
            ref={(el) => {
              notificationRef.current = el;
              if (ref) {
                if (typeof ref === 'function') {
                  ref(el);
                } else {
                  (
                    ref as React.MutableRefObject<HTMLDivElement | null>
                  ).current = el;
                }
              }
            }}
            data-testid="web-notification-test"
          >
            <div className="ods-web-notification__content">
              <div className="ods-web-notification__container">
                <div className="ods-web-notification__main-content">
                  <div className="ods-web-notification__title">{title}</div>
                  <div className="ods-web-notification__description">
                    {description}
                  </div>
                </div>
                {action && (
                  <div
                    className="ods-web-notification__action"
                    onClick={dispatchAction}
                    role="button"
                    tabIndex={0}
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
                role="button"
                tabIndex={0}
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
