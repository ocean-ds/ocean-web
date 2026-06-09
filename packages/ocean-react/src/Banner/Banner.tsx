import React from 'react';
import classNames from 'classnames';

import Button from '../Button';

export type ButtonProps = {
  /**
   * The label text of the button.
   */
  label: string;
  /**
   * The action triggered when the button is clicked.
   */
  onClick: () => void;
};

export type BannerProps = {
  /**
   * Determines the layout of the banner.
   * - `large`: image on top (full-width), then title/description/buttons below.
   * - `small`: image on the right (25% width), title/description/buttons on the left.
   */
  size: 'large' | 'small';
  /**
   * Determines the visual type of the banner.
   * @default 'default'
   */
  type?: 'default' | 'warning' | 'negative' | 'emphasys';
  /**
   * The main title displayed in the banner.
   */
  title: string;
  /**
   * Optional description text displayed below the title.
   */
  description?: string;
  /**
   * Optional image URL. When absent, no image area is rendered.
   */
  image?: string;
  /**
   * Optional array of buttons (max 2). When empty or absent, no buttons are rendered.
   */
  buttons?: ButtonProps[];
  /**
   * Optional custom background color that overrides the type default.
   */
  backgroundColor?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      size,
      type = 'default',
      title,
      description,
      image,
      buttons,
      backgroundColor,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const isEmphasys = type === 'emphasys';
    const buttonVariant = isEmphasys ? 'inverse' : 'primary';
    const visibleButtons = buttons?.slice(0, 2);

    const inlineStyle: React.CSSProperties = {
      ...style,
      ...(backgroundColor ? { backgroundColor } : {}),
    };

    const imageEl = image ? (
      <img className="ods-banner__image" src={image} alt="" aria-hidden="true" />
    ) : null;

    return (
      <div
        ref={ref}
        {...rest}
        className={classNames(
          'ods-banner',
          `ods-banner--${size}`,
          `ods-banner--${type}`,
          className
        )}
        style={inlineStyle}
      >
        {imageEl && size === 'large' && (
          <div className="ods-banner__image-wrapper ods-banner__image-wrapper--top">
            {imageEl}
          </div>
        )}

        <div className="ods-banner__body">
          <div className="ods-banner__content">
            <div className="ods-banner__title">{title}</div>

            {description && (
              <div className="ods-banner__description">{description}</div>
            )}

            {visibleButtons && visibleButtons.length > 0 && (
              <div className="ods-banner__actions">
                {visibleButtons.map((btn, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={buttonVariant}
                    onClick={btn.onClick}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {imageEl && size === 'small' && (
            <div className="ods-banner__image-wrapper ods-banner__image-wrapper--side">
              {imageEl}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Banner.displayName = 'Banner';

export default Banner;
