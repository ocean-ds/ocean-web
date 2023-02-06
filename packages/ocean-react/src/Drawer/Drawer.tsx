import classNames from 'classnames';
import React from 'react';

const Drawer = ({
  children,
  open,
  onDrawerClose,
  backDropClose,
}): React.ReactElement => {
  const a = '';

  console.log('ded', open);

  return (
    <>
      <div
        className={classNames('backdrop', open && 'backdrop_open')}
        aria-hidden="true"
        onClick={backDropClose}
      />
      <div className={classNames('drawer', open && 'drawer_open')}>
        {children}
      </div>
    </>
  );
};

export default Drawer;
