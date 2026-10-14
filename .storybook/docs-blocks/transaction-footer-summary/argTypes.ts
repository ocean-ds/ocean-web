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
  mainItem: prop(
    'mainItem',
    'TransactionSummaryItem | TransactionRow',
    'Transaction Footer',
    undefined,
    'object'
  ),
  details: prop(
    'details',
    '(TransactionSummaryItem | TransactionRow)[]',
    'Transaction Footer',
    '[]',
    'object'
  ),
  total: prop(
    'total',
    'TransactionTotal',
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
  title: prop('title', 'ReactNode', 'Transaction Summary', undefined, 'text'),
  mainItem: prop(
    'mainItem',
    'TransactionSummaryItem | TransactionRow',
    'Transaction Summary',
    undefined,
    'object'
  ),
  details: prop(
    'details',
    '(TransactionSummaryItem | TransactionRow)[]',
    'Transaction Summary',
    '[]',
    'object'
  ),
  total: prop(
    'total',
    'TransactionTotal',
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
