import React from 'react';

import Button from '../../Button';
import Typography from '../../Typography';

export const SAMPLE_TITLE = 'Drawer title';
export const SAMPLE_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipi elit. Semper diam adipiscing.';

export const SampleContent = (): React.ReactElement => (
  <Typography variant="paragraph">{SAMPLE_TEXT}</Typography>
);

export const SampleActions = (): React.ReactElement => (
  <div style={{ display: 'flex', gap: 12, width: '100%' }}>
    <Button variant="secondary" blocked>
      Label
    </Button>
    <Button blocked>Label</Button>
  </div>
);
