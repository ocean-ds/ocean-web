import { ComponentPropsWithoutRef } from 'react';

export type ActionItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /**
   * Variant that influences the color of the action item.
   */
  variant?: 'default' | 'positive' | 'warning' | 'negative' | 'neutral';
};

export type InternalListActionsProps = {
  /**
   * List of actions to display in the dropdown menu.
   */
  actions: ActionItem[];
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Position of the dropdown menu relative to the button.
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * Enable mobile mode behavior. When true, shows mobile version on small screens.
   * When false, always shows desktop version.
   * @default true
   */
  withMobileMode?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
