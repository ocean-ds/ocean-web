import React from 'react';
import Badge from '../Badge';

interface IHeaderProps {
  title?: string;
  subtitle?: string;
  count?: number;
}
const Header = ({ title, subtitle, count }: IHeaderProps): JSX.Element => (
  <div className="ods-card-group__header">
    <div className="ods-card-group__header--content">
      <p className="ods-typography ods-typography__heading4">{title}</p>
      {subtitle && (
        <p className="ods-typography ods-typography__description">{subtitle}</p>
      )}
    </div>
    {count !== undefined && (
      <Badge
        variation="medium"
        color={count === 0 ? 'neutral' : 'alert'}
        count={count}
      />
    )}
  </div>
);

export default Header;
