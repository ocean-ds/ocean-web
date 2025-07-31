import React from 'react';

// ArgTypes compartilhados entre Select e SelectAutocomplete
export const sharedArgTypes = {
  label: {
    description: 'Rótulo do campo de seleção.',
    control: 'text',
  },
  placeholder: {
    description:
      'Texto de placeholder exibido quando nenhuma opção está selecionada.',
    control: 'text',
  },
  helperText: {
    description: 'Texto de ajuda exibido abaixo do campo.',
    control: 'text',
  },
  error: {
    description: 'Quando true, exibe o estilo de erro.',
    control: 'boolean',
  },
  disabled: {
    description: 'Desabilita o campo e impede a seleção.',
    control: 'boolean',
  },
  tooltipMessage: {
    description: 'Mensagem de ajuda exibida em tooltip no label.',
    control: 'text',
  },
  id: {
    table: { disable: true },
  },
  name: {
    table: { disable: true },
  },
  value: {
    table: { disable: true },
  },
  defaultValue: {
    table: { disable: true },
  },
  ariaLabel: {
    table: { disable: true },
  },
  onChange: {
    table: { disable: true },
  },
  className: {
    table: { disable: true },
  },
  options: {
    table: { disable: true },
  },
};

// Opções compartilhadas
export const defaultOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'ca', label: 'Canadá' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'pe', label: 'Peru' },
  { value: 'co', label: 'Colômbia' },
];

// Decorator compartilhado
export const defaultDecorator = (
  StoryComponent: React.ComponentType
): JSX.Element => (
  <div
    style={{
      minWidth: '300px',
      maxWidth: '400px',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <StoryComponent />
  </div>
);

// Handler vazio compartilhado
export const emptyHandler = (): void => {
  // Handler vazio para demo
};
