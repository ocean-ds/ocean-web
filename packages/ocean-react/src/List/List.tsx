import React from 'react';
import classNames from 'classnames';

export type ListProps = {
  /**
   * Determines a level 2 information for the transaction.
   */
  children: React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const List = React.forwardRef<HTMLDivElement, ListProps>(function Tag(
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
