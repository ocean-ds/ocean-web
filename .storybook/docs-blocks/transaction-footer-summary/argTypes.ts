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
    'Transaction Footer 2.0',
    "'default'",
    'inline-radio',
    ['default', 'highlight']
  ),
  mainItem: prop(
    'mainItem',
    'TransactionRow',
    'Transaction Footer 2.0',
    undefined,
    'object'
  ),
  details: prop(
    'details',
    'TransactionRow[]',
    'Transaction Footer 2.0',
    '[]',
    'object'
  ),
  total: prop(
    'total',
    'TransactionRow',
    'Transaction Footer 2.0',
    undefined,
    'object'
  ),
  notice: prop(
    'notice',
    'TransactionNoticeProps',
    'Transaction Footer 2.0',
    undefined,
    'object'
  ),
  action: prop('action', 'ReactNode', 'Transaction Footer 2.0'),
  className: prop('className', 'string', 'HTML attributes'),
};

export const summaryArgTypes: Record<string, ApiArgType> = {
  title: prop('title', 'ReactNode', 'Transaction Summary'),
  mainItem: prop(
    'mainItem',
    'TransactionRow',
    'Transaction Summary',
    undefined,
    'object'
  ),
  details: prop(
    'details',
    'TransactionRow[]',
    'Transaction Summary',
    '[]',
    'object'
  ),
  total: prop(
    'total',
    'TransactionRow',
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
