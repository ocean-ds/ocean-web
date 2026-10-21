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
          ? 'odoc-tag-surface'
          : 'odoc-tag-white-surface'
      }
    >
      <Tag {...props}>Harbor Market</Tag>
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
              Harbor Market
            </Tag>,
            <Tag
              key="hi-medium"
              variant="highlight"
              type="important"
              size="medium"
            >
              Harbor Market
            </Tag>,
          ],
        },
        {
          label: 'Highlight · neutral',
          cells: [
            <Tag key="hn-small" variant="highlight" type="neutral" size="small">
              Harbor Market
            </Tag>,
            <Tag
              key="hn-medium"
              variant="highlight"
              type="neutral"
              size="medium"
              icon={<Star />}
            >
              Harbor Market
            </Tag>,
          ],
        },
        {
          label: 'Long label · narrow width',
          cells: [
            <div className="odoc-tag-narrow" key="long-label">
              <Tag type="positive">
                Harbor Market supplies the northern reef collection
              </Tag>
            </div>,
          ],
        },
      ]}
    />
  ),
};
