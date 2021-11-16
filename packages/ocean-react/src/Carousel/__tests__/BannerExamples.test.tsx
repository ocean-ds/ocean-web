import React from 'react';
import { render, screen } from '@testing-library/react';

import BannerExample from '../examples/BannerExample';

test('renders a dot list pagination component', () => {
  render(<BannerExample />);

  expect(screen.getByTestId('ods-banner-example')).toBeInTheDocument();
});
