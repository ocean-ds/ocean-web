import React, { useState } from 'react';
import Chips, { ChipValue } from '../Chips';

const optionsData: ChipValue[] = [
  { label: 'Frete grátis', value: 'frete-gratis' },
  { label: 'Promoção', value: 'promocao' },
  { label: 'Mais vendidos', value: 'mais-vendidos' },
  { label: 'Entrega rápida', value: 'entrega-rapida' },
];

const SelectAll: React.FC = () => {
  const [selected, setSelected] = useState<ChipValue[]>([]);

  return (
    <div style={{ width: '320px', height: '350px' }}>
      <Chips
        label="Filtros com selecionar todos"
        options={optionsData}
        multiChoice
        selectAllOptions
        clearLabel="Limpar"
        filterLabel="Aplicar"
        selectedValue={selected}
        onChange={(nextValue) => {
          if (Array.isArray(nextValue)) {
            setSelected(nextValue);
          }
        }}
      />
      <p
        style={{
          marginTop: '16px',
          fontSize: '16px',
        }}
      >
        Selecionadas:{' '}
        {selected.map((option) => option.label).join(', ') || 'nenhuma'}
      </p>
    </div>
  );
};

export default SelectAll;
