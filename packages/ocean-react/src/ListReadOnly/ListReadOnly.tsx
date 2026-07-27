import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ContentList, {
  ContentListProps,
  IndicatorPosition,
} from '../_shared/components/ContentList';
import SkeletonBar from '../_shared/components/SkeletonBar';
import ListContainer, {
  ListContainerHighlight,
} from '../_shared/components/ListContainer';
import { CornerTagProps } from '../CornerTag/CornerTag';

export type ListReadOnlyProps = {
  /**
   * The title of the card list read only.
   */
  title: string;
  /**
   * The description or secondary text of the card.
   */
  description?: string;
  /**
   * Description with strikethrough text.
   */
  strikethroughDescription?: string;
  /**
   * Caption or tertiary text of the card.
   */
  caption?: string;
  /**
   * Icon displayed at the beginning of the card.
   */
  icon?: ReactNode;
  /**
   * Indicator/badge displayed at the end of the card.
   */
  indicator?: ReactNode;
  /**
   * Where the `indicator` is rendered relative to the text content.
   *
   * - `inline` (default): same row as the text, at the end of the content block.
   * - `above`: stacked above the title, inside the content column.
   * - `below`: stacked below the text, inside the content column.
   *
   * Has no effect when `indicator` is not provided.
   * @default 'inline'
   */
  indicatorPosition?: IndicatorPosition;
  /**
   * The style type of the list item.
   * @default 'card'
   */
  type?: 'card' | 'text';
  /**
   * The status type of the card content.
   * @default 'default'
   */
  status?: ContentListProps['type'];
  /**
   * Inverts the position of title and description.
   * @default false
   */
  inverted?: boolean;
  /**
   * If true, the card will be visually disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, shows a loading state with skeleton.
   * @default false
   */
  loading?: boolean;
  /**
   * If true, shows a divider between the items when type is 'text'.
   * @default false
   */
  showDivider?: boolean;
  /**
   * Renders a highlighted caption area at the bottom of the container.
   */
  highlight?: ListContainerHighlight;
  /**
   * Renders a Highlight Corner Tag at the top-right corner of the card.
   * Only rendered when `type='card'`.
   */
  cornerTag?: CornerTagProps;
} & React.ComponentPropsWithoutRef<'div'>;

const ListReadOnly = React.forwardRef<HTMLDivElement, ListReadOnlyProps>(
  (
    {
      title,
      description,
      strikethroughDescription,
      caption,
      icon,
      indicator,
      indicatorPosition = 'inline',
      type = 'card',
      status = 'default',
      inverted = false,
      disabled = false,
      loading = false,
      className,
      showDivider = false,
      highlight,
      cornerTag,
      ...rest
    },
    ref
  ) => {
    const renderLoadingContent = () => (
      <div className="ods-list-readonly__skeleton">
        <SkeletonBar width="40%" height="16px" />
        <SkeletonBar width="100%" height="16px" />
      </div>
    );

    // Só `above`/`below` vão para dentro do ContentList; `inline` mantém o wrapper
    // atual do componente, preservando o DOM em produção.
    const stackedPosition =
      indicatorPosition !== 'inline' ? indicatorPosition : undefined;

    const renderContent = () => (
      <>
        {icon && (
          <div
            className={classNames('ods-list-readonly__icon', {
              'ods-list-readonly__icon--inactive': status === 'inactive',
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
          indicator={stackedPosition ? indicator : undefined}
          indicatorPosition={stackedPosition}
        />
        {indicator && !stackedPosition && (
          <div className="ods-list-readonly__trailing">
            <div className="ods-list-readonly__indicator">{indicator}</div>
          </div>
        )}
      </>
    );

    const cardClassName = classNames('ods-list-readonly', className, {
      'ods-list-readonly--loading': loading,
      'ods-list-readonly--disabled': disabled,
      [`ods-list-readonly--${type}`]: type,
    });

    return (
      <ListContainer
        type={type}
        showDivider={showDivider}
        highlight={highlight}
        cornerTag={cornerTag}
      >
        <div
          ref={ref}
          data-testid="card-list-readonly"
          className={cardClassName}
          {...rest}
        >
          {loading ? renderLoadingContent() : renderContent()}
        </div>
      </ListContainer>
    );
  }
);

ListReadOnly.displayName = 'ListReadOnly';

export default ListReadOnly;
