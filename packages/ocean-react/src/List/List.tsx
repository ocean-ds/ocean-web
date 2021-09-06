import React from 'react';
import classNames from 'classnames';

export type ListProps = React.ComponentPropsWithoutRef<'div'>;

const List = React.forwardRef<HTMLDivElement, ListProps>(function OceanList(
  { children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={classNames('ods-list', className)} {...rest}>
      {children}
    </div>
  );
});

export default List;
