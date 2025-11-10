import React from 'react';

interface MenuBackdropProps {
  onClick: () => void;
}

const MenuBackdrop: React.FC<MenuBackdropProps> = ({ onClick }) => (
  <div
    className="ods-internal-list-actions__backdrop"
    onClick={onClick}
    aria-hidden="true"
  />
);

export default MenuBackdrop;
