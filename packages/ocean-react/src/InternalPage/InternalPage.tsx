import React, { forwardRef } from 'react';

import { Typography, Steps, Breadcrumb } from '..';

import { InternalPageProps } from './types';

const InternalPage = forwardRef<HTMLDivElement, InternalPageProps>(
  function InternalPage(
    { children, main, navigation, action, steps, content, ...rest },
    ref
  ) {
    return (
      <div {...rest} ref={ref} className="ods-internal-page">
        {navigation && (
          <div className="ods-internal-page__navigation">
            <Breadcrumb items={navigation} />
          </div>
        )}

        <div className="ods-internal-page__main">
          {action && <div className="ods-internal-page__action">{action}</div>}
          <h2 className="ods-internal-page__main--title">{main.title}</h2>
          {main.description && (
            <p className="ods-internal-page__main--description">
              {main.description}
            </p>
          )}
        </div>

        {steps && (
          <div className="ods-internal-page__steps">
            <Steps {...steps} />
          </div>
        )}

        {(content?.title || content?.description) && (
          <div className="ods-internal-page__content">
            <h3 className="ods-internal-page__content--title">
              {content?.title}
            </h3>
            <Typography variant="description">
              {content?.description}
            </Typography>
          </div>
        )}

        <div className="ods-internal-page__container">{children}</div>
      </div>
    );
  }
);

export default InternalPage;

{
  /* <InternalPage steps={} /> */
}
