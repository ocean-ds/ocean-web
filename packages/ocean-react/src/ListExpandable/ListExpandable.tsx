import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type ListExpandableProps = {
  /**
   * The title of the list expandable.
   */
  title: string;
  /**
   * The description or secondary text of the list expandable.
   */
  description?: string;
  /**
   * Description with strikethrough text.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text of the list expandable.
   */
  caption?: string;
  /**
   * Inverts the position of title and description.
   * @default false
   */
  inverted?: boolean;
  /**
   * The style type of the list expandable.
   * @default 'card'
   */
  type?: 'card' | 'text';
  /**
   * The status type of the content.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * If true, shows a loading state with skeleton.
   * @default false
   */
  loading?: boolean;
  /**
   * Icon displayed at the beginning of the card.
   */
  icon?: ReactNode;
  /**
   * Indicator/badge displayed before the expand/collapse icon.
   */
  indicator?: ReactNode;
  /**
   * Controls the expanded state (controlled component).
   */
  expanded?: boolean;
  /**
   * Initial expanded state (uncontrolled component).
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * Callback function when the expanded state changes.
   */
  onToggle?: (expanded: boolean) => void;
  /**
   * Content to display when expanded.
   */
  children?: ReactNode;
  /**
   * If true, the list expandable will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the list expandable will show a divider.
   * @default false
   */
  showDivider?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const ListExpandable = React.forwardRef<
  HTMLDivElement,
  ListExpandableProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = false,
      type = 'card',
      status = 'default',
      loading = false,
      icon,
      indicator,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onToggle,
      children,
      className,
      disabled = false,
      showDivider = false,
      ...rest
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

    const isControlled = controlledExpanded !== undefined;
    const isExpanded = isControlled ? controlledExpanded : internalExpanded;

    const handleToggle = () => {
      const newExpandedState = !isExpanded;

      if (!isControlled) {
        setInternalExpanded(newExpandedState);
      }

      onToggle?.(newExpandedState);
    };

    const renderLoadingContent = () => (
      <div className="ods-list-expandable__skeleton">
        <SkeletonBar width="40%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
    );

    const renderContent = () => (
      <>
        {icon && (
          <div
            className={classNames('ods-list-expandable__icon', {
              'ods-list-expandable__icon--inactive': status === 'inactive',
            })}
          >
            {icon}
          </div>
        )}
        <ContentList
          title={title}
          description={description}
          strikethroughDescription={strikethroughDescription}
          caption={caption}
          inverted={inverted}
          type={status}
        />
        <div className="ods-list-expandable__trailing">
          {indicator && (
            <div className="ods-list-expandable__indicator">
              {indicator}
            </div>
          )}
          <div className="ods-list-expandable__action">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </>
    );

    const containerClassName = classNames('ods-list-expandable', className, {
      'ods-list-expandable--expanded': isExpanded,
      'ods-list-expandable--disabled': disabled,
      'ods-list-expandable--loading': loading,
      [`ods-list-expandable--${type}`]: type,
    });

    return (
      <div
        ref={ref}
        data-testid="list-expandable"
        className={containerClassName}
        {...rest}
      >
        <button
          type="button"
          className="ods-list-expandable__main"
          onClick={loading ? undefined : handleToggle}
          disabled={disabled || loading}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} ${title}`}
          data-testid="list-expandable-button"
        >
          {loading ? renderLoadingContent() : renderContent()}
        </button>
        {showDivider && <div className="ods-list-expandable__divider" data-testid="list-expandable-divider" />}
        {isExpanded && children && (
          <div className="ods-list-expandable__content">{children}</div>
        )}
      </div>
    );
  }
);

ListExpandable.displayName = 'ListExpandable';

export default ListExpandable;
