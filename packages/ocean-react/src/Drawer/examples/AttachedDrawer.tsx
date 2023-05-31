import React, { useRef, useState } from 'react';

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
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const toggleOverlayClose = () => setIsOpen(false);

  return (
    <>
      <div
        ref={anchorRef}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 24px',
          top: '0',
          left: align === 'left' ? '0' : 'auto',
          right: align === 'right' ? '0' : 'auto',
          height: '100%',
          backgroundColor: '#0025e0',
        }}
      >
        <h3
          style={{
            fontFamily: 'Avenir',
            fontSize: '20px',
            fontWeight: '800',
            lineHeight: '22px',
            color: '#FFFFFF',
            margin: '0 0 8px 0',
          }}
        >
          Anchor element
        </h3>
      </div>
      <Button onClick={toggleOpen} type="button">
        Open drawer
      </Button>
      <Drawer
        open={open ?? isOpen}
        onDrawerClose={toggleOpen}
        overlayClose={toggleOverlayClose}
        iconAlignment={iconAlignment}
        align={align}
        anchorEl={anchorRef}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SimpleDrawer;
