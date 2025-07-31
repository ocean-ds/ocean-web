import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TextListItem from '../TextListItem';

const meta: Meta<typeof TextListItem> = {
  title: 'Components/List/TextListItem',
  component: TextListItem,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título do componente.',
      control: 'text',
    },
    description: {
      description: 'A descrição do componente.',
      control: 'text',
    },
    caption: {
      description: 'Texto de legenda adicional.',
      control: 'text',
    },
    tagLabel: {
      description: 'Texto da tag exibida ao lado do título.',
      control: 'text',
    },
    infoText: {
      description: 'Texto informativo adicional.',
      control: 'text',
    },
    infoTextType: {
      description: 'O tipo do texto informativo.',
      control: 'select',
      options: ['neutral', 'positive'],
    },
    withAction: {
      description: 'Exibe um ícone de ação no lado direito.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o componente.',
      control: 'boolean',
    },
    className: {
      table: { disable: true },
    },
    checkbox: {
      table: { disable: true },
    },
    radio: {
      table: { disable: true },
    },
    onActionClick: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextListItem>;

export const Usage: Story = {
  args: {
    title: 'Título do componente',
    description: 'Descrição do componente para demonstração',
    withAction: true,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const WithTag: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Item com tag"
        description="Este item possui uma tag ao lado do título"
        tagLabel="Nova"
        withAction
      />
    </div>
  ),
};

export const WithCaption: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Item com legenda"
        description="Este item possui uma legenda adicional"
        caption="Legenda do item"
        withAction
      />
    </div>
  ),
};

export const WithInfoText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Info neutral"
        description="Item com texto informativo neutral"
        infoText="R$ 150,00"
        infoTextType="neutral"
        withAction
      />
      <TextListItem
        title="Info positiva"
        description="Item com texto informativo positivo"
        infoText="+ R$ 50,00"
        infoTextType="positive"
        withAction
      />
    </div>
  ),
};

export const WithCheckbox: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Item com checkbox"
        description="Este item pode ser selecionado via checkbox"
        checkbox={{ id: 'checkbox-1' }}
      />
      <TextListItem
        title="Item marcado"
        description="Este item já vem marcado"
        checkbox={{ id: 'checkbox-2', checked: true }}
      />
      <TextListItem
        title="Item desabilitado"
        description="Este item está desabilitado"
        checkbox={{ id: 'checkbox-3' }}
        disabled
      />
    </div>
  ),
};

export const WithRadio: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Opção 1"
        description="Primeira opção do grupo de radio"
        radio={{ id: 'radio-1', name: 'options', value: 'option1' }}
      />
      <TextListItem
        title="Opção 2"
        description="Segunda opção do grupo de radio"
        radio={{
          id: 'radio-2',
          name: 'options',
          value: 'option2',
          checked: true,
        }}
      />
      <TextListItem
        title="Opção 3"
        description="Terceira opção do grupo de radio"
        radio={{ id: 'radio-3', name: 'options', value: 'option3' }}
      />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Item desabilitado"
        description="Este item está desabilitado"
        withAction
        disabled
      />
      <TextListItem
        title="Com tag desabilitado"
        description="Item com tag também pode ser desabilitado"
        tagLabel="Tag"
        withAction
        disabled
      />
    </div>
  ),
};

export const Complete: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <TextListItem
        title="Item completo"
        description="Este item possui todas as funcionalidades disponíveis"
        caption="Legenda adicional"
        tagLabel="Premium"
        infoText="R$ 299,90"
        infoTextType="positive"
        withAction
      />
    </div>
  ),
};
