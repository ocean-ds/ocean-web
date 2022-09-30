import React from 'react';
import { ChevronRight, ExternalLink } from '@useblu/ocean-icons-react';

type LinkIconProps = {
  icon?: 'LinkChevron' | 'externalLink';
};

const mapIconsByType = {
  LinkChevron: ChevronRight,
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
        data-testid="link-icon"
      />
    );
  }

  return <></>;
});

export default LinkIcons;
