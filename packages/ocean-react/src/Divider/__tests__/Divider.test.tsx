import React from 'react';
import { render, screen } from '@testing-library/react';

import Divider from '../Divider';

test('renders element properly', () => {
  render(<Divider data-testid="link-test" className="custom-class" />);
  expect(screen.getByTestId('link-test')).toMatchInlineSnapshot(`
    <hr
      class="ods-divider custom-class"
      data-testid="link-test"
    />
  `);
});
