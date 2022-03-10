import React from 'react';

import { colorInterfaceLightUp } from '@useblu/ocean-tokens/web/tokens';

import Grid from '../../Grid';

const Showcase: React.FC = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: colorInterfaceLightUp,
      justifyContent: 'space-between',
      borderRadius: 8,
      margin: '16px 0px',
    }}
  >
    <Grid.Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      {children}
    </Grid.Col>
  </div>
);

export default Showcase;
