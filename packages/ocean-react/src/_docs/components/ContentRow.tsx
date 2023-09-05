/* eslint-disable */
// @ts-nocheck
import React from 'react';

interface IContentRowProps {
  direction?: 'row' | 'column';
  children: React.ReactNode;
}

const ContentRow: React.FC<IContentRowProps> = ({
  direction = 'column',
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: `${direction}`,
        gap: '8px',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default ContentRow;
