import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type CardListExpandableProps = {
  /**
   * The title of the card list expandable.
   */
  title: string;
  /**
   * The description or secondary text of the card list expandable.
   */
  description?: string;
  /**
   * Description with strikethrough text.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text of the card list expandable.
   */
  caption?: string;
  /**
   * Inverts the position of title and description.
   * @default false
   */
  inverted?: boolean;
  /**
   * The style type of the card content.
   * @default 'default'
   */
  type?: ContentListProps['type'];
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
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

const CardListExpandable = React.forwardRef<
  HTMLDivElement,
  CardListExpandableProps
>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      inverted = false,
      type = 'default',
      loading = false,
      icon,
      indicator,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onToggle,
      children,
      className,
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

    if (loading) {
      return (
        <div
          ref={ref}
          data-testid="card-list-expandable"
          className={classNames(
            'ods-card-list-expandable',
            'ods-card-list-expandable--loading',
            className
          )}
          {...rest}
        >
          <div className="ods-card-list-expandable__main">
            <div className="ods-card-list-expandable__skeleton">
              <SkeletonBar width="100%" height="24px" />
              <SkeletonBar width="80%" height="20px" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-testid="card-list-expandable"
        className={classNames('ods-card-list-expandable', className, {
          'ods-card-list-expandable--expanded': isExpanded,
        })}
        {...rest}
      >
        <button
          type="button"
          className="ods-card-list-expandable__main"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} ${title}`}
          data-testid="card-list-expandable-button"
        >
          {icon && (
            <div className="ods-card-list-expandable__icon">{icon}</div>
          )}
          <ContentList
            title={title}
            description={description}
            strikethroughDescription={strikethroughDescription}
            caption={caption}
            inverted={inverted}
            type={type}
          />
          <div className="ods-card-list-expandable__trailing">
            {indicator && (
              <div className="ods-card-list-expandable__indicator">
                {indicator}
              </div>
            )}
            <div className="ods-card-list-expandable__action">
              {isExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
          </div>
        </button>
        {isExpanded && children && (
          <div className="ods-card-list-expandable__content">{children}</div>
        )}
      </div>
    );
  }
);

CardListExpandable.displayName = 'CardListExpandable';

export default CardListExpandable;

