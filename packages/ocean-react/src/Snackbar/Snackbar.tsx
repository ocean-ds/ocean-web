import React from 'react';
// import classNames from 'classnames';

import {
  InfoOutline,
  CheckCircleOutline,
  XCircleOutline,
  ExclamationCircleOutline,
} from '@useblu/ocean-icons-react';

export type SnackbarProps = {
  /**
   * Type of the `snackbar` element.
   * @default 'info'
   */
  type?: 'info' | 'positive' | 'negative' | 'warning';
  /**
   * Snackbar message string.
   */
  message: string;
  /**
   * Boolean to show snackbar.
   * @default false
   */
  open: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar({ type = 'info', message, open }, ref) {
    console.log(type, message);

    const getIcon = () => {
      const icons = {
        info: <InfoOutline />,
        positive: <CheckCircleOutline />,
        negative: <XCircleOutline />,
        warning: <ExclamationCircleOutline />,
      };

      return icons[type as keyof typeof icons];
    };

    return (
      <>
        {open && (
          <div className="ods-snackbar" ref={ref}>
            <div className="ods-snackbar__content">
              <div className={`ods-snackbar__icon ods-snackbar__icon-${type}`}>
                {getIcon()}
              </div>
              <div className="ods-snackbar__message">{message}</div>
              <div className="ods-snackbar__action">
                <div className={`ods-snackbar__action-text-${type}`}>
                  Desfazer
                </div>
              </div>
            </div>
            <div className="ods-snackbar__progress" />
          </div>
        )}
      </>
    );
  }
);

export default Snackbar;
