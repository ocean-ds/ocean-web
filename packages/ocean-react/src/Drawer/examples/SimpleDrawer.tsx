import React, { useState } from 'react';

import { XOutline } from '@useblu/ocean-icons-react';
import Drawer from '../Drawer';
import Button from '../../Button';

export interface SimpleDrawerProps {
  children: React.ReactElement;
  open?: boolean;
  iconAlignment?: string;
}

const SimpleDrawer = ({
  children,
  open,
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
        headerIcon={<XOutline />}
        iconAlignment={iconAlignment}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
