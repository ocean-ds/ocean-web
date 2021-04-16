import React from 'react';
import { render, screen } from '@testing-library/react';

import Row from '../Row';

test('render element properly', () => {
  render(
    <Row data-testid="grid-row" className="custom-class">
      Row rendering
    </Row>
  );

  expect(screen.getByTestId('grid-row')).toMatchInlineSnapshot(`
    <div
      class="ods-row custom-class"
      data-testid="grid-row"
    >
      Row rendering
    </div>
  `);
});

test('render no-gutters correctly', () => {
  render(<Row data-testid="grid-row" noGutters />);
  expect(screen.getByTestId('grid-row')).toHaveClass('ods-row ods-no-gutters', {
    exact: true,
  });
});

test('include number sizes', () => {
  render(<Row data-testid="grid-row" xs="4" md="6" />);
  expect(
    screen.getByTestId('grid-row')
  ).toHaveClass('ods-row ods-row-cols-4 ods-row-cols-md-6', { exact: true });
});
