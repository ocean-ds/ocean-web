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

export const successScreenArgTypes: Record<string, ApiArgType> = {
  status: arg(
    'status',
    "'positive' | 'neutral' | 'negative'",
    "'positive'",
    'Appearance',
    'inline-radio',
    ['positive', 'neutral', 'negative']
  ),
  title: arg('title', 'string', undefined, 'Content', 'text'),
  description: arg('description', 'string', undefined, 'Content', 'text'),
  extraInformation: arg(
    'extraInformation',
    'string',
    undefined,
    'Content',
    'text'
  ),
  children: arg('children', 'React.ReactNode', undefined, 'Content', 'text'),
  primaryAction: arg(
    'primaryAction',
    'SuccessScreenAction',
    undefined,
    'Actions'
  ),
  secondaryAction: arg(
    'secondaryAction',
    'SuccessScreenAction',
    undefined,
    'Actions'
  ),
  showTopBar: arg('showTopBar', 'boolean', 'false', 'Appearance', 'boolean'),
  onClose: arg('onClose', '() => void'),
  tagLabel: arg('tagLabel', 'string', undefined, 'Content', 'text'),
  tagIcon: arg('tagIcon', 'React.ReactElement'),
  className: arg('className', 'string'),
};
