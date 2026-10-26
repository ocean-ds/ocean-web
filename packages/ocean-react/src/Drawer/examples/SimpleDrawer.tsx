import React, { useState } from 'react';

import Drawer from '../Drawer';
import Button from '../../Button';

export interface SimpleDrawerProps {
  children: React.ReactElement;
  open?: boolean;
  /** Hides the button that opens the drawer (examples that start open). */
  hideTrigger?: boolean;
  /** Opens on mount. */
  defaultOpen?: boolean;
  align?: 'left' | 'right';
  iconAlignment?: 'left' | 'right';
  size?: 'small' | 'large';
  title?: React.ReactNode;
  actions?: React.ReactNode;
  headerColor?: 'default' | 'warning' | 'negative';
}

const SimpleDrawer = ({
  children,
  open,
  defaultOpen = false,
  hideTrigger = false,
  align,
  iconAlignment,
  size,
  title,
  actions,
  headerColor,
}: SimpleDrawerProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const toggleOverlayClose = () => setIsOpen(false);

  return (
    <>
      {!hideTrigger && (
        <Button onClick={toggleOpen} type="button">
          Open drawer
        </Button>
      )}
      <Drawer
        open={open || isOpen}
        onDrawerClose={toggleOpen}
        overlayClose={toggleOverlayClose}
        iconAlignment={iconAlignment}
        align={align}
        size={size}
        title={title}
        actions={actions}
        headerColor={headerColor}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
