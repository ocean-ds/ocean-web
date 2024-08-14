import { useCallback } from 'react';
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
  const closeWebNotification = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const dispatchAction = useCallback(() => {
    if (action) action();
  }, [action]);

  return {
    closeWebNotification,
    dispatchAction,
  };
}
