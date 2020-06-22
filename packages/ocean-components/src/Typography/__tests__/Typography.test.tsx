import React from 'react';
import { render } from '@testing-library/react';

import Typography from '../Typography';

test('render', () => {
  const { getByText } = render(
    <Typography variant="heading1">Hello there</Typography>
  );

  expect(getByText('Hello there')).toMatchInlineSnapshot(`
    <h1
      class="typography typography__heading1"
    >
      Hello there
    </h1>
  `);
});
