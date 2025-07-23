import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  EyeOutline,
  StarOutline,
  Reply,
  LockClosed,
} from '@useblu/ocean-icons-react';
import TransactionListItem from '../TransactionListItem';
import List from '../../List';
import Tag from '../../Tag';

const meta: Meta<typeof TransactionListItem> = {
  title: 'Components/List/TransactionListItem',
  component: TransactionListItem,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Conteúdo principal do item (Level 1).',
      control: 'text',
    },
    level2: {
      description: 'Texto secundário (Level 2).',
      control: 'text',
    },
    level3: {
      description: 'Texto terciário (Level 3).',
      control: 'text',
    },
    level4: {
      description: 'Texto quaternário (Level 4).',
      control: 'text',
    },
    value: {
      description: 'Valor monetário ou numérico exibido.',
      control: 'text',
    },
    positive: {
      description: 'Define se o valor é positivo (verde).',
      control: 'boolean',
    },
    time: {
      description: 'Horário ou timestamp.',
      control: 'text',
    },
    tags: {
      description: 'Tags ou badges para categorização.',
      control: false,
    },
    icon: {
      description: 'Ícone exibido à esquerda do item.',
      control: false,
    },
    withChevron: {
      description: 'Exibe um ícone de chevron indicando expansão.',
      control: 'boolean',
    },
    subItens: {
      description: 'Subitens aninhados.',
      control: false,
    },
    readOnly: {
      description: 'Define se o item é somente leitura.',
      control: 'boolean',
    },
    isLoading: {
      description: 'Exibe estado de carregamento.',
      control: 'boolean',
    },
    className: {
      description: 'Classes CSS adicionais.',
      control: 'text',
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof TransactionListItem>;

export const Usage: Story = {
  args: {
    children: 'Level 1',
    icon: <EyeOutline />,
    tags: <Tag>Tag</Tag>,
    time: '9:00',
    value: '+ U$ 00.000,00',
    level2: 'Level 2',
    level3: 'Level 3',
    level4: 'Level 4',
    withChevron: true,
  },
  decorators: [
    (StoryComponent: React.ComponentType): JSX.Element => (
      <List>
        <StoryComponent />
      </List>
    ),
  ],
};

export const BasicItem: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem>Item básico</TransactionListItem>
      <TransactionListItem>Outro item simples</TransactionListItem>
      <TransactionListItem>Terceiro item</TransactionListItem>
    </List>
  ),
};

export const WithIcons: Story = {
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
      <TransactionListItem icon={<EyeOutline />}>
        Item com olho
      </TransactionListItem>
    </List>
  ),
};

export const WithValues: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem value="R$ 150,00" positive>
        Receita
      </TransactionListItem>
      <TransactionListItem value="R$ 75,50">Despesa</TransactionListItem>
      <TransactionListItem value="+ U$ 1.200,00" positive>
        Crédito internacional
      </TransactionListItem>
      <TransactionListItem value="- R$ 45,30">
        Débito automático
      </TransactionListItem>
    </List>
  ),
};

export const WithLevels: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem
        level2="Informação secundária"
        level3="Detalhes adicionais"
        level4="Informação extra"
      >
        Título principal
      </TransactionListItem>
      <TransactionListItem level2="Banco do Brasil" level3="Conta corrente">
        Transferência bancária
      </TransactionListItem>
      <TransactionListItem
        level2="Cartão de crédito"
        level3="Final 1234"
        level4="Parcela 2/12"
      >
        Compra parcelada
      </TransactionListItem>
    </List>
  ),
};

export const WithTags: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem
        tags={<Tag>Pendente</Tag>}
        time="10:30"
        level2="Aguardando aprovação"
      >
        Transferência PIX
      </TransactionListItem>
      <TransactionListItem
        tags={
          <Tag variant="highlight" type="important">
            Aprovado
          </Tag>
        }
        time="14:15"
        level2="Processado com sucesso"
      >
        Pagamento boleto
      </TransactionListItem>
      <TransactionListItem
        tags={<Tag>Em análise</Tag>}
        time="16:45"
        level2="Verificação de segurança"
      >
        Saque no caixa
      </TransactionListItem>
    </List>
  ),
};

export const WithSubItems: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem
        withChevron
        value="R$ 100,00"
        subItens={
          <List>
            <TransactionListItem level2="Taxa de serviço" value="R$ 2,50">
              Cobrança adicional
            </TransactionListItem>
            <TransactionListItem level2="Imposto" value="R$ 5,00">
              IOF
            </TransactionListItem>
          </List>
        }
      >
        Transferência TED
      </TransactionListItem>
      <TransactionListItem
        withChevron
        icon={<StarOutline />}
        subItens={
          <List>
            <TransactionListItem level2="Detalhes">
              Subitem 1
            </TransactionListItem>
            <TransactionListItem level2="Informações">
              Subitem 2
            </TransactionListItem>
          </List>
        }
      >
        Item com subitens
      </TransactionListItem>
    </List>
  ),
};

export const CompleteExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem
        icon={<Reply />}
        level2="Banco do Brasil"
        level3="Conta corrente - 12345-6"
        level4="PIX"
        value="R$ 250,00"
        positive
        time="09:30"
        tags={
          <Tag variant="highlight" type="important">
            Concluído
          </Tag>
        }
      >
        Transferência recebida
      </TransactionListItem>
      <TransactionListItem
        icon={<LockClosed />}
        level2="Cartão de crédito"
        level3="Final 1234"
        value="R$ 89,90"
        time="14:20"
        tags={<Tag>Pendente</Tag>}
      >
        Compra online
      </TransactionListItem>
      <TransactionListItem
        icon={<EyeOutline />}
        level2="Caixa eletrônico"
        level3="Agência 1234"
        value="R$ 200,00"
        time="16:15"
        tags={<Tag>Processando</Tag>}
      >
        Saque em dinheiro
      </TransactionListItem>
    </List>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <List>
      <TransactionListItem>Estado normal</TransactionListItem>
      <TransactionListItem readOnly>Item somente leitura</TransactionListItem>
      <TransactionListItem isLoading>Item carregando...</TransactionListItem>
      <TransactionListItem withChevron>Item com chevron</TransactionListItem>
    </List>
  ),
};
