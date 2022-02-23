import React from 'react';
import { render, screen } from '@testing-library/react';

import BannerExample from '../examples/BannerExample';

test('renders component with default color', () => {
  render(<BannerExample />);

  expect(screen.getByTestId('ods-banner-example')).toBeInTheDocument();
});

test('renders component with color', () => {
  render(<BannerExample color={1} />);

  expect(screen.getByTestId('ods-banner-example')).toBeInTheDocument();
});
