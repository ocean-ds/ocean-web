import React from 'react';
import { render, screen } from '@testing-library/react';
import Stepper, { StepsProps } from '../Steps';

const setup = (props: StepsProps = { currentStep: 1, steps: 4 }) => {
  return render(<Stepper {...props} />);
};

test.each([1, 2, 3] as const)(
  'renders each currentStep option',
  (currentStep) => {
    setup({ currentStep, steps: 4 });

    expect(screen.getByTestId(`step-${currentStep}`)).toBeInTheDocument();
  }
);

test('renders the first currentStep steps two', () => {
  setup({ currentStep: 1, steps: 2 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the first currentStep steps three', () => {
  setup({ currentStep: 1, steps: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the second currentStep steps three', () => {
  setup({ currentStep: 2, steps: 3 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});

test('renders the fourth currentStep steps four', () => {
  setup({ currentStep: 4, steps: 4 });

  expect(document.firstChild).toMatchInlineSnapshot(`DocumentType {}`);
});
