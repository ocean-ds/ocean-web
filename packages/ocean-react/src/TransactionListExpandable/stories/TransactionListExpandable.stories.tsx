import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Placeholder, PlaceholderOutline } from '@useblu/ocean-icons-react';
import TransactionListExpandable, {
  TransactionListExpandableProps,
} from '../TransactionListExpandable';
import Tag from '../../Tag';
import ListAction from '../../ListAction';
import TransactionListChildAction from '../../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import TransactionListExpandableDocs, {
  AI_RULES,
} from './TransactionListExpandable.docs';
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
import { MatrixGrid } from '../../../../../.storybook/docs-blocks/transaction-list/shared';

const noSnapshot = { chromatic: { disableSnapshot: true } };

/** Linha principal no formato da família (props opt-in de tamanho). */
const familyArgs: TransactionListExpandableProps = {
  title: 'Maquininha Blu',
  description: 'Crédito Mastercard',
  caption: '12 de novembro',
  amount: 'R$ 850,00',
  amountType: 'positive',
  amountTag: { label: 'Agendado', type: 'warning' },
  additionalData: 'Líquido a receber',
  contentSize: 'md',
  amountSize: 'md',
  icon: <PlaceholderOutline size={24} />,
  showDivider: true,
  supportingText: 'Valores líquidos de taxas',
};

const childIcon = <Placeholder size={16} />;

const familyChildren = (
  <>
    <TransactionListChildAction
      title="Agenda gerada"
      description="Bruto"
      amount="R$ 1.000,00"
      icon={childIcon}
      position="first"
    />
    <TransactionListChildAction
      title="Agenda antecipada"
      description="Antecipação"
      amount="R$ 100,00"
      amountType="negative"
      icon={childIcon}
      position="middle"
    />
    <TransactionListChildReadOnly
      title="Agenda em trava bancária"
      description="Banco Exemplo"
      amount="R$ 50,00"
      amountType="negative"
      icon={childIcon}
      position="last"
    />
  </>
);

/** Filhos legados (ListAction) — como o extrato e a OriginSection montam hoje. */
const legacyChildren = (
  <>
    <ListAction
      title="Title"
      description="Description"
      type="text"
      inverted
      position="first"
      icon={childIcon}
      amountDetails={{ amount: 'R$ 0,00', additionalData: 'Additional data' }}
    />
    <ListAction
      title="Title"
      description="Description"
      type="text"
      inverted
      position="last"
      icon={childIcon}
      amountDetails={{ amount: 'R$ 0,00', additionalData: 'Additional data' }}
    />
  </>
);

const meta: Meta<typeof TransactionListExpandable> = {
  title: 'Components/List/TransactionListExpandable',
  component: TransactionListExpandable,
  // "manifest": entra no manifesto de componentes (resumo = regras para IA).
  tags: ['autodocs', 'manifest'],
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: aiRulesText(AI_RULES) },
      page: () => (
        <TransactionListExpandableDocs
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          stories={{ Usage, States, AmountTypes, WithFamilyChildren }}
        />
      ),
    },
  },
  argTypes: {
    ...iconArgTypes({ iconColorDefault: '— (cor atual)' }),
    children: arg(
      category.content,
      'Itens filhos mostrados com a linha aberta: TransactionListChildAction / TransactionListChildReadOnly com `position`',
      'ReactNode',
      undefined,
      { control: false }
    ),
    supportingText: arg(
      category.content,
      'Texto de apoio abaixo dos filhos, com a linha aberta',
      'ReactNode'
    ),
    type: arg(
      category.appearance,
      'Container: `card` com destaque individual, `text` para lista contínua (extrato)',
      "'card' | 'text'",
      "'card'",
      { control: 'inline-radio', options: ['card', 'text'] }
    ),
    ...densityArgType(),
    showDivider: arg(
      category.appearance,
      'Divisor abaixo do item; aberta, abaixo do conteúdo expandido (nunca entre a linha e os filhos)',
      'boolean',
      'false'
    ),
    expanded: arg(
      category.state,
      'Linha aberta, com os filhos e o rodapé. Controlado: passe junto com `onToggle`',
      'boolean',
      'false'
    ),
    ...stateArgTypes(),
    onToggle: arg(
      category.interaction,
      'Chamado no toque com o próximo estado (`true` = abrir)',
      '(expanded: boolean) => void',
      undefined,
      { action: 'toggled' }
    ),
    ...blockArgTypes({ sizeDefault: '— (opt-in; passe md)' }),
    ...classNameArgType('<div> raiz'),
  },
  args: familyArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListExpandable>;

const ExpandableWithState = (props: TransactionListExpandableProps) => {
  const { expanded: initial = true } = props;
  const [expanded, setExpanded] = React.useState(initial);
  return (
    <div style={{ width: '360px' }}>
      <TransactionListExpandable
        {...props}
        expanded={expanded}
        onToggle={setExpanded}
      >
        {familyChildren}
      </TransactionListExpandable>
    </div>
  );
};

/** Playground — todas as propriedades nos controles; abre e fecha no toque. */
export const Usage: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) => <ExpandableWithState {...args} />,
};

const stateRows = [
  ['Padrão', {}],
  ['Hover', { className: 'ods-list-expandable--show-hover' }],
  ['Desabilitado', { disabled: true }],
  ['Carregando', { loading: true }],
] as const;

/** Matriz: fechada/aberta/legado × estado (o legado cobre as telas no ar). */
export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['Fechada', 'Aberta', 'Legado (sem props novas), aberta']}
      rows={stateRows.map(([label, props]) => ({
        label,
        cells: [
          <TransactionListExpandable key="closed" {...familyArgs} {...props} />,
          <TransactionListExpandable
            key="open"
            {...familyArgs}
            {...props}
            expanded
          >
            {familyChildren}
          </TransactionListExpandable>,
          <TransactionListExpandable
            key="legacy"
            title="Title"
            description="Description"
            caption="Caption"
            amount="R$ 0,00"
            amountIndicator={
              <Tag type="positive" size="small" setIconOff>
                Label
              </Tag>
            }
            additionalData="Additional data"
            icon={<PlaceholderOutline size={24} />}
            supportingText="Supporting text"
            expanded
            {...props}
          >
            {legacyChildren}
          </TransactionListExpandable>,
        ],
      }))}
    />
  ),
};

/** Mantido para a página do Docusaurus (embed `--state-loading`). */
export const StateLoading: Story = {
  name: 'Loading',
  parameters: { ...noSnapshot, controls: { disable: true } },
  render: () => (
    <div style={{ width: '360px' }}>
      <TransactionListExpandable {...familyArgs} loading />
    </div>
  ),
};

/** Matriz: tipos de valor × tamanho e densidade. */
export const AmountTypes: Story = {
  name: 'Sizes × amount types',
  parameters: { controls: { disable: true } },
  render: () => (
    <MatrixGrid
      columns={['md · default', 'sm · compact']}
      rows={(
        [
          ['default', {}],
          ['positive', {}],
          ['negative', {}],
          ['strikethrough', { amount: 'Grátis', strikethroughAmount: '3,99%' }],
        ] as const
      ).map(([amountType, props]) => ({
        label: amountType,
        cells: [
          <TransactionListExpandable
            key="md"
            {...familyArgs}
            {...props}
            amountType={amountType}
          />,
          <TransactionListExpandable
            key="sm"
            {...familyArgs}
            {...props}
            amountType={amountType}
            contentSize="sm"
            amountSize="sm"
            density="compact"
          />,
        ],
      }))}
    />
  ),
};

/** Interativo: abre e fecha com os filhos da família. */
export const WithFamilyChildren: Story = {
  name: 'With Transaction List children',
  parameters: { ...noSnapshot, controls: { disable: true } },
  render: () => <ExpandableWithState {...familyArgs} expanded={false} />,
};
