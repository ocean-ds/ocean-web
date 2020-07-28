import React from 'react';
import classNames from 'classnames';

import './styles/row.scss';

type RowColWidth = '1' | '2' | '3' | '4' | '5' | '6';

type RowProps = {
  /**
   * Removes the gutter spacing between `Col`s as well as any added negative margins.
   * @default false
   */
  noGutters?: boolean;
  /**
   * The number of columns that will fit next to each other on extra small devices (<576px).
   */
  xs?: RowColWidth;
  /**
   * The number of columns that will fit next to each other on small devices (≥576px).
   */
  sm?: RowColWidth;
  /**
   * The number of columns that will fit next to each other on medium devices (≥768px)
   */
  md?: RowColWidth;
  /**
   * The number of columns that will fit next to each other on large devices (≥992px)
   */
  lg?: RowColWidth;
  /**
   * The number of columns that will fit next to each other on extra large devices (≥1200px)
   */
  xl?: RowColWidth;
} & React.ComponentPropsWithoutRef<'div'>;

const Row = React.forwardRef<HTMLDivElement, RowProps>(function Row(
  { children, className, noGutters = false, xs, sm, md, lg, xl, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames(
        'ods-row',
        noGutters && 'ods-no-gutters',
        {
          [`ods-row-cols-${xs}`]: xs,
          [`ods-row-cols-sm-${sm}`]: sm,
          [`ods-row-cols-md-${md}`]: md,
          [`ods-row-cols-lg-${lg}`]: lg,
          [`ods-row-cols-xl-${xl}`]: xl,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Row;
