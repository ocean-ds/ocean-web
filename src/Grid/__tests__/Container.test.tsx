import React from 'react';
import { render } from '@testing-library/react';

import Container from '../Container';

test('render element properly', () => {
  const { getByTestId } = render(
    <Container data-testid="grid-container" className="custom-class">
      Container
    </Container>
  );

  expect(getByTestId('grid-container')).toMatchInlineSnapshot(`
    <div
      class="ods-container custom-class"
      data-testid="grid-container"
    >
      Container
    </div>
  `);
});

test('turns grid into "full-width" layout via "fluid" property set', () => {
  const { getByTestId } = render(
    <Container data-testid="grid-container" fluid />
  );

  expect(getByTestId('grid-container').className).toBe('ods-container-fluid');
});

test('includes size breakpoint class when fluid is set to sm, md, lg or xl', () => {
  const { getByTestId } = render(
    <Container data-testid="grid-container" fluid="sm" />
  );

  expect(getByTestId('grid-container').className).toBe('ods-container-sm');
});
