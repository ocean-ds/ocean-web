import React from 'react';
// import classNames from 'classnames';

import { SnackbarProps } from '../Snackbar';

import {
  InfoOutline,
  CheckCircleOutline,
  XCircleOutline,
  ExclamationCircleOutline,
} from '@useblu/ocean-icons-react';

type ISnackbarProps = Pick<SnackbarProps, 'type' | 'onClose'>;

interface ISnackbarReturn {
  Icon: typeof React.Component;
}

export default function useSnackbar({ type }: ISnackbarProps): ISnackbarReturn {
  const icons = {
    info: InfoOutline,
    positive: CheckCircleOutline,
    negative: XCircleOutline,
    warning: ExclamationCircleOutline,
  };

  const Icon: any = icons[type as keyof typeof icons];

  return {
    Icon,
  };
}
