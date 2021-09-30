import React from 'react';
import classNames from 'classnames';
import { RefreshOutline } from '@useblu/ocean-icons-react';

const BannerChild: React.FC = () => {
  return (
    <div className={classNames('ods-carousel-example')}>
      <RefreshOutline />
      Click me!
    </div>
  );
};

export default BannerChild;
