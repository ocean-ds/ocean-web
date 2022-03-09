import React from 'react';
import CoverImg from './storybook-cover.png';

import {
  colorInterfaceLightUp,
  colorBrandPrimaryPure,
} from '@useblu/ocean-tokens/web/tokens';

import Typography from '../../Typography';
import Grid from '../../Grid';

const Cover = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      top: '0px',
      left: '0px',
      backgroundColor: colorInterfaceLightUp,
      justifyContent: 'space-between',
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
      <Typography variant="heading1" style={{ color: colorBrandPrimaryPure }}>
        Ocean DS
      </Typography>
      <Typography variant="paragraph">
        Navegue pelo Ocean e conheça o Design System da Blu.
      </Typography>
    </Grid.Col>
    <img src={CoverImg} />
  </div>
);

export default Cover;
