import React, { useState } from 'react';
import SelectAutocomplete from '../SelectAutocomplete';

const SelectAutocompleteControlled: React.FC = () => {
  const [value, setValue] = useState<string>();

  return (
    <div>
      <SelectAutocomplete
        value={value}
        onChange={(option) => setValue(option.value.toString())}
        options={[
          { value: 'lime', label: 'Lime', 'data-testid': 'lime-opt' },
          { value: 'coconut', label: 'Coconut', 'data-testid': 'coconut' },
        ]}
        ariaLabel="Pick your favorite flavor"
        data-testid="controlled-select"
      />
      <span data-testid="selected-value">{value}</span>
    </div>
  );
};

export default SelectAutocompleteControlled;
