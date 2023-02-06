import classNames from 'classnames';
import React from 'react';
import Button from '../Button/Button';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onDrawerClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  backDropClose: () => void;
  headerIcon: React.ReactNode;
  iconAlignment?: string;
}

const Drawer = ({
  children,
  open,
  onDrawerClose,
  backDropClose,
  headerIcon,
  iconAlignment = 'right',
}: DrawerProps): React.ReactElement => (
  <>
    <div
      className={classNames(
        'ods-drawer_backdrop',
        open && 'ods-drawer_backdrop--open'
      )}
      aria-hidden="true"
      onClick={backDropClose}
    />
    <div className={classNames('ods-drawer', open && 'ods-drawer--open')}>
      {headerIcon && (
        <div
          className={classNames(
            'ods-drawer_content--header',
            `ods-drawer_content--header--${iconAlignment}`
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
