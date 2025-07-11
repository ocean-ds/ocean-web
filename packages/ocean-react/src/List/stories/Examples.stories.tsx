import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import {
  StarOutline,
  Reply,
  LockClosed,
  SwitchHorizontal,
  CreditCardOutline,
  ShoppingBagOutline,
  EyeOutline,
  CurrencyDollarOutline,
} from '@useblu/ocean-icons-react';
import TransactionListItem from '../../TransactionListItem';
import SubHeader from '../../SubHeader';
import Tag from '../../Tag';
import List from '../List';

const meta: Meta<typeof List> = {
  title: 'Examples/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Introduction />
          <DocBlock.Heading>Documentação</DocBlock.Heading>
          <DocsSection />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

const Introduction = (): JSX.Element => (
  <>
    <DocBlock.Title />
    <DocBlock.Markdown>
      Lists são índices contínuos e verticais de texto ou imagens.
    </DocBlock.Markdown>
    <DocBlock.Markdown>
      Lists são um grupo contínuo de texto ou imagens. Elas são compostas por
      itens contendo ações primárias e suplementares, que são representadas por
      ícones e texto.
    </DocBlock.Markdown>
  </>
);

// Componente temporário para referência das stories
const DocsSection = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos Básicos</DocBlock.Heading>
    <DocBlock.Canvas of={SimpleList} />

    <DocBlock.Heading>Variações do TransactionListItem</DocBlock.Heading>

    <h3>Informação Completa</h3>
    <DocBlock.Canvas of={AllLevelInformation} />

    <h3>Valor Positivo</h3>
    <DocBlock.Canvas of={WithPositiveValue} />

    <h3>Com Tags</h3>
    <DocBlock.Canvas of={WithTags} />

    <h3>Ícones Personalizados</h3>
    <DocBlock.Canvas of={WithCustomIcons} />

    <h3>Com Sub-itens</h3>
    <DocBlock.Canvas of={WithSubItems} />

    <DocBlock.Heading>Casos de Uso Avançados</DocBlock.Heading>

    <h3>Múltiplos Usos</h3>
    <DocBlock.Canvas of={MultipleUsages} />

    <h3>Lista de Pagamentos</h3>
    <DocBlock.Canvas of={PaymentsList} />

    <h3>Transações Bancárias</h3>
    <DocBlock.Canvas of={BankTransactions} />
  </>
);

export const SimpleList: Story = {
  render: () => (
    <List>
      <TransactionListItem icon={<StarOutline />}>Item 1</TransactionListItem>
      <TransactionListItem icon={<Reply />}>Item 2</TransactionListItem>
      <TransactionListItem>Item 3</TransactionListItem>
      <TransactionListItem>Item 4</TransactionListItem>
    </List>
  ),
};

export const AllLevelInformation: Story = {
  render: () => (
    <List>
      <TransactionListItem
        icon={<EyeOutline />}
        tags={<Tag>Tag</Tag>}
        time="9:00"
        value="+ U$ 00.000,00"
        level2="Level 2"
        level3="Level 3"
        level4="Level 4"
      >
        Level 1
      </TransactionListItem>
    </List>
  ),
};

export const WithPositiveValue: Story = {
  render: () => (
    <List>
      <TransactionListItem
        icon={<SwitchHorizontal />}
        positive
        time="9:00"
        value="+ U$ 5.346,90"
        level2="In-n-Out Burgers LA"
      >
        TransactionListItem Received
      </TransactionListItem>
    </List>
  ),
};

export const WithTags: Story = {
  render: () => (
    <List>
      <TransactionListItem
        icon={<SwitchHorizontal />}
        tags={<Tag type="negative">blocked</Tag>}
        time="9:00"
        value="+ U$ 146,90"
        level2="In-n-Out Burgers LA"
        level3="reibushed to the client"
      >
        TransactionListItem Received
      </TransactionListItem>
    </List>
  ),
};

export const WithCustomIcons: Story = {
  render: () => (
    <List>
      <TransactionListItem
        icon={<StarOutline />}
        value="+ U$ 999,90"
        level3="a super mario's power up"
      >
        Star
      </TransactionListItem>
    </List>
  ),
};

export const WithSubItems: Story = {
  render: () => (
    <List>
      <TransactionListItem
        icon={<CreditCardOutline />}
        value="+ U$ 10.000,00"
        positive
        subItens={
          <>
            <TransactionListItem icon={<Reply />} value="- U$ 500,00">
              Taxes
            </TransactionListItem>
            <TransactionListItem icon={<LockClosed />} value="- U$ 500,00">
              Locked
            </TransactionListItem>
          </>
        }
      >
        Monthly Income
      </TransactionListItem>
    </List>
  ),
};

export const MultipleUsages: Story = {
  render: () => (
    <List>
      <SubHeader>Today</SubHeader>
      <TransactionListItem
        icon={<ShoppingBagOutline />}
        tags={<Tag type="warning">waiting</Tag>}
        time="9:00"
        value="+ U$ 1.340,00"
        level2="store's name"
      >
        Shop
      </TransactionListItem>
      <TransactionListItem
        icon={<CreditCardOutline />}
        value="+ U$ 500,00"
        positive
        time="10 de July"
      >
        Credit Card
      </TransactionListItem>
      <TransactionListItem
        icon={<CreditCardOutline />}
        value="+ U$ 10.000,00"
        positive
        subItens={
          <>
            <TransactionListItem icon={<Reply />} value="- U$ 500,00">
              Taxes
            </TransactionListItem>
            <TransactionListItem icon={<LockClosed />} value="- U$ 500,00">
              Locked
            </TransactionListItem>
          </>
        }
      >
        Monthly Income
      </TransactionListItem>
      <TransactionListItem
        className="ods-list__item"
        icon={<SwitchHorizontal />}
        time="9:00"
        value="+ U$ 1.546,90"
        level2="In-n-Out Burgers LA"
        level3="40x Double-Double"
        level4="Leonardo Alemax"
      >
        Bank Transfer
      </TransactionListItem>
    </List>
  ),
};

export const PaymentsList: Story = {
  render: () => (
    <List>
      <SubHeader>Today, July 15</SubHeader>
      <TransactionListItem
        icon={<CurrencyDollarOutline />}
        tags={<Tag type="warning">pending</Tag>}
        value="- U$ 1.000,00"
        level3="50867443456600"
        level2="Maskel Industry and Commerce of Pillows and Foams Ltda"
      >
        Payment to supplier
      </TransactionListItem>
      <TransactionListItem
        icon={<CurrencyDollarOutline />}
        tags={<Tag type="warning">pending</Tag>}
        value="- U$ 2.500,00"
        level2="IImosest Furniture and Upholstery Industry"
      >
        Payment to supplier
      </TransactionListItem>
      <SubHeader>Monday, July 14</SubHeader>
      <TransactionListItem
        icon={<CurrencyDollarOutline />}
        tags={<Tag type="warning">pending</Tag>}
        value="- U$ 400,00"
        level2="IImosest Furniture and Upholstery Industry"
      >
        Payment to supplier
      </TransactionListItem>
      <SubHeader>Friday, July 12</SubHeader>
      <TransactionListItem
        icon={<CurrencyDollarOutline />}
        tags={<Tag type="warning">pending</Tag>}
        value="- U$ 1.200,00"
        level2="IImosest Furniture and Upholstery Industry"
      >
        Payment to supplier
      </TransactionListItem>
      <TransactionListItem
        icon={<CurrencyDollarOutline />}
        tags={<Tag type="warning">pending</Tag>}
        value="- U$ 10.000,00"
        level2="IImosest Furniture and Upholstery Industry"
      >
        Payment to supplier
      </TransactionListItem>
    </List>
  ),
};

export const BankTransactions: Story = {
  render: () => (
    <List>
      <SubHeader
        subtitle={
          <>
            Day Amount: <strong>U$ 3.000,00</strong>
          </>
        }
      >
        Today, July 15
      </SubHeader>
      <TransactionListItem
        icon={<SwitchHorizontal />}
        value="- U$ 1.000,00"
        time="9:00"
        level2="IImosest Furniture and Upholstery Industry"
      >
        Bank Transfer
      </TransactionListItem>
      <TransactionListItem
        icon={<SwitchHorizontal />}
        value="- U$ 2.500,00"
        time="9:00"
        level2="Moved Pampa Almt."
      >
        Bank Transfer
      </TransactionListItem>
      <TransactionListItem
        icon={<SwitchHorizontal />}
        value="+ U$ 2.500,00"
        positive
        time="9:00"
        level2="Moved Pampa Almt."
      >
        Bank Transfer
      </TransactionListItem>
      <SubHeader
        subtitle={
          <>
            Day Amount: <strong>U$ 1.000,00</strong>
          </>
        }
      >
        Monday, July 14
      </SubHeader>
      <TransactionListItem
        icon={<CreditCardOutline />}
        value="+ U$ 500,00"
        positive
        time="9:00"
      >
        Credit Card
      </TransactionListItem>
    </List>
  ),
};
