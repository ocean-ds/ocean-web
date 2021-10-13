import React from 'react';
import { RefreshOutline } from '@useblu/ocean-icons-react';

const BannerExample: React.FC = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        background: '#EDEAFF',
        fontSize: '14px',
        color: '#7B61FF',
        height: '200px',
        borderRadius: '8px',
        display: 'flex',
        border: '1px dashed #7B61FF',
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
