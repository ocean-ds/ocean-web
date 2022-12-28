import { ComponentPropsWithoutRef } from 'react';

export type texts = {
  text: string;
  color: string;
};

export type CrossSellCardProps = {
  /**
   * Determines the card title
   */
  title: string | texts;
  /**
   * Determines the card description
   */
  description: string | texts;
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
