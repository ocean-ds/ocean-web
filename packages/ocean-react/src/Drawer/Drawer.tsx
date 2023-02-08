import React from 'react';

import classNames from 'classnames';
import Button from '../Button/Button';
import { XOutline } from '@useblu/ocean-icons-react';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onDrawerClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  overlayClose: () => void;
  headerIcon?: React.ReactNode;
  iconAlignment?: string;
}

const Drawer = ({
  children,
  open,
  onDrawerClose,
  overlayClose,
  headerIcon = <XOutline />,
  iconAlignment = 'right',
}: DrawerProps): React.ReactElement => (
  <>
    <div
      className={classNames('ods-overlay', open && 'ods-overlay--open')}
      aria-hidden="true"
      onClick={overlayClose}
    />
    <div className={classNames('ods-drawer', open && 'ods-drawer--open')}>
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
      {children}
    </div>
  </>
);

export default Drawer;
