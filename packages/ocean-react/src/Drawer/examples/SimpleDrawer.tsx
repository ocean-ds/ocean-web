import React, { useState } from 'react';

import Drawer from '../Drawer';
import Button from '../../Button';

const SimpleDrawer: React.FC = ({ children, ...rest }): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  console.log('aa', isOpen);
  return (
    <>
      <Button onClick={toggleOpen}>Open Drawer</Button>
      <Drawer {...rest} isOpen={isOpen} onClose={toggleOpen} position="right">
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
        <p>The drawer content!</p>
        <input type="text" />
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
