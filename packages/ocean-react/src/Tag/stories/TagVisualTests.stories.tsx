import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Star } from '@useblu/ocean-icons-react';
import { MatrixGrid } from '../../../../../.storybook/docs-blocks';
import { tagVisualDecorator } from '../../../../../.storybook/docs-blocks/tag/story-helpers';
import Tag from '../Tag';
import type { TagProps } from '../Tag';

const TYPES = [
  'positive',
  'warning',
  'negative',
  'complementary',
  'neutral',
  'neutral-02',
  'neutral-03',
  'default',
] as const;

type Type = typeof TYPES[number];

const NO_DEFAULT_ICON: Type[] = [
  'complementary',
  'neutral',
  'neutral-02',
  'neutral-03',
  'default',
];
const LABELS: Record<Type, string> = {
  positive: 'Paid',
  warning: 'Due soon',
  negative: 'Overdue',
  complementary: 'Scheduled',
  neutral: 'Processing',
  'neutral-02': 'In review',
  'neutral-03': 'Draft',
  default: 'Draft',
};

const tag = (
  type: Type,
  size: 'small' | 'medium',
  iconOn: boolean,
  appearance: 'default' | 'translucent' = 'default'
): React.ReactElement => {
  const props = {
    appearance,
    icon: iconOn && NO_DEFAULT_ICON.includes(type) ? <Star /> : undefined,
    setIconOff: !iconOn,
    size,
    type,
  } as TagProps;

  return (
    <div
      className={
        appearance === 'translucent'
          ? 'odoc-tag-surface odoc-tag-surface--compact'
          : 'odoc-tag-white-surface odoc-tag-surface--compact'
      }
    >
      <Tag {...props}>{LABELS[type]}</Tag>
    </div>
  );
};

const meta: Meta = {
  title: 'Visual tests/Tag',
  decorators: [tagVisualDecorator],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    chromatic: { disableSnapshot: false },
  },
};

export default meta;
type Story = StoryObj;

export const Matrix: Story = {
  render: () => (
    <MatrixGrid
      className="odoc-matrix--tag"
      columns={[
        'Small · no icon',
        'Small · icon',
        'Medium · no icon',
        'Medium · icon',
        'Translucent · medium · icon',
      ]}
      rows={[
        ...TYPES.map((type) => ({
          label: type,
          cells: [
            tag(type, 'small', false),
            tag(type, 'small', true),
            tag(type, 'medium', false),
            tag(type, 'medium', true),
            ['default', 'neutral-03'].includes(type) ? (
              <span key={`${type}-not-applicable`}>—</span>
            ) : (
              tag(type, 'medium', true, 'translucent')
            ),
          ],
        })),
        {
          label: 'Highlight · important',
          cells: [
            <Tag
              key="hi-small"
              variant="highlight"
              type="important"
              size="small"
            >
              Save 75%
            </Tag>,
            <Tag
              key="hi-medium"
              variant="highlight"
              type="important"
              size="medium"
            >
              Save 75%
            </Tag>,
          ],
        },
        {
          label: 'Highlight · neutral',
          cells: [
            <Tag key="hn-small" variant="highlight" type="neutral" size="small">
              Pay in 3x
            </Tag>,
            <Tag
              key="hn-medium"
              variant="highlight"
              type="neutral"
              size="medium"
              icon={<Star />}
            >
              Pay in 3x
            </Tag>,
          ],
        },
        {
          label: 'Long label · narrow width',
          cells: [
            <div className="odoc-tag-narrow" key="long-label">
              <Tag type="positive">
                Payment to supplier scheduled for Nov 12
              </Tag>
            </div>,
          ],
        },
      ]}
    />
  ),
};
