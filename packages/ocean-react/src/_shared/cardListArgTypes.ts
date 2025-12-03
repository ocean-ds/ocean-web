import type { ArgTypes } from '@storybook/react';

/**
 * Tipos de estilo disponíveis para os componentes CardList
 */
export const cardListTypeOptions = [
  'default',
  'inactive',
  'positive',
  'warning',
  'highlight',
  'highlight-lead',
  'strikethrough',
] as const;

/**
 * ArgTypes compartilhados entre CardListReadOnly e CardListAction
 */
export const cardListBaseArgTypes: ArgTypes = {
  title: {
    description: 'Título principal do card.',
    control: 'text',
  },
  description: {
    description: 'Descrição ou texto secundário do card.',
    control: 'text',
  },
  strikethroughDescription: {
    description: 'Descrição com texto riscado.',
    control: 'text',
  },
  caption: {
    description: 'Legenda ou texto terciário do card.',
    control: 'text',
  },
  inverted: {
    description: 'Inverte a posição do título com a descrição.',
    control: 'boolean',
  },
  type: {
    description: 'Tipo de estilo do conteúdo do card.',
    control: 'select',
    options: cardListTypeOptions,
  },
  disabled: {
    description: 'Desabilita o card.',
    control: 'boolean',
  },
  loading: {
    description: 'Mostra o estado de carregamento com skeleton.',
    control: 'boolean',
  },
  indicator: {
    description: 'Indicador/badge exibido no card.',
    control: false,
  },
  className: {
    description: 'Classe CSS adicional para o card.',
    control: 'text',
  },
};
