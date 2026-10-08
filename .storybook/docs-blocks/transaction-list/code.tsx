import React from 'react';
import Link from '../../../packages/ocean-react/src/Link';
import TransactionListReadOnly from '../../../packages/ocean-react/src/TransactionListReadOnly';
import TransactionListAction from '../../../packages/ocean-react/src/TransactionListAction';
import TransactionListChildAction from '../../../packages/ocean-react/src/TransactionListChildAction';
import TransactionListChildReadOnly from '../../../packages/ocean-react/src/TransactionListChildReadOnly';
import { CodeBlock, DocTable, Section, Stage, Tabs, c } from '../blocks';
import {
  ArgType,
  actionArgTypes,
  childActionArgTypes,
  childReadOnlyArgTypes,
  expandableArgTypes,
  readOnlyArgTypes,
  selectableArgTypes,
} from './argTypes';
import { ExpandableExample, SelectableList } from './examples';
import { childRows, rows } from './fixtures';
import {
  NATIVE_API,
  PLATFORMS,
  PlatformId,
  SNIPPETS,
  VARIANTS,
  VariantId,
} from './platforms';

export const CODE_SECTIONS = [
  'Installation',
  'Usage',
  'Component API',
  'Other platforms',
  'Implementation rules',
];

export const REACT_API: Record<VariantId, Record<string, ArgType>> = {
  readOnly: readOnlyArgTypes,
  action: actionArgTypes,
  selectable: selectableArgTypes,
  expandable: expandableArgTypes,
  childReadOnly: childReadOnlyArgTypes,
  childAction: childActionArgTypes,
};

const md = (text: string) =>
  text.split('`').map((part, index) =>
    // eslint-disable-next-line react/no-array-index-key
    index % 2 ? <code key={index}>{part}</code> : part
  );

const USAGE_RENDER: Record<VariantId, React.ReactNode> = {
  readOnly: (
    <TransactionListReadOnly {...rows.supplierPayment} showDivider={false} />
  ),
  action: (
    <TransactionListAction {...rows.supplierPayment} showDivider={false} />
  ),
  selectable: <SelectableList />,
  expandable: <ExpandableExample />,
  childReadOnly: (
    <TransactionListChildReadOnly {...childRows[1]} position="standalone" />
  ),
  childAction: (
    <TransactionListChildAction {...childRows[1]} position="standalone" />
  ),
};

const ApiTable = ({
  platform,
  variant,
}: {
  platform: PlatformId;
  variant: VariantId;
}) => {
  if (platform === 'react') {
    return (
      <DocTable
        columns={['Prop', 'Type', 'Default', 'Description']}
        rows={Object.entries(REACT_API[variant]).map(([name, arg]) => [
          c(name),
          c(arg.table.type.summary),
          arg.table.defaultValue ? c(arg.table.defaultValue.summary) : '–',
          md(arg.description),
        ])}
      />
    );
  }
  return (
    <DocTable
      columns={['Parameter', 'Type', 'Default']}
      rows={NATIVE_API[platform][variant].map(([name, type, value]) => [
        c(name),
        c(type),
        c(value),
      ])}
    />
  );
};

const RULES: string[] = [
  'Pass amounts formatted and unsigned (`R$ 1.250,00`); `amountType` adds the sign and the color.',
  'Use the `disabled` prop for unavailable rows; never fade a row with opacity or custom classes.',
  'Turn `showDivider` off on the last row of each group.',
  'Place rows inside a list container, such as a card or a page section, full width.',
  'Never rebuild a row with generic containers and flex; use the family components so spacing, states and accessibility stay consistent.',
  'Use `iconColor="on-color"` only on colored backgrounds.',
  'Read only: no `onClick`; when the row must react to a click, use Action.',
  'Action: one action per row; with two or more, use `actionType="menu"` and `menuActions`.',
  'Selectable: control the state through `checkbox` or `radio`; use the same `name` for every radio of a group.',
  'Expandable: pass `contentSize` and `amountSize` to align with the other rows, and set `position` on every child item.',
  'Child items: only inside an expandable row; `standalone` when there is a single item.',
];

export const Code = ({
  platform,
  variant,
  onVariantChange,
}: {
  platform: PlatformId;
  variant: VariantId;
  onVariantChange: (variant: VariantId) => void;
}): React.ReactElement => {
  const current =
    PLATFORMS.find((item) => item.id === platform) ?? PLATFORMS[0];
  const currentVariant =
    VARIANTS.find((item) => item.id === variant) ?? VARIANTS[0];
  return (
    <>
      <Section title="Installation">
        {current.install.map((step) => (
          <CodeBlock
            key={step.label}
            label={step.label}
            code={step.code}
            language={step.language}
          />
        ))}
      </Section>
      <Section title="Usage">
        {platform === 'react' && (
          <Stage frames={[{ content: USAGE_RENDER[variant] }]} />
        )}
        <CodeBlock
          code={SNIPPETS[platform][variant]}
          language={current.language}
        />
      </Section>
      <Section title="Component API">
        <Tabs
          label="Component"
          className="odoc-subtabs"
          idPrefix="odoc-api"
          tabs={VARIANTS.map(({ id, label }) => ({ id, label }))}
          active={variant}
          onChange={(id) => onVariantChange(id as VariantId)}
        />
        <div className="odoc-api-head">
          {c(currentVariant.names[platform])}
          {platform === 'react' && (
            <Link
              href={`./?path=/story/${currentVariant.storyId}`}
              target="_top"
              icon="linkChevron"
            >
              Open in Playground
            </Link>
          )}
        </div>
        <ApiTable platform={platform} variant={variant} />
      </Section>
      <Section title="Other platforms">
        <DocTable
          columns={['Variant', ...PLATFORMS.map((item) => item.label)]}
          rows={VARIANTS.map((item) => [
            item.label,
            ...PLATFORMS.map((p) => c(item.names[p.id])),
          ])}
        />
      </Section>
      <Section title="Implementation rules">
        <ul>
          {RULES.map((rule) => (
            <li key={rule}>{md(rule)}</li>
          ))}
        </ul>
      </Section>
    </>
  );
};
