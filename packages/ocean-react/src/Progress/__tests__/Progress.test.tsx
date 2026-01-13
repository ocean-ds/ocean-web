import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from '../Progress';

test('renders element properly', () => {
  const { container } = render(<Progress data-testid="progress-test" />);

  expect(container.firstChild).toMatchInlineSnapshot(`
<div
  class="ods-progress ods-progress--md ods-progress--indeterminate"
  data-testid="progress-test"
  role="progressbar"
>
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      opacity="0.4"
      r="10"
      stroke="#B8C3FF"
      stroke-width="4"
    />
    <path
      d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12"
      stroke="#0025E0"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
    />
  </svg>
</div>
`);
  expect(container).toBeInTheDocument();
});

test('should render a progress medium', () => {
  render(<Progress data-testid="progress-test" size="md" />);

  expect(screen.getByTestId('progress-test')).toHaveClass('ods-progress--md');
});

test('should render a progress sm', () => {
  render(<Progress data-testid="progress-test" size="sm" />);
  expect(screen.getByTestId('progress-test')).toHaveClass('ods-progress--sm');
});

test('should render a progress large', () => {
  render(<Progress data-testid="progress-test" size="lg" />);
  expect(screen.getByTestId('progress-test')).toHaveClass('ods-progress--lg');
});

test('should render a determinate progress with percentage', () => {
  render(<Progress data-testid="progress-test" percentage={75} />);

  const progress = screen.getByTestId('progress-test');

  expect(progress).toHaveClass('ods-progress--determinate');
  expect(progress).not.toHaveClass('ods-progress--indeterminate');
  expect(progress).toHaveAttribute('aria-valuenow', '75');
  expect(progress).toHaveAttribute('aria-valuemin', '0');
  expect(progress).toHaveAttribute('aria-valuemax', '100');
});
