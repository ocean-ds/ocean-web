import React, { ReactElement, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@useblu/ocean-icons-react';
import ContentList, {
  ContentListProps,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';

export type CardListExpandableProps = {
  title: string;
  description?: string;
  strikethroughDescription?: string;
  caption?: string;
  inverted?: boolean;
  type?: ContentListProps['type'];
  loading?: boolean;
  icon?: ReactNode;
  indicator?: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  children?: ReactNode;
  className?: string;
};

const CardListExpandable = ({
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
}: CardListExpandableProps): ReactElement => {
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
        className={classNames(
          'ods-card-list-expandable',
          'ods-card-list-expandable--loading',
          className
        )}
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
      className={classNames('ods-card-list-expandable', className, {
        'ods-card-list-expandable--expanded': isExpanded,
      })}
    >
      <button
        type="button"
        className="ods-card-list-expandable__main"
        onClick={handleToggle}
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
};

export default CardListExpandable;

