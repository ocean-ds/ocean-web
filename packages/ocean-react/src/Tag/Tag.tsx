import React from 'react';
import classNames from 'classnames';

import TagIcon from './TagIcon';

export type TagProps = {
  /**
   * Determines the type of Tag, with default icon and colors for each type
   * @default 'default'
   */
  type?:
    | 'positive'
    | 'warning'
    | 'negative'
    | 'neutral'
    | 'neutral-02'
    | 'neutral-03'
    | 'default';
  /**
   * Sets a custon icon for the Tag.
   */
  icon?: React.ReactElement;
  /**
   * Set icon off.
   */
  setIconOff?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      type = 'default',
      className,
      icon,
      setIconOff = false,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      role="tag"
      className={classNames('ods-tag', `ods-tag--${type}`, className)}
      {...rest}
    >
      {!setIconOff && <TagIcon type={type} icon={icon} />}
      <div className="ods-tag__content">{children}</div>
    </div>
  )
);

Tag.displayName = 'Tag';

export default Tag;
