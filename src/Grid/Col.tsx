import React from 'react';
import classNames from 'classnames';

import './styles/col.scss';

const DEVICE_SIZES = [
  'xs' as const,
  'sm' as const,
  'md' as const,
  'lg' as const,
  'xl' as const,
];

type NumberAttr =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';
type ColSize = boolean | 'auto' | NumberAttr;
type ColSpec = ColSize | { span?: ColSize; offset?: NumberAttr };
type ColProps = {
  /**
   * The number of columns to span on extra small devices (<576px)
   */
  xs?: ColSpec;
  /**
   * The number of columns to span on small devices (≥576px)
   */
  sm?: ColSpec;
  /**
   * The number of columns to span on medium devices (≥768px)
   */
  md?: ColSpec;
  /**
   * The number of columns to span on large devices (≥992px)
   */
  lg?: ColSpec;
  /**
   * The number of columns to span on extra large devices (≥1200px)
   */
  xl?: ColSpec;
} & React.ComponentPropsWithoutRef<'div'>;

const Col = React.forwardRef<HTMLDivElement, ColProps>(function Col(
  { children, className, ...rest },
  ref
) {
  const prefix = 'ods-col';
  const classes = [];
  let hasAnySpan = false;

  DEVICE_SIZES.forEach((brkPoint) => {
    const propValue = rest[brkPoint];
    delete rest[brkPoint];

    let span: ColSize | undefined;
    let offset: NumberAttr | undefined;

    if (typeof propValue === 'object' && propValue) {
      ({ span = true, offset } = propValue);
    } else {
      span = propValue;
    }

    const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

    if (span) {
      hasAnySpan = true;
      classes.push(
        span === true ? `${prefix}${infix}` : `${prefix}${infix}-${span}`
      );
    }
    if (offset) classes.push(`ods-offset${infix}-${offset}`);
  });

  // plain 'ods-col'
  if (!hasAnySpan) classes.unshift(prefix);

  return (
    <div ref={ref} className={classNames(classes, className)} {...rest}>
      {children}
    </div>
  );
});

export default Col;
