import React from 'react';
import { ChevronRight, ExternalLink } from '@useblu/ocean-icons-react';

type LinkIconProps = {
  icon?: 'linkArrow' | 'externalLink';
};

const mapIconsByType = {
  linkArrow: ChevronRight,
  externalLink: ExternalLink,
};

const LinkIcons = React.memo<LinkIconProps>(function LinkIcons({ icon }) {
  if (icon) {
    const IconElement = mapIconsByType[icon];

    return (
      <IconElement
        size={16}
        className="ods-link__icon"
        aria-hidden
        focusable={false}
      />
    );
  }

  return <></>;
});

export default LinkIcons;
