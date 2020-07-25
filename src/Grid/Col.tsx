import React from 'react';
import classNames from 'classnames';

const DEVICE_SIZES = [
  'xl' as const,
  'lg' as const,
  'md' as const,
  'sm' as const,
  'xs' as const,
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

type ColOrder = 'first' | 'last' | NumberAttr;
type ColSize = boolean | 'auto' | NumberAttr;

type ColSpec =
  | ColSize
  | { span?: ColSize; offset?: NumberAttr; order?: ColOrder };

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
  const spans: string[] = [];
  const classes: string[] = [];

  DEVICE_SIZES.forEach((brkPoint) => {
    const propValue = rest[brkPoint];
    delete rest[brkPoint];

    let span: ColSize | undefined;
    let offset: NumberAttr | undefined;
    let order: ColOrder | undefined;

    if (typeof propValue === 'object' && propValue != null) {
      ({ span = true, offset, order } = propValue);
    } else {
      span = propValue;
    }

    const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

    if (span)
      spans.push(
        span === true ? `${prefix}${infix}` : `${prefix}${infix}-${span}`
      );

    if (order != null) classes.push(`order${infix}-${order}`);
    if (offset != null) classes.push(`offset${infix}-${offset}`);
  });

  if (!spans.length) {
    spans.push(prefix); // plain 'ods-col'
  }

  return (
    <div
      ref={ref}
      className={classNames(...spans, ...classes, className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Col;
