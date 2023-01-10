import React from 'react';
import { ChevronRight, ExternalLink } from '@useblu/ocean-icons-react';

type LinkIconProps = {
  icon?: 'linkChevron' | 'externalLink';
};

const mapIconsByType = {
  linkChevron: ChevronRight,
  externalLink: ExternalLink,
};

const LinkIcons = React.memo<LinkIconProps>(({ icon }) => {
  if (icon) {
    const IconElement = mapIconsByType[icon];

    return (
      <IconElement
        size={16}
        className="ods-link__icon"
        aria-hidden
        focusable={false}
        data-testid="link-icon"
      />
    );
  }

  return <></>;
});

LinkIcons.displayName = 'LinkIcons';

export default LinkIcons;
