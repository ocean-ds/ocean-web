import React from 'react';
import classNames from 'classnames';

import IconSm from './img/IconSm';
import IconMd from './img/IconMd';
import IconLg from './img/IconLg';
import IconDeterminate from './img/IconDeterminate';

export type ProgressProps = {
  /**
   * The size of the progress.
   * @default 'md'
   */
  size?: 'md' | 'lg' | 'sm';

  /**
   * The color of the progress.
   * @default false
   */
  onColor?: boolean;

  /**
   * The percentage of the progress (0-100).
   * When false or undefined, the progress is indeterminate.
   * @default undefined
   */
  percentage?: undefined | number;
} & React.ComponentPropsWithoutRef<'div'>;

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ onColor = false, size = 'md', percentage, className, ...rest }, ref) => {
    const isIndeterminate = typeof percentage === 'undefined';

    return (
      <div
        ref={ref}
        className={classNames(
          'ods-progress',
          `ods-progress--${size}`,
          className,
          {
            'ods-progress--on-color': onColor,
            'ods-progress--indeterminate': isIndeterminate,
            'ods-progress--determinate': !isIndeterminate,
          }
        )}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : percentage}
        aria-valuemin={isIndeterminate ? undefined : 0}
        aria-valuemax={isIndeterminate ? undefined : 100}
        {...rest}
      >
        {isIndeterminate ? (
          <>
            {size === 'sm' && <IconSm />}
            {size === 'md' && <IconMd />}
            {size === 'lg' && <IconLg />}
          </>
        ) : (
          <IconDeterminate size={size} percentage={percentage} />
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
