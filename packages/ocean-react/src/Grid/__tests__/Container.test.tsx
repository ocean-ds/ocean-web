import React from 'react';
import { render, screen } from '@testing-library/react';

import Container from '../Container';

test('render element properly', () => {
  render(
    <Container data-testid="grid-container" className="custom-class">
      Container
    </Container>
  );

  expect(screen.getByTestId('grid-container')).toMatchInlineSnapshot(`
    <div
      class="ods-container custom-class"
      data-testid="grid-container"
    >
      Container
    </div>
  `);
});

test('turns grid into "full-width" layout via "fluid" property set', () => {
  render(<Container data-testid="grid-container" fluid />);

  expect(screen.getByTestId('grid-container')).toHaveClass(
    'ods-container-fluid',
    {
      exact: true,
    }
  );
});

test('includes size breakpoint class when fluid is set to sm, md, lg or xl', () => {
  render(<Container data-testid="grid-container" fluid="sm" />);

  expect(screen.getByTestId('grid-container')).toHaveClass('ods-container-sm', {
    exact: true,
  });
});
