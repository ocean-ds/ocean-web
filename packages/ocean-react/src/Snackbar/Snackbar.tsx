import React, { Dispatch, SetStateAction } from 'react';
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
  isOpen: boolean;
  /**
   * Function to close snackbar.
   * @required
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /**
   * Function to execute after 10s.
   * @default null
   */
  action?: () => void;
  /**
   * Label to rename action button.
   * @requires action
   * @default action
   */
  actionLabel?: string;
  /**
   * Position where Snackbar component is rendered.
   * @default null
   */
  position?: Position;
  /**
   * ClassName to overwrite default style
   * @default null
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function Snackbar(
    {
      type = 'info',
      message,
      isOpen,
      setIsOpen,
      action,
      actionLabel,
      position = 'bottom-right',
      className,
    },
    ref
  ) {
    const { Icon, closeSnackbar } = useSnackbar({
      type,
      isOpen,
      setIsOpen,
      action,
    });

    return (
      <>
        {isOpen && (
          <div
            className={classNames(
              'ods-snackbar',
              `ods-snackbar__${position}`,
              className
            )}
            ref={ref}
            data-testid="snackbar-test"
          >
            <div className="ods-snackbar__content">
              <div
                className={classNames(
                  'ods-snackbar__icon',
                  `ods-snackbar__icon-${type}`
                )}
              >
                <Icon size={19} />
              </div>
              <div className="ods-snackbar__label">{message}</div>
              {action && (
                <div className="ods-snackbar__action" onClick={closeSnackbar}>
                  <div className={`ods-snackbar__action-text-${type}`}>
                    {actionLabel ?? 'action'}
                  </div>
                </div>
              )}
            </div>
            <div
              className={classNames(
                'ods-snackbar__progress',
                action ? 'ods-snackbar__progress-action' : ''
              )}
            />
          </div>
        )}
      </>
    );
  }
);

export default Snackbar;
