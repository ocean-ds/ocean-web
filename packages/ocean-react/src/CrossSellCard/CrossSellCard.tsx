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
   * Determines the cta action
   */
  ctaAction: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

const CrossSellCard = React.forwardRef<HTMLDivElement, CrossSellCardProps>(
  function CrossSellCard(
    { title, className, description, imageSrc, ctaText, ctaAction, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        {...rest}
        className={classNames('ods-cross-sell-card', className)}
        onClick={ctaAction}
      >
        <div
          className="ods-cross-sell-card__content"
          onClick={() => ctaAction}
          data-testid="cta-test"
        >
          <div className="ods-cross-sell-card__information">
            <div className="ods-typography--inverse ods-typography__heading3">
              {title}
            </div>
            <div className="ods-typography--inverse ods-typography__description ods-cross-sell-card__description ">
              {description}
            </div>
          </div>
          {imageSrc && (
            <img className="ods-cross-sell-card__image" src={imageSrc} />
          )}
        </div>

        <button className="ods-cross-sell-card__cta">
          {ctaText} <ChevronRight className="ods-cross-sell-card__cta-icon" />
        </button>
      </div>
    );
  }
);

export default CrossSellCard;
