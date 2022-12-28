import React, { forwardRef } from 'react';
import { ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

import { CrossSellCardProps } from './types';

const CrossSellCard = forwardRef<HTMLDivElement, CrossSellCardProps>(
  function CrossSellCard(
    {
      title,
      className,
      description,
      imageSrc,
      ctaText,
      ctaAction,
      customIcon,
      backgroundColor,
      ...rest
    },
    ref
  ) {
    const titleCard: string = typeof title === 'string' ? title : title['text'];
    const descriptionCard: string =
      typeof description === 'string' ? description : description['text'];

    const titleColor: string =
      typeof title === 'string' ? 'white' : title['color'];
    const descriptionColor: string =
      typeof description === 'string' ? '#b8c3ff' : description['color'];

    return (
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
          style={{ background: backgroundColor || '#0025e0' }}
        >
          <div className="ods-cross-sell-card__information">
            <div
              className="ods-typography--inverse ods-typography__heading3"
              style={{ color: titleColor }}
            >
              {titleCard}
            </div>
            <div
              className="ods-typography--inverse ods-typography__description ods-cross-sell-card__description"
              style={{ color: descriptionColor }}
            >
              {descriptionCard}
            </div>
          </div>
          {imageSrc && (
            <img className="ods-cross-sell-card__image" src={imageSrc} />
          )}
        </a>

        <button className="ods-cross-sell-card__cta">
          {ctaText}{' '}
          <span className="ods-cross-sell-card__cta-icon">
            {customIcon || <ChevronRight />}
          </span>
        </button>
      </div>
    );
  }
);

export default CrossSellCard;
