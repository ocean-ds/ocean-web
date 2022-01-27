import React from 'react';
import { render, screen } from '@testing-library/react';
import Stepper, { StepperProps } from '../Stepper';

const setup = (props: StepperProps = { completed: 1, steps: 4 }) => {
  return render(<Stepper {...props} />);
};

test.each([1, 2, 3] as const)('renders each completed option`', (completed) => {
  setup({ completed, steps: 4 });

  expect(screen.getByTestId(`stepper-${completed}`)).toBeInTheDocument();
});

test('renders the first completed steps two', () => {
  setup({ completed: 1, steps: 2 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the first completed steps three', () => {
  setup({ completed: 1, steps: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the second completed steps three', () => {
  setup({ completed: 2, steps: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the fourth completed steps four', () => {
  setup({ completed: 4, steps: 4 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});
