import { ChevronRight } from '@useblu/ocean-icons-react';
import React from 'react';
import Badge from '../Badge';

interface IActionButtonProps {
  actionLabel?: string;
  actionCount: number;
  actionClick?: () => void;
}

const ActionButton = ({
  actionLabel,
  actionCount,
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
      <div className="ods-card-group__action--right">
        <Badge
          variation="medium"
          color={actionCount === 0 ? 'neutral' : 'alert'}
          count={actionCount}
        />
        <ChevronRight size={20} />
      </div>
    </button>
  </>
);

export default ActionButton;
