import React from 'react';
import classNames from 'classnames';

export type ListProps = React.ComponentPropsWithoutRef<'div'>;

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ children, className, ...rest }, ref) => (
    <div ref={ref} className={classNames('ods-list', className)} {...rest}>
      {children}
    </div>
  )
);

List.displayName = 'List';

export default List;
