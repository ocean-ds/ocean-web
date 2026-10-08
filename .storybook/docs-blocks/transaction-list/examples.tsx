import React, { ReactNode, useState } from 'react';
import TransactionListReadOnly from '../../../packages/ocean-react/src/TransactionListReadOnly';
import TransactionListAction from '../../../packages/ocean-react/src/TransactionListAction';
import TransactionListSelectable from '../../../packages/ocean-react/src/TransactionListSelectable';
import TransactionListExpandable from '../../../packages/ocean-react/src/TransactionListExpandable';
import TransactionListChildAction from '../../../packages/ocean-react/src/TransactionListChildAction';
import TransactionListChildReadOnly from '../../../packages/ocean-react/src/TransactionListChildReadOnly';
import { MatrixGrid } from '../blocks';
import {
  AMOUNT_TYPE_CASES,
  CHILD_POSITIONS,
  RowFixture,
  childRows,
  expandableParent,
  menuActions,
  overviewRows,
  selectableRows,
  swipeActions,
} from './fixtures';

/* Live renders shared by the docs page and the stories. */

type RowComponent = (props: RowFixture & Record<string, unknown>) => ReactNode;

/** Rows of a group: divider on every row but the last. */
export const RowGroup = ({
  rows,
  render,
}: {
  rows: RowFixture[];
  render: RowComponent;
}): React.ReactElement => (
  <>
    {rows.map((row, index) => (
      <React.Fragment key={`${row.title}-${row.description}`}>
        {render({ ...row, showDivider: index < rows.length - 1 })}
      </React.Fragment>
    ))}
  </>
);

export const readOnly: RowComponent = (props) => (
  <TransactionListReadOnly {...props} />
);
export const action: RowComponent = (props) => (
  <TransactionListAction {...props} />
);

export const actionTypeProps = {
  chevron: { actionType: 'chevron' as const },
  menu: { actionType: 'menu' as const, menuActions },
  swipe: { actionType: 'swipe' as const, menuActions: swipeActions },
};

export const OverviewList = (): React.ReactElement => (
  <RowGroup rows={overviewRows} render={action} />
);

/** Checkbox list with working selection. */
export const SelectableList = ({
  radio = false,
}: {
  radio?: boolean;
}): React.ReactElement => {
  const [selected, setSelected] = useState<string[]>([
    selectableRows[0].description as string,
  ]);
  const toggle = (name: string) =>
    setSelected((current) => {
      if (radio) return [name];
      return current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name];
    });
  return (
    <>
      {selectableRows.map((row, index) => {
        const name = row.description as string;
        const control = {
          id: `${radio ? 'radio' : 'checkbox'}-${index}`,
          checked: selected.includes(name),
          onChange: () => toggle(name),
        };
        return (
          <TransactionListSelectable
            key={name}
            {...row}
            showDivider={index < selectableRows.length - 1}
            {...(radio
              ? { radio: { ...control, name: 'retailer' } }
              : { checkbox: control })}
          />
        );
      })}
    </>
  );
};

export const childItems = (
  Child: typeof TransactionListChildAction | typeof TransactionListChildReadOnly
): ReactNode =>
  childRows.map((row, index) => (
    <Child key={row.title} {...row} position={CHILD_POSITIONS[index]} />
  ));

/** Expandable row with child items; opens and closes on click. */
export const ExpandableExample = ({
  initial = true,
  ...props
}: Partial<RowFixture> & {
  initial?: boolean;
  supportingText?: ReactNode;
}): React.ReactElement => {
  const [expanded, setExpanded] = useState(initial);
  return (
    <TransactionListExpandable
      {...expandableParent}
      supportingText="Fees already deducted"
      {...props}
      expanded={expanded}
      onToggle={setExpanded}
    >
      {childItems(TransactionListChildReadOnly)}
    </TransactionListExpandable>
  );
};

/** Story matrix: amount types × size. */
export const SizesMatrix = ({
  render,
  compactSm = false,
}: {
  render: (props: Record<string, unknown>) => ReactNode;
  compactSm?: boolean;
}): React.ReactElement => (
  <MatrixGrid
    columns={compactSm ? ['md · default', 'sm · compact'] : ['md', 'sm']}
    rows={AMOUNT_TYPE_CASES.map(([amountType, props]) => ({
      label: amountType,
      cells: (['md', 'sm'] as const).map((size) => (
        <React.Fragment key={size}>
          {render({
            ...props,
            amountType,
            contentSize: size,
            amountSize: size,
            ...(compactSm && size === 'sm' ? { density: 'compact' } : {}),
          })}
        </React.Fragment>
      )),
    }))}
  />
);

/** Story matrix rows: the four visual states (hover is simulated with a class). */
export const stateCases = (
  hoverClassName: string
): readonly (readonly [string, Record<string, unknown>])[] => [
  ['Default', {}],
  ['Hover', { className: hoverClassName }],
  ['Disabled', { disabled: true }],
  ['Loading', { loading: true }],
];
