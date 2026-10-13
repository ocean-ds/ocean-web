import React from 'react';
import { TransactionListDivider } from '../TransactionListParts';

export type TransactionRow = {
  label: React.ReactNode;
  value: React.ReactNode;
};

export type TransactionSummaryContentProps = {
  classPrefix: 'ods-transaction-footer-v2' | 'ods-transaction-summary';
  mainItem?: TransactionRow;
  details?: TransactionRow[];
  total: TransactionRow;
};

const TransactionSummaryContent = ({
  classPrefix,
  mainItem,
  details = [],
  total,
}: TransactionSummaryContentProps): React.ReactElement => {
  return (
    <>
      <div className={`${classPrefix}__rows`}>
        {mainItem && (
          <div className={`${classPrefix}__row ${classPrefix}__row--default`}>
            <span className={`${classPrefix}__row-label`}>
              {mainItem.label}
            </span>
            <span className={`${classPrefix}__row-value`}>
              {mainItem.value}
            </span>
          </div>
        )}
        {mainItem && details.length > 0 && <TransactionListDivider />}
        {details.length > 0 && (
          <div className={`${classPrefix}__details`}>
            {details.map((item, index) => (
              <div
                key={index}
                className={`${classPrefix}__row ${classPrefix}__row--compact`}
              >
                <span className={`${classPrefix}__row-label`}>
                  {item.label}
                </span>
                <span className={`${classPrefix}__row-value`}>
                  {item.value}
                </span>
              </div>
            ))}
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
};

export default TransactionSummaryContent;
