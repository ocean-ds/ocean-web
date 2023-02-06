import React, { useState } from 'react';

import { XOutline } from '@useblu/ocean-icons-react';
import Drawer from '../Drawer';
import Button from '../../Button';

interface SimpleDrawerProps {
  children: React.ReactElement;
}

const SimpleDrawer = ({ children }: SimpleDrawerProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const toggleBackDropClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={toggleOpen} type="button">
        Open drawer
      </Button>
      <Drawer
        open={isOpen}
        onDrawerClose={toggleOpen}
        backDropClose={toggleBackDropClose}
        headerIcon={<XOutline />}
        iconAlignment="left"
      >
        {children}
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
