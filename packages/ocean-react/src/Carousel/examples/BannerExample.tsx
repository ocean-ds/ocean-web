import React from 'react';
import { RefreshOutline } from '@useblu/ocean-icons-react';

const BannerExample: React.FC<{ color?: number }> = ({ color = 0 }) => {
  const colors = ['#0025E0', '#FF726E', '#13BDBD', '#FF8A14'];

  return (
    <div
      data-testid="ods-banner-example"
      style={{
        alignItems: 'center',
        background: colors[color],
        fontSize: '14px',
        color: '#FFF',
        height: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <RefreshOutline />
      Click me!
    </div>
  );
};

export default BannerExample;
