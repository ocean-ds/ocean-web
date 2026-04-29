import React from 'react';
import classNames from 'classnames';

export type CornerTagColor = 'primaryDown' | 'complementaryPure';

export interface CornerTagProps {
  /** Text displayed inside the tag. Empty strings render nothing. */
  label: string;
  /** Background color variant. Defaults to `primaryDown`. */
  color?: CornerTagColor;
  /** Additional class names applied to the root element. */
  className?: string;
}

const CornerTag = React.forwardRef<HTMLSpanElement, CornerTagProps>(
  ({ label, color = 'primaryDown', className }, ref) => {
    if (!label) return null;

    return (
      <span
        ref={ref}
        className={classNames(
          'ods-corner-tag',
          `ods-corner-tag--${color}`,
          className
        )}
        aria-label={label}
      >
        {label}
      </span>
    );
  }
);

CornerTag.displayName = 'CornerTag';

export default CornerTag;
