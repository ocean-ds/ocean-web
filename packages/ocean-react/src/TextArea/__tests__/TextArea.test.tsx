import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TextArea from '../TextArea';
import TextAreaControlled from '../examples/TextAreaControlled';

test('renders element properly', () => {
  const { container } = render(
    <TextArea data-testid="textarea-test" className="custom-class" />
  );

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="ods-form-control__root"
    >
      <div
        class="ods-form-control__header"
      >
        <div
          class="ods-form-control__label"
        />
      </div>
      <div
        class="ods-form-control__element"
      >
        <textarea
          class="ods-textarea custom-class"
          data-testid="textarea-test"
        />
      </div>
    </div>
  `);
});

test('renders a error state for the textarea', () => {
  render(
    <TextArea data-testid="textarea-test" error helperText="Error message." />
  );
  expect(screen.getByTestId('textarea-test')).toHaveClass(
    'ods-textarea ods-textarea--error',
    { exact: true }
  );
});

test('renders a filled state for uncontrolled textarea', () => {
  render(<TextArea data-testid="textarea-test" defaultValue="Test test" />);

  expect(screen.getByTestId('textarea-test')).toHaveClass(
    'ods-textarea--filled'
  );
  fireEvent.change(screen.getByTestId('textarea-test'), {
    target: { value: '' },
  });
  expect(screen.getByTestId('textarea-test')).not.toHaveClass(
    'ods-textarea--filled'
  );
});

test('renders a filled state for controlled textarea', () => {
  render(<TextAreaControlled />);

  expect(screen.getByTestId('controlled-textarea')).not.toHaveClass(
    'ods-textarea--filled'
  );
  fireEvent.change(screen.getByTestId('controlled-textarea'), {
    target: { value: 'Hi there!' },
  });
  expect(screen.getByTestId('controlled-textarea')).toHaveClass(
    'ods-textarea--filled'
  );
});
