import React from 'react';
import {
  XCircleOutline,
  InformationCircleOutline,
  ExclamationCircleOutline,
  CheckCircleOutline,
} from '@useblu/ocean-icons-react';

type AlertIconProps = {
  type: 'success' | 'warning' | 'error' | 'default';
  icon?: React.ReactElement;
};

const mapIconsByType = {
  warning: ExclamationCircleOutline,
  error: XCircleOutline,
  success: CheckCircleOutline,
  default: InformationCircleOutline,
};

const AlertIcon = React.memo<AlertIconProps>(({ type, icon }) => {
  const IconEl = mapIconsByType[type];

  if (icon) return React.cloneElement(icon, { className: 'ods-alert__icon' });

  return <IconEl size={24} className="ods-alert__icon" focusable={false} />;
});

AlertIcon.displayName = 'AlertIcon';

export default AlertIcon;
