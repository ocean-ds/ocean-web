import React, { useState } from 'react';

import Drawer from '../Drawer';
import Button from '../../Button';

const WIDTHS = { small: 378, large: 476 };
const GAP = 8;

export interface StackedDrawersProps {
  first: React.ReactElement;
  second: React.ReactElement;
  size?: 'small' | 'large';
  covering?: boolean;
}

const StackedDrawers = ({
  first,
  second,
  size = 'small',
  covering = false,
}: StackedDrawersProps): React.ReactElement => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  const closeSecond = () => setSecondOpen(false);
  const closeTop = () => (secondOpen ? closeSecond() : setFirstOpen(false));
  const offsetX = secondOpen && !covering ? WIDTHS[size] + GAP : 0;

  return (
    <>
      <Button onClick={() => setFirstOpen(true)} type="button">
        Abrir primeira
      </Button>
      <Drawer
        open={firstOpen}
        onDrawerClose={() => setFirstOpen(false)}
        overlayClose={closeTop}
        size={size}
        floating
        depth={0}
        offsetX={offsetX}
      >
        <div style={{ padding: '0 24px' }}>
          {first}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSecondOpen(true)}
          >
            Abrir segunda ao lado
          </Button>
        </div>
      </Drawer>
      <Drawer
        open={secondOpen}
        onDrawerClose={closeSecond}
        overlayClose={closeSecond}
        size={size}
        floating
        depth={1}
        hideOverlay
        onBack={covering ? closeSecond : undefined}
      >
        <div style={{ padding: '0 24px' }}>{second}</div>
      </Drawer>
    </>
  );
};

export default StackedDrawers;
