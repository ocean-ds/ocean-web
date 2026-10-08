import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TransactionListSelectable from '../TransactionListSelectable';
import type { TransactionListSelectableProps } from '../TransactionListSelectable';
import docsJson from './TransactionListSelectable.docs.json';
import { familyDocs } from '../../../../../.storybook/docs-blocks/transaction-list/FamilyDocsPage';
import { aiRulesText } from '../../../../../.storybook/docs-blocks';
import {
  arg,
  blockArgTypes,
  category,
  classNameArgType,
  densityArgType,
  dividerArgType,
  stateArgTypes,
} from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';
import {
  MatrixGrid,
  SizesMatrix,
} from '../../../../../.storybook/docs-blocks/transaction-list/shared';

const docs = familyDocs(docsJson);
const noSnapshot = { chromatic: { disableSnapshot: true } };

const baseArgs: TransactionListSelectableProps = {
  title: 'Loja Centro',
  description: 'CNPJ 12.345.678/0001-90',
  caption: 'Conta digital',
  amount: 'R$ 1.250,00',
  additionalData: 'Saldo disponível',
};

type Controller = 'checkbox' | 'radio';
type Platform = 'web' | 'app';

/** Estado do Figma → props (Indeterminate só na caixa). */
const stateProps: [
  string,
  (c: Controller) => Partial<TransactionListSelectableProps> | null
][] = [
  ['Default', (c) => ({ [c]: { readOnly: true } })],
  [
    'Hover',
    (c) => ({
      [c]: { readOnly: true },
      className: 'ods-transaction-list--show-hover',
    }),
  ],
  [
    'Indeterminate',
    (c) =>
      c === 'checkbox'
        ? { checkbox: { indeterminate: true, checked: true, readOnly: true } }
        : null,
  ],
  ['Selected', (c) => ({ [c]: { checked: true, readOnly: true } })],
  ['Disabled', (c) => ({ [c]: { readOnly: true }, disabled: true })],
  [
    'Disabled Selected',
    (c) => ({ [c]: { checked: true, readOnly: true }, disabled: true }),
  ],
  ['Error', (c) => ({ [c]: { error: true, readOnly: true } })],
  ['Loading', (c) => ({ [c]: {}, loading: true })],
];

const meta: Meta<typeof TransactionListSelectable> = {
  title: 'Components/List/Transaction List Selectable',
  component: TransactionListSelectable,
  // "manifest": entra no manifesto de componentes (resumo = regras para IA).
  tags: ['autodocs', 'manifest'],
  parameters: {
    layout: 'centered',
    docs: {
      description: { component: aiRulesText(docs.aiRules) },
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      page: docs.page(() => ({ Default, StatesCheckbox, StatesRadio, Sizes })),
    },
  },
  argTypes: {
    checkbox: arg(
      category.content,
      'Caixa de marcar (controle padrão): `checked`, `onChange`, `indeterminate`, `error` e `id` vão aqui',
      'CheckboxProps'
    ),
    radio: arg(
      category.content,
      'Opção única; quando passada, substitui a caixa. `name` igual em todo o grupo',
      'RadioProps'
    ),
    platform: arg(
      category.appearance,
      'Lado do controle: `web` à esquerda (portal), `app` à direita (web mobile e app)',
      "'web' | 'app'",
      "'web'",
      { control: 'inline-radio', options: ['web', 'app'] }
    ),
    ...densityArgType(),
    ...dividerArgType(),
    ...stateArgTypes(),
    ...blockArgTypes({ sizeDefault: "'md'" }),
    ...classNameArgType('<div> raiz'),
  },
  args: baseArgs,
};

export default meta;

type Story = StoryObj<typeof TransactionListSelectable>;

const CheckboxPlayground = (props: Partial<TransactionListSelectableProps>) => {
  const { checkbox } = props;
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ width: '360px' }}>
      <TransactionListSelectable
        {...baseArgs}
        {...props}
        checkbox={{
          id: 'playground-checkbox',
          ...checkbox,
          checked,
          onChange: () => setChecked(!checked),
        }}
      />
    </div>
  );
};

/** Playground — todas as propriedades nos controles; marcar/desmarcar funciona. */
export const Default: Story = {
  name: 'Playground',
  parameters: noSnapshot,
  render: (args) =>
    args.radio ? (
      <div style={{ width: '360px' }}>
        <TransactionListSelectable {...args} />
      </div>
    ) : (
      <CheckboxPlayground {...args} />
    ),
};

const combos: Platform[] = ['web', 'app'];

const statesMatrix = (controller: Controller) => (
  <MatrixGrid
    columns={combos.map((platform) => `${controller} · ${platform}`)}
    rows={stateProps
      .filter(([, fn]) => fn(controller))
      .map(([label, fn]) => ({
        label,
        cells: combos.map((platform) => (
          <TransactionListSelectable
            key={platform}
            {...baseArgs}
            platform={platform}
            {...(fn(controller) as Partial<TransactionListSelectableProps>)}
          />
        )),
      }))}
  />
);

/** Matriz: estados do Figma × plataforma, com caixa de marcar. */
export const StatesCheckbox: Story = {
  name: 'States · checkbox',
  parameters: { controls: { disable: true } },
  render: () => statesMatrix('checkbox'),
};

/** Matriz: estados do Figma × plataforma, com opção única. */
export const StatesRadio: Story = {
  name: 'States · radio',
  parameters: { controls: { disable: true } },
  render: () => statesMatrix('radio'),
};

/** Matriz: tipos de valor × tamanho e densidade. */
export const Sizes: Story = {
  name: 'Sizes × amount types',
  parameters: { controls: { disable: true } },
  render: () => (
    <SizesMatrix
      compactSm
      render={(props) => <TransactionListSelectable {...baseArgs} {...props} />}
    />
  ),
};
