import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Accordion from '../Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'O título do accordion que será exibido no cabeçalho.',
      control: 'text',
    },
    description: {
      description:
        'O conteúdo descritivo que será exibido quando o accordion estiver expandido.',
      control: 'text',
    },
    className: {
      description: 'Classes CSS adicionais para customização.',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Usage: Story = {
  args: {
    title: 'Título do Accordion',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper dui odio augue et arcu. Amet, nisi, nullam magna ultrices. Feugiat volutpat rutrum vitae neque, neque at. Fames sollicitudin in vulputate adipiscing mattis eleifend.',
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          maxWidth: '530px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const MultipleAccordions: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '530px',
      }}
    >
      <Accordion
        title="Primeiro Accordion"
        description="Este é o conteúdo do primeiro accordion. Você pode expandir e recolher para visualizar o conteúdo."
      />
      <Accordion
        title="Segundo Accordion"
        description="Este é o conteúdo do segundo accordion. Cada accordion funciona de forma independente."
      />
      <Accordion
        title="Terceiro Accordion"
        description="Este é o conteúdo do terceiro accordion. O estado de cada um é mantido separadamente."
      />
    </div>
  ),
};

export const LongContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '530px' }}>
      <Accordion
        title="Accordion com Conteúdo Longo"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
      />
    </div>
  ),
};

export const ShortContent: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ maxWidth: '530px' }}>
      <Accordion
        title="Accordion com Conteúdo Curto"
        description="Conteúdo breve e direto."
      />
    </div>
  ),
};
