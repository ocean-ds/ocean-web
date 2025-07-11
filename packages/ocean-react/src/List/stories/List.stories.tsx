import type { Meta, StoryObj } from '@storybook/react';
import * as DocBlock from '@storybook/blocks';
import React from 'react';
import {
  StarOutline,
  Reply,
  LockClosed,
  ChevronRight,
} from '@useblu/ocean-icons-react';
import List from '../List';
import TransactionListItem from '../../TransactionListItem';

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
    docs: {
      page: () => (
        <>
          <Introduction />
          <DocBlock.Heading>Uso</DocBlock.Heading>
          <DocBlock.Canvas of={Usage} />
          <DocBlock.Controls of={Usage} />
          <DocBlock.Heading>Padrões comuns</DocBlock.Heading>
          <CommonPatterns />
          <DocBlock.Heading>Exemplos</DocBlock.Heading>
          <h3 id="lista-basica">Lista Básica</h3>
          <BasicListDescription />
          <DocBlock.Canvas of={BasicList} />
          <h3 id="lista-com-icones">Lista com Ícones</h3>
          <IconsListDescription />
          <DocBlock.Canvas of={IconsList} />
          <h3 id="lista-com-valores">Lista com Valores</h3>
          <ValuesListDescription />
          <DocBlock.Canvas of={ValuesList} />
          <h3 id="lista-com-tags">Lista com Tags</h3>
          <TagsListDescription />
          <DocBlock.Canvas of={TagsList} />
          <h3 id="lista-com-subitens">Lista com Subitens</h3>
          <SubItemsListDescription />
          <DocBlock.Canvas of={SubItemsList} />
          <UsageExamples />
          <BestPractices />
          <CssClasses />
          <ApiReference />
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
      Container para organizar itens de lista, especialmente
      TransactionListItem.
    </DocBlock.Markdown>
    <DocBlock.Heading>Visão Geral</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente List é um container que organiza itens de lista,
      principalmente TransactionListItem. Ele fornece a estrutura base para
      listas de transações, notificações e outros itens que seguem o padrão de
      design do Ocean.
    </DocBlock.Markdown>
    <DocBlock.Heading>Importação</DocBlock.Heading>
    <DocBlock.Source
      dark
      code={`import { List } from '@useblu/ocean-react';`}
    />
  </>
);

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
};

const CommonPatterns = (): JSX.Element => (
  <>
    <DocBlock.Source
      dark
      code={`// Lista básica
<List>
  <TransactionListItem>Item simples</TransactionListItem>
  <TransactionListItem>Outro item</TransactionListItem>
</List>

// Lista com ícones
<List>
  <TransactionListItem icon={<StarOutline />}>
    Item com ícone
  </TransactionListItem>
</List>

// Lista com valores
<List>
  <TransactionListItem value="R$ 100,00">
    Transação
  </TransactionListItem>
</List>

// Lista com múltiplas informações
<List>
  <TransactionListItem 
    icon={<Reply />}
    level2="Informação secundária"
    value="R$ 50,00"
    time="10:30"
  >
    Item completo
  </TransactionListItem>
</List>`}
    />
  </>
);

const BasicListDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Lista básica com itens simples sem informações adicionais.
    </DocBlock.Markdown>
  </>
);

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

const IconsListDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Lista com ícones para melhor identificação visual dos itens.
    </DocBlock.Markdown>
  </>
);

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

const ValuesListDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Lista com valores monetários ou numéricos, com suporte a formatação
      positiva/negativa.
    </DocBlock.Markdown>
  </>
);

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

const TagsListDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Lista com tags para categorização e identificação adicional dos itens.
    </DocBlock.Markdown>
  </>
);

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

const SubItemsListDescription = (): JSX.Element => (
  <>
    <DocBlock.Markdown>
      Lista com subitens aninhados para mostrar hierarquia e detalhes
      adicionais.
    </DocBlock.Markdown>
  </>
);

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

const UsageExamples = (): JSX.Element => (
  <>
    <DocBlock.Heading>Exemplos de Uso</DocBlock.Heading>

    <h3>Lista de Transações</h3>
    <DocBlock.Source
      dark
      code={`<List>
  <TransactionListItem 
    icon={<StarOutline />}
    level2="Banco do Brasil"
    value="R$ 150,00"
    time="09:30"
    positive
  >
    Transferência recebida
  </TransactionListItem>
  <TransactionListItem 
    icon={<Reply />}
    level2="Pagamento"
    value="R$ 75,50"
    time="14:20"
  >
    Compra no cartão
  </TransactionListItem>
</List>`}
    />

    <h3>Lista de Notificações</h3>
    <DocBlock.Source
      dark
      code={`<List>
  <TransactionListItem 
    icon={<LockClosed />}
    level2="Segurança"
    tags="Importante"
    time="10:15"
  >
    Nova tentativa de login
  </TransactionListItem>
  <TransactionListItem 
    icon={<Reply />}
    level2="Sistema"
    tags="Info"
    time="08:45"
  >
    Atualização disponível
  </TransactionListItem>
</List>`}
    />

    <h3>Lista com Subitens</h3>
    <DocBlock.Source
      dark
      code={`<List>
  <TransactionListItem 
    withChevron
    subItens={
      <List>
        <TransactionListItem value="R$ 25,00">Taxa de serviço</TransactionListItem>
        <TransactionListItem value="R$ 5,00">Taxa de processamento</TransactionListItem>
      </List>
    }
  >
    Transferência bancária
  </TransactionListItem>
</List>`}
    />
  </>
);

const BestPractices = (): JSX.Element => (
  <>
    <DocBlock.Heading>Melhores Práticas</DocBlock.Heading>

    <h3>1. Estrutura da Lista</h3>
    <ul>
      <li>
        Use <code>TransactionListItem</code> como filhos do componente List
      </li>
      <li>
        Mantenha consistência na estrutura dos itens dentro da mesma lista
      </li>
      <li>Use ícones apropriados para melhor identificação visual</li>
    </ul>

    <h3>2. Informações dos Itens</h3>
    <ul>
      <li>
        Use <code>level2</code>, <code>level3</code> e <code>level4</code> para
        informações hierárquicas
      </li>
      <li>
        Use <code>value</code> para valores monetários ou numéricos
      </li>
      <li>
        Use <code>positive</code> para valores positivos (receitas, créditos)
      </li>
      <li>
        Use <code>tags</code> para status ou categorização
      </li>
      <li>
        Use <code>time</code> para timestamps ou horários
      </li>
    </ul>

    <h3>3. Interatividade</h3>
    <ul>
      <li>
        Use <code>withChevron</code> para indicar itens expansíveis
      </li>
      <li>
        Use <code>subItens</code> para mostrar detalhes adicionais
      </li>
      <li>
        Use <code>readOnly</code> para itens não interativos
      </li>
    </ul>

    <h3>4. Estados</h3>
    <ul>
      <li>
        Use <code>isLoading</code> para indicar carregamento de dados
      </li>
      <li>Forneça feedback visual apropriado para diferentes estados</li>
    </ul>
  </>
);

const CssClasses = (): JSX.Element => (
  <>
    <DocBlock.Heading>Classes CSS</DocBlock.Heading>
    <table>
      <thead>
        <tr>
          <th>Classe</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.ods-list</code>
          </td>
          <td>Estilos aplicados ao elemento raiz da lista.</td>
        </tr>
        <tr>
          <td>
            <code>.ods-list-item</code>
          </td>
          <td>
            Adiciona uma linha inferior ao item dentro da lista, também usado no
            componente TransactionListItem.
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

const ApiReference = (): JSX.Element => (
  <>
    <DocBlock.Heading>Referência da API</DocBlock.Heading>
    <DocBlock.Markdown>
      O componente List é baseado no elemento div e suporta todos os atributos
      padrão de div.
    </DocBlock.Markdown>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Tipo</th>
          <th>Padrão</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>children</td>
          <td>
            <code>React.ReactNode</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>
            Conteúdo da lista, geralmente componentes TransactionListItem.
          </td>
        </tr>
        <tr>
          <td>className</td>
          <td>
            <code>string</code>
          </td>
          <td>
            <code>undefined</code>
          </td>
          <td>Classes CSS adicionais para customização do componente.</td>
        </tr>
      </tbody>
    </table>
    <DocBlock.Markdown>
      A ref é encaminhada para o elemento div. Qualquer outra prop fornecida
      será passada para o elemento div.
    </DocBlock.Markdown>
  </>
);
