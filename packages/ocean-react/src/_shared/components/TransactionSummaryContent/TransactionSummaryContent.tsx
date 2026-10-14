import React from 'react';
import TransactionListReadOnly from '../../../TransactionListReadOnly';
import {
  TransactionListDivider,
  type ContentListAmountProps,
  type ContentListDefaultProps,
} from '../TransactionListParts';

export type TransactionSummaryItem = {
  content: Omit<ContentListDefaultProps, 'size'>;
  amount: Omit<ContentListAmountProps, 'size'>;
};

/** @deprecated Use `TransactionSummaryItem` (`content` + `amount`). */
export type TransactionRow = {
  label: string;
  value: string;
  info?: string;
};

export type TransactionTotal = {
  label: React.ReactNode;
  value: React.ReactNode;
};

export type TransactionSummaryContentProps = {
  classPrefix: 'ods-transaction-footer-v2' | 'ods-transaction-summary';
  mainItem?: TransactionSummaryItem | TransactionRow;
  details?: Array<TransactionSummaryItem | TransactionRow>;
  total: TransactionTotal;
};

const getReactNodeKey = (node: React.ReactNode): string => {
  if (Array.isArray(node)) {
    return node.map(getReactNodeKey).join('|');
  }
  if (React.isValidElement(node)) {
    return `${String(node.type)}:${node.key ?? ''}:${getReactNodeKey(
      node.props.children
    )}`;
  }
  return String(node ?? '');
};

const normalizeItem = (
  item: TransactionSummaryItem | TransactionRow
): TransactionSummaryItem => {
  if ('content' in item) {
    return item;
  }

  return {
    content: { title: item.label },
    amount: { value: item.value, info: item.info },
  };
};

const getKeyedDetails = (
  details: Array<TransactionSummaryItem | TransactionRow>
) => {
  const occurrences = new Map<string, number>();
  return details.map((item) => {
    const normalized = normalizeItem(item);
    const baseKey = `${getReactNodeKey(
      normalized.content.title
    )}-${getReactNodeKey(normalized.amount.value)}`;
    const occurrence = occurrences.get(baseKey) ?? 0;
    occurrences.set(baseKey, occurrence + 1);
    return { item: normalized, key: `${baseKey}-${occurrence}` };
  });
};

const renderRow = (
  item: TransactionSummaryItem | TransactionRow,
  classPrefix: TransactionSummaryContentProps['classPrefix'],
  density: 'default' | 'compact',
  key?: string
): React.ReactElement => {
  const { content, amount } = normalizeItem(item);

  return (
    <TransactionListReadOnly
      key={key}
      className={`${classPrefix}__row ${classPrefix}__row--${density}`}
      content={{ inverted: false, ...content, size: 'sm' }}
      amount={{ ...amount, size: 'sm' }}
      density={density}
      showDivider={false}
    />
  );
};

const TransactionSummaryContent = ({
  classPrefix,
  mainItem,
  details = [],
  total,
}: TransactionSummaryContentProps): React.ReactElement => (
  <>
    <div className={`${classPrefix}__rows`}>
      {mainItem && renderRow(mainItem, classPrefix, 'default')}
      {mainItem && details.length > 0 && <TransactionListDivider />}
      {details.length > 0 && (
        <div className={`${classPrefix}__details`}>
          {getKeyedDetails(details).map(({ item, key }) =>
            renderRow(item, classPrefix, 'compact', key)
          )}
        </div>
      )}
      {(mainItem || details.length > 0) && <TransactionListDivider />}
    </div>
    <div className={`${classPrefix}__total ${classPrefix}__total--bold-16`}>
      <span
        className={`${classPrefix}__total-label ${classPrefix}__total-label--bold-16`}
      >
        {total.label}
      </span>
      <span
        className={`${classPrefix}__total-value ${classPrefix}__total-value--bold-16`}
      >
        {total.value}
      </span>
    </div>
  </>
);

export default TransactionSummaryContent;
