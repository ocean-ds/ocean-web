import React, { ReactNode } from 'react';

/** Contains the drawer and its scrim inside the example instead of the screen. */
export const DrawerFrame = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => <div className="odoc-drawer-frame">{children}</div>;

export default DrawerFrame;
