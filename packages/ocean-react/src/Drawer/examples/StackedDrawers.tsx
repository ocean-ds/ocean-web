import React, { useEffect, useState } from 'react';

import Drawer from '../Drawer';
import Button from '../../Button';

const WIDTHS = { small: 378, large: 476 };
const GAP = 16;
const MOBILE_MAX_WIDTH = 575;

export interface StackedDrawersProps {
  first: React.ReactElement;
  second: React.ReactElement;
  size?: 'small' | 'large';
}

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
};

const StackedDrawers = ({
  first,
  second,
  size = 'small',
}: StackedDrawersProps): React.ReactElement => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const viewport = useViewportWidth();

  const mobile = viewport <= MOBILE_MAX_WIDTH;
  const drawerWidth = Math.min(
    WIDTHS[size],
    Math.floor((viewport - GAP * 3) / 2)
  );

  const closeSecond = () => setSecondOpen(false);
  const closeTop = () => (secondOpen ? closeSecond() : setFirstOpen(false));
  const offsetX = secondOpen && !mobile ? drawerWidth + GAP : 0;

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
        floating={!mobile}
        width={mobile ? undefined : drawerWidth}
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
        floating={!mobile}
        width={mobile ? undefined : drawerWidth}
        depth={1}
        hideOverlay
        onBack={mobile ? closeSecond : undefined}
      >
        <div style={{ padding: '0 24px' }}>{second}</div>
      </Drawer>
    </>
  );
};

export default StackedDrawers;
