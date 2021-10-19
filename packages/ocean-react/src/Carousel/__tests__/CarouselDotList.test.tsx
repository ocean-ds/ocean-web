import React from 'react';
import { render, screen } from '@testing-library/react';

import CarouselDotList from '../CarouselDotList';

test('renders a dot list pagination component', () => {
  render(<CarouselDotList dots={[<div key={1}>teste 1</div>]} />);

  expect(screen.getByTestId('ods-ul-dots')).toBeInTheDocument();
});
