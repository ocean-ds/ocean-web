import React, { useState } from 'react';
import Select from '../Select';

const SelectControlled: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <div>
      <Select
        value={value}
        onChange={(option) => setValue(option.value.toString())}
        options={[
          { value: 'lime', label: 'Lime', 'data-testid': 'lime-opt' },
          { value: 'coconut', label: 'Coconut', 'data-testid': 'coconut' },
        ]}
        ariaLabel="Pick your favorite flavor"
      />
      <span data-testid="selected-value">{value}</span>
    </div>
  );
};

export default SelectControlled;
