import React from 'react';
import classNames from 'classnames';

import { ChevronRight } from '@useblu/ocean-icons-react';

export type CrossSellCardProps = {
  /**
   * Determines the card title
   */
  title: string;
  /**
   * Determines the card description
   */
  description: string;
  /**
   * Determines the card image src
   */
  imageSrc?: string;
  /**
   * Determines the cta text
   */
  ctaText: string;
  /**
   * Determines the Icon on the
   */
  customIcon?: JSX.Element;
  /**
   * Determines the cta action
   */
  ctaAction: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

const CrossSellCard = React.forwardRef<HTMLDivElement, CrossSellCardProps>(
  (
    {
      title,
      className,
      description,
      imageSrc,
      ctaText,
      ctaAction,
      customIcon,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      {...rest}
      className={classNames('ods-cross-sell-card', className)}
      onClick={ctaAction}
    >
      <a
        className="ods-cross-sell-card__content"
        onClick={() => ctaAction}
        data-testid="cta-test"
      >
        <div className="ods-cross-sell-card__information">
          <div className="ods-cross-sell-card__title">{title}</div>
          <div className="ods-cross-sell-card__description">{description}</div>
        </div>
        {imageSrc && (
          <img
            className="ods-cross-sell-card__image"
            alt={imageSrc}
            src={imageSrc}
          />
        )}
      </a>

      <button type="button" className="ods-cross-sell-card__cta">
        {ctaText}{' '}
        <span className="ods-cross-sell-card__cta-icon">
          {customIcon || <ChevronRight />}
        </span>
      </button>
    </div>
  )
);

CrossSellCard.displayName = 'CrossSellCard';

export default CrossSellCard;
