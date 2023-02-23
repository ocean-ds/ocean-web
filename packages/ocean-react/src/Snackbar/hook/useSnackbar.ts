import React, { useRef, useEffect, useCallback } from 'react';

import { SnackbarProps } from '../Snackbar';

import {
  InfoOutline,
  CheckCircleOutline,
  XCircleOutline,
  ExclamationCircleOutline,
} from '@useblu/ocean-icons-react';

type ISnackbarProps = Pick<
  SnackbarProps,
  'type' | 'isOpen' | 'setIsOpen' | 'action'
>;

type IconType = React.ForwardRefExoticComponent<
  {
    size?: number | undefined;
  } & React.SVGProps<SVGSVGElement> &
    React.RefAttributes<SVGSVGElement>
>;

interface ISnackbarReturn {
  Icon: IconType;
  closeSnackbar: () => void;
}

export default function useSnackbar({
  type,
  isOpen,
  setIsOpen,
  action,
}: ISnackbarProps): ISnackbarReturn {
  const snackbarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeSnackbar = useCallback(() => {
    if (snackbarTimer?.current) clearTimeout(snackbarTimer.current);

    setIsOpen(false);
  }, [setIsOpen]);

  const setSnackbarTimer = useCallback(() => {
    const timer = action ? 10000 : 4000;

    snackbarTimer.current = setTimeout(() => {
      action && action();
      closeSnackbar();
    }, timer);
  }, [action, closeSnackbar]);

  useEffect(() => {
    if (isOpen) setSnackbarTimer();
    if (!isOpen) closeSnackbar();
  }, [closeSnackbar, isOpen, setSnackbarTimer]);

  const icons = {
    info: InfoOutline,
    positive: CheckCircleOutline,
    negative: XCircleOutline,
    warning: ExclamationCircleOutline,
  };

  const Icon: IconType = icons[type as keyof typeof icons];

  return {
    Icon,
    closeSnackbar,
  };
}
