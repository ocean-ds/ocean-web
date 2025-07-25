import React, { ReactElement } from 'react';

export type SkeletonBarProps = {
  width: string;
  height: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SkeletonBar = ({
  width,
  height,
  ...props
}: SkeletonBarProps): ReactElement => (
  <div className="ods-skeleton-bar" style={{ width, height }} {...props} />
);

export default SkeletonBar;
