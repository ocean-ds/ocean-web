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

export const drawerArgTypes: Record<string, ApiArgType> = {
  open: arg('open', 'boolean', undefined, 'State', 'boolean'),
  title: arg('title', 'React.ReactNode', undefined, 'Content', 'text'),
  children: arg('children', 'React.ReactNode'),
  actions: arg('actions', 'React.ReactNode'),
  size: arg(
    'size',
    "'small' | 'large'",
    "'small'",
    'Appearance',
    'inline-radio',
    ['small', 'large']
  ),
  align: arg(
    'align',
    "'right' | 'left'",
    "'right'",
    'Appearance',
    'inline-radio',
    ['right', 'left']
  ),
  headerColor: arg(
    'headerColor',
    "'default' | 'warning' | 'negative'",
    "'default'",
    'Appearance',
    'inline-radio',
    ['default', 'warning', 'negative']
  ),
  floating: arg('floating', 'boolean', 'true', 'Appearance', 'boolean'),
  onDrawerClose: arg('onDrawerClose', '(event) => void', undefined, 'Events'),
  overlayClose: arg('overlayClose', '(event?) => void', undefined, 'Events'),
  onBack: arg('onBack', '(event) => void', undefined, 'Events'),
  anchorEl: arg('anchorEl', 'RefObject<HTMLDivElement>', undefined, 'Stack'),
  depth: arg('depth', 'number', undefined, 'Stack'),
  width: arg('width', 'number', undefined, 'Stack'),
  offsetX: arg('offsetX', 'number', undefined, 'Stack'),
  hideOverlay: arg('hideOverlay', 'boolean', 'false', 'Stack'),
  dim: arg('dim', "'near' | 'far'", undefined, 'Stack'),
  onDimClick: arg('onDimClick', '() => void', undefined, 'Stack'),
  closeButton: arg('closeButton', "'icon' | 'legacy'", "'icon'", 'Appearance'),
};
