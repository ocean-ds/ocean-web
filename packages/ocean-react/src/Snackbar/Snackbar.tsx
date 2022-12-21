import React from 'react';
import classNames from 'classnames';

import useSnackbar from './hook/useSnackbar';

export type Position =
  | 'bottom-left'
  | 'top-left'
  | 'top-right'
  | 'bottom-right';

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
  /**
   * Function to close snackbar to show snackbar.
   * @required
   */
  onClose: () => void;
  /**
   * Function to execute after 10s.
   * @default null
   */
  action?: () => void;
  /**
   * Function to execute after 10s.
   * @default null
   */
  position?: Position;
} & React.ComponentPropsWithoutRef<'div'>;

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(
    {
      type = 'info',
      message,
      open,
      onClose,
      action,
      position = 'bottom-right',
    },
    ref
  ) {
    const { Icon } = useSnackbar({ type, onClose });

    return (
      <>
        {open && (
          <div
            className={classNames('ods-snackbar', `ods-snackbar-${position}`)}
            ref={ref}
          >
            <div className="ods-snackbar__content">
              <div
                className={classNames(
                  'ods-snackbar__icon',
                  `ods-snackbar__icon-${type}`
                )}
              >
                <Icon />
              </div>
              <div className="ods-snackbar__message">{message}</div>
              {action && (
                <div className="ods-snackbar__action">
                  <div className={`ods-snackbar__action-text-${type}`}>
                    Desfazer
                  </div>
                </div>
              )}
            </div>
            <div
              className={classNames(
                'ods-snackbar__progress',
                action
                  ? 'ods-snackbar__progress-action'
                  : 'ods-snackbar__progress-default'
              )}
            />
          </div>
        )}
      </>
    );
  }
);

export default Snackbar;
