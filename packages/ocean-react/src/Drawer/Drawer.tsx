import React, {
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import classNames from 'classnames';
import { XOutline } from '@useblu/ocean-icons-react';
import Button from '../Button/Button';

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onDrawerClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  overlayClose: (event?: MouseEvent<HTMLDivElement>) => void;
  headerIcon?: React.ReactNode;
  align?: 'right' | 'left';
  iconAlignment?: 'right' | 'left';
  anchorEl?: RefObject<HTMLDivElement> | null;
  onMouseOutDrawer?: (event?: MouseEvent<HTMLDivElement>) => void;
  size?: 'small' | 'large';
}

const Drawer = ({
  children,
  open,
  onDrawerClose,
  overlayClose,
  align = 'right',
  headerIcon = <XOutline />,
  iconAlignment = 'right',
  anchorEl,
  onMouseOutDrawer,
  size = 'small',
}: DrawerProps): React.ReactElement => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const handleOverlayClose = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      overlayClose(event);
    }
  };

  const getAnchorPosition = useCallback(() => {
    if (!anchorEl?.current) return null;

    const position = anchorEl.current.getBoundingClientRect();

    if (align === 'right') {
      const positionSize = window.innerWidth - position.left;

      return {
        width: `${positionSize}px`,
        right: `${positionSize}px`,
        left: 'auto',
      };
    }

    return {
      width: `${position.right}px`,
      right: 'auto',
      left: `${position.right}px`,
    };
  }, [align, anchorEl]);

  const attachDrawer = useCallback(() => {
    const position = getAnchorPosition();

    if (!drawerRef.current || !position) return;

    drawerRef.current.style.width = `calc(100% - ${position?.width}px)})`;
    drawerRef.current.style.left = position.left;
    drawerRef.current.style.right = position.right;
  }, [getAnchorPosition]);

  useEffect(() => {
    attachDrawer();
  }, [anchorEl, drawerRef, attachDrawer]);

  return (
    <div
      className={classNames('ods-overlay', open && 'ods-overlay--open')}
      aria-hidden="true"
      onClick={handleOverlayClose}
      ref={drawerRef}
      data-testid="drawer-overlay"
    >
      <div
        className={classNames(
          'ods-drawer',
          open && 'ods-drawer--open',
          `ods-drawer--${align}`,
          `ods-drawer--${size}`
        )}
        onMouseLeave={onMouseOutDrawer}
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
    </div>
  );
};

export default Drawer;
