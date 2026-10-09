import React from 'react';
import TransactionListReadOnly, {
  TransactionListReadOnlyProps,
} from '../../../TransactionListReadOnly';
import Typography from '../../../Typography';

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
  const visibleItems = items.slice(0, 5);

  return (
    <>
      <div className={rowsClassName}>
        {visibleItems.map((item, index) => (
          <TransactionListReadOnly
            key={`${index}-${item.content.title}`}
            {...item}
            density={index === 0 ? 'default' : 'compact'}
            showDivider={index === 0 && visibleItems.length > 1}
          />
        ))}
      </div>
      <div className={`${classPrefix}__total`}>
        <Typography variant="paragraph">
          <span className={`${classPrefix}__total-label`}>{total.label}</span>
        </Typography>
        <Typography variant="paragraph">
          <span className={`${classPrefix}__total-value`}>{total.value}</span>
        </Typography>
      </div>
    </>
  );
};
/* eslint-enable react/no-array-index-key */

export default TransactionSummaryContent;
