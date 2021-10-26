import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from '../Progress';

test('renders element properly', () => {
  const { container } = render(
    <Progress data-testid="progress-test" size="md" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-progress"
  data-testid="progress-test"
>
  <span
    class="ods-progress__primary ods-progress--md"
  >
    <svg
      class="ods-progress-svg"
      viewBox="22 22 44 44"
    >
      <circle
        cx="44"
        cy="44"
        fill="none"
        r="18"
      />
    </svg>
  </span>
  <span
    class="ods-progress__secondary ods-progress--md"
  >
    <svg
      viewBox="22 22 44 44"
    >
      <circle
        cx="44"
        cy="44"
        fill="none"
        r="18"
      />
    </svg>
  </span>
</div>
`);
  expect(container).toBeInTheDocument();
});

test('should render a progress medium', () => {
  render(<Progress data-testid="progress-test" size="md" />);

  expect(screen.getByTestId('progress-test').firstChild).toHaveClass(
    'ods-progress--md'
  );
});

test('should render a progress sm', () => {
  render(<Progress data-testid="progress-test" size="sm" />);
  expect(screen.getByTestId('progress-test').firstChild).toHaveClass(
    'ods-progress--sm'
  );
});

test('should render a progress large', () => {
  render(<Progress data-testid="progress-test" size="lg" />);
  expect(screen.getByTestId('progress-test').firstChild).toHaveClass(
    'ods-progress--lg'
  );
});
