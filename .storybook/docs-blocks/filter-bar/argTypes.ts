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

export const filterBarArgTypes: Record<string, ApiArgType> = {
  filters: arg(
    'filters',
    '[FilterBarFilter, ...FilterBarFilter[]]',
    undefined,
    'Content',
    'object'
  ),
  allFilters: arg(
    'allFilters',
    '{ label?: string; count?: number; onClick: () => void }',
    undefined,
    'Content',
    'object'
  ),
  segmentedControl: arg(
    'segmentedControl',
    'SegmentedControlProps',
    undefined,
    'Content',
    'object'
  ),
  'aria-label': arg('ariaLabel', 'string', undefined, 'Accessibility', 'text'),
  className: arg('className', 'string', undefined, 'Appearance'),
};
