import React from 'react';
import { render } from '@testing-library/react';

import Col from '../Col';

test('renders element properly', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" className="custom-class">
      Col rendering
    </Col>
  );

  expect(getByTestId('grid-col')).toMatchInlineSnapshot(`
    <div
      class="ods-col custom-class"
      data-testid="grid-col"
    >
      Col rendering
    </div>
  `);
});

test('includes "ods-col" when xs is true', () => {
  const { getByTestId } = render(<Col data-testid="grid-col" xs />);
  expect(getByTestId('grid-col')).toHaveClass('ods-col', { exact: true });
});

test('includes "ods-col" when span of xs is true', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" xs={{ span: true }} />
  );

  expect(getByTestId('grid-col')).toHaveClass('ods-col', { exact: true });
});

test('includes sizes', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" xs="4" md="8" lg={{ span: '12' }} />
  );

  expect(
    getByTestId('grid-col')
  ).toHaveClass('ods-col-4 ods-col-md-8 ods-col-lg-12', { exact: true });
});

test('includes offsets', () => {
  const { getByTestId } = render(
    <Col
      data-testid="grid-col"
      xs={{ span: '4', offset: '1' }}
      md={{ span: '8' }}
      lg={{ offset: '2' }}
    />
  );

  expect(
    getByTestId('grid-col')
  ).toHaveClass(
    'ods-col-4 ods-offset-1 ods-col-md-8 ods-col-lg ods-offset-lg-2',
    { exact: true }
  );
});

test('allows span to be false', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" xs="6" md={{ span: false }} />
  );

  expect(getByTestId('grid-col')).toHaveClass('ods-col-6', { exact: true });
});

test('allows span to be auto', () => {
  const { getByTestId } = render(
    <Col data-testid="grid-col" md="auto" lg={{ span: 'auto' }} />
  );

  expect(getByTestId('grid-col')).toHaveClass(
    'ods-col-md-auto ods-col-lg-auto',
    { exact: true }
  );
});
