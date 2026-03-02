import React, { cloneElement, isValidElement } from 'react';
import classNames from 'classnames';
import ListAction, { type ListActionProps } from '../ListAction';

export type ListProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * When true, injects `leading` (timeline lines) into ListAction children so their icons connect with a vertical line. Default false.
   */
  showLeading?: boolean;
};

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ children, className, showLeading = false, ...rest }, ref) => {
    const total = React.Children.count(children);
    const enhancedChildren = React.Children.map(children, (child, index) => {
      const isListAction =
        isValidElement(child) &&
        (child.type === ListAction ||
          (child.type as React.ComponentType)?.displayName === 'ListAction');
      if (showLeading && isListAction && total > 1) {
        const leading =
          index === 0 ? 'first' : index === total - 1 ? 'last' : 'middle';
        return cloneElement(child as React.ReactElement<ListActionProps>, {
          leading,
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={classNames('ods-list', className)} {...rest}>
        {enhancedChildren}
      </div>
    );
  }
);

List.displayName = 'List';

export default List;
