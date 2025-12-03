import React from 'react';

interface MenuBackdropProps {
  onClick: () => void;
}

const MenuBackdrop: React.FC<MenuBackdropProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className="ods-internal-list-actions__backdrop"
      onClick={handleClick}
      aria-hidden="true"
    />
  );
};

export default MenuBackdrop;
