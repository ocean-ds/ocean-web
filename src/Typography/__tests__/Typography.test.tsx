import React from 'react';
import { render } from '@testing-library/react';

import Typography, { defaultTypesMapping, Variant } from '../Typography';

test('render element properly', () => {
  const { getByTestId } = render(
    <Typography
      variant="heading1"
      data-testid="typo-heading1"
      style={{ width: 200 }}
      className="other-css-class__1 other-css-class__2"
    >
      Hello
    </Typography>
  );

  expect(getByTestId('typo-heading1')).toMatchInlineSnapshot(`
    <h1
      class="ods-typography ods-typography__heading1 other-css-class__1 other-css-class__2"
      data-testid="typo-heading1"
      style="width: 200px;"
    >
      Hello
    </h1>
  `);
});

test.each(Object.keys(defaultTypesMapping))(
  'render `%s` variant class',
  (variant) => {
    const { getByText } = render(
      <Typography variant={variant as Variant}>Hey</Typography>
    );

    expect(getByText('Hey')).toHaveClass(
      `ods-typography ods-typography__${variant}`
    );
  }
);
