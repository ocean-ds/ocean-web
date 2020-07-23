import React from 'react';
import { render } from '@testing-library/react';

import Container from '../Container';

test('render element properly', () => {
  const { getByTestId } = render(
    <Container
      data-testid="grid-container"
      style={{ width: 200 }}
      className="other-css-class__1 other-css-class__2"
    >
      Container rendering
    </Container>
  );

  expect(getByTestId('grid-container')).toMatchInlineSnapshot(`
    <div
      class="ods-container other-css-class__1 other-css-class__2"
      data-testid="grid-container"
      style="width: 200px;"
    >
      Container rendering
    </div>
  `);
});

test('turns grid into "full-width" layout via "fluid" property set', () => {
  const { getByText } = render(<Container fluid>Fluid Container</Container>);
  expect(getByText('Fluid Container')).toHaveClass('ods-container-fluid');
});
