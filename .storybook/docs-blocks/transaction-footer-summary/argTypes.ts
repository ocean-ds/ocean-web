import type { ApiArgType } from '../api-table';

const prop = (
  name: string,
  type: string,
  category: string,
  defaultValue?: string,
  control: ApiArgType['control'] = false,
  options?: string[]
): ApiArgType => ({
  descriptionKey: `api.${name}`,
  control,
  options,
  table: {
    category,
    type: { summary: type },
    defaultValue: defaultValue ? { summary: defaultValue } : undefined,
  },
});

export const footerArgTypes: Record<string, ApiArgType> = {
  type: prop(
    'type',
    "'default' | 'highlight'",
    'Transaction Footer',
    "'default'",
    'inline-radio',
    ['default', 'highlight']
  ),
  items: prop(
    'items',
    'TransactionListReadOnlyProps[]',
    'Transaction Footer',
    undefined,
    'object'
  ),
  total: prop(
    'total',
    '{ label: ReactNode; value: ReactNode }',
    'Transaction Footer',
    undefined,
    'object'
  ),
  notice: prop(
    'notice',
    'TransactionNoticeProps',
    'Transaction Footer',
    undefined,
    'object'
  ),
  action: prop('action', 'ReactNode', 'Transaction Footer'),
  className: prop('className', 'string', 'HTML attributes'),
};

export const summaryArgTypes: Record<string, ApiArgType> = {
  title: prop('title', 'ReactNode', 'Transaction Summary'),
  items: prop(
    'items',
    'TransactionListReadOnlyProps[]',
    'Transaction Summary',
    undefined,
    'object'
  ),
  total: prop(
    'total',
    '{ label: ReactNode; value: ReactNode }',
    'Transaction Summary',
    undefined,
    'object'
  ),
  notice: prop(
    'notice',
    'TransactionNoticeProps',
    'Transaction Summary',
    undefined,
    'object'
  ),
  action: prop('action', 'ReactNode', 'Transaction Summary'),
  className: prop('className', 'string', 'HTML attributes'),
};
