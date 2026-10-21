import type { ApiArgType } from '../api-table';

const arg = (
  descriptionKey: string,
  type: string,
  defaultValue?: string,
  category = 'Content',
  control: ApiArgType['control'] = false,
  options?: string[]
): ApiArgType => ({
  descriptionKey: `api.${descriptionKey}`,
  control,
  options,
  table: {
    category,
    type: { summary: type },
    ...(defaultValue ? { defaultValue: { summary: defaultValue } } : {}),
  },
});

export const tagArgTypes: Record<string, ApiArgType> = {
  appearance: arg(
    'appearance',
    "'default' | 'translucent'",
    "'default'",
    'Appearance',
    'inline-radio',
    ['default', 'translucent']
  ),
  children: arg('children', 'React.ReactNode', "'Paid'", 'Content', 'text'),
  className: arg('className', 'string', undefined, 'Content'),
  icon: arg('icon', 'React.ReactElement', "'default'", 'Content', 'select', [
    'default',
    'star',
    'none',
  ]),
  setIconOff: arg('setIconOff', 'boolean', 'false', 'Content', 'boolean'),
  size: arg(
    'size',
    "'small' | 'medium'",
    "'medium'",
    'Appearance',
    'inline-radio',
    ['small', 'medium']
  ),
  type: arg(
    'type',
    "'positive' | 'warning' | 'negative' | 'neutral' | 'neutral-02' | 'neutral-03' | 'complementary' | 'default' | 'important'",
    "'positive'",
    'Appearance',
    'select',
    [
      'positive',
      'warning',
      'negative',
      'neutral',
      'neutral-02',
      'neutral-03',
      'complementary',
      'default',
      'important',
    ]
  ),
  variant: arg(
    'variant',
    "'default' | 'highlight'",
    "'default'",
    'Appearance',
    'inline-radio',
    ['default', 'highlight']
  ),
};
