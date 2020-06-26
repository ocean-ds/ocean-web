import React from 'react';
import { render } from '@testing-library/react';

import Typography, { defaultTypesMapping, Variant } from '../Typography';

test('render element', () => {
  const { getByText } = render(
    <Typography
      variant="heading1"
      data-cy="typo-heading1"
      style={{ width: 200 }}
    >
      Hello
    </Typography>
  );

  expect(getByText('Hello')).toMatchInlineSnapshot(`
    <h1
      class="ods-typography ods-typography__heading1"
      data-cy="typo-heading1"
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

test('render another class', () => {
  const { getByText } = render(
    <Typography
      variant="paragraph"
      data-cy="typo-heading1"
      style={{ width: 200 }}
      className="another-css-class__1 another-css-class__2"
    >
      My Text
    </Typography>
  );

  expect(getByText('My Text')).toHaveClass(
    `ods-typography ods-typography__paragraph another-css-class__1 another-css-class__2`
  );
});
