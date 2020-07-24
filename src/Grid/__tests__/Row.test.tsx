import React from 'react';
import { render } from '@testing-library/react';

import Row from '../Row';

test('render element properly', () => {
  const { getByTestId } = render(
    <Row
      data-testid="grid-row"
      className="other-css-class__1 other-css-class__2"
    >
      Row rendering
    </Row>
  );

  expect(getByTestId('grid-row')).toMatchInlineSnapshot(`
    <div
      class="ods-row other-css-class__1 other-css-class__2"
      data-testid="grid-row"
    >
      Row rendering
    </div>
  `);
});

test('render no-gutters correctly', () => {
  const { getByTestId } = render(
    <Row data-testid="grid-row" noGutters>
      no-gutters
    </Row>
  );

  expect(getByTestId('grid-row')).toHaveClass('ods-row ods-no-gutters');
});

test('include number sizes', () => {
  const { getByTestId } = render(
    <Row data-testid="grid-row" xs="3" sm="7" md="5" lg="1" xl="11">
      include number sizes
    </Row>
  );

  expect(getByTestId('grid-row')).toHaveClass('ods-row');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-3');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-sm-7');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-md-5');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-lg-1');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-xl-11');
});

test('include auto sizes', () => {
  const { getByTestId } = render(
    <Row
      data-testid="grid-row"
      xs="auto"
      sm="auto"
      md="auto"
      lg="auto"
      xl="auto"
    >
      include auto sizes
    </Row>
  );

  expect(getByTestId('grid-row')).toHaveClass('ods-row');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-auto');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-sm-auto');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-md-auto');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-lg-auto');
  expect(getByTestId('grid-row')).toHaveClass('ods-row-xl-auto');
});
