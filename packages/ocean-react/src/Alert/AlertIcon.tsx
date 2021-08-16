import React from 'react';
import {
  XCircleOutline,
  InformationCircleOutline,
  ExclamationCircleOutline,
  CheckCircleOutline,
} from '@useblu/ocean-icons-react';

export type AlertIconProps = {
  /**
   * Determines the type of alert, with default icon and colors for each type
   */
  type: 'success' | 'warning' | 'error' | 'default';
  /**
   * Sets a title for the Alert
   */
  icon?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const mapIconsByType = {
  warning: ExclamationCircleOutline,
  error: XCircleOutline,
  success: CheckCircleOutline,
  default: InformationCircleOutline,
};

const AlertIcon = React.memo<AlertIconProps>(function AlertIcon({
  type,
  icon,
}) {
  const IconEl = mapIconsByType[type];

  if (icon) return <div className="ods-alert__icon">{icon}</div>;

  return (
    <IconEl
      size={24}
      className="ods-alert__icon"
      aria-hidden
      focusable={false}
    />
  );
});

export default AlertIcon;
