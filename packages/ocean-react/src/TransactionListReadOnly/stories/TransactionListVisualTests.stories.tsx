/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TransactionListReadOnly from '../TransactionListReadOnly';
import TransactionListAction from '../../TransactionListAction';
import TransactionListSelectable from '../../TransactionListSelectable';
import TransactionListExpandable from '../../TransactionListExpandable';
import TransactionListChildAction from '../../TransactionListChildAction';
import TransactionListChildReadOnly from '../../TransactionListChildReadOnly';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { Screen } from '../../../../../.storybook/docs-blocks/doc-parts';
import {
  ContentListAmount,
  ContentListDefault,
} from '../../../../../.storybook/docs-blocks/transaction-list/block-previews';
import {
  AMOUNT_TYPE_CASES,
  CHILD_POSITIONS,
  RowFixture,
  TAGS,
  childRows,
  expandableParent,
  menuActions,
  rows,
  selectableRows,
  swipeActions,
} from '../../../../../.storybook/docs-blocks/transaction-list/fixtures';
import { STATUS } from '../../../../../.storybook/docs-blocks/transaction-list/argTypes';

/*
 * Chromatic matrices: every state × density × size (and the variant-specific axes) of each
 * component. No controls; the component stories hold the interactive examples.
 */

const meta: Meta = {
  title: 'Visual tests/Transaction List',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
};

export default meta;

type Story = StoryObj;
type Props = Record<string, unknown>;
type Render = (props: Props) => ReactNode;

const sized = (row: RowFixture, size: 'md' | 'sm'): RowFixture => ({
  ...row,
  content: { ...row.content, size },
  amount: { ...row.amount, size },
});

const cell = (node: ReactNode) => <Screen>{node}</Screen>;

const LAYOUTS = [
  ['md · default', 'md', 'default'],
  ['sm · default', 'sm', 'default'],
  ['md · compact', 'md', 'compact'],
  ['sm · compact', 'sm', 'compact'],
] as const;

const stateCases = (hover?: string): [string, Props][] => [
  ['Default', {}],
  ...(hover ? [['Hover', { className: hover }] as [string, Props]] : []),
  ['Disabled', { disabled: true }],
  ['Loading', { loading: true }],
];

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="odoc-visual">
    <h2 className="odoc-visual__title">{title}</h2>
    {children}
  </section>
);

/** States × size × density. */
const StatesMatrix = ({
  render,
  row,
  hover,
}: {
  render: Render;
  row: RowFixture;
  hover?: string;
}) => (
  <MatrixGrid
    columns={LAYOUTS.map(([label]) => label)}
    rows={stateCases(hover).map(([label, props]) => ({
      label,
      cells: LAYOUTS.map(([, size, density]) =>
        cell(
          render({ ...sized(row, size), ...props, density, showDivider: false })
        )
      ),
    }))}
  />
);

/** Amount types × size. */
const AmountMatrix = ({ render, row }: { render: Render; row: RowFixture }) => (
  <MatrixGrid
    columns={['md', 'sm']}
    rows={AMOUNT_TYPE_CASES.map(([type, amount]) => ({
      label: type,
      cells: (['md', 'sm'] as const).map((size) =>
        cell(
          render({
            ...sized(row, size),
            amount: {
              ...row.amount,
              ...amount,
              type,
              size,
              tag: type === 'default' ? TAGS.scheduled : undefined,
            },
            showDivider: false,
          })
        )
      ),
    }))}
  />
);

/** Icon color × background (and disabled). */
const IconMatrix = ({ render, row }: { render: Render; row: RowFixture }) => (
  <MatrixGrid
    columns={['White', 'Warning up', 'Negative up']}
    rows={(
      [
        ['default', { iconColor: 'default' }],
        ['on-color', { iconColor: 'on-color' }],
        ['highlight', { iconColor: 'highlight' }],
        ['disabled', { iconColor: 'highlight', disabled: true }],
      ] as [string, Props][]
    ).map(([label, props]) => ({
      label,
      cells: ['', 'odoc-bg--warning', 'odoc-bg--negative'].map((background) => (
        <div key={background} className={background}>
          {render({ ...row, ...props, showDivider: false })}
        </div>
      )),
    }))}
  />
);

const FamilyMatrices = ({
  render,
  row,
  hover,
  icon = true,
}: {
  render: Render;
  row: RowFixture;
  hover?: string;
  icon?: boolean;
}) => (
  <>
    <Block title="States × size × density">
      <StatesMatrix render={render} row={row} hover={hover} />
    </Block>
    <Block title="Amount types × size">
      <AmountMatrix render={render} row={row} />
    </Block>
    {icon && (
      <Block title="Icon color × background">
        <IconMatrix render={render} row={row} />
      </Block>
    )}
  </>
);

const HOVER = 'ods-transaction-list--show-hover';

export const ReadOnly: Story = {
  name: 'Transaction List Read Only',
  render: () => (
    <FamilyMatrices
      render={(props) => <TransactionListReadOnly {...(props as any)} />}
      row={rows.bankTransfer}
    />
  ),
};

export const Action: Story = {
  name: 'Transaction List Action',
  render: () => (
    <>
      <FamilyMatrices
        render={(props) => <TransactionListAction {...(props as any)} />}
        row={rows.bankTransfer}
        hover={HOVER}
      />
      <Block title="Action type × state">
        <MatrixGrid
          columns={['chevron', 'menu', 'swipe']}
          rows={stateCases(HOVER).map(([label, props]) => ({
            label,
            cells: (['chevron', 'menu', 'swipe'] as const).map((actionType) =>
              cell(
                <TransactionListAction
                  {...rows.supplierPayment}
                  {...props}
                  actionType={actionType}
                  menuActions={
                    actionType === 'swipe' ? swipeActions : menuActions
                  }
                  showDivider={false}
                />
              )
            ),
          }))}
        />
      </Block>
    </>
  ),
};

const selectionStates: [string, (c: 'checkbox' | 'radio') => Props | null][] = [
  ['Default', (c) => ({ [c]: { readOnly: true } })],
  ['Hover', (c) => ({ [c]: { readOnly: true }, className: HOVER })],
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
    'Disabled selected',
    (c) => ({ [c]: { checked: true, readOnly: true }, disabled: true }),
  ],
  ['Error', (c) => ({ [c]: { error: true, readOnly: true } })],
  ['Loading', (c) => ({ [c]: {}, loading: true })],
];

export const Selectable: Story = {
  name: 'Transaction List Selectable',
  render: () => (
    <>
      <FamilyMatrices
        render={(props) => (
          <TransactionListSelectable
            checkbox={{ readOnly: true }}
            {...(props as any)}
          />
        )}
        row={selectableRows[0]}
        hover={HOVER}
        icon={false}
      />
      <Block title="Selection state × control × platform">
        <MatrixGrid
          columns={[
            'checkbox · web',
            'checkbox · app',
            'radio · web',
            'radio · app',
          ]}
          rows={selectionStates.map(([label, fn]) => ({
            label,
            cells: (
              [
                ['checkbox', 'web'],
                ['checkbox', 'app'],
                ['radio', 'web'],
                ['radio', 'app'],
              ] as const
            ).map(([control, platform]) => {
              const props = fn(control);
              return props ? (
                cell(
                  <TransactionListSelectable
                    {...selectableRows[0]}
                    {...(props as any)}
                    platform={platform}
                    showDivider={false}
                  />
                )
              ) : (
                <span />
              );
            }),
          }))}
        />
      </Block>
    </>
  ),
};

const expandableChildren = childRows.map((row, index) => (
  <TransactionListChildReadOnly
    key={row.content.title}
    {...row}
    position={CHILD_POSITIONS[index]}
  />
));

export const Expandable: Story = {
  name: 'Transaction List Expandable',
  render: () => (
    <>
      <FamilyMatrices
        render={(props) => <TransactionListExpandable {...(props as any)} />}
        row={expandableParent}
        hover="ods-list-expandable--show-hover"
      />
      <Block title="Collapsed / expanded × state">
        <MatrixGrid
          columns={['Collapsed', 'Expanded', 'Expanded, flat props']}
          rows={stateCases('ods-list-expandable--show-hover').map(
            ([label, props]) => ({
              label,
              cells: [
                cell(
                  <TransactionListExpandable {...expandableParent} {...props} />
                ),
                cell(
                  <TransactionListExpandable
                    {...expandableParent}
                    {...props}
                    supportingText="Fees already deducted"
                    expanded
                  >
                    {expandableChildren}
                  </TransactionListExpandable>
                ),
                cell(
                  <TransactionListExpandable
                    title="Sales received"
                    description="Credit card"
                    caption="Oct 8"
                    amount="R$ 7.899,01"
                    amountType="positive"
                    additionalData="Net amount"
                    icon={expandableParent.icon}
                    {...props}
                    supportingText="Fees already deducted"
                    expanded
                  >
                    {expandableChildren}
                  </TransactionListExpandable>
                ),
              ],
            })
          )}
        />
      </Block>
    </>
  ),
};

const childMatrices = (
  Child: typeof TransactionListChildAction | typeof TransactionListChildReadOnly
) => (
  <>
    <FamilyMatrices
      render={(props) => <Child position="middle" {...(props as any)} />}
      row={childRows[1]}
      hover={Child === TransactionListChildAction ? HOVER : undefined}
    />
    <Block title="Timeline position">
      <MatrixGrid
        columns={['Item']}
        rows={(['standalone', 'first', 'middle', 'last'] as const).map(
          (position) => ({
            label: position,
            cells: [cell(<Child {...childRows[1]} position={position} />)],
          })
        )}
      />
    </Block>
  </>
);

export const ChildReadOnly: Story = {
  name: 'Transaction List Child Read Only',
  render: () => childMatrices(TransactionListChildReadOnly),
};

export const ChildAction: Story = {
  name: 'Transaction List Child Action',
  render: () => childMatrices(TransactionListChildAction),
};

const blockCell = (node: ReactNode) => (
  <div className="odoc-frame--block">{node}</div>
);

export const ContentDefault: Story = {
  name: 'Content List Default',
  render: () => (
    <Block title="Status × size × inverted">
      <MatrixGrid
        columns={['md', 'sm', 'md · not inverted', 'sm · not inverted']}
        rows={STATUS.map((status) => ({
          label: status,
          cells: (
            [
              ['md', true],
              ['sm', true],
              ['md', false],
              ['sm', false],
            ] as const
          ).map(([size, inverted]) =>
            blockCell(
              <ContentListDefault
                {...rows.supplierPayment.content}
                strikethroughDescription="Seashell Corporation"
                status={status as never}
                size={size}
                inverted={inverted}
              />
            )
          ),
        }))}
      />
    </Block>
  ),
};

export const ContentAmount: Story = {
  name: 'Content List Amount',
  render: () => (
    <>
      <Block title="Type × size">
        <MatrixGrid
          columns={['md', 'sm']}
          rows={AMOUNT_TYPE_CASES.map(([type, amount]) => ({
            label: type,
            cells: (['md', 'sm'] as const).map((size) =>
              blockCell(
                <ContentListAmount
                  value=""
                  {...amount}
                  type={type}
                  size={size}
                  info="Advance fee"
                />
              )
            ),
          }))}
        />
      </Block>
      <Block title="Tag × size">
        <MatrixGrid
          columns={['md', 'sm']}
          rows={Object.values(TAGS).map((tag) => ({
            label: tag.label,
            cells: (['md', 'sm'] as const).map((size) =>
              blockCell(
                <ContentListAmount value="R$ 1.314,28" tag={tag} size={size} />
              )
            ),
          }))}
        />
      </Block>
    </>
  ),
};
