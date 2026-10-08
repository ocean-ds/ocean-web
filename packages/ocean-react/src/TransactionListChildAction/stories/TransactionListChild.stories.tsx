import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Placeholder } from '@useblu/ocean-icons-react';
import { colorStatusWarningUp } from '@useblu/ocean-tokens/web/tokens';
import TransactionListChildAction from '../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import docsJson from './TransactionListChild.docs.json';
import { familyDocs } from '../../../../../.storybook/docs-blocks/transaction-list/FamilyDocsPage';
import { aiRulesText } from '../../../../../.storybook/docs-blocks';
import {
  arg,
  blockArgTypes,
  category,
  classNameArgType,
  densityArgType,
  iconArgTypes,
  stateArgTypes,
} from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  MatrixGrid,
  stateCases,
} from '../../../../../.storybook/docs-blocks/transaction-list/shared';

const docs = familyDocs(docsJson);
const noSnapshot = { chromatic: { disableSnapshot: true } };
const icon = <Placeholder size={16} />;

const baseArgs = {
  title: 'Agenda antecipada',
  description: 'Antecipação',
  caption: '12 de novembro',
  amount: 'R$ 150,00',
  amountType: 'negative' as const,
  amountTag: { label: 'Pago' },
  additionalData: 'Taxa 1,99%',
  icon,
};

const positions = ['standalone', 'first', 'middle', 'last'] as const;

const meta: Meta<typeof TransactionListChildAction> = {
  title: 'Components/List/Transaction List Child',
  component: TransactionListChildAction,
  // "manifest": entra no manifesto de componentes (resumo = regras para IA).
  tags: ['autodocs', 'manifest'],
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: aiRulesText(docs.aiRules) },
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      page: docs.page(() => ({ Default, Timeline, States, IconColors })),
    },
  },
  argTypes: {
    ...iconArgTypes({
      iconSize: 16,
      iconColorDefault: '— (Interface/Light/Down)',
    }),
    position: arg(
      category.appearance,
      'Onde o filho está no grupo: decide o traço acima e abaixo do ícone',
      "'standalone' | 'first' | 'middle' | 'last'",
      "'standalone'",
      { control: 'inline-radio', options: [...positions] }
    ),
    ...densityArgType(),
    ...stateArgTypes(),
    onClick: arg(
      category.interaction,
      'Chamado uma vez por toque na linha; não é chamado com `disabled` ou `loading` (só Child Action)',
      '(event: MouseEvent<HTMLButtonElement>) => void',
      undefined,
      { action: 'clicked' }
    ),
    ...blockArgTypes({ sizeDefault: "'sm'" }),
    ...classNameArgType(
      '<button> da linha (Child Action) / <div> raiz (Child Read Only)'
    ),
  },
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListChildAction>;

/** Playground — Child Action com todas as propriedades nos controles. */
export const Default: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) => (
    <div style={{ width: '360px' }}>
      <TransactionListChildAction {...args} />
    </div>
  ),
};

/** Matriz: posição na linha do tempo × tipo de filho (mantém o id `--timeline`). */
export const Timeline: Story = {
  name: 'Timeline',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['Child Action', 'Child Read Only']}
      rows={positions.map((position) => ({
        label: position,
        cells: [
          <TransactionListChildAction
            key="a"
            {...baseArgs}
            position={position}
          />,
          <TransactionListChildReadOnly
            key="r"
            {...baseArgs}
            position={position}
          />,
        ],
      }))}
    />
  ),
};

const stateRows = stateCases('ods-transaction-list--show-hover');

/** Matriz: estado × tipo de filho × densidade. */
export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['Child Action', 'Child Read Only', 'Child Action · compact']}
      rows={stateRows.map(([label, props]) => ({
        label,
        cells: [
          <TransactionListChildAction
            key="a"
            {...baseArgs}
            {...props}
            position="middle"
          />,
          <TransactionListChildReadOnly
            key="r"
            {...baseArgs}
            {...props}
            position="middle"
          />,
          <TransactionListChildAction
            key="c"
            {...baseArgs}
            {...props}
            position="middle"
            density="compact"
          />,
        ],
      }))}
    />
  ),
};

/** Matriz: cor do ícone (sem iconColor = Interface/Light/Down) × fundo. */
export const IconColors: Story = {
  name: 'Icon colors',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['Fundo branco', 'Status/Warning/Up']}
      rows={(
        [
          ['sem iconColor', {}],
          ['default', { iconColor: 'default' }],
          ['on-color', { iconColor: 'on-color' }],
          ['highlight', { iconColor: 'highlight' }],
          ['disabled', { iconColor: 'highlight', disabled: true }],
        ] as const
      ).map(([label, props]) => ({
        label,
        cells: [undefined, colorStatusWarningUp].map((background) => (
          <div key={background ?? 'white'} style={{ background }}>
            <TransactionListChildAction
              {...baseArgs}
              {...props}
              position="middle"
            />
          </div>
        )),
      }))}
    />
  ),
};
