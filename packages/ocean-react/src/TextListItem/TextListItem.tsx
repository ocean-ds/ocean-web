import { ChevronRight } from '@useblu/ocean-icons-react';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Tag from '../Tag';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import Radio, { RadioProps } from '../Radio/Radio';

export type TextListItemProps = {
  /**
   * The title of the component.
   */
  title: string;
  /**
   * The description of the component.
   */
  description: string;
  /**
   * The caption of the component.
   */
  caption?: string;
  /**
   * Show an action icon on the right side of the component.
   */
  tagLabel?: string;
  /**
   * The info text of the component.
   */
  infoText?: string;
  /**
   * The type of the info text.
   */
  infoTextType?: 'neutral' | 'positive';
  /**
   * Show an action icon on the right side of the component.
   */
  withAction?: boolean;
  /**
   * Callback function when the action icon is clicked.
   */
  onActionClick?: () => void;
  /**
   * Show a checkbox on the left side of the component.
   */
  checkbox?: CheckboxProps;
  /**
   * Show a radio on the left side of the component.
   */
  radio?: RadioProps;
  /**
   * The class name of the component.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const TextListItem = React.forwardRef<HTMLDivElement, TextListItemProps>(
  (
    {
      title,
      description,
      caption,
      tagLabel,
      infoText,
      infoTextType = 'neutral',
      withAction,
      onActionClick,
      checkbox,
      radio,
      className,
      ...rest
    },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isWide, setIsWide] = useState(false);

    useEffect(() => {
      const updateWidth = () => {
        if (elementRef.current) {
          const width = elementRef.current.offsetWidth;
          setIsWide(width >= 992);
        }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);

      return () => {
        window.removeEventListener('resize', updateWidth);
      };
    }, []);

    const textListitem = useMemo(
      () => (
        <div
          ref={elementRef}
          onClick={onActionClick}
          role="button"
          tabIndex={0}
        >
          <div
            className={classNames('ods-text-list-item', className, {
              'ods-text-list-item--with-action': withAction,
              'ods-text-list-item--wide': isWide,
              'ods-text-list-item--selectable': checkbox || radio,
            })}
            ref={ref}
            {...rest}
          >
            <div className="ods-text-list-item__default-content">
              <p className="ods-typography ods-typography__paragraph">
                {title}
                {tagLabel && (
                  <Tag type="neutral" size="medium">
                    {tagLabel}
                  </Tag>
                )}
              </p>
              <p className="ods-typography ods-typography__description">
                {description}
              </p>
              {caption && (
                <p className="ods-typography ods-typography__captionbold">
                  {caption}
                </p>
              )}
            </div>
            {infoText && (
              <p
                className={classNames(
                  'ods-typography ods-typography__description',
                  'ods-text-list-item__info-text',
                  `ods-text-list-item__info-text--${infoTextType}`
                )}
              >
                {infoText}
              </p>
            )}
            {withAction && <ChevronRight />}
          </div>
        </div>
      ),
      [
        title,
        description,
        caption,
        tagLabel,
        infoText,
        infoTextType,
        withAction,
        onActionClick,
        checkbox,
        radio,
        className,
        isWide,
        ref,
        rest,
      ]
    );

    if (checkbox) {
      return (
        <div className="ods-text-list-item-selectable" ref={elementRef}>
          <Checkbox {...checkbox} label={textListitem} />
        </div>
      );
    }

    if (radio) {
      return (
        <div className="ods-text-list-item-selectable" ref={elementRef}>
          <Radio {...radio} label={textListitem} />
        </div>
      );
    }

    return textListitem;
  }
);

TextListItem.displayName = 'TextListItem';

export default TextListItem;
