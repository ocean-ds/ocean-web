/* eslint-disable */
// @ts-nocheck
import React from 'react';
import CoverImg from '../assets/storybook-cover.png';

import {
  colorInterfaceLightUp,
  colorBrandPrimaryPure,
} from '@useblu/ocean-tokens/web/tokens';

import Typography from '../../Typography';
import Grid from '../../Grid';

const Cover: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
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
        minWidth: '360px',
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
