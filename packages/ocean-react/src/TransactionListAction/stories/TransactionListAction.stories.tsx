import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListAction from '../TransactionListAction';
import type { TransactionListActionProps } from '../TransactionListAction';
import TransactionListActionDocs, {
  AI_RULES,
} from './TransactionListAction.docs';
import { aiRulesText } from '../../../../../.storybook/docs-blocks';
import {
  arg,
  blockArgTypes,
  category,
  classNameArgType,
  densityArgType,
  dividerArgType,
  iconArgTypes,
  stateArgTypes,
} from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks/transaction-list/shared';

const icon = <PlaceholderOutline size={24} />;
const noSnapshot = { chromatic: { disableSnapshot: true } };
const noop = (): void => undefined;

const menuActions = [
  { label: 'Reenviar cobrança', onClick: noop },
  {
    label: 'Cancelar cobrança',
    onClick: noop,
    variant: 'negative' as const,
  },
];

const swipeActions = [
  {
    label: 'Reenviar',
    onClick: noop,
    icon,
    variant: 'neutral' as const,
  },
  {
    label: 'Cancelar',
    onClick: noop,
    icon,
    variant: 'negative' as const,
  },
];

const baseArgs: TransactionListActionProps = {
  title: 'PagBlu',
  description: 'Padaria São José',
  caption: 'Cobrança 10482',
  amount: 'R$ 15,00',
  amountTag: { label: 'Pago' },
  additionalData: '6x de R$ 2,50',
  icon,
};

const typeArgs = {
  chevron: { actionType: 'chevron' as const },
  menu: { actionType: 'menu' as const, menuActions },
  swipe: { actionType: 'swipe' as const, menuActions: swipeActions },
};

const meta: Meta<typeof TransactionListAction> = {
  title: 'Components/List/Transaction List Action',
  component: TransactionListAction,
  // "manifest": entra no manifesto de componentes (resumo = regras para IA).
  tags: ['autodocs', 'manifest'],
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: aiRulesText(AI_RULES) },
      page: () => (
        <TransactionListActionDocs
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          stories={{ Default, States, Sizes, MenuActive, SwipeActive }}
        />
      ),
    },
  },
  argTypes: {
    ...iconArgTypes(),
    ...densityArgType(),
    ...dividerArgType(),
    actionType: arg(
      category.appearance,
      'Ação à direita: seta para o detalhe, menu de ações ou deslizar para revelar ações',
      "'chevron' | 'menu' | 'swipe'",
      "'chevron'",
      { control: 'inline-radio', options: ['chevron', 'menu', 'swipe'] }
    ),
    menuActions: arg(
      category.appearance,
      'Ações do menu e do deslizar. Só tem efeito com `actionType` `menu` ou `swipe`',
      'ActionItem[]',
      '[]',
      { control: false }
    ),
    menuPosition: arg(
      category.appearance,
      'Lado em que o menu abre. Só tem efeito com `actionType="menu"`',
      "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'",
      "'bottom-right'",
      {
        control: 'select',
        options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      }
    ),
    ...stateArgTypes(),
    onClick: arg(
      category.interaction,
      'Chamado uma vez por toque na linha; não é chamado com `disabled` ou `loading`',
      '(event: MouseEvent<HTMLButtonElement>) => void',
      undefined,
      { action: 'clicked' }
    ),
    ...blockArgTypes({ sizeDefault: "'md'" }),
    ...classNameArgType('<button> da linha'),
  },
  args: { ...baseArgs, menuActions },
};

export default meta;

type Story = StoryObj<typeof TransactionListAction>;

const frame = (children: React.ReactNode) => (
  <div style={{ width: '360px' }}>{children}</div>
);

/** Playground — todas as propriedades nos controles. */
export const Default: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) => frame(<TransactionListAction {...args} />),
};

const states = [
  ['Padrão', {}],
  ['Hover', { className: 'ods-transaction-list--show-hover' }],
  ['Desabilitado', { disabled: true }],
  ['Carregando', { loading: true }],
] as const;

/** Matriz: tipo de ação × estado. */
export const States: Story = {
  name: 'Types × states',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['chevron', 'menu', 'swipe']}
      rows={states.map(([label, props]) => ({
        label,
        cells: (['chevron', 'menu', 'swipe'] as const).map((type) => (
          <TransactionListAction
            key={type}
            {...baseArgs}
            {...typeArgs[type]}
            {...props}
          />
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

/** Matriz: tipos de valor × tamanho. */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['md', 'sm']}
      rows={amountTypes.map(([amountType, props]) => ({
        label: amountType,
        cells: (['md', 'sm'] as const).map((size) => (
          <TransactionListAction
            key={size}
            {...baseArgs}
            {...props}
            amountType={amountType}
            contentSize={size}
            amountSize={size}
          />
        )),
      }))}
    />
  ),
};

const openTrigger = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelector<HTMLButtonElement>('.ods-internal-list-actions__trigger')
    ?.click();
};

/** Interativo: menu aberto (Figma State=Active). */
export const MenuActive: Story = {
  name: 'Menu: Active',
  parameters: { ...noSnapshot, controls: { disable: true } },
  render: () =>
    frame(
      <div style={{ paddingBottom: '120px' }}>
        <TransactionListAction {...baseArgs} {...typeArgs.menu} />
      </div>
    ),
  play: openTrigger,
};

/** Interativo: ações reveladas pelo deslizar (Figma State=Active). */
export const SwipeActive: Story = {
  name: 'Swipe: Active',
  parameters: { ...noSnapshot, controls: { disable: true } },
  render: () =>
    frame(<TransactionListAction {...baseArgs} {...typeArgs.swipe} />),
  play: openTrigger,
};

/** Interativo: contador de toques (um onClick por toque; nenhum desabilitado). */
const ClickCounter = () => {
  const [clicks, setClicks] = useState(0);
  return frame(
    <>
      <TransactionListAction
        {...baseArgs}
        onClick={() => setClicks((count) => count + 1)}
      />
      <TransactionListAction
        {...baseArgs}
        disabled
        onClick={() => setClicks((count) => count + 1)}
      />
      <p className="ods-typography ods-typography__caption">Toques: {clicks}</p>
    </>
  );
};

export const Clicks: Story = {
  name: 'Click counter',
  parameters: { ...noSnapshot, controls: { disable: true } },
  render: () => <ClickCounter />,
};
