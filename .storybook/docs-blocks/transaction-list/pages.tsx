import React, { ReactElement } from 'react';
import TransactionListReadOnly from '../../../packages/ocean-react/src/TransactionListReadOnly';
import TransactionListAction from '../../../packages/ocean-react/src/TransactionListAction';
import TransactionListSelectable from '../../../packages/ocean-react/src/TransactionListSelectable';
import TransactionListExpandable from '../../../packages/ocean-react/src/TransactionListExpandable';
import TransactionListChildAction from '../../../packages/ocean-react/src/TransactionListChildAction';
import TransactionListChildReadOnly from '../../../packages/ocean-react/src/TransactionListChildReadOnly';
import type { ComponentDocConfig, ExampleSpec } from '../ComponentOverview';
import type { LocaleFiles } from '../i18n';
import { literal } from '../jsx';
import { ContentListAmount, ContentListDefault } from './block-previews';
import type {
  ContentListAmountProps,
  ContentListDefaultProps,
} from '../../../packages/ocean-react/src/_shared/components/TransactionListParts';
import {
  CHILD_POSITIONS,
  RowFixture,
  TAGS,
  childRows,
  expandableParent,
  handlers,
  menuActions,
  rows,
  selectableRows,
  statementRows,
  swipeActions,
} from './fixtures';
import {
  actionArgTypes,
  childActionArgTypes,
  childReadOnlyArgTypes,
  contentListAmountArgTypes,
  contentListDefaultArgTypes,
  expandableArgTypes,
  readOnlyArgTypes,
  selectableArgTypes,
} from './argTypes';
import * as snippets from './platform-snippets';
import readOnlyEn from '../locales/transaction-list-read-only.en.json';
import readOnlyPt from '../locales/transaction-list-read-only.pt.json';
import actionEn from '../locales/transaction-list-action.en.json';
import actionPt from '../locales/transaction-list-action.pt.json';
import selectableEn from '../locales/transaction-list-selectable.en.json';
import selectablePt from '../locales/transaction-list-selectable.pt.json';
import expandableEn from '../locales/transaction-list-expandable.en.json';
import expandablePt from '../locales/transaction-list-expandable.pt.json';
import childReadOnlyEn from '../locales/transaction-list-child-read-only.en.json';
import childReadOnlyPt from '../locales/transaction-list-child-read-only.pt.json';
import childActionEn from '../locales/transaction-list-child-action.en.json';
import childActionPt from '../locales/transaction-list-child-action.pt.json';
import contentDefaultEn from '../locales/content-list-default.en.json';
import contentDefaultPt from '../locales/content-list-default.pt.json';
import contentAmountEn from '../locales/content-list-amount.en.json';
import contentAmountPt from '../locales/content-list-amount.pt.json';
import tokensReadOnly from '../../assets/tokens/transaction-list-read-only.json';
import tokensAction from '../../assets/tokens/transaction-list-action.json';
import tokensSelectable from '../../assets/tokens/transaction-list-selectable.json';
import tokensExpandable from '../../assets/tokens/transaction-list-expandable.json';
import tokensChildReadOnly from '../../assets/tokens/transaction-list-child-read-only.json';
import tokensChildAction from '../../assets/tokens/transaction-list-child-action.json';
import tokensContentDefault from '../../assets/tokens/content-list-default.json';
import tokensContentAmount from '../../assets/tokens/content-list-amount.json';

/* Content of the component Overview pages: examples, snippets and data per component. */

type Row = (props: RowFixture & Record<string, unknown>) => ReactElement;

/** Rows of a group: the last one has no divider. */
const group = (
  render: Row,
  list: RowFixture[],
  extra: Record<string, unknown> = {}
) =>
  list.map((row, index) =>
    render({
      key: index,
      ...row,
      ...extra,
      showDivider: index === list.length - 1 ? false : undefined,
    })
  );

const one = (
  render: Row,
  row: RowFixture,
  extra: Record<string, unknown> = {}
): ExampleSpec => ({
  rows: [render({ ...row, ...extra, showDivider: false })],
});

const locale = (en: object, pt: object): LocaleFiles => ({
  en: en as LocaleFiles['en'],
  pt: pt as LocaleFiles['pt'],
});

/** Density, icon color, states and divider examples of an item. */
const rowOptions = (render: Row, sample: RowFixture[], icon = true) => ({
  density: { rows: group(render, sample.slice(0, 2), { density: 'compact' }) },
  ...(icon
    ? { iconColor: one(render, sample[0], { iconColor: 'highlight' }) }
    : {}),
  states: {
    rows: [
      render({ key: 'loading', ...sample[0], loading: true }),
      render({
        key: 'disabled',
        ...sample[1],
        disabled: true,
        showDivider: false,
      }),
    ],
  },
  divider: { rows: group(render, sample.slice(0, 2)) },
});

const SRC = 'packages/ocean-react/src/';

/* ----- Items ----- */

const readOnly: Row = (props) => <TransactionListReadOnly {...props} />;
export const readOnlyDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-list-read-only',
  title: 'Transaction List Read Only',
  kind: 'item',
  source: `${SRC}TransactionListReadOnly`,
  locale: locale(readOnlyEn, readOnlyPt),
  imports:
    "import { List, TransactionListReadOnly } from '@useblu/ocean-react';",
  primary: { rows: group(readOnly, statementRows) },
  sections: [{ key: 'default', example: one(readOnly, rows.supplierPayment) }],
  rowOptions: rowOptions(readOnly, statementRows),
  platforms: snippets.readOnly,
  argTypes: readOnlyArgTypes,
  tokens: tokensReadOnly,
};

const action: Row = (props) => <TransactionListAction {...props} />;
export const actionDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-list-action',
  title: 'Transaction List Action',
  kind: 'item',
  source: `${SRC}TransactionListAction`,
  locale: locale(actionEn, actionPt),
  imports: "import { List, TransactionListAction } from '@useblu/ocean-react';",
  primary: {
    rows: group(action, statementRows, { onClick: handlers.openDetails }),
  },
  sections: [
    {
      key: 'chevron',
      example: one(action, rows.supplierPayment, {
        onClick: handlers.openDetails,
      }),
    },
    {
      key: 'menu',
      example: one(action, rows.supplierPayment, {
        actionType: 'menu',
        menuActions,
        menuLabel: 'Actions for Payment to supplier',
      }),
    },
    {
      key: 'swipe',
      example: one(action, rows.bankTransfer, {
        actionType: 'swipe',
        menuActions: swipeActions,
      }),
    },
  ],
  rowOptions: rowOptions(action, statementRows),
  platforms: snippets.action,
  argTypes: actionArgTypes,
  tokens: tokensAction,
};

const selectable: Row = (props) => <TransactionListSelectable {...props} />;
const checkboxRows = selectableRows.map((row, index) => ({
  ...row,
  checkbox: {
    id: `receivable-${index}`,
    checked: index === 0,
    onChange: handlers.toggle,
  },
}));
export const selectableDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-list-selectable',
  title: 'Transaction List Selectable',
  kind: 'item',
  source: `${SRC}TransactionListSelectable`,
  locale: locale(selectableEn, selectablePt),
  imports:
    "import { List, TransactionListSelectable } from '@useblu/ocean-react';",
  primary: { rows: group(selectable, checkboxRows) },
  sections: [
    {
      key: 'checkbox',
      example: { rows: group(selectable, checkboxRows.slice(0, 2)) },
    },
    {
      key: 'radio',
      example: {
        rows: group(
          selectable,
          selectableRows.slice(0, 2).map((row, index) => ({
            ...row,
            radio: {
              id: `receivable-radio-${index}`,
              name: 'receivable',
              checked: index === 0,
              onChange: handlers.toggle,
            },
          }))
        ),
      },
    },
  ],
  rowOptions: rowOptions(selectable, checkboxRows, false),
  platforms: snippets.selectable,
  argTypes: selectableArgTypes,
  tokens: tokensSelectable,
};

const children = childRows.map((row, index) => (
  <TransactionListChildReadOnly
    key={index}
    {...row}
    position={CHILD_POSITIONS[index]}
  />
));
const expandable: Row = (props) => <TransactionListExpandable {...props} />;
const expandableBase = {
  ...expandableParent,
  supportingText: 'Fees already deducted',
  onToggle: handlers.setExpanded,
};
export const expandableDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-list-expandable',
  title: 'Transaction List Expandable',
  kind: 'item',
  source: `${SRC}TransactionListExpandable`,
  locale: locale(expandableEn, expandablePt),
  imports:
    "import {\n  TransactionListExpandable,\n  TransactionListChildReadOnly,\n} from '@useblu/ocean-react';",
  primary: {
    rows: [
      <TransactionListExpandable key="e" {...expandableBase} expanded>
        {children}
      </TransactionListExpandable>,
    ],
  },
  sections: [
    {
      key: 'collapsed',
      example: { rows: [expandable({ ...expandableBase, expanded: false })] },
    },
    {
      key: 'expanded',
      example: {
        rows: [
          <TransactionListExpandable key="e" {...expandableBase} expanded>
            {children}
          </TransactionListExpandable>,
        ],
      },
    },
  ],
  rowOptions: {
    density: { rows: [expandable({ ...expandableBase, density: 'compact' })] },
    iconColor: {
      rows: [expandable({ ...expandableBase, iconColor: 'highlight' })],
    },
    states: {
      rows: [
        expandable({ key: 'l', ...expandableBase, loading: true }),
        expandable({ key: 'd', ...expandableBase, disabled: true }),
      ],
    },
    divider: { rows: [expandable({ ...expandableBase, showDivider: true })] },
  },
  platforms: snippets.expandable,
  argTypes: expandableArgTypes,
  tokens: tokensExpandable,
};

const childGroup = (render: Row, extra: Record<string, unknown> = {}) =>
  childRows.map((row, index) =>
    render({ key: index, ...row, position: CHILD_POSITIONS[index], ...extra })
  );

const childOptions = (render: Row) => ({
  density: { rows: childGroup(render, { density: 'compact' }) },
  iconColor: {
    rows: [
      render({
        ...childRows[0],
        position: 'standalone',
        iconColor: 'highlight',
      }),
    ],
  },
  states: {
    rows: [
      render({ key: 'l', ...childRows[0], position: 'first', loading: true }),
      render({ key: 'd', ...childRows[1], position: 'last', disabled: true }),
    ],
  },
});

const childReadOnly: Row = (props) => (
  <TransactionListChildReadOnly {...props} />
);
export const childReadOnlyDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-list-child-read-only',
  title: 'Transaction List Child Read Only',
  kind: 'item',
  source: `${SRC}TransactionListChildReadOnly`,
  locale: locale(childReadOnlyEn, childReadOnlyPt),
  imports:
    "import { TransactionListChildReadOnly } from '@useblu/ocean-react';",
  primary: { rows: childGroup(childReadOnly) },
  sections: [{ key: 'timeline', example: { rows: childGroup(childReadOnly) } }],
  rowOptions: childOptions(childReadOnly),
  platforms: snippets.childReadOnly,
  argTypes: childReadOnlyArgTypes,
  tokens: tokensChildReadOnly,
};

const childAction: Row = (props) => (
  <TransactionListChildAction onClick={handlers.openDetails} {...props} />
);
export const childActionDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'transaction-list-child-action',
  title: 'Transaction List Child Action',
  kind: 'item',
  source: `${SRC}TransactionListChildAction`,
  locale: locale(childActionEn, childActionPt),
  imports: "import { TransactionListChildAction } from '@useblu/ocean-react';",
  primary: { rows: childGroup(childAction) },
  sections: [{ key: 'timeline', example: { rows: childGroup(childAction) } }],
  rowOptions: childOptions(childAction),
  platforms: snippets.childAction,
  argTypes: childActionArgTypes,
  tokens: tokensChildAction,
};

/* ----- Blocks ----- */

const blockExample = (
  prop: 'content' | 'amount',
  props: Record<string, unknown>
): ExampleSpec => ({
  plain: true,
  rows: [
    prop === 'content' ? (
      <ContentListDefault
        key="b"
        {...(props as unknown as ContentListDefaultProps)}
      />
    ) : (
      <ContentListAmount
        key="b"
        {...(props as unknown as ContentListAmountProps)}
      />
    ),
  ],
  code: `${prop}={${literal(props, 0)}}`,
});

export const contentDefaultDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'content-list-default',
  title: 'Content List Default',
  kind: 'block',
  source: `${SRC}_shared/components/ContentList`,
  locale: locale(contentDefaultEn, contentDefaultPt),
  imports:
    "import type { ContentListDefaultProps } from '@useblu/ocean-react';",
  primary: blockExample('content', rows.supplierPayment.content),
  sections: [
    {
      key: 'default',
      example: blockExample('content', rows.supplierPayment.content),
    },
    {
      key: 'strikethrough',
      example: blockExample('content', {
        title: 'Installment 3 of 10',
        description: 'Oct 20',
        strikethroughDescription: 'Oct 15',
        status: 'strikethrough',
      }),
    },
  ],
  options: [
    {
      key: 'inverted',
      example: blockExample('content', {
        ...rows.supplierPayment.content,
        inverted: false,
      }),
    },
    {
      key: 'status',
      example: blockExample('content', {
        ...rows.creditSales.content,
        status: 'positive',
      }),
    },
    {
      key: 'size',
      example: blockExample('content', {
        ...rows.supplierPayment.content,
        size: 'sm',
      }),
    },
  ],
  platforms: 'table',
  argTypes: contentListDefaultArgTypes,
  tokens: tokensContentDefault,
};

export const contentAmountDoc: Omit<ComponentDocConfig, 'story'> = {
  id: 'content-list-amount',
  title: 'Content List Amount',
  kind: 'block',
  source: `${SRC}_shared/components/AmountDetails`,
  locale: locale(contentAmountEn, contentAmountPt),
  imports: "import type { ContentListAmountProps } from '@useblu/ocean-react';",
  primary: blockExample('amount', {
    value: 'R$ 6.819,33',
    tag: TAGS.scheduled,
    info: 'Due Oct 15',
  }),
  sections: [
    {
      key: 'default',
      example: blockExample('amount', { value: 'R$ 6.819,33' }),
    },
    {
      key: 'positive',
      example: blockExample('amount', {
        value: 'R$ 7.899,01',
        type: 'positive',
      }),
    },
    {
      key: 'negative',
      example: blockExample('amount', {
        value: 'R$ 1.314,28',
        type: 'negative',
      }),
    },
    {
      key: 'strikethrough',
      example: blockExample('amount', rows.receivablesAdvance.amount),
    },
    {
      key: 'strikethroughNeutral',
      example: blockExample('amount', {
        value: 'R$ 6.819,33',
        type: 'strikethrough-neutral',
        strikethroughValue: 'R$ 7.120,00',
      }),
    },
    { key: 'withTag', example: blockExample('amount', rows.canceled.amount) },
  ],
  options: [
    {
      key: 'size',
      example: blockExample('amount', {
        value: 'R$ 1.314,28',
        tag: TAGS.scheduled,
        size: 'sm',
      }),
    },
  ],
  platforms: 'table',
  argTypes: contentListAmountArgTypes,
  tokens: tokensContentAmount,
};
