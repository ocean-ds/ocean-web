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
   * Type of action to display.
   * - 'menu': Shows a dropdown menu with three-dot icon (desktop style)
   * - 'swipe': Always shows swipe interface with handle (mobile style), regardless of device
   * @default 'menu'
   */
  actionType?: 'menu' | 'swipe';
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
