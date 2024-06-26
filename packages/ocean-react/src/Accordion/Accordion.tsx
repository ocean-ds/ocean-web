import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronDown } from '@useblu/ocean-icons-react';

export type AccordionProps = {
  title: string;
  description: string;
  className?: string;
};

const Accordion = ({
  title,
  description,
  className,
}: AccordionProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onHandleAccordion = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className={classNames('ods-accordion', className)}>
      <button
        onClick={onHandleAccordion}
        type="button"
        className={classNames('ods-accordion__header', {
          'ods-accordion__header--collapsed': isCollapsed,
        })}
        aria-expanded={!isCollapsed}
        data-testid="accordion-header"
      >
        {title}
        <ChevronDown
          className={classNames('ods-accordion__icon', {
            'ods-accordion__icon--rotated': isCollapsed,
          })}
        />
      </button>
      <div
        className={classNames('ods-accordion__content', {
          'ods-accordion__content--collapsed': isCollapsed,
        })}
      >
        <p className="ods-accordion__description">{description}</p>
      </div>
    </div>
  );
};

export default Accordion;
