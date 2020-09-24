import React, { useRef } from 'react';
import classNames from 'classnames';

import './styles/drawer.scss';

type DrawerProps = {
  children?: React.ReactElement;

  open: boolean;

  onClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ children, open, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      const listener = keyListenersMap.get(e.key);
      return listener && listener(e);
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableModalElements = drawerRef.current?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    if (focusableModalElements && focusableModalElements.length > 0) {
      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];

      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  const keyListenersMap = new Map([
    ['Escape', onClose],
    ['Tab', handleTabKey],
  ]);

  const handleClickOut = () => {
    onClose();
  };

  return (
    <div>
      {open && <div className="ods-backdrop" onMouseDown={handleClickOut} />}
      <aside
        ref={drawerRef}
        role="tablist"
        tabIndex={-1}
        className={classNames('ods-drawer', {
          'ods-drawer-open': open,
        })}
      >
        <div className="ods-drawer-handle">
          <div className="ods-drawer-handle-item" />
        </div>
        <div className="ods-drawer-container">{children}</div>
      </aside>
    </div>
  );
};

export default Drawer;
