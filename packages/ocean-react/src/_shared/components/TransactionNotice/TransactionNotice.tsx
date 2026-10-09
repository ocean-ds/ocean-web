import React from 'react';
import classNames from 'classnames';
import { CheckCircleOutline } from '@useblu/ocean-icons-react';
import Typography from '../../../Typography';

export type TransactionNoticeProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
};

type TransactionNoticeComponentProps = {
  className: string;
  notice: TransactionNoticeProps;
};

const TransactionNotice = ({
  className,
  notice: { title, description, icon },
}: TransactionNoticeComponentProps): React.ReactElement => (
  <div className={classNames('ods-transaction-notice', className)}>
    <span className="ods-transaction-notice__icon" aria-hidden="true">
      {icon ?? <CheckCircleOutline size={24} focusable={false} />}
    </span>
    <div className="ods-transaction-notice__content">
      <Typography variant="heading5" className="ods-transaction-notice__title">
        {title}
      </Typography>
      {description != null && (
        <Typography
          variant="caption"
          className="ods-transaction-notice__description"
        >
          {description}
        </Typography>
      )}
    </div>
  </div>
);

export default TransactionNotice;
