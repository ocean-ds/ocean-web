import { useRef, useEffect, useCallback } from 'react';
import { WebNotificationProps } from '../WebNotification';

type IWebNotificationProps = Pick<
  WebNotificationProps,
  'type' | 'isOpen' | 'setIsOpen' | 'action'
>;

interface IWebNotificationReturn {
  closeWebNotification: () => void;
  dispatchAction: () => void;
}

export default function useWebNotification({
  setIsOpen,
  action,
}: IWebNotificationProps): IWebNotificationReturn {
  // const webNotificationTimer = useRef<ReturnType<typeof setTimeout> | null>(
  //   null
  // );

  const closeWebNotification = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const dispatchAction = useCallback(() => {
    if (action) action();
  }, [action]);

  // const setWebNotificationTimer = useCallback(() => {
  //   const timer = action ? 100000000000 : 4000;

  //   webNotificationTimer.current = setTimeout(() => {
  //     if (action) action();
  //     closeWebNotification();
  //   }, timer);
  // }, [action, closeWebNotification]);

  // useEffect(() => {
  //   if (isOpen) setWebNotificationTimer();
  //   if (!isOpen) closeWebNotification();
  // }, [closeWebNotification, isOpen, setWebNotificationTimer]);

  return {
    closeWebNotification,
    dispatchAction,
    // setWebNotificationTimer,
  };
}
