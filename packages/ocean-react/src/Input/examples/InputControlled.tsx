import React, { useState } from 'react';
import Input from '../Input';

const InputControlled: React.FC = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      data-testid="controlled-input"
    />
  );
};

export default InputControlled;
