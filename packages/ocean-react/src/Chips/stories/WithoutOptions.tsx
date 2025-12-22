import React, { useState } from 'react';
import Chips from '../Chips';

export const WithoutOptions = (): JSX.Element => {
  const [activeChip, setActiveChip] = useState(false);
  const [counterActive, setCounterActive] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        height: '50px',
      }}
    >
      <Chips
        label="Chip simples"
        actived={activeChip}
        onClick={() => setActiveChip(!activeChip)}
      />
      <Chips
        label="Com contador"
        initialCounter={9}
        onClick={() => setCounterActive(!counterActive)}
        actived={counterActive}
      />
    </div>
  );
};

export default WithoutOptions;
