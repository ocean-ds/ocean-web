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

export const tabArgTypes: Record<string, ApiArgType> = {
  tabs: arg(
    'tabs',
    '{ label: string; count?: number; panelId?: string }[]',
    undefined,
    'Content',
    'object'
  ),
  selectedIndex: arg('selectedIndex', 'number', undefined, 'State'),
  onChange: arg('onChange', '(index: number) => void', undefined, 'Events'),
  'aria-label': arg('ariaLabel', 'string', undefined, 'Accessibility', 'text'),
  id: arg('id', 'string', undefined, 'Accessibility'),
  className: arg('className', 'string', undefined, 'Appearance'),
};
