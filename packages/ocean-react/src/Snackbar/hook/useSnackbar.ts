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

type IconType = React.ForwardRefExoticComponent<
  {
    size?: number | undefined;
  } & React.SVGProps<SVGSVGElement> &
    React.RefAttributes<SVGSVGElement>
>;

interface ISnackbarReturn {
  Icon: IconType;
}

export default function useSnackbar({ type }: ISnackbarProps): ISnackbarReturn {
  const icons = {
    info: InfoOutline,
    positive: CheckCircleOutline,
    negative: XCircleOutline,
    warning: ExclamationCircleOutline,
  };

  const Icon: IconType = icons[type as keyof typeof icons];

  return {
    Icon,
  };
}
