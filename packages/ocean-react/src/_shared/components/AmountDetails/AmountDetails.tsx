import React, { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { ContentListProps } from '../ContentList';

export type AmountDetailsProps = {
  /**
   * The amount to be displayed.
   */
  amount: string;
  /**
   * The status type of the amount content.
   * @default 'default'
   */
  type?: ContentListProps['type'];
  /**
   * Indicator/badge displayed below the amount (e.g. a Tag component).
   */
  indicator?: ReactNode;
  /**
   * If true, shows the indicator.
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Additional data caption displayed below the amount section.
   */
  additionalData?: string;
  /**
   * If true, shows the additional data.
   * @default true
   */
  showAdditionalData?: boolean;
};

const AmountDetails = ({
  amount,
  type = 'default',
  indicator,
  showIndicator = true,
  additionalData,
  showAdditionalData = true,
}: AmountDetailsProps): ReactElement => (
  <div className="ods-amount-details">
    <div className="ods-amount-details__main">
      <p
        className={classNames('ods-amount-details__amount', {
          [`ods-amount-details__amount--${type}`]: type && type !== 'default',
        })}
      >
        {amount}
      </p>
      {showIndicator && indicator && (
        <div className="ods-amount-details__indicator">{indicator}</div>
      )}
    </div>
    {showAdditionalData && additionalData && (
      <p
        className={classNames('ods-amount-details__caption', {
          'ods-amount-details__caption--inactive': type === 'inactive',
        })}
      >
        {additionalData}
      </p>
    )}
  </div>
);

export default AmountDetails;
