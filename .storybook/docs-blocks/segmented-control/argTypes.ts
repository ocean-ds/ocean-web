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

export const segmentedControlArgTypes: Record<string, ApiArgType> = {
  options: arg(
    'options',
    '[SegmentedControlOption, SegmentedControlOption]',
    undefined,
    'Content',
    'object'
  ),
  selectedIndex: arg('selectedIndex', '0 | 1', undefined, 'State', {
    type: 'number',
    min: 0,
    max: 1,
  }),
  background: arg(
    'background',
    "'default' | 'white'",
    "'default'",
    'Appearance',
    'inline-radio',
    ['default', 'white']
  ),
  disabled: arg('disabled', 'boolean', 'false', 'State', 'boolean'),
  onChange: arg('onChange', '(index: 0 | 1) => void', undefined, 'Events'),
  'aria-label': arg('ariaLabel', 'string', undefined, 'Accessibility', 'text'),
  className: arg('className', 'string', undefined, 'Appearance'),
};
