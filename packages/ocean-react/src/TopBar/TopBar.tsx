import { ArrowLeftOutline, SearchOutline } from '@useblu/ocean-icons-react';
import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="ods-topbar">
      <div className="ods-topbar-prev">
        <ArrowLeftOutline />
      </div>
      {/* <div className="ods-topbar-title">
          Title
          <span>Description</span>
        </div> */}
      <div className="ods-topbar-search">
        <SearchOutline />
      </div>

      <div className="ods-topbar-title">
        Title
        <span>Description</span>
      </div>
    </div>
  );
};

export default TopBar;
