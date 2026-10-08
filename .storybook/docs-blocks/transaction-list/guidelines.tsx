import React from 'react';
import TransactionListReadOnly from '../../../packages/ocean-react/src/TransactionListReadOnly';
import TransactionListAction from '../../../packages/ocean-react/src/TransactionListAction';
import TransactionListChildAction from '../../../packages/ocean-react/src/TransactionListChildAction';
import TransactionListChildReadOnly from '../../../packages/ocean-react/src/TransactionListChildReadOnly';
import Link from '../../../packages/ocean-react/src/Link';
import {
  Anatomy,
  DoDont,
  DocTable,
  Section,
  Stage,
  Subsection,
  c,
} from '../blocks';
import { AMOUNT_TYPE_CASES, rows } from './fixtures';
import {
  ExpandableExample,
  OverviewList,
  RowGroup,
  SelectableList,
  action,
  actionTypeProps,
  childItems,
  readOnly,
} from './examples';

export const GUIDELINES_SECTIONS = [
  'Overview',
  'Formatting',
  'Content',
  'Behaviors',
  'Variants',
  'Related',
  'Feedback',
];

const storyLink = (path: string, label: string) => (
  <Link href={`./?path=/${path}`} target="_top" icon="linkChevron">
    {label}
  </Link>
);

const VARIANT_ROWS = [
  [
    'Read only',
    'Shows a transaction that has no action, such as a statement line.',
  ],
  [
    'Action',
    'Opens details or offers actions through a chevron, an overflow menu or a swipe.',
  ],
  [
    'Selectable',
    'Lets people pick one or more transactions with a checkbox or a radio.',
  ],
  [
    'Expandable',
    'Reveals the items that compose a total, such as gross amount and fees.',
  ],
  ['Child read only', 'One item inside an expandable row, on a timeline.'],
  ['Child action', 'A child item that opens its own details.'],
];

const ANATOMY_ROWS: [string, string, string][] = [
  ['Icon', 'No', 'Category of the movement, 24px. Follows `iconColor`.'],
  ['Title', 'Yes', 'What happened, such as "Supplier payment".'],
  ['Description', 'No', 'Who it relates to. Emphasized line by default.'],
  ['Caption', 'No', 'Date and time, or due date.'],
  ['Amount', 'Yes', 'Formatted value; the type adds sign and color.'],
  ['Tag', 'No', 'Status of the transaction: Paid, Scheduled, Canceled.'],
  ['Additional data', 'No', 'One short fact about the amount.'],
  ['Divider', 'No', 'Inset hairline between rows; off on the last row.'],
];

const md = (text: string) =>
  text.split('`').map((part, index) =>
    // eslint-disable-next-line react/no-array-index-key
    index % 2 ? <code key={index}>{part}</code> : part
  );

const Overview = () => (
  <Section title="Overview">
    <p>
      A transaction list shows money movements, such as payments, sales,
      transfers and fees, as rows that pair what happened with how much. Every
      row has a content block on the left and an amount block on the right. The
      family shares this structure and adds the behavior each context needs.
    </p>
    <Stage frames={[{ content: <OverviewList /> }]} />
    <div className="odoc-columns">
      <div className="odoc-prose">
        <h4>When to use</h4>
        <ul>
          <li>Statements, receipts and payment histories.</li>
          <li>Lists of receivables, installments and scheduled payments.</li>
          <li>Choosing which transactions to pay, advance or export.</li>
          <li>Breaking a total down into its parts.</li>
        </ul>
      </div>
      <div className="odoc-prose">
        <h4>When not to use</h4>
        <ul>
          <li>Rows without an amount: use List.</li>
          <li>Settings and navigation menus: use List.</li>
          <li>Comparing many columns of data: use a table.</li>
          <li>A single balance or total on its own: use a card.</li>
        </ul>
      </div>
    </div>
    <Subsection title="Variants">
      <DocTable columns={['Variant', 'Purpose']} rows={VARIANT_ROWS} />
    </Subsection>
  </Section>
);

const Formatting = () => (
  <Section title="Formatting">
    <Subsection title="Anatomy">
      <Anatomy
        example={
          <TransactionListReadOnly
            {...rows.pixReceived}
            additionalData="Available balance"
          />
        }
        parts={[
          { selector: '.ods-transaction-list__icon', side: 'left' },
          {
            selector: '.ods-content-list > :nth-child(1)',
            side: 'top',
            anchor: 0.3,
          },
          {
            selector: '.ods-content-list > :nth-child(2)',
            side: 'top',
            anchor: 0.92,
          },
          { selector: '.ods-content-list > :nth-child(3)', side: 'bottom' },
          { selector: '.ods-amount-details__amount', side: 'right' },
          { selector: '.ods-tag', side: 'right' },
          { selector: '.ods-amount-details__caption', side: 'right' },
          { selector: '.ods-transaction-list__divider', side: 'left' },
        ]}
      />
      <DocTable
        columns={['#', 'Element', 'Required', 'Notes']}
        rows={ANATOMY_ROWS.map(([element, required, notes], index) => [
          index + 1,
          element,
          required,
          md(notes),
        ])}
      />
    </Subsection>
    <Subsection title="Sizes">
      <p>
        Content and amount have two sizes each, set independently with{' '}
        {c('contentSize')} and {c('amountSize')}. Use {c('md')} for top-level
        rows and {c('sm')} for dense lists and child items.
      </p>
      <Stage
        frames={(['md', 'sm'] as const).map((size) => ({
          label: `Size ${size}`,
          content: (
            <TransactionListReadOnly
              {...rows.supplierPayment}
              contentSize={size}
              amountSize={size}
              showDivider={false}
            />
          ),
        }))}
      />
    </Subsection>
    <Subsection title="Density">
      <p>
        {c('density="compact"')} reduces the vertical padding from 16px to 8px.
        Use it for long lists on large screens; keep the default on touch
        screens.
      </p>
      <Stage
        frames={(['default', 'compact'] as const).map((density) => ({
          label: density === 'default' ? 'Default' : 'Compact',
          content: (
            <RowGroup
              rows={[rows.supplierPayment, rows.saleReceived]}
              render={(props) => readOnly({ ...props, density })}
            />
          ),
        }))}
      />
    </Subsection>
    <Subsection title="Dividers">
      <p>
        Dividers separate rows of the same group. They are inset 16px and on by
        default; turn them off on the last row so the group edge does not double
        up with the container border.
      </p>
      <Stage
        frames={[
          {
            content: (
              <RowGroup
                rows={[rows.pixReceived, rows.boletoPaid, rows.installment]}
                render={readOnly}
              />
            ),
          },
        ]}
      />
    </Subsection>
  </Section>
);

const AMOUNT_TYPE_USE: Record<string, [string, string]> = {
  default: [
    'No sign, neutral',
    'Values that neither enter nor leave the account.',
  ],
  positive: [
    '+ sign, positive color',
    'Money in: sales, Pix received, refunds.',
  ],
  negative: ['− sign, neutral color', 'Money out: payments, fees, transfers.'],
  strikethrough: [
    'Original value struck, new value in positive color',
    'A discount or waived fee.',
  ],
  'strikethrough-neutral': [
    'Original value struck, new value neutral',
    'A changed value that is not a benefit.',
  ],
  inactive: ['Muted', 'Canceled or reverted movements.'],
};

const Content = () => (
  <Section title="Content">
    <Subsection title="Main elements">
      <ul>
        <li>
          <strong>Title</strong> names the movement in the product vocabulary:
          &quot;Supplier payment&quot;, &quot;Sale received&quot;,
          &quot;Installment 3 of 10&quot;.
        </li>
        <li>
          <strong>Description</strong> names the counterpart: the supplier, the
          retailer, the bank. One fact per line.
        </li>
        <li>
          <strong>Caption</strong> carries the date, with time when it helps
          (&quot;Nov 12, 9:15 AM&quot;) or the due date (&quot;Due Nov
          20&quot;).
        </li>
        <li>
          <strong>Amount</strong> is always formatted and unsigned (
          {c('R$ 1.250,00')}); {c('amountType')} adds the sign and the color.
        </li>
        <li>
          <strong>Tag</strong> states the status in one word: Paid, Scheduled,
          Canceled.
        </li>
      </ul>
    </Subsection>
    <Subsection title="Amount type">
      <DocTable
        columns={['Type', 'Appearance', 'Use for']}
        rows={AMOUNT_TYPE_CASES.map(([type]) => [
          c(type),
          ...AMOUNT_TYPE_USE[type],
        ])}
      />
      <Stage
        frames={[
          {
            content: (
              <RowGroup
                rows={[
                  rows.saleReceived,
                  rows.supplierPayment,
                  rows.receivablesAdvance,
                  { ...rows.canceled, amountType: 'inactive' },
                ]}
                render={readOnly}
              />
            ),
          },
        ]}
      />
    </Subsection>
    <Subsection title="Do and don't">
      <DoDont
        items={[
          {
            kind: 'do',
            example: (
              <TransactionListReadOnly
                {...rows.supplierPayment}
                showDivider={false}
              />
            ),
            text: 'Pass the amount unsigned and let the amount type add the sign.',
          },
          {
            kind: 'dont',
            example: (
              <TransactionListReadOnly
                {...rows.supplierPayment}
                amount="-R$ 1.250,00"
                amountType="default"
                showDivider={false}
              />
            ),
            text: 'Don’t type the sign into the amount; it skips the color and breaks alignment.',
          },
          {
            kind: 'do',
            example: (
              <TransactionListReadOnly {...rows.canceled} showDivider={false} />
            ),
            text: 'Show a canceled movement with the neutral Canceled tag.',
          },
          {
            kind: 'dont',
            example: (
              <TransactionListReadOnly
                {...rows.supplierPayment}
                description="Coral Distributors · Card ending 1234"
                showDivider={false}
              />
            ),
            text: 'Don’t join several facts in one line; keep one fact per line.',
          },
          {
            kind: 'caution',
            example: (
              <TransactionListReadOnly
                {...rows.receivablesAdvance}
                showDivider={false}
              />
            ),
            text: 'Use the strikethrough types only when the original value really changed, such as a waived fee.',
          },
          {
            kind: 'caution',
            example: (
              <TransactionListReadOnly
                {...rows.installment}
                iconColor="on-color"
                showDivider={false}
              />
            ),
            text: 'Use the on-color icon only on colored backgrounds; on white it reads as disabled.',
          },
        ]}
      />
    </Subsection>
  </Section>
);

const STATE_ROWS = [
  ['Default', 'The row is ready.', 'Full color content and amount.'],
  [
    'Hover',
    'Pointer over an interactive row.',
    'Light overlay over the whole row.',
  ],
  ['Pressed', 'Pointer down on an interactive row.', 'Stronger overlay.'],
  [
    'Focus',
    'Keyboard focus on an interactive row.',
    'Primary outline inside the row.',
  ],
  ['Loading', 'Data is on its way.', 'Skeleton in place of the content.'],
  [
    'Disabled',
    'The movement cannot be acted on.',
    'Muted content, neutral tag, no callbacks.',
  ],
];

const Behaviors = () => (
  <Section title="Behaviors">
    <Subsection title="States">
      <DocTable columns={['State', 'When', 'Appearance']} rows={STATE_ROWS} />
      <Stage
        frames={[
          ['Default', {}],
          ['Loading', { loading: true }],
          ['Disabled', { disabled: true }],
        ].map(([label, props]) => ({
          label: label as string,
          content: (
            <TransactionListAction
              {...rows.supplierPayment}
              {...(props as object)}
              showDivider={false}
            />
          ),
        }))}
      />
    </Subsection>
    <Subsection title="Interaction">
      <p>
        An Action row is a single target: a click anywhere on it calls{' '}
        {c('onClick')} once. With the overflow menu, the trigger opens the
        actions below it on the web; on iOS and Android the same actions open in
        a bottom sheet. Swipe reveals the actions in place on touch screens.
      </p>
      <Stage
        frames={(['chevron', 'menu', 'swipe'] as const).map((type) => ({
          label:
            type === 'chevron'
              ? 'Chevron'
              : `${type[0].toUpperCase()}${type.slice(1)}`,
          content: (
            <TransactionListAction
              {...rows.supplierPayment}
              {...actionTypeProps[type]}
              showDivider={false}
            />
          ),
        }))}
      />
    </Subsection>
  </Section>
);

const Variants = () => (
  <Section title="Variants">
    <Subsection title="Read only">
      <p>
        For rows people only read, such as a statement. No hover, no focus stop.
      </p>
      <Stage
        frames={[
          {
            content: (
              <RowGroup
                rows={[rows.pixReceived, rows.boletoPaid]}
                render={readOnly}
              />
            ),
          },
        ]}
      />
    </Subsection>
    <Subsection title="Action">
      <p>
        For rows that open something. Use the chevron to open details, the
        overflow menu for two or more actions, and swipe on touch screens.
      </p>
      <Stage
        frames={[
          {
            content: (
              <RowGroup
                rows={[rows.supplierPayment, rows.installment]}
                render={action}
              />
            ),
          },
        ]}
      />
    </Subsection>
    <Subsection title="Selectable">
      <p>
        For choosing transactions. Checkboxes allow several, radios one. The
        control sits on the left on the web and on the right in apps.
      </p>
      <Stage
        frames={[
          { label: 'Checkbox', content: <SelectableList /> },
          { label: 'Radio', content: <SelectableList radio /> },
        ]}
      />
    </Subsection>
    <Subsection title="Expandable">
      <p>
        For totals made of parts. The row toggles the child items; the
        supporting text closes the group.
      </p>
      <Stage frames={[{ content: <ExpandableExample /> }]} />
    </Subsection>
    <Subsection title="Child item">
      <p>
        Child items sit on a timeline inside an expandable row. Set{' '}
        {c('position')} on each: first, middle, last, or standalone for a single
        item. Use Child action when the item opens its own details.
      </p>
      <Stage
        frames={[
          {
            label: 'Child read only',
            content: childItems(TransactionListChildReadOnly),
          },
          {
            label: 'Child action',
            content: childItems(TransactionListChildAction),
          },
        ]}
      />
    </Subsection>
  </Section>
);

const Related = () => (
  <Section title="Related">
    <div className="odoc-related">
      <div className="odoc-related__card odoc-prose">
        <h4>List</h4>
        <p>Rows without an amount: settings, navigation and plain content.</p>
        {storyLink('docs/components-list-listreadonly--docs', 'List')}
      </div>
      <div className="odoc-related__card odoc-prose">
        <h4>Tag</h4>
        <p>The status shown below the amount.</p>
        {storyLink('docs/components-tag--docs', 'Tag')}
      </div>
      <div className="odoc-related__card odoc-prose">
        <h4>Bottom sheet</h4>
        <p>
          Holds the row actions on iOS and Android, in place of the web menu.
        </p>
      </div>
    </div>
  </Section>
);

const Feedback = () => (
  <Section title="Feedback">
    <p>
      Found a problem or have a suggestion? Open an issue in the Ocean
      repository.
    </p>
    <Link
      href="https://github.com/ocean-ds/ocean-web/issues"
      target="_blank"
      rel="noreferrer"
      icon="externalLink"
    >
      Open an issue on GitHub
    </Link>
  </Section>
);

export const Guidelines = (): React.ReactElement => (
  <>
    <Overview />
    <Formatting />
    <Content />
    <Behaviors />
    <Variants />
    <Related />
    <Feedback />
  </>
);
