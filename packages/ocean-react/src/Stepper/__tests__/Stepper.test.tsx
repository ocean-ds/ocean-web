import React from 'react';
import { render, screen } from '@testing-library/react';
import Stepper, { StepperProps } from '../Stepper';

const setup = (props: StepperProps = { step: 1, off: 4 }) => {
  return render(<Stepper {...props} />);
};

test.each([1, 2, 3] as const)('renders each step option`', (step) => {
  setup({ step, off: 4 });

  expect(screen.getByTestId(`stepper-${step}`)).toBeInTheDocument();
});

test('renders the first step off two', () => {
  setup({ step: 1, off: 2 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the first step off three', () => {
  setup({ step: 1, off: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the second step off three', () => {
  setup({ step: 2, off: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the fourth step off four', () => {
  setup({ step: 4, off: 4 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});
