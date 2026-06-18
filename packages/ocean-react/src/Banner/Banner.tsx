import React from 'react';
import classNames from 'classnames';

import Button from '../Button';
import Typography from '../Typography';

export type ActionProps = {
  label: string;
  onClick: () => void;
};

export type BannerProps = {
  /**
   * Determines the layout of the banner.
   * - `large`: image on top (full-width), then title/description/buttons below.
   * - `small`: image on the right (82px width), title/description/buttons on the left.
   * @default 'large'
   */
  size?: 'large' | 'small';
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
   * Primary action button. Variant is derived from `type`.
   */
  primaryAction?: ActionProps;
  /**
   * Secondary action button. Variant is derived from `type`.
   */
  secondaryAction?: ActionProps;
} & React.ComponentPropsWithoutRef<'div'>;

const PRIMARY_VARIANT_MAP = {
  default: 'primary',
  warning: 'primaryWarning',
  negative: 'primaryCritical',
  emphasys: 'secondary',
} as const;

const SECONDARY_VARIANT_MAP = {
  default: 'tertiary',
  warning: 'tertiaryWarning',
  negative: 'tertiaryCritical',
  emphasys: 'tertiary',
} as const;

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      size = 'large',
      type = 'default',
      title,
      description,
      image,
      primaryAction,
      secondaryAction,
      className,
      ...rest
    },
    ref
  ) => {
    const isEmphasys = type === 'emphasys';
    const hasActions = primaryAction || secondaryAction;

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
      >
        {imageEl && size === 'large' && (
          <div className="ods-banner__image-wrapper ods-banner__image-wrapper--top">
            {imageEl}
          </div>
        )}

        <div className="ods-banner__body">
          <div className="ods-banner__content">
            <Typography
              variant="heading4"
              inverse={isEmphasys}
              className="ods-banner__title"
            >
              {title}
            </Typography>

            {description && (
              <Typography
                variant="description"
                inverse={isEmphasys}
                className="ods-banner__description"
              >
                {description}
              </Typography>
            )}

            {hasActions && (
              <div className="ods-banner__actions">
                {primaryAction && (
                  <Button
                    size="sm"
                    variant={PRIMARY_VARIANT_MAP[type]}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    size="sm"
                    variant={SECONDARY_VARIANT_MAP[type]}
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
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
