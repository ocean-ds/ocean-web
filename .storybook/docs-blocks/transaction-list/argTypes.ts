/**
 * Storybook argTypes of the Transaction list family. One description per prop, shared by the
 * Playground controls and the Component API tables of the docs page.
 */
export type ArgType = {
  description: string;
  control?: unknown;
  options?: string[];
  action?: string;
  table: {
    category: string;
    type: { summary: string };
    defaultValue?: { summary: string };
  };
};

export const category = {
  content: 'Content',
  appearance: 'Appearance',
  state: 'State',
  interaction: 'Interaction',
  contentBlock: 'Content block',
  amountBlock: 'Amount block',
  advanced: 'Advanced',
};

const controlFor = (type: string) => {
  if (type === 'string') return 'text';
  if (type === 'boolean') return 'boolean';
  if (type.startsWith('{')) return 'object';
  return undefined;
};

export const arg = (
  cat: string,
  description: string,
  type: string,
  defaultValue?: string,
  extra: Partial<ArgType> = {}
): ArgType => ({
  description,
  control: controlFor(type),
  table: {
    category: cat,
    type: { summary: type },
    defaultValue: defaultValue ? { summary: defaultValue } : undefined,
  },
  ...extra,
});

const radio = (options: string[]) => ({ control: 'inline-radio', options });
const select = (options: string[]) => ({ control: 'select', options });
const quoted = (values: string[]) => values.map((v) => `'${v}'`).join(' | ');

export const STATUS = [
  'default',
  'inactive',
  'positive',
  'warning',
  'highlight',
  'highlight-lead',
  'strikethrough',
];
export const AMOUNT_TYPES = [
  'default',
  'positive',
  'negative',
  'inactive',
  'strikethrough',
  'strikethrough-neutral',
];

type ArgTypes = Record<string, ArgType>;

/** Content block + amount block, shared by every member of the family. */
export const blockArgTypes = (sizeDefault: string): ArgTypes => ({
  title: arg(
    category.contentBlock,
    'What happened, such as "Supplier payment". With `inverted` it is the smaller line. Required.',
    'string'
  ),
  description: arg(
    category.contentBlock,
    'Who or what the transaction relates to. One fact only.',
    'string'
  ),
  strikethroughDescription: arg(
    category.contentBlock,
    'Original text shown struck through before the emphasized text. Only with `status="strikethrough"`.',
    'string'
  ),
  caption: arg(category.contentBlock, 'Date, time or due date.', 'string'),
  inverted: arg(
    category.contentBlock,
    'Emphasizes the description instead of the title.',
    'boolean',
    'true'
  ),
  status: arg(
    category.contentBlock,
    'Color and weight of the emphasized text. Ignored when disabled.',
    quoted(STATUS),
    "'default'",
    select(STATUS)
  ),
  contentSize: arg(
    category.contentBlock,
    'Size of the content block, set independently from the amount.',
    "'md' | 'sm'",
    sizeDefault,
    radio(['md', 'sm'])
  ),
  amount: arg(
    category.amountBlock,
    'Formatted value without a sign, such as "R$ 1.250,00". Required.',
    'string'
  ),
  amountType: arg(
    category.amountBlock,
    'Adds the sign and the color to the amount. Ignored when disabled.',
    quoted(AMOUNT_TYPES),
    "'default'",
    select(AMOUNT_TYPES)
  ),
  amountSize: arg(
    category.amountBlock,
    'Size of the amount and of its tag, set independently from the content.',
    "'md' | 'sm'",
    sizeDefault,
    radio(['md', 'sm'])
  ),
  strikethroughAmount: arg(
    category.amountBlock,
    'Original value, struck through before the amount. Only with the strikethrough amount types.',
    'string'
  ),
  amountTag: arg(
    category.amountBlock,
    'Status tag below the amount. Its size follows `amountSize`; it turns neutral when disabled.',
    '{ label: ReactNode; type?: TagType; setIconOff?: boolean }'
  ),
  amountIndicator: arg(
    category.amountBlock,
    'Custom element below the amount. Ignored when `amountTag` is set.',
    'ReactNode',
    undefined,
    { control: false }
  ),
  showAmountIndicator: arg(
    category.amountBlock,
    'Shows the tag or the indicator below the amount.',
    'boolean',
    'true'
  ),
  additionalData: arg(
    category.amountBlock,
    'One short fact about the amount, such as "Available balance".',
    'string'
  ),
});

const stateArgs = (): ArgTypes => ({
  loading: arg(
    category.state,
    'Shows the skeleton in place of the content.',
    'boolean',
    'false'
  ),
  disabled: arg(
    category.state,
    'Mutes the row: inactive content and amount, neutral tag, no callbacks.',
    'boolean',
    'false'
  ),
});

const densityArg = (padding: string): ArgTypes => ({
  density: arg(
    category.appearance,
    `Vertical padding: \`default\` (${padding}) or \`compact\` (8px).`,
    "'default' | 'compact'",
    "'default'",
    radio(['default', 'compact'])
  ),
});

const iconArgs = (size: number, colorDefault: string): ArgTypes => ({
  icon: arg(
    category.content,
    `Leading icon, ${size}px. Pass it without its own color; it follows \`iconColor\`.`,
    'ReactNode',
    undefined,
    { control: false }
  ),
  iconColor: arg(
    category.appearance,
    'Icon color: `default` on white, `on-color` on colored backgrounds, `highlight` for emphasis. Ignored when disabled.',
    quoted(['default', 'on-color', 'highlight']),
    colorDefault,
    radio(['default', 'on-color', 'highlight'])
  ),
});

const dividerArg = (defaultValue: string): ArgTypes => ({
  showDivider: arg(
    category.appearance,
    'Divider below the row, inset 16px. Turn it off on the last row of a group.',
    'boolean',
    defaultValue
  ),
});

const onClickArg = (): ArgTypes => ({
  onClick: arg(
    category.interaction,
    'Called once per click. Not called while disabled or loading.',
    '(event: MouseEvent<HTMLButtonElement>) => void',
    undefined,
    { action: 'clicked' }
  ),
});

const classNameArg = (target: string): ArgTypes => ({
  className: arg(
    category.advanced,
    `Class on the root element. \`ref\` and the other attributes go to the ${target}.`,
    'string',
    undefined,
    { control: false }
  ),
});

export const readOnlyArgTypes: ArgTypes = {
  ...iconArgs(24, "'default'"),
  ...densityArg('16px'),
  ...dividerArg('true'),
  ...stateArgs(),
  ...blockArgTypes("'md'"),
  ...classNameArg('root `<div>`'),
};

export const actionArgTypes: ArgTypes = {
  ...iconArgs(24, "'default'"),
  actionType: arg(
    category.appearance,
    'Trailing action: chevron to open details, overflow menu or swipe to reveal actions.',
    "'chevron' | 'menu' | 'swipe'",
    "'chevron'",
    radio(['chevron', 'menu', 'swipe'])
  ),
  menuActions: arg(
    category.appearance,
    'Actions of the menu and of the swipe. Only with `menu` or `swipe`.',
    'ActionItem[]',
    '[]',
    { control: false }
  ),
  menuPosition: arg(
    category.appearance,
    'Where the menu opens. Only with `actionType="menu"`.',
    quoted(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    "'bottom-right'",
    select(['bottom-left', 'bottom-right', 'top-left', 'top-right'])
  ),
  ...densityArg('16px'),
  ...dividerArg('true'),
  ...stateArgs(),
  ...onClickArg(),
  ...blockArgTypes("'md'"),
  ...classNameArg('row `<button>`'),
};

export const selectableArgTypes: ArgTypes = {
  checkbox: arg(
    category.content,
    'Checkbox (default control): `checked`, `onChange`, `indeterminate`, `error` and `id`.',
    'CheckboxProps'
  ),
  radio: arg(
    category.content,
    'Radio control. Replaces the checkbox when set. Use the same `name` in the group.',
    'RadioProps'
  ),
  platform: arg(
    category.appearance,
    'Control side: `web` on the left, `app` on the right.',
    "'web' | 'app'",
    "'web'",
    radio(['web', 'app'])
  ),
  ...densityArg('16px'),
  ...dividerArg('true'),
  ...stateArgs(),
  ...blockArgTypes("'md'"),
  ...classNameArg('root `<div>`'),
};

export const expandableArgTypes: ArgTypes = {
  ...iconArgs(24, '–'),
  children: arg(
    category.content,
    'Child items shown when expanded, with `position` set on each.',
    'ReactNode',
    undefined,
    { control: false }
  ),
  supportingText: arg(
    category.content,
    'Text below the child items, when expanded.',
    'ReactNode'
  ),
  type: arg(
    category.appearance,
    'Container: `card` or `text` for a continuous list.',
    "'card' | 'text'",
    "'card'",
    radio(['card', 'text'])
  ),
  ...densityArg('16px'),
  showDivider: arg(
    category.appearance,
    'Divider below the row, or below the child items when expanded.',
    'boolean',
    'false'
  ),
  expanded: arg(
    category.state,
    'Shows the child items. Controlled: use with `onToggle`.',
    'boolean',
    'false'
  ),
  ...stateArgs(),
  onToggle: arg(
    category.interaction,
    'Called with the next state when the row is toggled.',
    '(expanded: boolean) => void',
    undefined,
    { action: 'toggled' }
  ),
  ...blockArgTypes('–'),
  ...classNameArg('root `<div>`'),
};

const childArgs = (target: string): ArgTypes => ({
  ...iconArgs(16, '– (interface-light-down)'),
  position: arg(
    category.appearance,
    'Position on the timeline: standalone, first, middle or last.',
    quoted(['standalone', 'first', 'middle', 'last']),
    "'standalone'",
    radio(['standalone', 'first', 'middle', 'last'])
  ),
  ...densityArg('12px'),
  ...stateArgs(),
  ...blockArgTypes("'sm'"),
  ...classNameArg(target),
});

export const childReadOnlyArgTypes: ArgTypes = childArgs('root `<div>`');
export const childActionArgTypes: ArgTypes = {
  ...childArgs('row `<button>`'),
  ...onClickArg(),
};
