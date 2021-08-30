import React from 'react';
import {
  XCircle,
  ExclamationCircle,
  CheckCircle,
} from '@useblu/ocean-icons-react';

type TagIconProps = {
  type?: string;
  icon?: React.ReactElement;
};

const mapIconsByType = (key?: string) =>
  key &&
  {
    warning: ExclamationCircle,
    negative: XCircle,
    positive: CheckCircle,
    '': undefined,
  }[key];

const TagIcon = React.memo<TagIconProps>(function TagIcon({ type, icon }) {
  if (icon) return React.cloneElement(icon, { className: 'ods-tag__icon' });

  const IconEl = mapIconsByType(type);

  if (IconEl)
    return (
      <IconEl
        size={16}
        className="ods-tag__icon"
        aria-hidden
        focusable={false}
      />
    );

  return <></>;
});

export default TagIcon;
