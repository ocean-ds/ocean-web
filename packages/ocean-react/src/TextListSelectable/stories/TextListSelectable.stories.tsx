import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextListSelectable from '../TextListSelectable';

const storyStyles = {
  singleItem: { width: '360px' },
  columnContainer: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
    width: '360px',
  },
  columnContainerWide: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
    width: '400px',
  },
  columnContainerSimple: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
  },
};

const meta: Meta<typeof TextListSelectable> = {
  title: 'Components/List/TextListSelectable',
  component: TextListSelectable,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Título principal do item (obrigatório).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    description: {
      description: 'Descrição detalhada do item (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    caption: {
      description: 'Legenda ou informação adicional em destaque (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    tagLabel: {
      description: 'Texto da tag exibida ao lado do título (opcional).',
      control: 'text',
      table: {
        category: '📝 Conteúdo',
        type: { summary: 'string' },
      },
    },
    loading: {
      description: 'Exibe estado de carregamento com skeleton.',
      control: 'boolean',
      table: {
        category: '⚙️ Estado',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Desabilita o item, tornando-o não interativo.',
      control: 'boolean',
      table: {
        category: '⚙️ Estado',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextListSelectable>;

export const Usage: Story = {
  args: {
    title: 'Título do item selecionável',
    description: 'Descrição do item para demonstração',
    caption: 'Legenda adicional',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div style={storyStyles.singleItem}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const Basic: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.columnContainer}>
      <TextListSelectable
        title="Item básico"
        description="Item com título e descrição simples"
        loading={false}
        disabled={false}
        tagLabel="Nova"
        checkbox={{ id: 'checkbox-1' }}
        showDivider
      />
      <TextListSelectable
        title="Item com legenda"
        description="Item que inclui uma legenda adicional"
        loading={false}
        disabled={false}
        tagLabel="Nova"
        checkbox={{ id: 'checkbox-2' }}
        showDivider
      />
      <TextListSelectable
        title="Item com tag"
        description="Item que possui uma tag ao lado do título"
        loading={false}
        disabled={false}
        tagLabel="Nova"
        radio={{ id: 'radio-2' }}
        showDivider
      />
    </div>
  ),
};

export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.columnContainer}>
      <TextListSelectable
        title="Item com legenda"
        description="Este item possui uma legenda adicional"
        caption="Legenda do item"
      />
      <TextListSelectable
        title="Item com legenda destacada"
        description="Legenda pode ser usada para informações importantes"
        caption="Informação importante"
      />
    </div>
  ),
};

export const Loading: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.columnContainer}>
      <TextListSelectable
        title="Item carregando"
        description="Este item está em estado de carregamento"
        loading
      />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={storyStyles.columnContainer}>
      <TextListSelectable
        title="Item desabilitado"
        description="Este item está desabilitado"
        disabled
      />
      <TextListSelectable
        title="Item com tag desabilitado"
        description="Item com tag também pode ser desabilitado"
        tagLabel="Tag"
        disabled
      />
      <TextListSelectable
        title="Item completo desabilitado"
        description="Item com todas as propriedades desabilitado"
        caption="Legenda"
        tagLabel="Nova"
        disabled
      />
    </div>
  ),
};
