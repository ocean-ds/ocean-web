import React from 'react';

interface MenuBackdropProps {
  onClick: () => void;
}

export const MenuBackdrop: React.FC<MenuBackdropProps> = ({ onClick }) => {
  return (
    <div
      className="ods-internal-list-actions__backdrop"
      onClick={onClick}
      aria-hidden="true"
    />
  );
};
