import { ChevronRight } from '@useblu/ocean-icons-react';
import React from 'react';

interface IActionButtonProps {
  actionLabel?: string;
  actionClick?: () => void;
}

const ActionButton = ({
  actionLabel,
  actionClick,
}: IActionButtonProps): JSX.Element => (
  <>
    <hr className="ods-divider" />
    <button
      onClick={actionClick}
      type="button"
      className="ods-card-group__action"
      aria-label={actionLabel}
    >
      <span className="ods-card-group__action--label">{actionLabel}</span>
      <ChevronRight size={20} />
    </button>
  </>
);

export default ActionButton;
