import React from 'react';
import { render, screen } from '@testing-library/react';

import Divider from '../Divider';

test('renders element properly', () => {
  render(<Divider data-testid="lnk-test" className="custom-class" />);
  expect(screen.getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <hr
      class="ods-divider custom-class"
      data-testid="lnk-test"
    />
  `);
});
