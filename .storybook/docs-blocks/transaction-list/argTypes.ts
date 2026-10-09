/**
 * Storybook argTypes of the Transaction List family and of its two blocks. The English
 * descriptions come from the locale files, so the Controls panel and the localized Component
 * API tables of the docs say the same thing.
 */
import common from '../locales/common.en.json';
import action from '../locales/transaction-list-action.en.json';
import selectable from '../locales/transaction-list-selectable.en.json';
import expandable from '../locales/transaction-list-expandable.en.json';
import childReadOnly from '../locales/transaction-list-child-read-only.en.json';
import contentDefault from '../locales/content-list-default.en.json';
import contentAmount from '../locales/content-list-amount.en.json';

export type ArgType = {
  description: string;
  /** Locale key of the description (Component API table of the docs). */
  descriptionKey: string;
  /** Values for `{placeholders}` in the description. */
  descriptionVars?: Record<string, string>;
  control?: unknown;
  options?: string[];
  action?: string;
  table: {
    category: string;
    type: { summary: string };
    defaultValue?: { summary: string };
  };
};

type ArgTypes = Record<string, ArgType>;
type Api = Record<string, string>;

export const NESTED = 'Nested blocks';

const controlFor = (type: string) => {
  if (type === 'string') return 'text';
  if (type === 'boolean') return 'boolean';
  return undefined;
};

const arg =
  (api: Api, category: string) =>
  (
    name: string,
    type: string,
    defaultValue?: string,
    extra: Partial<ArgType> = {}
  ): ArgType => {
    const key = extra.descriptionKey ?? `api.${name}`;
    const vars = extra.descriptionVars ?? {};
    const text = api[key.replace(/^api\./, '')] ?? '';
    return {
      description: Object.entries(vars).reduce(
        (result, [k, v]) => result.replace(`{${k}}`, v),
        text
      ),
      descriptionKey: key,
      control: controlFor(type),
      table: {
        category,
        type: { summary: type },
        defaultValue: defaultValue ? { summary: defaultValue } : undefined,
      },
      ...extra,
    };
  };

const radio = (options: string[]) => ({ control: 'inline-radio', options });
const select = (options: string[]) => ({ control: 'select', options });
const quoted = (values: string[]) => values.map((v) => `'${v}'`).join(' | ');
const noControl = { control: false };

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

/* ----- Blocks ----- */

const contentArg = arg(contentDefault.api, 'Content List Default');

export const contentListDefaultArgTypes: ArgTypes = {
  title: contentArg('title', 'string'),
  description: contentArg('description', 'string'),
  caption: contentArg('caption', 'string'),
  strikethroughDescription: contentArg('strikethroughDescription', 'string'),
  inverted: contentArg('inverted', 'boolean', 'true'),
  status: contentArg('status', quoted(STATUS), "'default'", select(STATUS)),
  size: contentArg('size', "'md' | 'sm'", "'md'", radio(['md', 'sm'])),
};

const amountArg = arg(contentAmount.api, 'Content List Amount');

export const contentListAmountArgTypes: ArgTypes = {
  value: amountArg('value', 'string'),
  type: amountArg(
    'type',
    quoted(AMOUNT_TYPES),
    "'default'",
    select(AMOUNT_TYPES)
  ),
  strikethroughValue: amountArg('strikethroughValue', 'string'),
  tag: amountArg('tag', '{ label: ReactNode; type?: TagType }', undefined, {
    control: 'object',
  }),
  info: amountArg('info', 'string'),
  size: amountArg('size', "'md' | 'sm'", "'md'", radio(['md', 'sm'])),
};

/* ----- Items ----- */

const commonArg = (category: string) => arg(common.api, category);

const nested = (): ArgTypes => {
  const nestedArg = commonArg(NESTED);
  return {
    content: nestedArg('content', 'ContentListDefaultProps', undefined, {
      control: 'object',
    }),
    amount: nestedArg('amount', 'ContentListAmountProps', undefined, {
      control: 'object',
    }),
  };
};

const rowProps = (
  category: string,
  {
    icon = true,
    child = false,
    target,
    divider = 'true',
  }: {
    icon?: boolean;
    child?: boolean;
    target: string;
    divider?: string | false;
  }
): ArgTypes => {
  const a = commonArg(category);
  return {
    ...(icon
      ? {
          icon: a('icon', 'ReactNode', undefined, {
            ...noControl,
            descriptionKey: child ? 'api.iconChild' : 'api.icon',
          }),
          iconColor: a(
            'iconColor',
            quoted(['default', 'on-color', 'highlight']),
            child ? undefined : "'default'",
            {
              ...select(['default', 'on-color', 'highlight']),
              descriptionKey: child ? 'api.iconColorChild' : 'api.iconColor',
            }
          ),
        }
      : {}),
    density: a(
      'density',
      "'default' | 'compact'",
      "'default'",
      radio(['default', 'compact'])
    ),
    ...(divider ? { showDivider: a('showDivider', 'boolean', divider) } : {}),
    loading: a('loading', 'boolean', 'false'),
    disabled: a('disabled', 'boolean', 'false'),
    className: a('className', 'string', undefined, {
      ...noControl,
      descriptionVars: { target },
    }),
  };
};

const onClick = (category: string): ArgTypes => ({
  onClick: commonArg(category)(
    'onClick',
    '(event: MouseEvent<HTMLButtonElement>) => void',
    undefined,
    { action: 'clicked', ...noControl }
  ),
});

const READ_ONLY = 'Transaction List Read Only';
export const readOnlyArgTypes: ArgTypes = {
  ...rowProps(READ_ONLY, { target: 'root `<div>`' }),
  ...nested(),
};

const ACTION = 'Transaction List Action';
const actionArg = arg(action.api, ACTION);
const ACTION_TYPES = ['chevron', 'menu', 'swipe'];
const MENU_POSITIONS = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
export const actionArgTypes: ArgTypes = {
  actionType: actionArg(
    'actionType',
    quoted(ACTION_TYPES),
    "'chevron'",
    radio(ACTION_TYPES)
  ),
  menuActions: actionArg('menuActions', 'ActionItem[]', '[]', noControl),
  menuPosition: actionArg(
    'menuPosition',
    quoted(MENU_POSITIONS),
    "'bottom-right'",
    select(MENU_POSITIONS)
  ),
  menuLabel: actionArg('menuLabel', 'string', "'Open actions menu'"),
  ...rowProps(ACTION, { target: 'row `<button>`' }),
  ...onClick(ACTION),
  ...nested(),
};

const SELECTABLE = 'Transaction List Selectable';
const selectableArg = arg(selectable.api, SELECTABLE);
export const selectableArgTypes: ArgTypes = {
  checkbox: selectableArg('checkbox', 'CheckboxProps', undefined, {
    control: 'object',
  }),
  radio: selectableArg('radio', 'RadioProps', undefined, { control: 'object' }),
  platform: selectableArg(
    'platform',
    "'web' | 'app'",
    "'web'",
    radio(['web', 'app'])
  ),
  ...rowProps(SELECTABLE, { icon: false, target: 'root `<div>`' }),
  ...nested(),
};

const EXPANDABLE = 'Transaction List Expandable';
const expandableArg = arg(expandable.api, EXPANDABLE);
export const expandableArgTypes: ArgTypes = {
  expanded: expandableArg('expanded', 'boolean', 'false'),
  onToggle: expandableArg(
    'onToggle',
    '(expanded: boolean) => void',
    undefined,
    {
      action: 'toggled',
      ...noControl,
    }
  ),
  children: expandableArg('children', 'ReactNode', undefined, noControl),
  supportingText: expandableArg('supportingText', 'ReactNode', undefined, {
    control: 'text',
  }),
  type: expandableArg(
    'type',
    "'card' | 'text'",
    "'card'",
    radio(['card', 'text'])
  ),
  ...rowProps(EXPANDABLE, { target: 'root `<div>`', divider: 'false' }),
  ...nested(),
};

const childArgTypes = (category: string, target: string): ArgTypes => ({
  position: arg(childReadOnly.api, category)(
    'position',
    quoted(['standalone', 'first', 'middle', 'last']),
    "'standalone'",
    radio(['standalone', 'first', 'middle', 'last'])
  ),
  ...rowProps(category, { child: true, target, divider: false }),
});

const CHILD_READ_ONLY = 'Transaction List Child Read Only';
export const childReadOnlyArgTypes: ArgTypes = {
  ...childArgTypes(CHILD_READ_ONLY, 'root `<div>`'),
  ...nested(),
};

const CHILD_ACTION = 'Transaction List Child Action';
export const childActionArgTypes: ArgTypes = {
  ...childArgTypes(CHILD_ACTION, 'row `<button>`'),
  ...onClick(CHILD_ACTION),
  ...nested(),
};
