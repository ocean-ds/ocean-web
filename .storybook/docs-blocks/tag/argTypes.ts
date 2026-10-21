import type { ApiArgType } from '../api-table';

const arg = (
  descriptionKey: string,
  type: string,
  defaultValue?: string,
  category = 'Content'
): ApiArgType => ({
  descriptionKey: `api.${descriptionKey}`,
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
    'Appearance'
  ),
  children: arg('children', 'React.ReactNode', undefined, 'Content'),
  className: arg('className', 'string', undefined, 'Content'),
  icon: arg('icon', 'React.ReactElement', undefined, 'Content'),
  setIconOff: arg('setIconOff', 'boolean', 'false', 'Content'),
  size: arg('size', "'small' | 'medium'", "'medium'", 'Appearance'),
  type: arg(
    'type',
    "'positive' | 'warning' | 'negative' | 'neutral' | 'neutral-02' | 'neutral-03' | 'complementary' | 'default' | 'important'",
    "'default'",
    'Appearance'
  ),
  variant: arg('variant', "'default' | 'highlight'", "'default'", 'Appearance'),
};
