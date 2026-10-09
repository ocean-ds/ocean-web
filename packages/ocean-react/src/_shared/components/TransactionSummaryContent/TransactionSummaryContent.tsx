import React from 'react';
import TransactionListReadOnly, {
  TransactionListReadOnlyProps,
} from '../../../TransactionListReadOnly';
import { TransactionListDivider } from '../TransactionListParts';

export type TransactionSummaryContentProps = {
  classPrefix: 'ods-transaction-footer' | 'ods-transaction-summary';
  rowsClassName: string;
  items: TransactionListReadOnlyProps[];
  total: {
    label: React.ReactNode;
    value: React.ReactNode;
  };
};

/* eslint-disable react/no-array-index-key */
const TransactionSummaryContent = ({
  classPrefix,
  rowsClassName,
  items,
  total,
}: TransactionSummaryContentProps): React.ReactElement => {
  const [mainItem, ...details] = items;

  return (
    <>
      <div className={rowsClassName}>
        {mainItem && (
          <TransactionListReadOnly
            key="main"
            {...mainItem}
            content={{ ...mainItem.content, inverted: false, size: 'sm' }}
            amount={{ ...mainItem.amount, size: 'sm' }}
            density="default"
            showDivider
          />
        )}
        {details.length > 0 && (
          <>
            <div className={`${classPrefix}__details`}>
              {details.map((item, index) => (
                <TransactionListReadOnly
                  key={`${index}-${item.content.title}`}
                  {...item}
                  content={{ ...item.content, inverted: false, size: 'sm' }}
                  amount={{ ...item.amount, size: 'sm' }}
                  density="compact"
                  showDivider={false}
                />
              ))}
            </div>
            <TransactionListDivider />
          </>
        )}
        {!mainItem && <TransactionListDivider />}
      </div>
      <div className={`${classPrefix}__total`}>
        <span className={`${classPrefix}__total-label`}>{total.label}</span>
        <span className={`${classPrefix}__total-value`}>{total.value}</span>
      </div>
    </>
  );
};
/* eslint-enable react/no-array-index-key */

export default TransactionSummaryContent;
