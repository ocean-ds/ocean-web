import type { ApiArgType } from '../api-table';

const arg = (
  descriptionKey: string,
  type: string,
  defaultValue?: string,
  category = 'Content',
  control: ApiArgType['control'] = false
): ApiArgType => ({
  descriptionKey: `api.${descriptionKey}`,
  control,
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
  onChange: arg('onChange', '(index: 0 | 1) => void', undefined, 'Events'),
  'aria-label': arg('ariaLabel', 'string', undefined, 'Accessibility', 'text'),
  className: arg('className', 'string', undefined, 'Appearance'),
};
