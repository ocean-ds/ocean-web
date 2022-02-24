import React from 'react';
import classNames from 'classnames';

import IconSm from './img/IconSm';
import IconMd from './img/IconMd';
import IconLg from './img/IconLg';

export type ProgressProps = {
  /**
   * The size of the progress.
   * @default 'md'
   */
  size?: 'md' | 'lg' | 'sm';

  /**
   * The color of the progress.
   * @default 'md'
   */
  onColor?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function OceanProgress(
    { onColor = false, size = 'md', className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={classNames(
          'ods-progress',
          `ods-progress--${size}`,
          className,
          {
            'ods-progress--on-color': onColor,
          }
        )}
        {...rest}
      >
        {size === 'sm' && <IconSm />}
        {size === 'md' && <IconMd />}
        {size === 'lg' && <IconLg />}
      </div>
    );
  }
);

export default Progress;
