import React from 'react';
import classNames from 'classnames';
import { Calendar, CheckCircle, X, XCircle } from '@useblu/ocean-icons-react';

import Button from '../Button';
import IconButton from '../IconButton';
import Tag from '../Tag';
import type { TagProps } from '../Tag/Tag';
import Typography from '../Typography';

export type SuccessScreenAction = {
  label: string;
  onClick?: () => void;
};

export type SuccessScreenProps = {
  status?: 'positive' | 'neutral' | 'negative';
  title: string;
  description?: string;
  extraInformation?: string;
  children?: React.ReactNode;
  primaryAction?: SuccessScreenAction;
  secondaryAction?: SuccessScreenAction;
  showTopBar?: boolean;
  onClose?: () => void;
  closeButtonAriaLabel?: string;
  tagLabel?: string;
  tagIcon?: React.ReactElement;
} & React.ComponentPropsWithoutRef<'div'>;

const SuccessScreen = React.forwardRef<HTMLDivElement, SuccessScreenProps>(
  (
    {
      status = 'positive',
      title,
      description,
      extraInformation,
      children,
      primaryAction,
      secondaryAction,
      showTopBar = false,
      onClose,
      closeButtonAriaLabel = 'Fechar',
      tagLabel,
      tagIcon,
      className,
      ...rest
    },
    ref
  ) => {
    let tagProps: TagProps;
    if (status === 'positive') {
      tagProps = {
        type: 'positive',
        appearance: 'translucent',
        icon: tagIcon ?? <CheckCircle size={16} />,
      };
    } else if (status === 'neutral') {
      tagProps = {
        type: 'neutral-02',
        appearance: 'translucent',
        icon: tagIcon ?? <Calendar size={16} />,
      };
    } else {
      tagProps = {
        type: 'neutral',
        appearance: 'translucent',
        icon: tagIcon ?? <XCircle size={16} />,
      };
    }

    return (
      <div
        ref={ref}
        className={classNames(
          'ods-success-screen',
          `ods-success-screen--${status}`,
          className
        )}
        {...rest}
      >
        <div className="ods-success-screen__card">
          <header className="ods-success-screen__header">
            {showTopBar && (
              <div className="ods-success-screen__topbar">
                <IconButton
                  className="ods-success-screen__close"
                  size="sm"
                  aria-label={closeButtonAriaLabel}
                  onClick={onClose}
                >
                  <X size={20} />
                </IconButton>
              </div>
            )}
            <div className="ods-success-screen__header-content">
              {tagLabel && (
                <Tag {...tagProps} className="ods-success-screen__tag">
                  {tagLabel}
                </Tag>
              )}
              <div className="ods-success-screen__text">
                <Typography
                  variant="heading3"
                  inverse={status !== 'neutral'}
                  className="ods-success-screen__title"
                >
                  {title}
                </Typography>
                {description && (
                  <Typography
                    variant="description"
                    inverse={status !== 'neutral'}
                    className="ods-success-screen__description"
                  >
                    {description}
                  </Typography>
                )}
              </div>
            </div>
          </header>
          <div className="ods-success-screen__details">
            {children && (
              <div className="ods-success-screen__content">{children}</div>
            )}
            {extraInformation && (
              <Typography
                variant="captionbold"
                className="ods-success-screen__extra-information"
              >
                {extraInformation}
              </Typography>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="ods-success-screen__actions">
                {secondaryAction && (
                  <Button variant="secondary" onClick={secondaryAction.onClick}>
                    {secondaryAction.label}
                  </Button>
                )}
                {primaryAction && (
                  <Button variant="primary" onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

SuccessScreen.displayName = 'SuccessScreen';

export default SuccessScreen;
