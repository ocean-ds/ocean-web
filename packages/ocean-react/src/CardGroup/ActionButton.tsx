import { ChevronRight } from '@useblu/ocean-icons-react';
import React from 'react';
import Badge from '../Badge';

type BadgeColor = 'brand' | 'complementary' | 'alert' | 'neutral' | 'highlight';

interface IActionButtonProps {
  actionLabel?: string;
  actionCount?: number;
  actionClick?: () => void;
  actionBadgeColor?: BadgeColor;
}

const ActionButton = ({
  actionLabel,
  actionCount,
  actionClick,
  actionBadgeColor,
}: IActionButtonProps): JSX.Element => {
  const badgeColor: BadgeColor =
    actionBadgeColor ?? (actionCount === 0 ? 'neutral' : 'alert');

  return (
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
          {actionCount !== undefined && (
            <Badge variation="medium" color={badgeColor} count={actionCount} />
          )}
          <ChevronRight size={20} />
        </div>
      </button>
    </>
  );
};

export default ActionButton;
