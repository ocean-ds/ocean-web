import classNames from 'classnames';
import React from 'react';
import Button from '../Button/Button';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onDrawerClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  overlayClose: () => void;
  headerIcon: React.ReactNode;
  iconAlignment?: string;
}

const Drawer = ({
  children,
  open,
  onDrawerClose,
  overlayClose,
  headerIcon,
  iconAlignment = 'right',
}: DrawerProps): React.ReactElement => (
  <>
    <div
      className={classNames('ods-overlay', open && 'ods-overlay--open')}
      aria-hidden="true"
      onClick={overlayClose}
    />
    <div className={classNames('ods-drawer', open && 'ods-drawer--open')}>
      {headerIcon && (
        <div
          className={classNames(
            'ods-drawer__content--header',
            `ods-drawer__content--header--${iconAlignment}`
          )}
        >
          <Button type="button" onClick={onDrawerClose}>
            {headerIcon}
          </Button>
        </div>
      )}
      {children}
    </div>
  </>
);

export default Drawer;
