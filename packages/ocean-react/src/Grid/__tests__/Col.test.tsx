import React from 'react';
import { render, screen } from '@testing-library/react';

import Col from '../Col';

test('renders element properly', () => {
  render(
    <Col data-testid="grid-col" className="custom-class">
      Col rendering
    </Col>
  );

  expect(screen.getByTestId('grid-col')).toMatchInlineSnapshot(`
    <div
      class="ods-col custom-class"
      data-testid="grid-col"
    >
      Col rendering
    </div>
  `);
});

test('includes "ods-col" when xs is true', () => {
  render(<Col data-testid="grid-col" xs />);
  expect(screen.getByTestId('grid-col')).toHaveClass('ods-col', {
    exact: true,
  });
});

test('includes "ods-col" when span of xs is true', () => {
  render(<Col data-testid="grid-col" xs={{ span: true }} />);

  expect(screen.getByTestId('grid-col')).toHaveClass('ods-col', {
    exact: true,
  });
});

test('includes sizes', () => {
  render(<Col data-testid="grid-col" xs="4" md="8" lg={{ span: '12' }} />);

  expect(screen.getByTestId('grid-col')).toHaveClass(
    'ods-col-4 ods-col-md-8 ods-col-lg-12',
    { exact: true }
  );
});

test('includes offsets', () => {
  render(
    <Col
      data-testid="grid-col"
      xs={{ span: '4', offset: '1' }}
      md={{ span: '8' }}
      lg={{ offset: '2' }}
    />
  );

  expect(screen.getByTestId('grid-col')).toHaveClass(
    'ods-col-4 ods-offset-1 ods-col-md-8 ods-col-lg ods-offset-lg-2',
    { exact: true }
  );
});

test('allows span to be false', () => {
  render(<Col data-testid="grid-col" xs="6" md={{ span: false }} />);

  expect(screen.getByTestId('grid-col')).toHaveClass('ods-col-6', {
    exact: true,
  });
});

test('allows span to be auto', () => {
  render(<Col data-testid="grid-col" md="auto" lg={{ span: 'auto' }} />);

  expect(screen.getByTestId('grid-col')).toHaveClass(
    'ods-col-md-auto ods-col-lg-auto',
    { exact: true }
  );
});
