import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import {
  colorStatusNegativeUp,
  colorStatusWarningUp,
} from '@useblu/ocean-tokens/web/tokens';
import React from 'react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import type { TransactionListReadOnlyProps } from '../TransactionListReadOnly';
import docsJson from './TransactionListReadOnly.docs.json';
import { aiRulesText } from '../../../../../.storybook/docs-blocks';
import { familyDocs } from '../../../../../.storybook/docs-blocks/transaction-list/FamilyDocsPage';
import {
  blockArgTypes,
  classNameArgType,
  densityArgType,
  dividerArgType,
  iconArgTypes,
  stateArgTypes,
} from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  MatrixGrid,
  SizesMatrix,
} from '../../../../../.storybook/docs-blocks/transaction-list/shared';

const docs = familyDocs(docsJson);

const baseArgs: TransactionListReadOnlyProps = {
  title: 'Pix recebido',
  description: 'Padaria São José',
  caption: '12 de novembro às 14:32',
  amount: 'R$ 150,00',
  amountTag: { label: 'Pago' },
  additionalData: 'Saldo disponível',
  icon: <PlaceholderOutline size={24} />,
};

const meta: Meta<typeof TransactionListReadOnly> = {
  title: 'Components/List/Transaction List Read Only',
  component: TransactionListReadOnly,
  // "manifest": entra no manifesto de componentes (resumo = regras para IA).
  tags: ['autodocs', 'manifest'],
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: aiRulesText(docs.aiRules) },
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      page: docs.page(() => ({ Default, States, Sizes, Density })),
    },
  },
  argTypes: {
    ...iconArgTypes(),
    ...densityArgType(),
    ...dividerArgType(),
    ...stateArgTypes(),
    ...blockArgTypes({ sizeDefault: "'md'" }),
    ...classNameArgType('<div> raiz'),
  },
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListReadOnly>;

const noControls = { controls: { disable: true } };

/** Playground — todas as propriedades nos controles. Sem snapshot (as matrizes cobrem). */
export const Default: Story = {
  name: 'Playground',
  parameters: { chromatic: { disableSnapshot: true } },
  render: (args) => (
    <div style={{ width: '360px' }}>
      <TransactionListReadOnly {...args} />
    </div>
  ),
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
  parameters: noControls,
  render: () => (
    <MatrixGrid
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
          <TransactionListReadOnly
            key={`${contentSize}-${amountSize}`}
            {...baseArgs}
            {...props}
            contentSize={contentSize}
            amountSize={amountSize}
          />
        )),
      }))}
    />
  ),
};

/** Matriz: tipos de valor × tamanho (conteúdo e valor no mesmo tamanho). */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: noControls,
  render: () => (
    <SizesMatrix
      render={(props) => <TransactionListReadOnly {...baseArgs} {...props} />}
    />
  ),
};

/** Matriz: cor do ícone (e desabilitado) × fundo. */
export const IconColors: Story = {
  name: 'Icon colors',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['Fundo branco', 'Status/Warning/Up', 'Status/Negative/Up']}
      rows={(
        [
          ['default', { iconColor: 'default' }],
          ['on-color', { iconColor: 'on-color' }],
          ['highlight', { iconColor: 'highlight' }],
          ['disabled', { iconColor: 'highlight', disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: [undefined, colorStatusWarningUp, colorStatusNegativeUp].map(
          (background) => (
            <div key={background ?? 'white'} style={{ background }}>
              <TransactionListReadOnly {...baseArgs} {...props} />
            </div>
          )
        ),
      }))}
    />
  ),
};

/** Matriz: densidade (default × compact) × tamanho e carregando. */
export const Density: Story = {
  name: 'Density',
  parameters: noControls,
  render: () => (
    <MatrixGrid
      columns={['default', 'compact']}
      rows={(
        [
          ['md · md (100 / 84)', {}],
          ['sm · sm (94 / 78)', { contentSize: 'sm', amountSize: 'sm' }],
          ['Carregando (73 / 57)', { loading: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: (['default', 'compact'] as const).map((density) => (
          <TransactionListReadOnly
            key={density}
            {...baseArgs}
            {...props}
            density={density}
          />
        )),
      }))}
    />
  ),
};
