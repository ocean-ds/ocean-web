import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import classNames from 'classnames';

import LinkIcons from './LinkIcons';

export type LinkProps = {
  /**
   * The variant color.
   * @default 'primary'
   */
  variant?: 'primary' | 'inverse' | 'neutral';
  /**
   * The size of the link.
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * Sets a custon icon for the Link.
   * @default ' '
   */
  icon?: 'linkChevron' | 'externalLink';
} & ComponentPropsWithoutRef<'a'>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { children, className, variant = 'primary', size = 'md', icon, ...rest },
    ref
  ) => (
    <a
      ref={ref}
      className={classNames(
        'ods-link',
        `ods-link--${size}`,
        `ods-link--${variant}`,
        icon ? 'ods-link--with-icon' : '',
        className
      )}
      {...rest}
    >
      <span className="ods-link__content">{children}</span>
      <LinkIcons icon={icon} />
    </a>
  )
);

Link.displayName = 'Link';

export default Link;
