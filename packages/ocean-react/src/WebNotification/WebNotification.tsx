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
import Typography from '../Typography';
import Link from '../Link';

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
        const allOpenedNotifications = Array.from(
          document.querySelectorAll('.ods-web-notification')
        ).reverse();
        const notificationPosition =
          allOpenedNotifications.findIndex(
            (el) => el === notificationRef.current
          ) + 1;
        setNotificationIndex(notificationPosition);
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
              <div className="ods-web-notification__wrapper">
                <div className="ods-web-notification__body">
                  <Typography variant="description" inverse>
                    {title}
                  </Typography>
                  <Typography variant="caption">{description}</Typography>
                </div>
                {action && (
                  <>
                    <Link
                      onClick={dispatchAction}
                      className={`ods-web-notification__action-text-${type}`}
                      size="sm"
                    >
                      {actionLabel ?? 'action'}
                    </Link>
                  </>
                )}
              </div>
              <div className="ods-web-notification__close-button">
                <X size={16} onClick={closeWebNotification} />
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
