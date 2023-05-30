/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import classNames from 'classnames';
import { XOutline } from '@useblu/ocean-icons-react';
import Button from '../Button/Button';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onDrawerClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  overlayClose: () => void;
  headerIcon?: React.ReactNode;
  align?: 'right' | 'left';
  iconAlignment?: 'right' | 'left';
}

const Drawer = ({
  children,
  open,
  onDrawerClose,
  overlayClose,
  align = 'right',
  headerIcon = <XOutline />,
  iconAlignment = 'right',
}: DrawerProps): React.ReactElement => (
  <>
    <div
      className={classNames('ods-overlay', open && 'ods-overlay--open')}
      aria-hidden="true"
      onClick={overlayClose}
    />
    <div
      className={classNames(
        'ods-drawer',
        open && 'ods-drawer--open',
        `ods-drawer--${align}`
      )}
    >
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
