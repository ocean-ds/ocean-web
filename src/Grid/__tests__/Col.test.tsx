import React from 'react';
import { render } from '@testing-library/react';

import Col from '../Col';

test('renders element properly', () => {
  const { getByTestId } = render(
    <Col
      data-testid="grid-col"
      className="other-css-class__1 other-css-class__2"
    >
      Col rendering
    </Col>
  );

  expect(getByTestId('grid-col')).toMatchInlineSnapshot(`
    <div
      class="ods-col other-css-class__1 other-css-class__2"
      data-testid="grid-col"
    >
      Col rendering
    </div>
  `);
});

test('includes "ods-col" when xs is true', () => {
  const { getByTestId } = render(<Col data-testid="grid-col" xs />);
  expect(getByTestId('grid-col').className).toBe('ods-col');
});

test('includes "ods-col" when span of xs is true', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" xs={{ span: true }}>
      span:true
    </Col>
  );

  expect(getByTestId('grid-col').className).toBe('ods-col');
});

test('includes sizes', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" xs="4" md="8" lg={{ span: '12' }} />
  );

  expect(getByTestId('grid-col').className).toBe(
    'ods-col-4 ods-col-md-8 ods-col-lg-12'
  );
});

test('includes offsets', () => {
  const { getByTestId } = render(
    <Col
      data-testid="grid-col"
      xs={{ span: '4', offset: '1' }}
      md={{ span: '8', order: '1' }}
      lg={{ order: 'last' }}
    />
  );

  expect(getByTestId('grid-col').className).toBe(
    'ods-col-4 offset-1 ods-col-md-8 order-md-1 ods-col-lg order-lg-last'
  );
});

it('allows span to be false', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" xs="6" md={{ span: false, order: 'first' }} />
  );

  expect(getByTestId('grid-col').className).toBe('ods-col-6 order-md-first');
});

it('allows span to be auto', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" md="auto" lg={{ span: 'auto' }} />
  );

  expect(getByTestId('grid-col').className).toBe(
    'ods-col-md-auto ods-col-lg-auto'
  );
});
