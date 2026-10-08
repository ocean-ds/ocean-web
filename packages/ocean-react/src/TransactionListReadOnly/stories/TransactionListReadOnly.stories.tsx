import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import {
  colorStatusNegativeUp,
  colorStatusWarningUp,
} from '@useblu/ocean-tokens/web/tokens';
import React from 'react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import type { TransactionListReadOnlyProps } from '../TransactionListReadOnly';
import TransactionListReadOnlyDocs from './TransactionListReadOnly.docs';

const icon = <PlaceholderOutline size={24} />;
const snapshot = { chromatic: { disableSnapshot: false } };

const baseArgs: TransactionListReadOnlyProps = {
  title: 'Pix recebido',
  description: 'Padaria São José',
  caption: '12 de novembro às 14:32',
  amount: 'R$ 150,00',
  amountTag: { label: 'Pago' },
  additionalData: 'Saldo disponível',
  icon,
};

const category = {
  content: '📝 Conteúdo',
  appearance: '🎨 Aparência',
  state: '⚙️ Estado',
  contentBlock: '🧩 Bloco de conteúdo',
  amountBlock: '🧩 Bloco de valor',
  advanced: '🔧 Avançado',
};

const controlFor = (type: string) => {
  if (type === 'string') return 'text';
  if (type === 'boolean') return 'boolean';
  if (type.startsWith('{')) return 'object';
  return undefined;
};

const arg = (
  cat: string,
  description: string,
  type: string,
  defaultValue?: string
) => ({
  description,
  control: controlFor(type),
  table: {
    category: cat,
    type: { summary: type },
    defaultValue: defaultValue ? { summary: defaultValue } : undefined,
  },
});

const meta: Meta<typeof TransactionListReadOnly> = {
  title: 'Components/List/Transaction List Read Only',
  component: TransactionListReadOnly,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      // Página em abas (protótipo MR-615 T16); as stories são lidas na hora de renderizar.
      page: () => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <TransactionListReadOnlyDocs stories={{ Default, States, Sizes }} />
      ),
    },
  },
  argTypes: {
    icon: {
      ...arg(
        category.content,
        'Ícone de 24px à esquerda; entra só quando distingue os itens da lista. Herda a cor de `iconColor` — passe o ícone sem cor própria',
        'ReactNode'
      ),
      control: false,
    },
    iconColor: {
      ...arg(
        category.appearance,
        'Cor do ícone: `default` sobre fundo branco, `on-color` sobre fundo colorido, `highlight` para mais ênfase. Ignorado com a linha desabilitada (o ícone usa Interface/Light/Deep)',
        "'default' | 'on-color' | 'highlight'",
        "'default'"
      ),
      control: 'inline-radio',
      options: ['default', 'on-color', 'highlight'],
    },
    showDivider: arg(
      category.appearance,
      'Mostra o divisor abaixo do item (recuo de 16px)',
      'boolean',
      'true'
    ),
    loading: arg(
      category.state,
      'Mostra o esqueleto no lugar do ícone, do conteúdo e do valor',
      'boolean',
      'false'
    ),
    disabled: arg(
      category.state,
      'Apaga a linha: conteúdo e valor no tipo `inactive` e etiqueta `neutral`',
      'boolean',
      'false'
    ),
    title: arg(
      category.contentBlock,
      'Texto de cima da linha; com `inverted` sai menor que a descrição. Um dado só: o tipo da transação ou a categoria ("Pix recebido", "PagBlu")',
      'string'
    ),
    description: arg(
      category.contentBlock,
      'Texto em destaque da linha quando invertido. Um dado só: a contraparte, o método **ou** o final do cartão ("Padaria São José")',
      'string'
    ),
    strikethroughDescription: arg(
      category.contentBlock,
      'Texto original riscado antes do texto em destaque. Só tem efeito com o tipo `strikethrough`',
      'string'
    ),
    caption: arg(
      category.contentBlock,
      'Terceira linha, em `captionBold`: um dado de informação adicional (data "12 de novembro às 14:32", referência)',
      'string'
    ),
    inverted: arg(
      category.contentBlock,
      'Troca o peso de título e descrição: invertido, a descrição é a linha em destaque',
      'boolean',
      'true'
    ),
    status: {
      ...arg(
        category.contentBlock,
        'Cor e peso do texto em destaque. Ignorado com a linha desabilitada (o bloco usa `inactive`)',
        "'default' | 'inactive' | 'positive' | 'warning' | 'highlight' | 'highlight-lead' | 'strikethrough'",
        "'default'"
      ),
      control: 'select',
      options: [
        'default',
        'inactive',
        'positive',
        'warning',
        'highlight',
        'highlight-lead',
        'strikethrough',
      ],
    },
    contentSize: {
      ...arg(
        category.contentBlock,
        'Tamanho do texto do bloco de conteúdo, escolhido independente do valor',
        "'md' | 'sm'",
        "'md'"
      ),
      control: 'inline-radio',
      options: ['md', 'sm'],
    },
    amount: arg(
      category.amountBlock,
      'Valor à direita, já formatado e **sem sinal** ("R$ 1.234,56"); o "- " de `negative` é o componente que põe',
      'string'
    ),
    amountType: {
      ...arg(
        category.amountBlock,
        'Cor do valor e o "- " na saída. Ignorado com a linha desabilitada (o bloco usa `inactive`)',
        "'default' | 'positive' | 'negative' | 'inactive' | 'strikethrough' | 'strikethrough-neutral'",
        "'default'"
      ),
      control: 'select',
      options: [
        'default',
        'positive',
        'negative',
        'inactive',
        'strikethrough',
        'strikethrough-neutral',
      ],
    },
    amountSize: {
      ...arg(
        category.amountBlock,
        'Tamanho do valor e da etiqueta abaixo dele, escolhido independente do conteúdo',
        "'md' | 'sm'",
        "'md'"
      ),
      control: 'inline-radio',
      options: ['md', 'sm'],
    },
    strikethroughAmount: arg(
      category.amountBlock,
      'Valor original riscado antes do valor atual, na mesma linha. Só tem efeito com os tipos `strikethrough` e `strikethrough-neutral`',
      'string'
    ),
    amountTag: arg(
      category.amountBlock,
      'Etiqueta abaixo do valor; o tamanho segue `amountSize` e vira `neutral` com a linha desabilitada',
      '{ label: ReactNode; type?: AmountDetailsTagType; setIconOff?: boolean }'
    ),
    amountIndicator: {
      ...arg(
        category.amountBlock,
        'Elemento livre abaixo do valor, quando a etiqueta não basta. Ignorado quando `amountTag` é passado',
        'ReactNode'
      ),
      control: false,
    },
    showAmountIndicator: arg(
      category.amountBlock,
      'Mostra a etiqueta ou o indicador abaixo do valor',
      'boolean',
      'true'
    ),
    additionalData: arg(
      category.amountBlock,
      'Linha abaixo do valor, em `captionBold`: um dado só ("6x de R$ 100,00", "Saldo disponível")',
      'string'
    ),
    className: {
      ...arg(
        category.advanced,
        'Classes no elemento raiz; `ref` e os demais atributos de `<div>` também vão para ele',
        'string'
      ),
      control: false,
    },
  },
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListReadOnly>;

const frame = (children: React.ReactNode, background?: string) => (
  <div style={{ width: '360px', background }}>{children}</div>
);

const Grid = ({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; cells: React.ReactNode[] }[];
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `120px repeat(${columns.length}, 360px)`,
      gap: '16px 24px',
      alignItems: 'start',
    }}
  >
    <span />
    {columns.map((column) => (
      <p key={column} className="ods-typography ods-typography__captionbold">
        {column}
      </p>
    ))}
    {rows.map((row) => (
      <React.Fragment key={row.label}>
        <p className="ods-typography ods-typography__captionbold">
          {row.label}
        </p>
        {row.cells}
      </React.Fragment>
    ))}
  </div>
);

/** Playground — todas as propriedades nos controles. Sem snapshot (as matrizes cobrem). */
export const Default: Story = {
  name: 'Playground',
  parameters: { chromatic: { disableSnapshot: true } },
  render: (args) => frame(<TransactionListReadOnly {...args} />),
};

const sizeCombos = [
  ['md', 'md'],
  ['sm', 'md'],
  ['md', 'sm'],
  ['sm', 'sm'],
] as const;

/** Matriz: estados (padrão, carregando, desabilitado) × tamanhos de conteúdo e valor. */
export const States: Story = {
  name: 'States × sizes',
  parameters: { ...snapshot, controls: { disable: true } },
  render: () => (
    <Grid
      columns={sizeCombos.map(
        ([content, amount]) => `contentSize ${content} · amountSize ${amount}`
      )}
      rows={(
        [
          ['Padrão', {}],
          ['Carregando', { loading: true }],
          ['Desabilitado', { disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: sizeCombos.map(([contentSize, amountSize]) => (
          <div key={`${contentSize}-${amountSize}`}>
            <TransactionListReadOnly
              {...baseArgs}
              {...props}
              contentSize={contentSize}
              amountSize={amountSize}
            />
          </div>
        )),
      }))}
    />
  ),
};

const amountTypes = [
  ['default', {}],
  ['positive', {}],
  ['negative', {}],
  ['strikethrough', { amount: 'Grátis', strikethroughAmount: '3,99%' }],
  [
    'strikethrough-neutral',
    { amount: 'R$ 2,00', strikethroughAmount: 'R$ 3,99' },
  ],
] as const;

/** Matriz: tipos de valor × tamanho (conteúdo e valor no mesmo tamanho). */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: { ...snapshot, controls: { disable: true } },
  render: () => (
    <Grid
      columns={['md', 'sm']}
      rows={amountTypes.map(([amountType, props]) => ({
        label: amountType,
        cells: (['md', 'sm'] as const).map((size) => (
          <div key={size}>
            <TransactionListReadOnly
              {...baseArgs}
              {...props}
              amountType={amountType}
              contentSize={size}
              amountSize={size}
            />
          </div>
        )),
      }))}
    />
  ),
};

const backgrounds = [
  ['Fundo branco', undefined],
  ['Status/Warning/Up', colorStatusWarningUp],
  ['Status/Negative/Up', colorStatusNegativeUp],
] as const;

/** Matriz: cor do ícone (e desabilitado) × fundo. */
export const IconColors: Story = {
  name: 'Icon colors',
  parameters: { ...snapshot, controls: { disable: true } },
  render: () => (
    <Grid
      columns={backgrounds.map(([label]) => label)}
      rows={(
        [
          ['default', { iconColor: 'default' }],
          ['on-color', { iconColor: 'on-color' }],
          ['highlight', { iconColor: 'highlight' }],
          ['disabled', { iconColor: 'highlight', disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: backgrounds.map(([bg, color]) => (
          <div key={bg}>
            {frame(<TransactionListReadOnly {...baseArgs} {...props} />, color)}
          </div>
        )),
      }))}
    />
  ),
};
