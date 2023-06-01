import React, { useState } from 'react';

import Drawer from '../Drawer';
import Button from '../../Button';

export interface SimpleDrawerProps {
  children: React.ReactElement;
  open?: boolean;
  align?: 'left' | 'right';
  iconAlignment?: 'left' | 'right';
}

const SimpleDrawer = ({
  children,
  open,
  align,
  iconAlignment,
}: SimpleDrawerProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const toggleOverlayClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={toggleOpen} type="button">
        Open drawer
      </Button>
      <Drawer
        open={open || isOpen}
        onDrawerClose={toggleOpen}
        overlayClose={toggleOverlayClose}
        iconAlignment={iconAlignment}
        align={align}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
