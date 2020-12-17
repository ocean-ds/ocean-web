import React from 'react';
import { render } from '@testing-library/react';

import Row from '../Row';

test('render element properly', () => {
  const { getByTestId } = render(
    <Row data-testid="grid-row" className="custom-class">
      Row rendering
    </Row>
  );

  expect(getByTestId('grid-row')).toMatchInlineSnapshot(`
    <div
      class="ods-row custom-class"
      data-testid="grid-row"
    >
      Row rendering
    </div>
  `);
});

test('render no-gutters correctly', () => {
  const { getByTestId } = render(<Row data-testid="grid-row" noGutters />);
  expect(getByTestId('grid-row')).toHaveClass('ods-row ods-no-gutters', {
    exact: true,
  });
});

test('include number sizes', () => {
  const { getByTestId } = render(<Row data-testid="grid-row" xs="4" md="6" />);
  expect(
    getByTestId('grid-row')
  ).toHaveClass('ods-row ods-row-cols-4 ods-row-cols-md-6', { exact: true });
});
