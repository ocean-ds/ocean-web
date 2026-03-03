import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { ContentListProps } from '../ContentList';

export type AmountDetailsType = 'default' | 'positive' | 'negative';

export type AmountDetailsProps = {
  amount: string;
  type?: ContentListProps['type'] | 'negative';
  indicator?: ReactNode;
  /**
   * Size of the indicator (e.g. Tag). Affects styling when the indicator is a Tag.
   * @default 'small'
   */
  indicatorSize?: 'small' | 'medium';
  showIndicator?: boolean;
  additionalData?: string;
  showAdditionalData?: boolean;
};

const AmountDetails = ({
  amount,
  type = 'default',
  indicator,
  indicatorSize = 'small',
  showIndicator = true,
  additionalData,
  showAdditionalData = true,
}: AmountDetailsProps): ReactElement => {
  const isNegative = type === 'negative';
  const isPositive = type === 'positive';
  return (
    <div className="ods-amount-details">
      <div className="ods-amount-details__main">
        {isNegative ? (
          <div className="ods-amount-details__amount-row">
            <span className="ods-amount-details__amount-sign">- </span>
            <p className="ods-amount-details__amount">{amount}</p>
          </div>
        ) : (
          <p
            className={classNames('ods-amount-details__amount', {
              'ods-amount-details__amount--positive': isPositive,
            })}
          >
            {amount}
          </p>
        )}
        {showIndicator && indicator && (
          <div
            className={classNames('ods-amount-details__indicator', {
              'ods-amount-details__indicator--medium':
                indicatorSize === 'medium',
            })}
          >
            {indicator}
          </div>
        )}
      </div>
      {showAdditionalData && additionalData && (
        <p className="ods-amount-details__caption">{additionalData}</p>
      )}
    </div>
  );
};

export default AmountDetails;
