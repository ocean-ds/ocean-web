import React from 'react';

// Decorator comum para histórias de Date components
export const createDateDecorator = (
  minWidth: string
): Array<(StoryComponent: React.ComponentType) => JSX.Element> => [
  (StoryComponent: React.ComponentType): JSX.Element => (
    <div
      style={{
        minWidth,
        height: '400px',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <StoryComponent />
    </div>
  ),
];

// Container comum para stories de estados
export const createStatesContainer = (
  width: string,
  height = '1000px'
): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  width,
  height,
  justifyContent: 'flex-start' as const,
  alignItems: 'flex-start' as const,
});

// Container comum para stories de localização
export const createLocalizationContainer = (
  width: string,
  height = '600px'
): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  width,
  height,
  justifyContent: 'flex-start' as const,
  alignItems: 'flex-start' as const,
});

// Container comum para stories de restrições
export const createRestrictionsContainer = (
  width: string,
  height = '500px'
): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '24px',
  width,
  height,
  justifyContent: 'flex-start' as const,
  alignItems: 'flex-start' as const,
});

// Props comuns para argTypes
export const commonArgTypes = {
  editable: {
    description: 'Permite edição manual do campo de input.',
    control: 'boolean',
  },
  disabled: {
    description: 'Desabilita o componente.',
    control: 'boolean',
  },
  error: {
    description: 'Exibe estado de erro.',
    control: 'boolean',
  },
  helperText: {
    description: 'Texto de ajuda ou erro.',
    control: 'text',
  },
  startsToday: {
    description: 'Define se a seleção começa na data atual.',
    control: 'boolean',
  },
  locale: {
    description: 'Locale para internacionalização (objeto date-fns).',
    control: false,
  },
  className: {
    description: 'Classes CSS adicionais.',
    control: false,
  },
};

// Args padrão comuns
export const commonArgs = {
  editable: false,
  disabled: false,
  error: false,
  startsToday: false,
  helperText: '',
};

// Parâmetros padrão para stories sem controles
export const noControlsParameters = {
  controls: { disable: true },
};
