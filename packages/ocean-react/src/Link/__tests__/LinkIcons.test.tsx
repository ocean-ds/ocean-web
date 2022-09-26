import React from 'react';
import { render, screen } from '@testing-library/react';

import LinkIcons from '../LinkIcons';

describe('renders the LinkIcons component with both icons', () => {
  test('should render the LinkIcons component with linkArrow icon', () => {
    render(<LinkIcons icon="linkArrow" />);

    expect(screen.queryByTestId('link-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('link-icon')).toHaveClass('ods-link__icon');
  });

  test('rshould render the LinkIcons component with externalLink icon', () => {
    render(<LinkIcons icon="externalLink" />);

    expect(screen.queryByTestId('link-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('link-icon')).toHaveClass('ods-link__icon');
  });
});

describe('renders the LinkIcons component as an empty div', () => {
  test('should render an empty div', () => {
    render(<LinkIcons />);

    expect(screen.queryByTestId('link-icon')).not.toBeInTheDocument();
  });
});
