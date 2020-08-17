import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router, Link as RouterLink } from 'react-router-dom';

import Link from '../Link';

test('renders element properly', () => {
  const { getByTestId } = render(
    <Link data-testid="lnk-test" className="custom-class">
      Click here!
    </Link>
  );

  expect(getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <a
      class="ods-lnk custom-class"
      data-testid="lnk-test"
    >
      Click here!
    </a>
  `);
});
test('renders an inverse link', () => {
  const { getByTestId } = render(<Link data-testid="lnk-test" inverse />);
  expect(getByTestId('lnk-test')).toHaveClass('ods-lnk--inverse');
});

test('renders a link with router', () => {
  const { getByTestId } = render(
    <Router>
      <Link data-testid="lnk-test" component={RouterLink} to="/teste/1234">
        Link
      </Link>
    </Router>
  );

  expect(getByTestId('lnk-test')).toMatchInlineSnapshot(`
    <a
      class="ods-lnk"
      data-testid="lnk-test"
      href="/teste/1234"
    >
      Link
    </a>
  `);
});
