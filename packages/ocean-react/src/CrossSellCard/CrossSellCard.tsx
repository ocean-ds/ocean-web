import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import { ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';

export type CrossSellCardProps = {
  /**
   * Determines the card title
   */
  title: string;
  /**
   * Determines the title color
   */
  titleColor?: string;
  /**
   * Determines the card description
   */
  description: string;
  /**
   * Determines the description color
   */
  descriptionColor?: string;
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
  /**
   * Determines the background color
   */
  backgroundColor?: string;
} & ComponentPropsWithoutRef<'div'>;

const CrossSellCard = forwardRef<HTMLDivElement, CrossSellCardProps>(
  function CrossSellCard(
    {
      title,
      description,
      titleColor = 'white',
      descriptionColor = '#b8c3ff',
      className,
      imageSrc,
      ctaText,
      ctaAction,
      customIcon,
      backgroundColor = '#0025e0',
      ...rest
    },
    ref
  ) {
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
          style={{ background: backgroundColor }}
        >
          <div className="ods-cross-sell-card__information">
            <div
              className="ods-typography--inverse ods-typography__heading3"
              style={{ color: titleColor }}
            >
              {title}
            </div>
            <div
              className="ods-typography--inverse ods-typography__description ods-cross-sell-card__description"
              style={{ color: descriptionColor }}
            >
              {description}
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
