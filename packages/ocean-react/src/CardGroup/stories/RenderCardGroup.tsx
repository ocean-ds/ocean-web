import React from 'react';
import CardGroup, { ICardGroupProps } from '../CardGroup';

const RenderCardGroup = (props: ICardGroupProps): JSX.Element => (
  <div style={{ minWidth: '328px' }}>
    <CardGroup {...props} />
  </div>
);

export default RenderCardGroup;
