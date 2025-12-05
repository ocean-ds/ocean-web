import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  StarOutline,
  Reply,
  LockClosed,
  ChevronRight,
} from '@useblu/ocean-icons-react';
import List from '../List';
import TransactionListItem from '../../TransactionListItem';
import ListSelectable from '../../ListSelectable';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        'Conteúdo da lista, geralmente componentes TransactionListItem.',
      control: false,
    },
    className: {
      description: 'Classes CSS adicionais para customização.',
      control: 'text',
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Usage: Story = {
  args: {
    children: (
      <>
        <TransactionListItem icon={<StarOutline />}>Item 1</TransactionListItem>
        <TransactionListItem icon={<Reply />}>Item 2</TransactionListItem>
        <TransactionListItem>Item 3</TransactionListItem>
        <TransactionListItem>Item 4</TransactionListItem>
      </>
    ),
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <div
        style={{
          minWidth: '300px',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
};

export const BasicList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem>Item 1</TransactionListItem>
      <TransactionListItem>Item 2</TransactionListItem>
      <TransactionListItem>Item 3</TransactionListItem>
      <TransactionListItem>Item 4</TransactionListItem>
    </List>
  ),
};

export const IconsList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem icon={<StarOutline />}>
        Item com estrela
      </TransactionListItem>
      <TransactionListItem icon={<Reply />}>
        Item com resposta
      </TransactionListItem>
      <TransactionListItem icon={<LockClosed />}>
        Item com cadeado
      </TransactionListItem>
      <TransactionListItem icon={<ChevronRight />}>
        Item com seta
      </TransactionListItem>
    </List>
  ),
};

export const ValuesList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem value="R$ 100,00" positive>
        Receita
      </TransactionListItem>
      <TransactionListItem value="R$ 50,00">Despesa</TransactionListItem>
      <TransactionListItem value="R$ 25,50" positive>
        Crédito
      </TransactionListItem>
      <TransactionListItem value="R$ 75,25">Débito</TransactionListItem>
    </List>
  ),
};

export const TagsList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem
        level2="Informação secundária"
        tags="Pendente"
        time="10:30"
      >
        Item com tag
      </TransactionListItem>
      <TransactionListItem
        level2="Outra informação"
        tags="Aprovado"
        time="14:15"
      >
        Item aprovado
      </TransactionListItem>
      <TransactionListItem level2="Status" tags="Rejeitado" time="16:45">
        Item rejeitado
      </TransactionListItem>
    </List>
  ),
};

export const SubItemsList: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem
        withChevron
        subItens={
          <List>
            <TransactionListItem level2="Detalhe 1">
              Subitem 1
            </TransactionListItem>
            <TransactionListItem level2="Detalhe 2">
              Subitem 2
            </TransactionListItem>
          </List>
        }
      >
        Item principal com subitens
      </TransactionListItem>
      <TransactionListItem
        withChevron
        subItens={
          <List>
            <TransactionListItem value="R$ 10,00">
              Subtransação 1
            </TransactionListItem>
            <TransactionListItem value="R$ 20,00">
              Subtransação 2
            </TransactionListItem>
          </List>
        }
      >
        Outro item com subitens
      </TransactionListItem>
    </List>
  ),
};

export const WithListSelectable: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <ListSelectable
        title="Opção 1"
        description="Descrição da opção 1"
        checkbox={{ id: 'list-selectable-1' }}
        type="text"
        showDivider
      />
      <ListSelectable
        title="Opção 2"
        description="Descrição da opção 2"
        checkbox={{ id: 'list-selectable-2' }}
        type="text"
        showDivider
      />
      <ListSelectable
        title="Opção 3"
        description="Descrição da opção 3"
        checkbox={{ id: 'list-selectable-3' }}
        type="text"
        showDivider
      />
    </List>
  ),
};
