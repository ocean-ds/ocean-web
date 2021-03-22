import React from 'react';
import { render, screen } from '@testing-library/react';

import Typography, { defaultTypesMapping, Variant } from '../Typography';

test('renders element properly', () => {
  render(
    <Typography
      variant="heading1"
      data-testid="typo-heading1"
      className="custom-class"
    >
      Hello
    </Typography>
  );

  expect(screen.getByTestId('typo-heading1')).toMatchInlineSnapshot(`
    <h1
      class="ods-typography ods-typography__heading1 custom-class"
      data-testid="typo-heading1"
    >
      Hello
    </h1>
  `);
});

test.each(Object.keys(defaultTypesMapping))(
  'render `%s` variant class',
  (variant) => {
    render(<Typography variant={variant as Variant}>Hey</Typography>);

    expect(screen.getByText('Hey')).toHaveClass(
      `ods-typography ods-typography__${variant}`
    );
  }
);

test('renders an inverse typography', () => {
  render(
    <Typography variant="heading1" data-testid="typo-heading1" inverse>
      Hello
    </Typography>
  );
  expect(screen.getByTestId('typo-heading1')).toHaveClass(
    'ods-typography--inverse'
  );
});
