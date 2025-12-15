import React, { useState } from 'react';
import Chips, { ChipValue } from '../Chips';
import Badge from '../../Badge';

export const ChipWithAmount = (): JSX.Element => {
  const [amount, setAmount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const eachCounter = [10, 20, 30, 40, 50];

  const defaultOptions = [
    {
      label: 'Opção 1',
      value: '1',
      indicator: <Badge color="alert" count={eachCounter[0]} />,
    },
    {
      label: 'Opção 2',
      value: '2',
      indicator: <Badge color="alert" count={eachCounter[1]} />,
    },
    {
      label: 'Opção 3',
      value: '3',
      indicator: <Badge color="alert" count={eachCounter[2]} />,
    },
    {
      label: 'Opção 4',
      value: '4',
      indicator: <Badge color="alert" count={eachCounter[3]} />,
    },
    {
      label: 'Opção 5',
      value: '5',
      indicator: <Badge color="alert" count={eachCounter[4]} />,
    },
  ];

  const onHandleSelectOption = (selectedChip: ChipValue[] | ChipValue) => {
    const chipValues = Array.isArray(selectedChip)
      ? selectedChip.map((chip) => chip.value)
      : [selectedChip.value];

    setSelectedOptions(chipValues);
    setAmount(
      chipValues.reduce((acc, curr) => {
        const index = Number(curr) - 1;
        return acc + (eachCounter[index] ?? 0);
      }, 0)
    );
  };

  const onClearFilter = () => {
    setSelectedOptions([]);
    setAmount(0);
  };

  return (
    <div>
      <Chips
        label="Filtros"
        options={defaultOptions}
        initialCounter={amount}
        clearLabel="Limpar"
        filterLabel="Aplicar"
        multiChoice
        selectedValue={selectedOptions.map((option) => ({
          label: option,
          value: option,
        }))}
        onConfirm={onHandleSelectOption}
        onClean={onClearFilter}
      />
    </div>
  );
};

export default ChipWithAmount;
