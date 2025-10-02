import React from 'react';
import Badge from '../Badge';
import Tag, { TagProps } from '../Tag/Tag';

interface IHeaderProps {
  title?: string;
  subtitle?: string;
  count?: number;
  tag?: TagProps;
}
const Header = ({ title, subtitle, count, tag }: IHeaderProps): JSX.Element => (
  <div className="ods-card-group__header">
    <div className="ods-card-group__header--content">
      <div className="container-line">
        <p className="ods-typography ods-typography__heading4">{title}</p>
        {tag && <Tag size="medium" setIconOff {...tag} />}
      </div>
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
