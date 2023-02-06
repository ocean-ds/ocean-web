import React, { useState } from 'react';
import Drawer from '../Drawer';

const SimpleDrawer = ({ children }): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const toggleBackDropClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={toggleOpen} type="button">
        open drawer!
      </button>
      <Drawer
        open={isOpen}
        onDrawerClose={toggleOpen}
        backDropClose={toggleBackDropClose}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
